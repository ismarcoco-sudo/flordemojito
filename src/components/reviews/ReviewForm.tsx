"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const reviewSchema = z.object({
  name: z.string().min(2, 'Ingresa tu nombre'),
  location: z.string().min(2, 'Ingresa tu ciudad'),
  rating: z.number().min(1, 'Selecciona una puntuación').max(5),
  product: z.string().min(1, 'Selecciona un producto'),
  text: z.string().min(10, 'La reseña debe tener al menos 10 caracteres'),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export function ReviewForm() {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
    }
  });

  const rating = watch('rating');

  const onSubmit = (data: ReviewFormValues) => {
    console.log("Reseña enviada", data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-bg-light p-8 rounded-2xl border border-border text-center">
        <h3 className="text-2xl font-serif font-bold text-primary mb-2">¡Gracias por tu reseña!</h3>
        <p className="text-text-muted">Tu opinión es muy importante para nosotros. La revisaremos y publicaremos pronto.</p>
        <Button className="mt-6" onClick={() => setIsSubmitted(false)}>Escribir otra reseña</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-sm border border-border space-y-6">
      <h3 className="text-2xl font-serif font-bold text-primary border-b border-border pb-4">Dejar una reseña</h3>
      
      <div>
        <label className="block text-sm font-bold text-text-primary mb-2">Puntuación *</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setValue('rating', star, { shouldValidate: true })}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              className="focus:outline-none"
            >
              <Star 
                className={`w-8 h-8 transition-colors ${
                  star <= (hoveredStar || rating) ? 'fill-accent text-accent' : 'text-border'
                }`} 
              />
            </button>
          ))}
        </div>
        {errors.rating && <span className="text-error text-xs mt-1">{errors.rating.message}</span>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">Nombre *</label>
          <input 
            {...register('name')}
            className="w-full bg-bg-light border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="Tu nombre"
          />
          {errors.name && <span className="text-error text-xs mt-1">{errors.name.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">Ciudad *</label>
          <input 
            {...register('location')}
            className="w-full bg-bg-light border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="Tu ciudad"
          />
          {errors.location && <span className="text-error text-xs mt-1">{errors.location.message}</span>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-text-primary mb-2">Producto *</label>
        <select 
          {...register('product')}
          className="w-full bg-bg-light border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
        >
          <option value="">Selecciona un producto...</option>
          <option value="Flor de Mojito Clásico">Flor de Mojito Clásico</option>
          <option value="Flor de Mojito Fresa">Flor de Mojito Fresa</option>
          <option value="Pack Descubrimiento RTD">Pack Descubrimiento RTD</option>
          <option value="Otro">Otro sabor</option>
        </select>
        {errors.product && <span className="text-error text-xs mt-1">{errors.product.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-bold text-text-primary mb-2">Tu Reseña *</label>
        <textarea 
          {...register('text')}
          rows={4}
          className="w-full bg-bg-light border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
          placeholder="¿Qué te ha parecido el producto?"
        ></textarea>
        {errors.text && <span className="text-error text-xs mt-1">{errors.text.message}</span>}
      </div>

      <Button type="submit" size="lg" className="w-full">
        Enviar Reseña
      </Button>
    </form>
  );
}
