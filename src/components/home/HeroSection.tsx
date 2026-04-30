"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export function HeroSection() {
  const scrollToForm = () => {
    const formEl = document.getElementById('lead-form');
    if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHistory = () => {
    const histEl = document.getElementById('history-section');
    if (histEl) histEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Video Background Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-primary/80 z-10 mix-blend-multiply" />
        <img 
          src="/images/banner.jpg" 
          alt="Flor de Mojito Banner" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center text-text-light pt-20">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <Badge variant="accent" className="mb-6 mx-auto bg-bg-light text-primary border-none shadow-lg">
            🇫🇷 Fabricación artesanal francesa | 🇨🇺 Receta cubana original
          </Badge>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-serif font-bold mb-6 max-w-4xl drop-shadow-lg leading-tight"
        >
          La revolución del <span className="text-secondary italic">mojito artesanal</span> llega a España
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl font-sans mb-10 max-w-2xl text-bg-light/90 drop-shadow"
        >
          Bases 100% naturales para preparar cócteles perfectos en 30 segundos. Sin alcohol. Sin aditivos. Puro sabor cubano.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Button size="lg" variant="accent" asChild className="text-primary font-bold hover:scale-105 transition-transform shadow-xl">
            <Link href="#lead-form">
              Quiero probar Flor de Mojito
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-text-light text-text-light hover:bg-text-light hover:text-primary backdrop-blur-sm">
            <Link href="#history-section">
              Descubre nuestra historia
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
