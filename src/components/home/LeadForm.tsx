"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import confetti from 'canvas-confetti';

const leadSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  type: z.enum(['Particular', 'Profesional HORECA', 'Distribuidor', 'Prensa'], {
    message: 'Selecciona un perfil',
  }),
  favoriteFlavor: z.string().min(1, 'Selecciona tu sabor favorito'),
  rgpd: z.boolean().refine(val => val === true, 'Debes aceptar la política de privacidad'),
});

type LeadFormValues = z.infer<typeof leadSchema>;

const flavors = ['Clásico', 'Fresa', 'Mango', 'Coco', 'Maracuyá', 'Piña', 'Pepino', 'Jengibre', 'Frambuesa', 'Albahaca', 'Remolacha'];

export function LeadForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      favoriteFlavor: '',
    }
  });

  const selectedFlavor = watch('favoriteFlavor');

  const onSubmit = async (data: LeadFormValues) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Lead captured:", data);
    
    setIsSubmitted(true);
    
    // Confetti
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#1B5E20', '#A5D6A7', '#FFC107']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#1B5E20', '#A5D6A7', '#FFC107']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <section id="lead-form" className="py-24 bg-bg-light relative">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-border relative overflow-hidden">
          
          {/* Form Header */}
          <div className="text-center mb-10 relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Únete a la Revolución
            </h2>
            <p className="text-text-muted">
              Sé de los primeros en probar Flor de Mojito en España. 
              Déjanos tus datos y te avisaremos cuando estemos cerca de ti.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit(onSubmit)} 
                className="space-y-6 relative z-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-text-primary mb-2">Nombre completo *</label>
                    <input 
                      {...register('name')}
                      className="w-full bg-bg-light border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Tu nombre"
                    />
                    {errors.name && <span className="text-error text-xs mt-1 block">{errors.name.message}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-text-primary mb-2">Email *</label>
                    <input 
                      {...register('email')}
                      type="email"
                      className="w-full bg-bg-light border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="tu@email.com"
                    />
                    {errors.email && <span className="text-error text-xs mt-1 block">{errors.email.message}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-text-primary mb-2">Teléfono (opcional)</label>
                    <input 
                      {...register('phone')}
                      className="w-full bg-bg-light border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="+34 ..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-text-primary mb-2">Perfil *</label>
                    <select 
                      {...register('type')}
                      className="w-full bg-bg-light border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="">Selecciona tu perfil...</option>
                      <option value="Particular">Particular</option>
                      <option value="Profesional HORECA">Profesional HORECA</option>
                      <option value="Distribuidor">Distribuidor</option>
                      <option value="Prensa">Prensa / Media</option>
                    </select>
                    {errors.type && <span className="text-error text-xs mt-1 block">{errors.type.message}</span>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-text-primary mb-3">¿Qué sabor tienes más ganas de probar? *</label>
                  <div className="flex flex-wrap gap-2">
                    {flavors.map(flavor => (
                      <Badge 
                        key={flavor}
                        variant={selectedFlavor === flavor ? 'default' : 'outline'}
                        className="cursor-pointer text-sm py-1 px-3 hover:scale-105 transition-transform"
                        onClick={() => setValue('favoriteFlavor', flavor, { shouldValidate: true })}
                      >
                        {flavor}
                      </Badge>
                    ))}
                  </div>
                  {errors.favoriteFlavor && <span className="text-error text-xs mt-2 block">{errors.favoriteFlavor.message}</span>}
                </div>

                <div className="flex items-start gap-3 mt-4">
                  <input 
                    type="checkbox" 
                    id="rgpd"
                    {...register('rgpd')}
                    className="mt-1 w-4 h-4 text-primary focus:ring-primary border-border rounded"
                  />
                  <label htmlFor="rgpd" className="text-xs text-text-muted">
                    He leído y acepto la <a href="/legal/privacidad" className="underline hover:text-primary">política de privacidad</a>. 
                    Acepto recibir comunicaciones comerciales sobre Flor de Mojito. *
                  </label>
                </div>
                {errors.rgpd && <span className="text-error text-xs block">{errors.rgpd.message}</span>}

                <div className="pt-4 text-center">
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="w-full md:w-auto min-w-[250px]"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar — ¡Quiero ser de los primeros!'}
                  </Button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 relative z-10"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-serif font-bold text-primary mb-4">¡Gracias por unirte!</h3>
                <p className="text-lg text-text-muted mb-8">
                  Te hemos añadido a la lista VIP. Te escribiremos pronto. <br/>
                  Mientras tanto, síguenos en Instagram para no perderte nada.
                </p>
                <a href="https://instagram.com/flor_de_mojito" target="_blank" rel="noreferrer">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    @flor_de_mojito
                  </Button>
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary opacity-20 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent opacity-10 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>
      </div>
    </section>
  );
}
