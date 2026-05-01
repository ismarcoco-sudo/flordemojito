import type { Metadata } from 'next';
import { Inter, Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import { NavBar } from '@/components/layout/NavBar';
import { Footer } from '@/components/layout/Footer';
import { CartSidebar } from '@/components/cart/CartSidebar';
import { CookieBanner } from '@/components/layout/CookieBanner';

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
  metadataBase: new URL('https://flordemojito.es'),
  title: {
    default: 'Flor de Mojito | El auténtico mojito cubano en 30 segundos',
    template: '%s | Flor de Mojito'
  },
  description: 'Bases 100% naturales para el mojito perfecto en 30 segundos. Sin alcohol ni conservantes. Puro sabor cubano. Envío a toda España.',
  keywords: ['mojito artesanal', 'base mojito natural', 'cócteles premium', 'mojito cubano', 'Flor de Mojito España', 'mixología fácil'],
  authors: [{ name: 'Juan Carlos Rill Pérez' }],
  creator: 'Flor de Mojito',
  openGraph: {
    title: 'Flor de Mojito | El auténtico mojito cubano en 30 segundos',
    description: 'Bases 100% naturales para el mojito perfecto en 30 segundos. Sin alcohol ni conservantes. Puro sabor cubano. Envío a toda España.',
    url: 'https://flordemojito.es',
    siteName: 'Flor de Mojito',
    images: [
      {
        url: '/images/banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Flor de Mojito - Experiencia Premium',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flor de Mojito | El auténtico mojito cubano',
    description: 'Bases 100% naturales para el mojito perfecto en 30 segundos. Sin alcohol ni conservantes. Puro sabor cubano. Envío a toda España.',
    images: ['/images/banner.jpg'],
  },
  alternates: {
    canonical: 'https://flordemojito.es',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Flor de Mojito',
  image: 'https://flordemojito.es/images/banner.jpg',
  '@id': 'https://flordemojito.es',
  url: 'https://flordemojito.es',
  description: 'Bases 100% naturales para preparar el mojito perfecto en 30 segundos. Sin alcohol y sin aditivos.',
  sameAs: [
    'https://www.instagram.com/flordemojito_es/',
    'https://www.facebook.com/profile.php?id=61560629620932',
    'https://www.tiktok.com/@flordemojito.es',
    'https://www.youtube.com/@FlordeMojitoEspa%C3%B1a',
    'https://www.linkedin.com/company/113251472/'
  ],
  founder: {
    '@type': 'Person',
    name: 'Juan Carlos Rill Pérez'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
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
        <CookieBanner />
      </body>
    </html>
  );
}
