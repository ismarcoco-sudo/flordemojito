"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckoutData } from '@/app/checkout/page';
import { ShieldCheck, Truck, CreditCard, Loader2 } from 'lucide-react';

type PaymentMethod = 'stripe' | 'paypal';

export function CheckoutStep3Payment({ cart, checkoutData, subtotalNoIva, ivaAmount, onBack, onSuccess }: {
  cart: ReturnType<typeof import('@/hooks/use-cart').useCart>;
  checkoutData: CheckoutData;
  subtotalNoIva: number;
  ivaAmount: number;
  onBack: () => void;
  onSuccess: () => void;
}) {
  const [method, setMethod] = useState<PaymentMethod>('stripe');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePay = async () => {
    setLoading(true);
    setError('');
    try {
      if (method === 'stripe') {
        const res = await fetch('/api/checkout/stripe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: cart.items,
            zone: cart.zone,
            shippingCost: cart.shippingCost,
            breakageInsurance: cart.breakageInsurance,
            checkoutData,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error al procesar el pago');
        if (data.url) {
          window.location.href = data.url;
        } else {
          onSuccess();
        }
      } else {
        const res = await fetch('/api/checkout/paypal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: cart.items,
            zone: cart.zone,
            shippingCost: cart.shippingCost,
            checkoutData,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error PayPal');
        if (data.approveUrl) {
          window.location.href = data.approveUrl;
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* Payment selector */}
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-xl font-serif font-bold text-primary">Método de pago</h2>

        <div className="bg-white rounded-2xl border border-border p-6 space-y-4">
          {/* Stripe */}
          <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${method === 'stripe' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'}`}>
            <input type="radio" name="payment" value="stripe" checked={method === 'stripe'} onChange={() => setMethod('stripe')} className="text-primary w-4 h-4" />
            <CreditCard className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="font-bold text-sm">Tarjeta de Crédito / Débito</p>
              <p className="text-xs text-text-muted">Visa, Mastercard, Amex · 3D Secure</p>
            </div>
            <div className="flex gap-1.5 items-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-4" />
            </div>
          </label>

          {/* PayPal */}
          <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${method === 'paypal' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'}`}>
            <input type="radio" name="payment" value="paypal" checked={method === 'paypal'} onChange={() => setMethod('paypal')} className="text-primary w-4 h-4" />
            <div className="flex-1">
              <p className="font-bold text-sm">PayPal</p>
              <p className="text-xs text-text-muted">Pago rápido con tu cuenta PayPal</p>
            </div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
          </label>

          {error && (
            <div className="bg-error/10 text-error rounded-lg px-4 py-3 text-sm">{error}</div>
          )}

          <div className="flex items-center gap-2 text-xs text-text-muted">
            <ShieldCheck className="w-4 h-4 text-success" />
            Pago 100% seguro y encriptado · PSD2 compliant
          </div>
        </div>

        {/* Shipping address recap */}
        <div className="bg-white rounded-2xl border border-border p-5">
          <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-3">Enviar a</h3>
          <p className="text-sm font-medium">{checkoutData.fullName}</p>
          <p className="text-sm text-text-muted">{checkoutData.address}</p>
          <p className="text-sm text-text-muted">{checkoutData.postalCode} {checkoutData.city}, {checkoutData.province}</p>
          <p className="text-sm text-text-muted">{checkoutData.email} · {checkoutData.phone}</p>
        </div>

        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1 h-12">← Volver</Button>
          <Button onClick={handlePay} disabled={loading} className="flex-1 h-12 text-base" id="step3-pay-btn">
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Procesando...</>
            ) : (
              `Pagar ${cart.total.toFixed(2)} €`
            )}
          </Button>
        </div>
      </div>

      {/* Order summary */}
      <div>
        <div className="bg-white rounded-2xl border border-border p-5 sticky top-36 space-y-3">
          <h3 className="font-bold text-sm uppercase tracking-wider text-text-muted">Resumen del pedido</h3>
          {cart.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-text-muted">Flor de Mojito {item.name} ×{item.quantity}</span>
              <span className="font-medium">{(item.price * item.quantity).toFixed(2)} €</span>
            </div>
          ))}
          <div className="border-t border-border pt-3 space-y-1.5 text-sm">
            <div className="flex justify-between text-text-muted">
              <span>Subtotal (sin IVA)</span>
              <span>{subtotalNoIva.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-text-muted">
              <span>IVA 10%</span>
              <span>{ivaAmount.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-text-muted">
              <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Envío</span>
              {cart.isFreeShipping ? <span className="text-success font-bold">GRATIS</span> : <span>{cart.shippingCost.toFixed(2)} €</span>}
            </div>
            <div className="flex justify-between font-bold text-primary text-lg border-t border-border pt-2">
              <span>Total</span>
              <span>{cart.total.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
