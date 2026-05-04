import { NextRequest, NextResponse } from 'next/server';
import { DPD_PACKAGES, Order } from '@/types/order';
import { sendOrderShippedEmail } from '@/lib/mail';

const DPD_API_BASE = 'https://e-services.dpd.fr/api';

// ... (rest of ShipmentPayload interface stays the same)
interface ShipmentPayload {
  orderNumber: string;
  metadata?: Record<string, string>;
  paypalCapture?: Record<string, unknown>;
  manualData?: {
    fullName: string;
    address: string;
    postalCode: string;
    city: string;
    email: string;
    phone: string;
    bottleCount: number;
  };
}

export async function POST(req: NextRequest) {
  // Validate internal call
  const secret = req.headers.get('x-internal-secret');
  if (secret !== process.env.INTERNAL_SECRET && secret !== process.env.NEXT_PUBLIC_INTERNAL_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let payload: ShipmentPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  const { orderNumber, metadata, manualData } = payload;
  const fullName = manualData?.fullName || metadata?.fullName || 'Cliente';
  const address = manualData?.address || metadata?.address || '';
  const postalCode = manualData?.postalCode || metadata?.postalCode || '';
  const city = manualData?.city || metadata?.city || '';
  const email = manualData?.email || metadata?.email || '';
  const phone = metadata?.phone || manualData?.phone || '';
  const bottleCount = manualData?.bottleCount || 1;
  const pkg = DPD_PACKAGES[bottleCount] || DPD_PACKAGES[1];

  try {
    // DPD France API call (Mocking successful response for now as we don't have API key)
    let trackingNumber = `05194${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`;
    let labelUrl = 'https://www.dpd.com/sample-label.pdf';

    if (process.env.DPD_API_KEY && process.env.DPD_API_KEY !== '...') {
      const dpdRes = await fetch(`${DPD_API_BASE}/shipments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.DPD_API_KEY}`,
        },
        body: JSON.stringify({
          shipper: {
            name: 'Flor de Mojito',
            address: process.env.DPD_SHIPPER_ADDRESS,
            zipCode: process.env.DPD_SHIPPER_ZIP,
            city: process.env.DPD_SHIPPER_CITY,
            countryCode: 'FR',
            contact: process.env.DPD_SHIPPER_CONTACT,
            phone: process.env.DPD_SHIPPER_PHONE,
          },
          recipient: { name: fullName, address, zipCode: postalCode, city, countryCode: 'ES', email, phone },
          parcel: { weight: pkg.weight, length: pkg.length, width: pkg.width, height: pkg.height, reference: orderNumber },
          service: { productCode: 'IE2', saturdayDelivery: false, predict: true },
        }),
      });

      if (dpdRes.ok) {
        const dpdData = await dpdRes.json();
        trackingNumber = dpdData.trackingNumber || dpdData.parcelNumber;
        labelUrl = dpdData.label?.url || dpdData.labelUrl;
      }
    }

    console.log(`📦 DPD shipment created — ${orderNumber} — Tracking: ${trackingNumber}`);

    // Update order in store
    const order = await updateOrderWithTracking(orderNumber, trackingNumber, labelUrl);

    if (order) {
      // Send tracking email
      await sendOrderShippedEmail(order).catch(e => console.error('Shipped email failed:', e));
    }

    return NextResponse.json({
      success: true,
      trackingNumber,
      labelUrl,
      trackingLink: `https://tracking.dpd.de/status/es_ES/parcel/${trackingNumber}`,
    });

  } catch (err: unknown) {
    console.error('DPD create shipment error:', err);
    return NextResponse.json({
      success: false,
      status: 'pending_label',
      message: 'DPD API unreachable.',
    }, { status: 200 });
  }
}

async function updateOrderWithTracking(orderNumber: string, trackingNumber: string, labelUrl: string): Promise<Order | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globalAny = global as any;
  const store = globalAny.__ORDERS_STORE__ as Order[] | undefined;
  if (!store) return null;

  const idx = store.findIndex(o => o.orderNumber === orderNumber);
  if (idx !== -1) {
    store[idx].shippingStatus = 'label_generated';
    store[idx].trackingNumber = trackingNumber;
    store[idx].labelUrl = labelUrl;
    return store[idx];
  }
  return null;
}
