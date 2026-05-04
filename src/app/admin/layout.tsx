import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Panel de Pedidos | Backoffice Flor de Mojito',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-bg-dark text-white px-6 py-4 flex items-center gap-4">
        <span className="font-serif font-bold text-secondary text-lg">🌿 Flor de Mojito</span>
        <span className="text-white/40">|</span>
        <span className="text-white/80 text-sm">Backoffice — Panel de Pedidos</span>
      </div>
      {children}
    </div>
  );
}
