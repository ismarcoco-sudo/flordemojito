"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const flavors = [
  { name: 'Clásico', desc: 'El rey indiscutible', image: '/images/FlorMojito-Clasico.jpg', color: 'bg-[#8BC34A]' },
  { name: 'Fresa', desc: 'Dulce y vibrante', image: '/images/FlorMojito-Fraise.jpg', color: 'bg-[#E53935]' },
  { name: 'Mango', desc: 'Trópico en cada sorbo', image: '/images/FlorMojito-Mango.jpg', color: 'bg-[#FFB300]' },
  { name: 'Maracuyá', desc: 'Pasión exótica', image: '/images/FlorMojito-Fruta de la Pasion.jpg', color: 'bg-[#FDD835]' },
];

export function ProductsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Colección Premium</Badge>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            11 Sabores, Infinitas Posibilidades
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Descubre nuestra gama de bases concentradas. Una botella de 75cl rinde para más de 30 cócteles perfectos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {flavors.map((flavor, idx) => (
            <motion.div
              key={flavor.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group cursor-pointer perspective-1000"
            >
              <div className="relative rounded-2xl overflow-hidden bg-bg-light shadow-md hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <img 
                    src={flavor.image} 
                    alt={`Base artesanal Flor de Mojito sabor ${flavor.name} - 100% Natural`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {idx === 0 && (
                    <Badge variant="accent" className="absolute top-4 left-4 z-20">Más Vendido</Badge>
                  )}
                  
                  {/* Hover Overlay with ingredients */}
                  <div className="absolute inset-0 bg-primary/90 text-text-light p-6 flex flex-col justify-end translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                    <h4 className="font-bold mb-2">Ingredientes:</h4>
                    <p className="text-sm opacity-90">Lima fresca, hierbabuena, azúcar de caña, agua, extracto natural de {flavor.name.toLowerCase()}.</p>
                  </div>
                </div>
                
                <div className="p-6 text-center">
                  <h3 className="font-serif font-bold text-xl text-primary mb-1">{flavor.name}</h3>
                  <p className="text-sm text-text-muted">{flavor.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/tienda">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-text-light">
              Ver Todos los Sabores
            </Button>
          </Link>
        </div>

        {/* RTD Highlight */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 bg-bg-light rounded-3xl overflow-hidden shadow-xl border border-border"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-12 md:p-16 flex flex-col justify-center">
              <Badge variant="destructive" className="w-fit mb-6 animate-pulse">¡NUEVO EN ESPAÑA!</Badge>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                La frescura, lista para llevar.
              </h3>
              <p className="text-text-muted mb-8 text-lg">
                Descubre nuestra nueva línea de latas transparentes <strong>Ready-to-Drink (RTD)</strong> de 330ml. El mojito perfecto, sin preparación. Solo abre, siente la burbuja y disfruta.
              </p>
              <div className="flex gap-4">
                <Link href="/tienda">
                  <Button size="lg" className="w-full sm:w-auto">
                    Comprar Latas
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative min-h-[300px] md:min-h-full">
              <img 
                src="/images/latas.jpg" 
                alt="Nuevas latas transparentes Ready-to-Drink Flor de Mojito, mojito artesanal listo para beber" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
