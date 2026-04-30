"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Clock, Euro } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function B2BSection() {
  const scrollToForm = () => {
    const formEl = document.getElementById('lead-form');
    if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
  };

  const benefits = [
    { icon: <TrendingUp className="w-6 h-6 text-accent" />, title: "+30 cócteles por botella", desc: "Alto rendimiento y rentabilidad maximizada." },
    { icon: <Euro className="w-6 h-6 text-accent" />, title: "Cero mermas", desc: "Olvídate de la hierbabuena marchita o limas en mal estado." },
    { icon: <CheckCircle2 className="w-6 h-6 text-accent" />, title: "Sabor constante", desc: "El mismo mojito perfecto sin importar quién esté en barra." },
    { icon: <Clock className="w-6 h-6 text-accent" />, title: "Agilidad en el servicio", desc: "Menos esperas para el cliente, más rotación de mesas." }
  ];

  return (
    <section className="py-24 bg-bg-dark text-text-light border-y-8 border-accent relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-accent text-accent uppercase tracking-widest mb-3">Canal HORECA</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Rentabilidad y perfección en cada servicio.
            </h3>
            <p className="text-bg-light/80 text-lg mb-8">
              Flor de Mojito es la solución definitiva para coctelerías, hoteles, restaurantes y eventos. 
              Garantiza la máxima calidad con un margen de beneficio inigualable.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {benefits.map((b, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="mt-1">{b.icon}</div>
                  <div>
                    <h4 className="font-bold text-lg">{b.title}</h4>
                    <p className="text-sm text-bg-light/60">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="accent" size="lg" onClick={scrollToForm} className="shadow-lg hover:scale-105 transition-transform w-full sm:w-auto">
              Solicitar Muestra Profesional
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {/* Ferias 2026 Grid */}
            <div className="col-span-2 bg-bg-light/10 backdrop-blur-md rounded-2xl p-8 border border-bg-light/20 text-center">
              <h4 className="text-accent font-serif font-bold text-2xl mb-2">Gira España 2026</h4>
              <p className="text-sm text-bg-light/80 mb-6">Visítanos en los principales eventos del sector:</p>
              
              <div className="space-y-4 text-left">
                <div className="flex justify-between items-center border-b border-bg-light/10 pb-2">
                  <span className="font-bold">AUTÉNTICA Premium Food Fest</span>
                  <span className="text-sm text-accent">Sevilla, Sept</span>
                </div>
                <div className="flex justify-between items-center border-b border-bg-light/10 pb-2">
                  <span className="font-bold">Madrid Cocktail Week</span>
                  <span className="text-sm text-accent">Madrid, Sept-Oct</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">FIBAR</span>
                  <span className="text-sm text-accent">Valladolid, Nov</span>
                </div>
              </div>
            </div>
            
          </motion.div>

        </div>
      </div>
    </section>
  );
}
