import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sendOrderConfirmationEmail, sendAdminNotificationEmail } from '@/lib/mail';
import { Order } from '@/types/order';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-04-30' as any });
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) return NextResponse.json({ error: 'No signature' }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error('Stripe webhook signature error:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const meta = session.metadata || {};
      const orderNumber = meta.orderNumber || `FM-STRIPE-${session.id.slice(-6)}`;

      console.log(`✅ Pago OK — Pedido ${orderNumber} — Cliente: ${session.customer_email}`);

      // Update order in global store (placeholder logic)
      const order = await updateOrderToPaid(orderNumber, session);

      if (order) {
        // Send emails
        await sendOrderConfirmationEmail(order).catch(e => console.error('Email confirmation failed:', e));
        await sendAdminNotificationEmail(order).catch(e => console.error('Admin notification failed:', e));
      }

      // Trigger DPD label creation
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://flordemojito.es'}/api/dpd/create-shipment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-internal-secret': process.env.INTERNAL_SECRET || '' },
        body: JSON.stringify({ orderNumber, metadata: meta }),
      }).catch((e) => console.error('DPD trigger failed:', e));

      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}

async function updateOrderToPaid(orderNumber: string, session: Stripe.Checkout.Session): Promise<Order | null> {
  const store = (global as any).__ORDERS_STORE__ as Order[] | undefined;
  if (!store) return null;

  const idx = store.findIndex(o => o.orderNumber === orderNumber);
  if (idx !== -1) {
    store[idx].paymentStatus = 'paid';
    store[idx].stripePaymentIntentId = session.payment_intent as string;
    return store[idx];
  }

  // If order not found in memory (e.g. server restarted), we can't do much without a real DB
  // But for this demo, we'll return null
  return null;
}
