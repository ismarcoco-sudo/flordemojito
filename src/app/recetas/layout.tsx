import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cómo hacer el Mojito Perfecto | Recetas con y sin alcohol',
  description: 'Aprende cómo hacer mojito en casa con nuestras recetas fáciles. Mojito clásico, de fresa, mango y opciones sin alcohol en 30 segundos.',
  openGraph: {
    title: 'Recetas de Cócteles Flor de Mojito',
    description: 'Guía paso a paso para preparar cócteles profesionales en casa.',
  }
};

export default function RecetasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
