"use client";

import React from 'react';
import { Truck, Shield, Gift, Trash2, Plus, Minus, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShippingZone } from '@/types/order';
import Image from 'next/image';

const ZONE_LABELS: Record<ShippingZone, string> = {
  peninsula: 'Península',
  baleares: 'Baleares',
  canarias: 'Canarias / Ceuta / Melilla',
};

export function CheckoutStep1Cart({ cart, subtotalNoIva, ivaAmount, onNext }: {
  cart: ReturnType<typeof import('@/hooks/use-cart').useCart>;
  subtotalNoIva: number;
  ivaAmount: number;
  onNext: () => void;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* Items */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-xl font-serif font-bold text-primary">Tu pedido</h2>

        {cart.items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-border p-5 flex gap-4 items-center">
            <div className="w-20 h-24 bg-bg-light rounded-xl border border-border overflow-hidden p-2 shrink-0">
              <Image src={item.image} alt={item.name} width={80} height={96} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-primary">Flor de Mojito {item.name}</h3>
              <p className="text-sm text-text-muted">70 cl · 1,6 kg</p>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center border border-border rounded-lg bg-bg-light">
                  <button onClick={() => cart.updateQuantity(item.id, -1)} className="p-1.5 hover:text-primary">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                  <button onClick={() => cart.updateQuantity(item.id, 1)} disabled={cart.bottleCount >= 3} className="p-1.5 hover:text-primary disabled:opacity-30">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <button onClick={() => cart.removeItem(item.id)} className="text-text-muted hover:text-error transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="font-bold text-primary text-lg shrink-0">
              {(item.price * item.quantity).toFixed(2)} €
            </div>
          </div>
        ))}

        {/* Zone + insurance */}
        <div className="bg-white rounded-2xl border border-border p-5 space-y-4">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5" /> Zona de destino
            </label>
            <select
              value={cart.zone}
              onChange={(e) => cart.setZone(e.target.value as ShippingZone)}
              className="w-full border border-border rounded-lg p-3 text-sm bg-bg-light focus:outline-primary"
              id="step1-zone"
            >
              {(Object.keys(ZONE_LABELS) as ShippingZone[]).map((z) => (
                <option key={z} value={z}>{ZONE_LABELS[z]}</option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-border bg-bg-light hover:border-primary transition-colors">
            <input
              type="checkbox"
              checked={cart.breakageInsurance}
              onChange={(e) => cart.setBreakageInsurance(e.target.checked)}
              className="rounded text-primary focus:ring-primary w-4 h-4"
            />
            <div className="flex-1">
              <p className="text-sm font-medium">Seguro de rotura (+0,35€ / botella)</p>
              <p className="text-xs text-text-muted">Protege tu pedido en caso de accidente durante el transporte</p>
            </div>
            <Shield className="w-4 h-4 text-primary/50" />
          </label>

          {cart.bottlesUntilFreeShipping > 0 && cart.zone === 'peninsula' && (
            <div className="flex items-center gap-2 text-sm bg-accent/10 text-primary rounded-lg px-4 py-3">
              <Gift className="w-4 h-4 shrink-0 text-accent-alt" />
              <span>
                Añade <strong>{cart.bottlesUntilFreeShipping} botella{cart.bottlesUntilFreeShipping > 1 ? 's' : ''} más</strong> y el envío es <strong className="text-success">GRATIS</strong>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-4">
        <div className="bg-white rounded-2xl border border-border p-6 sticky top-36">
          <h3 className="font-bold text-lg mb-4">Resumen</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-text-muted">
              <span>Subtotal (sin IVA)</span>
              <span>{subtotalNoIva.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-text-muted">
              <span>IVA 10%</span>
              <span>{ivaAmount.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-text-muted">
              <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Envío ({cart.transitTime})</span>
              {cart.isFreeShipping
                ? <span className="text-success font-bold">GRATIS</span>
                : <span>{cart.shippingCost.toFixed(2)} €</span>
              }
            </div>
            <div className="border-t border-border pt-3 mt-3 flex justify-between font-bold text-primary text-lg">
              <span>Total</span>
              <span>{cart.total.toFixed(2)} €</span>
            </div>
          </div>
          <Button onClick={onNext} className="w-full mt-6 h-12 text-base" id="step1-next-btn">
            Continuar → Datos de Envío
          </Button>
          <p className="text-[11px] text-center text-text-muted mt-3">
            Pago seguro con Stripe y PayPal · 3D Secure
          </p>
        </div>
      </div>

    </div>
  );
}
