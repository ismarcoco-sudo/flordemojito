import { NextRequest, NextResponse } from 'next/server';
import { sendOrderConfirmationEmail, sendAdminNotificationEmail } from '@/lib/mail';
import { Order } from '@/types/order';

export async function POST(req: NextRequest) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const event = await req.json() as { event_type: string; resource: any };
    const eventType = event.event_type;

    console.log('PayPal webhook received:', eventType);

    if (eventType === 'PAYMENT.CAPTURE.COMPLETED') {
      const capture = event.resource;
      const orderNumber = (capture.custom_id as string) || (capture.invoice_id as string) || `FM-PP-${(capture.id as string).slice(-6)}`;

      console.log(`✅ PayPal pago completado — Pedido ${orderNumber}`);

      // Update order status in global store
      const order = await updateOrderToPaid(orderNumber, capture.id);

      if (order) {
        // Send emails
        await sendOrderConfirmationEmail(order).catch(e => console.error('PayPal email confirmation failed:', e));
        await sendAdminNotificationEmail(order).catch(e => console.error('PayPal admin notification failed:', e));
      }

      // Trigger DPD label creation
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://flordemojito.es'}/api/dpd/create-shipment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-internal-secret': process.env.INTERNAL_SECRET || '' },
        body: JSON.stringify({ orderNumber, paypalCapture: capture }),
      }).catch((e) => console.error('DPD trigger failed (PayPal):', e));
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    console.error('PayPal webhook error:', err);
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 });
  }
}

async function updateOrderToPaid(orderNumber: string, captureId: string): Promise<Order | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globalAny = global as any;
  const store = globalAny.__ORDERS_STORE__ as Order[] | undefined;
  if (!store) return null;

  const idx = store.findIndex(o => o.orderNumber === orderNumber);
  if (idx !== -1) {
    store[idx].paymentStatus = 'paid';
    store[idx].paypalOrderId = captureId;
    return store[idx];
  }
  return null;
}
