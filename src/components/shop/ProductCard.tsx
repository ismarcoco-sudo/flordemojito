"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/use-cart';
import Image from 'next/image';

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  image: string;
  desc: string;
  isNew?: boolean;
  type: 'botella' | 'lata' | 'pack';
}

export function ProductCard({ product }: { product: ProductProps }) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();

  const handleAdd = () => {
    setIsAdding(true);
    addItem(product, quantity);
    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  return (
    <div className="bg-bg-light border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all flex flex-col group">
      
      <div className="relative aspect-[4/5] bg-bg-light overflow-hidden flex items-center justify-center p-6">
        {product.isNew && (
          <Badge variant="accent" className="absolute top-4 left-4 z-10 animate-pulse">
            Nuevo
          </Badge>
        )}
        
        <div className="absolute top-4 right-4 z-10 flex text-accent">
          <Star className="w-4 h-4 fill-current" />
          <Star className="w-4 h-4 fill-current" />
          <Star className="w-4 h-4 fill-current" />
          <Star className="w-4 h-4 fill-current" />
          <Star className="w-4 h-4 fill-current" />
        </div>

        <Image 
          src={product.image} 
          alt={`Botella de base para mojito sabor ${product.name} - Flor de Mojito`}
          width={400}
          height={500}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-6 flex flex-col flex-1 border-t border-border">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif font-bold text-xl text-primary">{product.name}</h3>
          <span className="font-accent font-bold text-lg text-primary">{product.price.toFixed(2)} €</span>
        </div>
        
        <p className="text-sm text-text-muted mb-6 flex-1">{product.desc}</p>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-border rounded-lg bg-white overflow-hidden">
            <button 
              className="p-2 hover:bg-bg-light text-text-muted hover:text-primary transition-colors"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-bold text-sm">{quantity}</span>
            <button 
              className="p-2 hover:bg-bg-light text-text-muted hover:text-primary transition-colors"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <Button 
            className="flex-1 overflow-hidden relative"
            onClick={handleAdd}
            disabled={isAdding}
          >
            <motion.div
              initial={false}
              animate={{ y: isAdding ? -40 : 0 }}
              className="flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" /> Añadir
            </motion.div>
            <motion.div
              initial={{ y: 40 }}
              animate={{ y: isAdding ? 0 : 40 }}
              className="absolute inset-0 flex items-center justify-center bg-secondary text-primary"
            >
              ¡Añadido!
            </motion.div>
          </Button>
        </div>
      </div>
    </div>
  );
}
