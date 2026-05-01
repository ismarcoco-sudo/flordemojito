import React from 'react';
import { ReviewCard } from '@/components/reviews/ReviewCard';
import { ReviewForm } from '@/components/reviews/ReviewForm';
import { Star } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Opiniones y Reseñas | Flor de Mojito - 4.8/5 Estrellas',
  description: 'Lee las opiniones de nuestros clientes sobre Flor de Mojito. Más de 200 reseñas verificadas de particulares y profesionales de la hostelería en toda España.',
  openGraph: {
    title: 'Reseñas Verificadas - Flor de Mojito',
    description: 'Nuestros clientes lo confirman: el mojito perfecto en 30 segundos.',
  }
};

const mockReviews = [
  {
    id: "1",
    name: "Carlos M.",
    location: "Madrid",
    profile: "Particular",
    rating: 5,
    text: "Simplemente increíble. Compré la botella Clásica para una fiesta en casa y quedamos alucinados. Sabe exactamente igual que los mojitos que te tomas en un buen bar, pero lo preparas en segundos. Cien por cien recomendado.",
    product: "Flor de Mojito Clásico",
    verified: true,
    date: "12 Mar 2026"
  },
  {
    id: "2",
    name: "Elena G.",
    location: "Barcelona",
    profile: "Hostelería",
    rating: 5,
    text: "Para el restaurante nos ha salvado la vida. Ahora los camareros no tienen excusa, salen perfectos y rápidos. Nos ahorra mucha merma de menta y limas que siempre se nos ponían malas. El sabor Fresa es top ventas.",
    product: "Flor de Mojito Fresa",
    verified: true,
    date: "05 Mar 2026"
  },
  {
    id: "3",
    name: "Laura V.",
    location: "Valencia",
    profile: "Particular",
    rating: 4,
    text: "Las latas RTD son ideales para llevar a la playa. Me encantaría que sacaran pack de solo sabor Mango porque nos hemos peleado por él. Todo genial.",
    product: "Pack Descubrimiento RTD",
    verified: true,
    date: "28 Feb 2026"
  },
  {
    id: "4",
    name: "David T.",
    location: "Sevilla",
    profile: "Bartender",
    rating: 5,
    text: "Era escéptico con las bases concentradas porque siempre saben artificiales. Esta es la primera que sabe realmente a lima fresca y hierbabuena natural. Mis dieses a Juan Carlos por la receta.",
    product: "Flor de Mojito Clásico",
    verified: true,
    date: "15 Feb 2026"
  }
];

export default function ResenasPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': 'Flor de Mojito',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.8',
      'reviewCount': '214'
    }
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Inicio',
        'item': 'https://flordemojito.es'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Reseñas',
        'item': 'https://flordemojito.es/resenas'
      }
    ]
  };

  return (
    <div className="bg-bg-light min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Header */}
      <div className="bg-bg-dark text-text-light pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
            Reseñas y Opiniones Reales
          </h1>
          
          <div className="flex flex-col items-center justify-center gap-2 mt-8">
            <div className="text-6xl font-serif font-bold text-accent">4.8</div>
            <div className="flex text-accent mb-2">
              <Star className="w-6 h-6 fill-current" />
              <Star className="w-6 h-6 fill-current" />
              <Star className="w-6 h-6 fill-current" />
              <Star className="w-6 h-6 fill-current" />
              <Star className="w-6 h-6 fill-current" />
            </div>
            <p className="text-bg-light/80 text-sm">Basado en más de 200 reseñas verificadas</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockReviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <ReviewForm />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
