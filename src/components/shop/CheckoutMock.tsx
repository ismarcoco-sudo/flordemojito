"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ShieldCheck, Truck } from 'lucide-react';

export function CheckoutMock() {
  const [step, setStep] = useState<1 | 2>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-lg mx-auto"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-primary mb-4">¡Pedido Confirmado!</h2>
        <p className="text-text-muted mb-6">
          Tu pedido #FM-2026-987 ha sido procesado con éxito. Recibirás un email de confirmación en breve.
        </p>
        <Button onClick={() => window.location.href = '/tienda'} variant="outline">
          Volver a la tienda
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row border border-border">
      
      {/* Columna Izquierda: Formulario */}
      <div className="p-8 md:p-12 md:w-3/5 border-r border-border">
        <h2 className="text-2xl font-serif font-bold text-primary mb-6">Finalizar Compra</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">1</span> 
              Datos de Envío
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Nombre" className="col-span-1 border rounded-lg p-3 bg-bg-light focus:outline-primary" />
              <input type="text" placeholder="Apellidos" className="col-span-1 border rounded-lg p-3 bg-bg-light focus:outline-primary" />
              <input type="email" placeholder="Email" className="col-span-2 border rounded-lg p-3 bg-bg-light focus:outline-primary" />
              <input type="text" placeholder="Dirección" className="col-span-2 border rounded-lg p-3 bg-bg-light focus:outline-primary" />
              <input type="text" placeholder="Ciudad" className="col-span-1 border rounded-lg p-3 bg-bg-light focus:outline-primary" />
              <input type="text" placeholder="Código Postal" className="col-span-1 border rounded-lg p-3 bg-bg-light focus:outline-primary" />
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">2</span> 
              Método de Pago
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-primary bg-bg-light">
                <input type="radio" name="payment" defaultChecked className="text-primary focus:ring-primary" />
                <span className="font-medium">Tarjeta de Crédito / Débito</span>
              </label>
              <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-primary bg-bg-light">
                <input type="radio" name="payment" className="text-primary focus:ring-primary" />
                <span className="font-medium">Bizum / Apple Pay</span>
              </label>
            </div>
          </div>

          <Button 
            className="w-full text-lg h-14" 
            size="lg" 
            onClick={handlePay}
            disabled={isProcessing}
          >
            {isProcessing ? 'Procesando pago...' : 'Pagar 30,00 €'}
          </Button>
        </div>
      </div>

      {/* Columna Derecha: Resumen */}
      <div className="bg-bg-light p-8 md:p-12 md:w-2/5">
        <h3 className="font-bold text-lg mb-6">Resumen del Pedido</h3>
        
        <div className="flex gap-4 mb-6">
          <div className="w-16 h-20 bg-white rounded border flex items-center justify-center overflow-hidden">
            <img src="/images/FlorMojito-Clasico.jpg" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-primary">Flor de Mojito Clásico</h4>
            <p className="text-sm text-text-muted">75 cl</p>
            <div className="flex justify-between mt-2">
              <span className="text-sm">Cant: 1</span>
              <span className="font-bold">30,00 €</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-4 space-y-2 mb-6 text-sm">
          <div className="flex justify-between">
            <span className="text-text-muted">Subtotal</span>
            <span>30,00 €</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Envío (Estándar 48-72h)</span>
            <span className="text-primary font-bold">GRATIS</span>
          </div>
        </div>

        <div className="border-t border-border pt-4 flex justify-between items-end mb-8">
          <span className="font-bold text-lg">Total</span>
          <span className="font-serif font-bold text-2xl text-primary">30,00 €</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span>Pago 100% seguro y encriptado</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <Truck className="w-4 h-4 text-primary" />
            <span>Envío gratis a partir de 60€</span>
          </div>
        </div>
      </div>

    </div>
  );
}
