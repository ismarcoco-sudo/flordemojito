import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://flordemojito.es';
  
  // En una app real, podrías obtener slugs de productos desde una DB o CMS aquí
  const routes = [
    '',
    '/tienda',
    '/recetas',
    '/resenas',
    '/marca',
    '/legal/privacidad',
    '/legal/terminos',
    '/legal/cookies',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
}
