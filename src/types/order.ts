// ─── Shipping Zones ───────────────────────────────────────────────────────────
export type ShippingZone = 'peninsula' | 'baleares' | 'canarias';

// ─── Shipping Rates (base, without fuel surcharge) ────────────────────────────
export const SHIPPING_RATES: Record<ShippingZone, Record<number, number>> = {
  peninsula: { 1: 8.20, 2: 9.50, 3: 10.80 },
  baleares:  { 1: 10.20, 2: 11.80, 3: 13.50 },
  canarias:  { 1: 13.30, 2: 15.40, 3: 17.50 },
};

// Fuel surcharge (% over base rate)
export const FUEL_SURCHARGE = 0.07;

// Optional breakage insurance per bottle
export const BREAKAGE_INSURANCE_PER_BOTTLE = 0.35;

// IVA rate for food products (non-alcoholic)
export const IVA_RATE = 0.10;

// Free shipping threshold (bottles)
export const FREE_SHIPPING_MIN_BOTTLES = 2;
export const FREE_SHIPPING_ZONE: ShippingZone = 'peninsula';

// Max bottles per order
export const MAX_BOTTLES = 3;

// Transit times
export const TRANSIT_TIMES: Record<ShippingZone, string> = {
  peninsula: '48-72h',
  baleares:  '72-96h',
  canarias:  '4-6 días',
};

// DPD package dimensions per quantity
export const DPD_PACKAGES: Record<number, { length: number; width: number; height: number; weight: number }> = {
  1: { length: 32, width: 14, height: 14, weight: 2.0 },
  2: { length: 40, width: 16, height: 16, weight: 3.6 },
  3: { length: 48, width: 18, height: 18, weight: 5.2 },
};

// ─── Cart ─────────────────────────────────────────────────────────────────────
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  weight: number; // kg per unit
}

export interface CartState {
  items: CartItem[];
  zone: ShippingZone;
  breakageInsurance: boolean;
}

// ─── Order ────────────────────────────────────────────────────────────────────
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type ShippingStatus = 'pending_label' | 'label_generated' | 'in_transit' | 'delivered' | 'incident';
export type PaymentMethod = 'stripe' | 'paypal';

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  province: string;
  zone: ShippingZone;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  iva: number;
  shippingCost: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  shippingStatus: ShippingStatus;
  trackingNumber?: string;
  labelUrl?: string;
  stripePaymentIntentId?: string;
  paypalOrderId?: string;
  internalNote?: string;
}

// ─── Shipping calculation helper ──────────────────────────────────────────────
export function calculateShipping(
  bottleCount: number,
  zone: ShippingZone,
  breakageInsurance: boolean = false
): { base: number; fuel: number; insurance: number; total: number; isFree: boolean; transitTime: string } {
  const isFree = zone === FREE_SHIPPING_ZONE && bottleCount >= FREE_SHIPPING_MIN_BOTTLES;

  if (isFree) {
    return { base: 0, fuel: 0, insurance: 0, total: 0, isFree: true, transitTime: TRANSIT_TIMES[zone] };
  }

  const base = SHIPPING_RATES[zone][bottleCount] ?? SHIPPING_RATES[zone][3];
  const fuel = parseFloat((base * FUEL_SURCHARGE).toFixed(2));
  const insurance = breakageInsurance ? parseFloat((bottleCount * BREAKAGE_INSURANCE_PER_BOTTLE).toFixed(2)) : 0;
  const total = parseFloat((base + fuel + insurance).toFixed(2));

  return { base, fuel, insurance, total, isFree: false, transitTime: TRANSIT_TIMES[zone] };
}

export function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `FM-${year}-${rand}`;
}
