"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { ShippingZone, TRANSIT_TIMES } from '@/types/order';
import { CheckoutData } from '@/app/checkout/page';
import { Truck, Clock } from 'lucide-react';

const ZONE_LABELS: Record<ShippingZone, string> = {
  peninsula: 'Península',
  baleares: 'Baleares',
  canarias: 'Canarias / Ceuta / Melilla',
};

const schema = z.object({
  fullName: z.string().min(3, 'Nombre completo requerido'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Teléfono inválido').regex(/^[+\d\s\-()]{9,}$/),
  address: z.string().min(5, 'Dirección completa requerida'),
  postalCode: z.string().regex(/^\d{5}$/, 'Código postal de 5 dígitos'),
  city: z.string().min(2, 'Ciudad requerida'),
  province: z.string().min(2, 'Provincia requerida'),
  zone: z.enum(['peninsula', 'baleares', 'canarias']),
});

type FormData = z.infer<typeof schema>;

function InputField({ label, error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <div>
      <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">{label}</label>
      <input
        {...props}
        className={`w-full border rounded-xl p-3 text-sm bg-white focus:outline-none focus:ring-2 transition-shadow ${error ? 'border-error focus:ring-error/30' : 'border-border focus:ring-primary/30'}`}
      />
      {error && <p className="text-xs text-error mt-1">{error}</p>}
    </div>
  );
}

export function CheckoutStep2Shipping({ cart, onBack, onNext }: {
  cart: ReturnType<typeof import('@/hooks/use-cart').useCart>;
  onBack: () => void;
  onNext: (data: CheckoutData) => void;
}) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { zone: cart.zone },
  });

  const watchedZone = watch('zone') as ShippingZone;

  const onSubmit = (data: FormData) => {
    cart.setZone(data.zone);
    onNext(data as CheckoutData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-serif font-bold text-primary">Datos de envío</h2>

          <div className="bg-white rounded-2xl border border-border p-6 space-y-4">
            <InputField label="Nombre completo *" type="text" placeholder="Juan García López" error={errors.fullName?.message} {...register('fullName')} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Email *" type="email" placeholder="tu@email.com" error={errors.email?.message} {...register('email')} />
              <InputField label="Teléfono móvil *" type="tel" placeholder="+34 600 000 000" error={errors.phone?.message} {...register('phone')} />
            </div>
            <InputField label="Dirección completa *" type="text" placeholder="Calle Mayor 1, 2º A" error={errors.address?.message} {...register('address')} />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <InputField label="Código Postal *" type="text" placeholder="28001" error={errors.postalCode?.message} {...register('postalCode')} />
              <InputField label="Ciudad *" type="text" placeholder="Madrid" error={errors.city?.message} {...register('city')} />
              <InputField label="Provincia *" type="text" placeholder="Madrid" error={errors.province?.message} {...register('province')} />
            </div>

            {/* Zone */}
            <div>
              <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">Zona de destino *</label>
              <select
                {...register('zone')}
                className={`w-full border rounded-xl p-3 text-sm bg-white focus:outline-none focus:ring-2 ${errors.zone ? 'border-error' : 'border-border focus:ring-primary/30'}`}
                id="step2-zone"
              >
                {(Object.keys(ZONE_LABELS) as ShippingZone[]).map((z) => (
                  <option key={z} value={z}>{ZONE_LABELS[z]}</option>
                ))}
              </select>
              <p className="text-xs text-text-muted mt-1.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Plazo estimado: <strong>{TRANSIT_TIMES[watchedZone || cart.zone]}</strong>
              </p>
            </div>

            <div className="flex items-start gap-2 text-xs text-text-muted bg-blue-50 rounded-lg p-3">
              <Truck className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <span>Tu email y teléfono se usarán exclusivamente para el <strong>seguimiento DPD Predict</strong>: recibirás un SMS con la hora exacta de entrega.</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1 h-12">← Volver</Button>
            <Button type="submit" className="flex-1 h-12 text-base" id="step2-next-btn">Continuar → Pago</Button>
          </div>
        </div>

        {/* Mini summary */}
        <div>
          <div className="bg-white rounded-2xl border border-border p-5 sticky top-36">
            <h3 className="font-bold mb-3 text-sm uppercase tracking-wider text-text-muted">Tu pedido</h3>
            {cart.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm py-1">
                <span className="text-text-muted">Flor de Mojito {item.name} ×{item.quantity}</span>
                <span className="font-medium">{(item.price * item.quantity).toFixed(2)} €</span>
              </div>
            ))}
            <div className="border-t border-border mt-3 pt-3 flex justify-between font-bold text-primary">
              <span>Total</span>
              <span>{cart.total.toFixed(2)} €</span>
            </div>
          </div>
        </div>

      </div>
    </form>
  );
}
