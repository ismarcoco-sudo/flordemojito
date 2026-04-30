import type { Metadata } from 'next';
import { Inter, Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import { NavBar } from '@/components/layout/NavBar';
import { Footer } from '@/components/layout/Footer';
import { CartSidebar } from '@/components/cart/CartSidebar';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Flor de Mojito | El mojito perfecto en 30 segundos',
  description: 'Bases 100% naturales para preparar cócteles perfectos en 30 segundos. Sin alcohol. Sin aditivos. Puro sabor cubano.',
  keywords: ['mojito', 'cócteles', 'sin alcohol', 'base para mojito', 'Flor de Mojito', 'España', 'eventos', 'HORECA'],
  openGraph: {
    title: 'Flor de Mojito | El mojito perfecto en 30 segundos',
    description: 'Bases 100% naturales para preparar cócteles perfectos en 30 segundos. Sin alcohol. Sin aditivos. Puro sabor cubano.',
    url: 'https://flordemojito.es',
    siteName: 'Flor de Mojito',
    images: [
      {
        url: 'https://flordemojito.es/images/FlorMojito-Clasico.jpg',
        width: 1200,
        height: 630,
        alt: 'Flor de Mojito - Base clásica',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flor de Mojito | El mojito perfecto en 30 segundos',
    description: 'Bases 100% naturales para preparar cócteles perfectos en 30 segundos.',
  },
  alternates: {
    canonical: 'https://flordemojito.es',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Flor de Mojito',
  url: 'https://flordemojito.es',
  description: 'Bases 100% naturales para preparar cócteles perfectos en 30 segundos.',
  foundingDate: '2024',
  founders: [
    {
      '@type': 'Person',
      name: 'Juan Carlos Rill Pérez'
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${dmSans.variable} font-sans min-h-screen antialiased bg-bg-light text-text-primary flex flex-col pt-20`}>
        <NavBar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        <CartSidebar />
      </body>
    </html>
  );
}
