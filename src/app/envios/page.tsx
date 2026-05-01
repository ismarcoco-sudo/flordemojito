import React from 'react';

export default function EnviosPage() {
  return (
    <div className="bg-bg-light min-h-screen pt-24 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-8 text-center">Envíos y Devoluciones</h1>
        
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-border space-y-8">
          <section>
            <h2 className="text-2xl font-serif font-bold text-primary mb-4 flex items-center gap-2">
              <span className="bg-secondary/20 text-secondary w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              Plazos de Entrega
            </h2>
            <p className="text-text-muted leading-relaxed">
              Realizamos envíos a toda España (Península e Baleares). El plazo de entrega habitual es de 2 a 4 días laborables desde la confirmación del pedido. 
              Para envíos internacionales, por favor consulta con nuestro equipo B2B.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-primary mb-4 flex items-center gap-2">
              <span className="bg-secondary/20 text-secondary w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
              Gastos de Envío
            </h2>
            <p className="text-text-muted leading-relaxed">
              El coste estándar de envío es de 4.95€. Ofrecemos <strong>envío gratuito</strong> en todos los pedidos superiores a 60€.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-primary mb-4 flex items-center gap-2">
              <span className="bg-secondary/20 text-secondary w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
              Seguimiento del Pedido
            </h2>
            <p className="text-text-muted leading-relaxed">
              Una vez que tu pedido salga de nuestro almacén, recibirás un email con un número de seguimiento para que puedas localizar tu paquete en tiempo real a través de nuestro socio logístico Nova Post.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-primary mb-4 flex items-center gap-2">
              <span className="bg-secondary/20 text-secondary w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
              Devoluciones
            </h2>
            <p className="text-text-muted leading-relaxed">
              Al tratarse de un producto alimenticio, solo aceptamos devoluciones en caso de que el producto llegue dañado o en mal estado. Si este es tu caso, por favor contacta con nosotros en <a href="mailto:ismar@flordemojito.es" className="text-primary font-bold underline">ismar@flordemojito.es</a> dentro de las 24 horas siguientes a la recepción del pedido adjuntando fotos del estado del producto.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
