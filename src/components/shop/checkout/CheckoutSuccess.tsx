"use client";

import React from 'react';
import { CheckCircle2, Package, MessageSquare, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CheckoutData } from '@/app/checkout/page';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function CheckoutSuccess({ orderNumber, checkoutData }: {
  orderNumber: string;
  checkoutData: CheckoutData;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      {/* Hero */}
      <div className="bg-white rounded-2xl border border-border p-10 text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-10 h-10 text-success" />
        </motion.div>
        <h1 className="text-3xl font-serif font-bold text-primary mb-2">¡Pedido Confirmado!</h1>
        {typeof window !== 'undefined' && window.location.search.includes('simulated=true') && (
          <div className="mb-4 inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse">
            🧪 Modo Prueba / Pago Simulado
          </div>
        )}
        <p className="text-text-muted mb-4">
          Gracias, <strong>{checkoutData?.fullName?.split(' ')[0]}</strong>. Tu pedido ha sido procesado correctamente.
        </p>
        <div className="inline-block bg-bg-light border border-border rounded-xl px-6 py-3">
          <span className="text-xs text-text-muted uppercase tracking-wider">Número de pedido</span>
          <p className="text-xl font-mono font-bold text-primary">{orderNumber}</p>
        </div>
      </div>

      {/* Info blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-border p-5 text-center">
          <Package className="w-7 h-7 text-primary mx-auto mb-2" />
          <p className="text-sm font-bold text-primary">Tu pedido</p>
          <p className="text-xs text-text-muted">Sale de nuestra fábrica en Lyon en 24h</p>
        </div>
        <div className="bg-white rounded-2xl border border-border p-5 text-center">
          <Truck className="w-7 h-7 text-primary mx-auto mb-2" />
          <p className="text-sm font-bold text-primary">Plazo estimado</p>
          <p className="text-xs text-text-muted">48-72h en Península · DPD / SEUR</p>
        </div>
        <div className="bg-white rounded-2xl border border-border p-5 text-center">
          <MessageSquare className="w-7 h-7 text-primary mx-auto mb-2" />
          <p className="text-sm font-bold text-primary">SMS DPD Predict</p>
          <p className="text-xs text-text-muted">Recibirás la hora exacta de entrega</p>
        </div>
      </div>

      {/* Message */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-6 text-sm text-primary">
        <p>
          Tu pedido sale de nuestra fábrica en <strong>Lyon, Francia</strong>. Recibirás un <strong>SMS de DPD Predict</strong> con la franja horaria exacta de entrega a tu domicilio en España. Plazo estimado: <strong>48-72h</strong>.
        </p>
        <p className="mt-2 text-text-muted text-xs">
          Hemos enviado un email de confirmación a <strong>{checkoutData?.email}</strong>.
        </p>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/tienda">
          <Button variant="outline" className="w-full sm:w-auto h-12 px-8" id="success-continue-btn">
            Seguir Comprando
          </Button>
        </Link>
        <Link href="/">
          <Button className="w-full sm:w-auto h-12 px-8">Volver al Inicio</Button>
        </Link>
      </div>
    </motion.div>
  );
}
