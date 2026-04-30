"use client";

import React from 'react';
import { motion } from 'framer-motion';

export function HistorySection() {
  return (
    <section id="history-section" className="py-24 bg-bg-light overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-primary font-accent uppercase tracking-widest text-sm mb-3">Nuestra Historia</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-6 leading-tight">
              De La Habana a tu copa, pasando por Lyon.
            </h3>
            
            <div className="space-y-4 text-text-muted font-sans text-lg">
              <p>
                Todo comenzó con <strong>Juan Carlos Rill Pérez</strong>, un bartender cubano que llegó a Madrid con la receta original del mojito en su maleta. Al abrir su bar frente al estadio del Rayo Vallecano, se enfrentó a un "problema": la avalancha de pedidos en los días de partido era inmanejable.
              </p>
              <p>
                No había tiempo para exprimir limas y picar menta en cada vaso sin hacer esperar a los clientes. Así que, en su cocina, ideó una solución brillante: <strong>una base artesanal, concentrada y 100% natural</strong> que contenía toda la esencia del mojito cubano, lista para mezclar.
              </p>
              <p>
                Años más tarde, el amor lo llevó a Francia. Junto a Émilie, fundaron la empresa en Lyon, llevando la frescura tropical y la exigencia de calidad francesa a cada botella. Hoy, <em>Flor de Mojito</em> vuelve a España para revolucionar cómo disfrutamos los cócteles.
              </p>
            </div>

            <div className="mt-10 flex gap-8 items-center">
              <div className="flex flex-col">
                <span className="font-serif font-bold text-3xl text-primary">11</span>
                <span className="text-xs font-accent uppercase text-text-muted tracking-wider">Sabores</span>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-3xl text-primary">100%</span>
                <span className="text-xs font-accent uppercase text-text-muted tracking-wider">Natural</span>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-3xl text-primary">30s</span>
                <span className="text-xs font-accent uppercase text-text-muted tracking-wider">Preparación</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative z-10">
              <img 
                src="/images/juancarlos.jpg" 
                alt="Juan Carlos Rill Pérez, fundador de Flor de Mojito, con su receta original de mojito cubano" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Elementos decorativos */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-70 z-0"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-accent-alt rounded-full mix-blend-multiply filter blur-xl opacity-30 z-0"></div>
            
            {/* Timeline Flotante */}
            <div className="absolute bottom-8 -left-12 bg-bg-light shadow-xl p-6 rounded-xl border border-border z-20 max-w-xs hidden md:block">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary relative">
                  <div className="absolute w-0.5 h-10 bg-border left-1/2 -translate-x-1/2 top-2"></div>
                </div>
                <div>
                  <h4 className="font-bold text-text-primary text-sm">🇨🇺 Cuba</h4>
                  <p className="text-xs text-text-muted">La receta original</p>
                </div>
              </div>
              <div className="flex items-start gap-4 mt-6">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary relative">
                  <div className="absolute w-0.5 h-10 bg-border left-1/2 -translate-x-1/2 top-2"></div>
                </div>
                <div>
                  <h4 className="font-bold text-text-primary text-sm">🇪🇸 Madrid</h4>
                  <p className="text-xs text-text-muted">La idea nace en el bar</p>
                </div>
              </div>
              <div className="flex items-start gap-4 mt-6">
                <div className="w-2 h-2 mt-2 rounded-full bg-secondary"></div>
                <div>
                  <h4 className="font-bold text-text-primary text-sm">🇫🇷 Lyon → 🇪🇸 2026</h4>
                  <p className="text-xs text-text-muted">Producción artesanal premium</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
