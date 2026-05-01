import React from 'react';

export default function PrivacidadPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-4xl font-serif font-bold text-primary mb-8">Política de Privacidad</h1>
      <div className="prose prose-slate max-w-none space-y-6 text-text-primary">
        <p>En Flor de Mojito (M-CUBA), respetamos tu privacidad y nos comprometemos a proteger tus datos personales. Esta política explica cómo tratamos la información que recopilamos.</p>
        
        <h2 className="text-2xl font-bold mt-8">1. Responsable del Tratamiento</h2>
        <p>El responsable del tratamiento de sus datos es M-CUBA, con domicilio social en Lyon (Francia) y operaciones en España.</p>
        
        <h2 className="text-2xl font-bold mt-8">2. Datos que Recopilamos</h2>
        <p>Recopilamos datos cuando realizas un pedido, te registras en nuestro formulario de contacto o te suscribes a nuestra newsletter. Estos datos incluyen: nombre, email, teléfono y dirección de entrega.</p>
        
        <h2 className="text-2xl font-bold mt-8">3. Finalidad del Tratamiento</h2>
        <p>Utilizamos tus datos para:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Gestionar y enviar tus pedidos.</li>
          <li>Enviarte comunicaciones comerciales (solo si has dado tu consentimiento).</li>
          <li>Mejorar nuestros servicios y experiencia de usuario.</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8">4. Tus Derechos (RGPD)</h2>
        <p>Tienes derecho a acceder, rectificar, suprimir y oponerte al tratamiento de tus datos. Para ejercer estos derechos, puedes escribirnos a <a href="mailto:hola@flordemojito.es" className="text-primary underline">hola@flordemojito.es</a>.</p>
        
        <h2 className="text-2xl font-bold mt-8">5. Cookies</h2>
        <p>Utilizamos cookies para mejorar la navegación. Puedes consultar nuestra Política de Cookies para más detalles.</p>
      </div>
    </div>
  );
}
