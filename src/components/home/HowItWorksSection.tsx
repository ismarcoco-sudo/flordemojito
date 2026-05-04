"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlassWater, Droplet, Sparkles } from 'lucide-react';

export function HowItWorksSection() {
  const [seconds, setSeconds] = useState(30);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          setIsActive(false);
          setTimeout(() => setSeconds(30), 2000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const steps = [
    { 
      icon: <GlassWater className="w-10 h-10" />, 
      title: "1. Sirve hielo", 
      desc: "Llena tu vaso favorito con hielo pilé o cubitos." 
    },
    { 
      icon: <Droplet className="w-10 h-10" />, 
      title: "2. Añade Flor de Mojito", 
      desc: "Solo 3 cl de nuestra base concentrada artesanal." 
    },
    { 
      icon: <Sparkles className="w-10 h-10" />, 
      title: "3. Completa y disfruta", 
      desc: "Añade ron y agua con gas (o solo agua para la versión Virgin)." 
    }
  ];

  return (
    <section className="py-24 bg-primary text-text-light relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            30 Segundos. Cero Complicaciones.
          </h2>
          <p className="text-text-light/80 max-w-2xl mx-auto text-lg">
            Sin exprimir limas. Sin picar menta. El secreto de los mejores bartenders, ahora en tu casa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative max-w-5xl mx-auto">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-text-light/20 to-transparent z-0"></div>
          
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="flex flex-col items-center text-center relative z-10"
              onMouseEnter={() => idx === 0 && setIsActive(true)}
            >
              <div className="w-24 h-24 rounded-full bg-bg-light/10 border border-bg-light/20 flex items-center justify-center mb-6 text-accent backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                {step.icon}
              </div>
              <h3 className="text-xl font-bold font-accent mb-3">{step.title}</h3>
              <p className="text-text-light/70">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Animated Timer */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <div 
            className="flex flex-col items-center justify-center w-40 h-40 rounded-full border-4 border-accent relative cursor-pointer"
            onClick={() => setIsActive(true)}
          >
            <span className="text-5xl font-serif font-bold text-accent mb-1">{seconds}</span>
            <span className="text-xs uppercase tracking-widest text-text-light/80 font-accent">Segundos</span>
            
            {/* SVG Circle Animation */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle 
                cx="50%" cy="50%" r="48%" 
                className="stroke-accent fill-transparent stroke-[4px] transition-all duration-1000 ease-linear"
                strokeDasharray="300"
                strokeDashoffset={300 - (seconds / 30) * 300}
              />
            </svg>
          </div>
        </motion.div>
        
        <p className="text-center text-sm text-text-light/50 mt-6 font-accent">
          Haz clic en el temporizador para ver la magia
        </p>

      </div>
    </section>
  );
}
