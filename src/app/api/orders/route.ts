import { NextRequest, NextResponse } from 'next/server';
import { Order, PaymentStatus, ShippingStatus } from '@/types/order';

// ─── In-memory store (replace with Firestore/Postgres in production) ──────────
// This is intentionally a module-level variable so it persists across hot-reloads
// in dev. In production connect to a real database.
declare global {
  // eslint-disable-next-line no-var
  var __ORDERS_STORE__: Order[] | undefined;
}
if (!global.__ORDERS_STORE__) {
  global.__ORDERS_STORE__ = generateMockOrders();
}
const store = global.__ORDERS_STORE__;

// GET /api/orders — list all orders (with optional filters)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('paymentStatus') as PaymentStatus | null;
  const shippingStatus = searchParams.get('shippingStatus') as ShippingStatus | null;
  const zone = searchParams.get('zone');

  let orders = [...store].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (status) orders = orders.filter((o) => o.paymentStatus === status);
  if (shippingStatus) orders = orders.filter((o) => o.shippingStatus === shippingStatus);
  if (zone) orders = orders.filter((o) => o.shippingAddress.zone === zone);

  return NextResponse.json({ orders, total: orders.length });
}

// POST /api/orders — create a new order
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Partial<Order>;
    const order: Order = {
      id: crypto.randomUUID(),
      orderNumber: body.orderNumber || `FM-${Date.now()}`,
      createdAt: new Date().toISOString(),
      items: body.items || [],
      shippingAddress: body.shippingAddress!,
      subtotal: body.subtotal || 0,
      iva: body.iva || 0,
      shippingCost: body.shippingCost || 0,
      total: body.total || 0,
      paymentMethod: body.paymentMethod || 'stripe',
      paymentStatus: 'pending',
      shippingStatus: 'pending_label',
    };
    store.unshift(order);
    return NextResponse.json({ order }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }
}

// PATCH /api/orders — update order (tracking, status, note)
export async function PATCH(req: NextRequest) {
  try {
    const { id, ...updates } = await req.json();
    const idx = store.findIndex((o) => o.id === id || o.orderNumber === id);
    if (idx === -1) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    store[idx] = { ...store[idx], ...updates };
    return NextResponse.json({ order: store[idx] });
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }
}

// ─── Mock data generator ───────────────────────────────────────────────────────
function generateMockOrders(): Order[] {
  const zones = ['peninsula', 'baleares', 'canarias'] as const;
  const payStatuses: PaymentStatus[] = ['paid', 'paid', 'paid', 'pending', 'failed'];
  const shipStatuses: ShippingStatus[] = ['pending_label', 'label_generated', 'in_transit', 'delivered'];
  const names = ['María García', 'Carlos Ruiz', 'Ana Martínez', 'Pedro López', 'Laura Sánchez'];
  const cities = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Palma de Mallorca'];
  const flavors = ['Clásico', 'Fresa', 'Mango', 'Frambuesa', 'Coco'];

  return Array.from({ length: 12 }, (_, i) => {
    const zone = zones[i % 3];
    const qty = (i % 3) + 1;
    const price = 30;
    const sub = price * qty;
    const ship = zone === 'peninsula' && qty >= 2 ? 0 : 8.2 * qty;
    return {
      id: crypto.randomUUID(),
      orderNumber: `FM-2026-${10001 + i}`,
      createdAt: new Date(Date.now() - i * 86400000 * 2).toISOString(),
      items: [{
        id: String(i + 1),
        name: `Flor de Mojito ${flavors[i % 5]}`,
        price,
        quantity: qty,
        image: '/images/FlorMojito-Clasico.jpg',
      }],
      shippingAddress: {
        fullName: names[i % 5],
        email: `cliente${i}@example.com`,
        phone: `+34 6${String(i).padStart(2, '0')} 000 000`,
        address: `Calle Mayor ${i + 1}`,
        postalCode: `2800${i % 9}`,
        city: cities[i % 5],
        province: cities[i % 5],
        zone,
      },
      subtotal: sub,
      iva: parseFloat((sub / 1.1 * 0.1).toFixed(2)),
      shippingCost: ship,
      total: parseFloat((sub + ship).toFixed(2)),
      paymentMethod: i % 4 === 0 ? 'paypal' : 'stripe',
      paymentStatus: payStatuses[i % 5],
      shippingStatus: shipStatuses[i % 4],
      trackingNumber: i < 6 ? `05194${String(i).padStart(8, '0')}` : undefined,
    };
  });
}
