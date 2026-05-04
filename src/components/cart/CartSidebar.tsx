"use client";

import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, Truck, Shield, Gift, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/hooks/use-cart';
import { ShippingZone } from '@/types/order';
import Image from 'next/image';
import Link from 'next/link';

const ZONE_LABELS: Record<ShippingZone, string> = {
  peninsula: 'Península',
  baleares: 'Baleares',
  canarias: 'Canarias / Ceuta / Melilla',
};

export function CartSidebar() {
  const {
    items,
    total,
    subtotal,
    itemCount,
    bottleCount,
    shippingCost,
    isFreeShipping,
    transitTime,
    bottlesUntilFreeShipping,
    zone,
    breakageInsurance,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    setZone,
    setBreakageInsurance,
  } = useCart();

  const savedAmount = isFreeShipping && zone === 'peninsula'
    ? (bottleCount === 2 ? 9.50 : bottleCount === 3 ? 10.80 : 0) * 1.07
    : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-primary/25 backdrop-blur-sm z-[100]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.42 }}
            className="fixed inset-y-0 right-0 w-full max-w-[420px] bg-bg-light shadow-2xl z-[101] flex flex-col border-l border-border"
          >
            {/* Header */}
            <div className="p-5 flex items-center justify-between border-b border-border bg-white">
              <h2 className="text-lg font-serif font-bold text-primary flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Tu Carrito
                {itemCount > 0 && (
                  <span className="ml-1 px-2 py-0.5 rounded-full bg-primary text-white text-xs font-bold">
                    {itemCount}
                  </span>
                )}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-text-muted hover:text-error transition-colors rounded-full hover:bg-error/10"
                aria-label="Cerrar carrito"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Upsell / Free shipping banner */}
            <AnimatePresence mode="wait">
              {items.length > 0 && (
                <motion.div
                  key={bottlesUntilFreeShipping > 0 ? 'upsell' : 'free'}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className={`px-5 py-2.5 text-sm font-medium flex items-center gap-2 ${
                    isFreeShipping && zone === 'peninsula'
                      ? 'bg-success/10 text-success border-b border-success/20'
                      : bottlesUntilFreeShipping > 0 && zone === 'peninsula'
                      ? 'bg-accent/15 text-primary border-b border-accent/30'
                      : 'bg-border/40 text-text-muted border-b border-border'
                  }`}
                >
                  {isFreeShipping && zone === 'peninsula' ? (
                    <>
                      <Gift className="w-4 h-4 shrink-0" />
                      <span>
                        ¡Envío gratuito aplicado! Ahorro{' '}
                        <strong>{savedAmount.toFixed(2)} €</strong> en envío 🎉
                      </span>
                    </>
                  ) : bottlesUntilFreeShipping > 0 && zone === 'peninsula' ? (
                    <>
                      <Truck className="w-4 h-4 shrink-0" />
                      <span>
                        Añade{' '}
                        <strong>
                          {bottlesUntilFreeShipping} botella
                          {bottlesUntilFreeShipping > 1 ? 's' : ''} más
                        </strong>{' '}
                        y el envío es <strong>GRATIS</strong>
                      </span>
                    </>
                  ) : (
                    <>
                      <Truck className="w-4 h-4 shrink-0" />
                      <span>Envío a toda España con DPD / SEUR</span>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <ShoppingBag className="w-16 h-16 text-border" />
                  <p className="text-text-muted text-lg font-serif">Tu carrito está vacío</p>
                  <p className="text-sm text-text-muted/70">Añade alguna de nuestras bases de mojito</p>
                  <Button onClick={() => setIsOpen(false)} variant="outline" className="mt-2">
                    Ver Productos
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-3 items-center p-3 bg-white rounded-xl border border-border"
                    >
                      <div className="w-16 h-20 bg-bg-light rounded-lg border border-border overflow-hidden p-1 shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={80}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-primary text-sm leading-tight truncate">
                          Flor de Mojito {item.name}
                        </h3>
                        <p className="text-xs text-text-muted mb-2">70 cl · 1,6 kg</p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-border rounded-md bg-bg-light">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1.5 hover:text-primary transition-colors"
                              aria-label="Reducir cantidad"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1.5 hover:text-primary transition-colors disabled:opacity-40"
                              aria-label="Aumentar cantidad"
                              disabled={bottleCount >= 3}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-text-muted hover:text-error transition-colors"
                            aria-label="Eliminar producto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="font-bold text-primary text-sm shrink-0">
                        {(item.price * item.quantity).toFixed(2)} €
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-5 bg-white space-y-4">

                {/* Zone selector */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                    <MapPin className="w-3.5 h-3.5" /> Zona de destino
                  </label>
                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value as ShippingZone)}
                    className="w-full border border-border rounded-lg p-2 text-sm bg-bg-light focus:outline-primary focus:ring-1 focus:ring-primary"
                    id="cart-zone-selector"
                  >
                    {(Object.keys(ZONE_LABELS) as ShippingZone[]).map((z) => (
                      <option key={z} value={z}>
                        {ZONE_LABELS[z]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Breakage insurance */}
                <label className="flex items-center gap-3 cursor-pointer p-2.5 rounded-lg border border-border bg-bg-light hover:border-primary transition-colors">
                  <input
                    type="checkbox"
                    checked={breakageInsurance}
                    onChange={(e) => setBreakageInsurance(e.target.checked)}
                    className="rounded text-primary focus:ring-primary w-4 h-4"
                    id="cart-breakage-insurance"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Seguro de rotura</p>
                    <p className="text-xs text-text-muted">+0,35€ / botella</p>
                  </div>
                  <Shield className="w-4 h-4 text-primary/50" />
                </label>

                {/* Price breakdown */}
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-text-muted">
                    <span>Subtotal ({bottleCount} botella{bottleCount !== 1 ? 's' : ''})</span>
                    <span>{subtotal.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-text-muted">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" />
                      Envío estimado ({transitTime})
                    </span>
                    {isFreeShipping ? (
                      <span className="text-success font-bold">GRATIS</span>
                    ) : (
                      <span>{shippingCost.toFixed(2)} €</span>
                    )}
                  </div>
                  <div className="flex justify-between font-bold text-primary text-base border-t border-border pt-2 mt-2">
                    <span>Total estimado</span>
                    <span>{total.toFixed(2)} €</span>
                  </div>
                  <p className="text-[11px] text-text-muted/70">IVA 10% incluido · El precio final se confirma en el checkout</p>
                </div>

                {/* CTA */}
                <Link href="/checkout" onClick={() => setIsOpen(false)} className="block">
                  <Button className="w-full text-base h-12" size="lg" id="cart-checkout-btn">
                    Finalizar Compra →
                  </Button>
                </Link>

                {/* Trust signals */}
                <div className="flex items-center justify-center gap-4 pt-1">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                    alt="Stripe pago seguro"
                    className="h-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                    alt="PayPal"
                    className="h-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
                  />
                  <div className="flex items-center gap-1 text-[10px] text-text-muted/60">
                    <Shield className="w-3 h-3" />
                    SSL
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export const openCart = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('open-cart'));
  }
};
