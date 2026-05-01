import React from 'react';
import { ProductCard } from '@/components/shop/ProductCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tienda Online | Bases para Mojito 100% Naturales',
  description: 'Compra online nuestras bases artesanales para mojito. 11 sabores naturales: Clásico, Fresa, Mango, Coco y más. Rinde +30 cócteles por botella. Envío a toda España.',
  openGraph: {
    title: 'Tienda Flor de Mojito | El auténtico sabor cubano',
    description: 'Bases concentradas naturales para cócteles. Elige tu sabor favorito y prepáralo en segundos.',
  }
};

const products = [
  { id: '1', name: 'Clásico', price: 30.0, image: '/images/FlorMojito-Clasico.jpg', desc: 'El rey indiscutible con lima fresca y menta.', type: 'botella' as const },
  { id: '2', name: 'Fresa', price: 30.0, image: '/images/FlorMojito-Fraise.jpg', desc: 'Dulce, vibrante y perfecto para el tardeo.', type: 'botella' as const },
  { id: '3', name: 'Frambuesa', price: 30.0, image: '/images/FlorMojito-Frambuesa.jpg', desc: 'Toque silvestre y elegante.', type: 'botella' as const },
  { id: '4', name: 'Mango', price: 30.0, image: '/images/FlorMojito-Mango.jpg', desc: 'Trópico puro en cada sorbo.', type: 'botella' as const },
  { id: '5', name: 'Coco', price: 30.0, image: '/images/FlorMojito-Coco.jpg', desc: 'Suavidad caribeña incomparable.', type: 'botella' as const },
  { id: '6', name: 'Piña', price: 30.0, image: '/images/pina.jpg', desc: 'Refrescante y tropical.', type: 'botella' as const },
  { id: '7', name: 'Maracuyá', price: 30.0, image: '/images/pasion.jpg', desc: 'Pasión exótica y acidez balanceada.', type: 'botella' as const },
  { id: '8', name: 'Jengibre', price: 30.0, image: '/images/gengibre.jpg', desc: 'Un toque picante y sofisticado.', type: 'botella' as const },
  { id: '9', name: 'Pepino', price: 30.0, image: '/images/pepino.jpg', desc: 'Frescura extrema para días de calor.', type: 'botella' as const },
  { id: '10', name: 'Albahaca', price: 30.0, image: '/images/albahaca.jpg', desc: 'Aroma herbal que sorprende.', type: 'botella' as const },
  { id: '11', name: 'Remolacha', price: 30.0, image: '/images/remolacha.jpg', desc: 'El toque terroso y color intenso.', type: 'botella' as const },
];

export default function TiendaPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': products.map((product, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'Product',
        'name': `Flor de Mojito ${product.name}`,
        'image': `https://flordemojito.es${product.image}`,
        'description': product.desc,
        'sku': `FDM-${product.id}`,
        'brand': {
          '@type': 'Brand',
          'name': 'Flor de Mojito'
        },
        'offers': {
          '@type': 'Offer',
          'url': 'https://flordemojito.es/tienda',
          'priceCurrency': 'EUR',
          'price': product.price,
          'availability': 'https://schema.org/InStock',
          'priceValidUntil': '2026-12-31',
          'itemCondition': 'https://schema.org/NewCondition'
        }
      }
    }))
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header Tienda */}
      <div className="bg-bg-dark text-text-light pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-secondary">
            Bases de Mojito 100% Naturales
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-bg-light/80">
            Encuentra tu sabor favorito. Botellas artesanales de 75 cl para preparar +30 cócteles profesionales en segundos. Sin alcohol.
          </p>
        </div>
      </div>

      {/* Promobar */}
      <div className="bg-accent text-primary text-center py-2 text-sm font-bold font-accent uppercase tracking-wider">
        Envío GRATIS en pedidos superiores a 60€
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Catálogo de Botellas */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif font-bold text-primary">Nuestras Bases (75 cl)</h2>
            <span className="text-text-muted text-sm border border-border px-3 py-1 rounded-full bg-bg-light">30€ / unidad</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
