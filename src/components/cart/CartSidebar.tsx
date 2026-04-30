"use client";

import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/hooks/use-cart';

export function CartSidebar() {
  const { items, total, itemCount, isOpen, setIsOpen, removeItem, updateQuantity } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-bg-light shadow-2xl z-[101] flex flex-col border-l border-border"
          >
            <div className="p-6 flex items-center justify-between border-b border-border">
              <h2 className="text-lg font-serif font-bold text-primary flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Tu Carrito ({itemCount})
              </h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-text-muted hover:text-error transition-colors rounded-full hover:bg-error/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingBag className="w-16 h-16 text-border mb-4" />
                  <p className="text-text-muted mb-6">Tu carrito está vacío</p>
                  <Button onClick={() => setIsOpen(false)}>
                    Ver Productos
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="w-20 h-20 bg-white rounded-lg border border-border overflow-hidden p-2">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-primary text-sm">{item.name}</h3>
                        <p className="text-xs text-text-muted mb-2">{item.price.toFixed(2)} €</p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-border rounded-md bg-white">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-primary"><Minus className="w-3 h-3" /></button>
                            <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-primary"><Plus className="w-3 h-3" /></button>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="text-text-muted hover:text-error transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="font-bold text-primary text-sm">
                        {(item.price * item.quantity).toFixed(2)} €
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-border p-6 bg-bg-light">
              <div className="flex justify-between mb-4 font-bold text-lg text-primary">
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
              </div>
              <p className="text-xs text-text-muted mb-4 text-center">
                {total >= 60 ? '¡Envío gratuito aplicado!' : `Te faltan ${(60 - total).toFixed(2)}€ para envío gratis`}
              </p>
              <Button className="w-full" disabled={items.length === 0} size="lg">
                Finalizar Compra
              </Button>
            </div>
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
