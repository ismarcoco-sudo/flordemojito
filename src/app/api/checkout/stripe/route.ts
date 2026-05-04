import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { calculateShipping, IVA_RATE, generateOrderNumber } from '@/types/order';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-12-18.acacia' as any });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, zone, shippingCost, breakageInsurance, checkoutData } = body;

    if (!items?.length) return NextResponse.json({ error: 'Carrito vacío' }, { status: 400 });

    const orderNumber = generateOrderNumber();
    const origin = req.headers.get('origin') || 'https://flordemojito.es';

    // 🧪 MODO PRUEBA / SIMULACIÓN
    if (process.env.STRIPE_SECRET_KEY === 'sk_test_placeholder' || process.env.TEST_MODE === 'true') {
      console.log('🧪 Simulación de pago Stripe activada');
      return NextResponse.json({ 
        url: `${origin}/checkout/success?order=${orderNumber}&simulated=true`,
        simulated: true 
      });
    }

    // Build line items with IVA breakdown
    const lineItems: any[] = items.map((item: { name: string; price: number; quantity: number; image: string }) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: `Flor de Mojito ${item.name}`,
          images: [`${origin}${item.image}`],
          metadata: { product_id: item.name },
        },
        unit_amount: Math.round(item.price * 100), // price already includes IVA
        tax_behavior: 'inclusive',
      },
      quantity: item.quantity,
    }));

    // Shipping as separate line item if not free
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: { name: `Envío DPD / SEUR (${zone})` },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order=${orderNumber}`,
      cancel_url: `${origin}/checkout?cancelled=1`,
      customer_email: checkoutData.email,
      shipping_address_collection: undefined,
      metadata: {
        orderNumber,
        zone,
        fullName: checkoutData.fullName,
        phone: checkoutData.phone,
        address: checkoutData.address,
        postalCode: checkoutData.postalCode,
        city: checkoutData.city,
        province: checkoutData.province,
      },
      payment_intent_data: {
        metadata: { orderNumber, zone, fullName: checkoutData.fullName },
      },
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (err: unknown) {
    console.error('Stripe checkout error:', err);
    const msg = err instanceof Error ? err.message : 'Error interno';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
