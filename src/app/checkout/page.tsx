"use client";

import React, { useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import { ShippingZone, IVA_RATE, generateOrderNumber } from '@/types/order';
import { CheckoutStep1Cart } from '@/components/shop/checkout/Step1Cart';
import { CheckoutStep2Shipping } from '@/components/shop/checkout/Step2Shipping';
import { CheckoutStep3Payment } from '@/components/shop/checkout/Step3Payment';
import { CheckoutSuccess } from '@/components/shop/checkout/CheckoutSuccess';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, MapPin, CreditCard, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export type CheckoutData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  province: string;
  zone: ShippingZone;
};

const STEPS = [
  { id: 1, label: 'Carrito', icon: ShoppingBag },
  { id: 2, label: 'Envío', icon: MapPin },
  { id: 3, label: 'Pago', icon: CreditCard },
  { id: 4, label: 'Confirmación', icon: CheckCircle2 },
];

export default function CheckoutPage() {
  const cart = useCart();
  const [step, setStep] = useState(1);
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [orderNumber, setOrderNumber] = useState('');

  const subtotalNoIva = parseFloat((cart.subtotal / (1 + IVA_RATE)).toFixed(2));
  const ivaAmount = parseFloat((cart.subtotal - subtotalNoIva).toFixed(2));

  const handleShippingSubmit = (data: CheckoutData) => {
    setCheckoutData(data);
    setStep(3);
  };

  const handlePaymentSuccess = () => {
    const num = generateOrderNumber();
    setOrderNumber(num);
    cart.clearCart();
    setStep(4);
  };

  if (cart.items.length === 0 && step < 4) {
    return (
      <div className="min-h-screen bg-bg-light flex flex-col items-center justify-center text-center p-8">
        <ShoppingBag className="w-16 h-16 text-border mb-4" />
        <h1 className="text-2xl font-serif font-bold text-primary mb-2">Tu carrito está vacío</h1>
        <p className="text-text-muted mb-6">Añade alguna de nuestras bases de mojito para continuar.</p>
        <Link href="/tienda" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors">
          Ver Tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-light pb-20">
      {/* Header */}
      <div className="bg-bg-dark text-white pt-24 pb-8">
        <div className="container mx-auto px-4">
          <Link href="/tienda" className="text-secondary text-sm hover:underline mb-4 inline-block">
            ← Volver a la tienda
          </Link>
          <h1 className="text-3xl font-serif font-bold text-secondary">Finalizar Compra</h1>
        </div>
      </div>

      {/* Step indicator */}
      {step < 4 && (
        <div className="bg-white border-b border-border sticky top-20 z-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center py-4 gap-0">
              {STEPS.filter(s => s.id < 4).map((s, idx) => {
                const Icon = s.icon;
                const isActive = s.id === step;
                const isDone = s.id < step;
                return (
                  <React.Fragment key={s.id}>
                    <div className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive ? 'text-primary' : isDone ? 'text-success' : 'text-text-muted'}`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${isActive ? 'bg-primary text-white' : isDone ? 'bg-success text-white' : 'bg-border text-text-muted'}`}>
                        {isDone ? '✓' : s.id}
                      </div>
                      <span className="hidden sm:inline">{s.label}</span>
                    </div>
                    {idx < 2 && <div className="flex-1 h-px bg-border mx-3" />}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <CheckoutStep1Cart cart={cart} subtotalNoIva={subtotalNoIva} ivaAmount={ivaAmount} onNext={() => setStep(2)} />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <CheckoutStep2Shipping cart={cart} onBack={() => setStep(1)} onNext={handleShippingSubmit} />
            </motion.div>
          )}
          {step === 3 && checkoutData && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <CheckoutStep3Payment cart={cart} checkoutData={checkoutData} subtotalNoIva={subtotalNoIva} ivaAmount={ivaAmount} onBack={() => setStep(2)} onSuccess={handlePaymentSuccess} />
            </motion.div>
          )}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <CheckoutSuccess orderNumber={orderNumber} checkoutData={checkoutData!} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
