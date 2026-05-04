import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout | Finalizar Compra',
  description: 'Finaliza tu pedido de Flor de Mojito de forma segura.',
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
