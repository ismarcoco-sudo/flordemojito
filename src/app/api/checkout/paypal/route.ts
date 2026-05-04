import { NextRequest, NextResponse } from 'next/server';
import { generateOrderNumber } from '@/types/order';

const PAYPAL_BASE = process.env.PAYPAL_ENV === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

async function getPayPalToken(): Promise<string> {
  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  });
  const data = await res.json();
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, zone, shippingCost, checkoutData } = body;

    const orderNumber = generateOrderNumber();
    const origin = req.headers.get('origin') || 'https://flordemojito.es';
    const token = await getPayPalToken();

    const itemTotal = items.reduce((sum: number, item: { price: number; quantity: number }) =>
      sum + item.price * item.quantity, 0);
    const grandTotal = parseFloat((itemTotal + (shippingCost || 0)).toFixed(2));

    const ppItems = items.map((item: { name: string; price: number; quantity: number }) => ({
      name: `Flor de Mojito ${item.name}`,
      quantity: String(item.quantity),
      unit_amount: { currency_code: 'EUR', value: item.price.toFixed(2) },
    }));

    if (shippingCost > 0) {
      ppItems.push({
        name: `Envío DPD / SEUR (${zone})`,
        quantity: '1',
        unit_amount: { currency_code: 'EUR', value: shippingCost.toFixed(2) },
      });
    }

    const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'PayPal-Request-Id': orderNumber,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          reference_id: orderNumber,
          custom_id: orderNumber,
          amount: {
            currency_code: 'EUR',
            value: grandTotal.toFixed(2),
            breakdown: {
              item_total: { currency_code: 'EUR', value: grandTotal.toFixed(2) },
            },
          },
          items: ppItems,
          shipping: {
            name: { full_name: checkoutData.fullName },
            address: {
              address_line_1: checkoutData.address,
              admin_area_2: checkoutData.city,
              admin_area_1: checkoutData.province,
              postal_code: checkoutData.postalCode,
              country_code: 'ES',
            },
          },
        }],
        payment_source: {
          paypal: {
            experience_context: {
              payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
              brand_name: 'Flor de Mojito',
              locale: 'es-ES',
              landing_page: 'LOGIN',
              user_action: 'PAY_NOW',
              return_url: `${origin}/checkout/success?order=${orderNumber}`,
              cancel_url: `${origin}/checkout?cancelled=1`,
            },
          },
        },
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'PayPal error');

    const approveLink = data.links?.find((l: { rel: string; href: string }) => l.rel === 'payer-action');
    return NextResponse.json({ approveUrl: approveLink?.href, orderId: data.id });
  } catch (err: unknown) {
    console.error('PayPal checkout error:', err);
    const msg = err instanceof Error ? err.message : 'Error interno';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
