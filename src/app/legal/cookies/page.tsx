import React from 'react';

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-4xl font-serif font-bold text-primary mb-8">Política de Cookies</h1>
      <div className="prose prose-slate max-w-none space-y-6 text-text-primary">
        <p>Este sitio web utiliza cookies para mejorar su experiencia mientras navega por el sitio web.</p>
        
        <h2 className="text-2xl font-bold mt-8">¿Qué son las cookies?</h2>
        <p>Las cookies son pequeños archivos de texto que se almacenan en su navegador cuando visita casi cualquier página web. Su utilidad es que la web sea capaz de recordar su visita cuando vuelva a navegar por esa página.</p>
        
        <h2 className="text-2xl font-bold mt-8">Tipos de cookies que utilizamos</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Cookies Técnicas:</strong> Necesarias para el funcionamiento de la web (carrito de compra, sesión).</li>
          <li><strong>Cookies de Análisis:</strong> Nos permiten medir el tráfico y ver qué secciones son las más visitadas.</li>
          <li><strong>Cookies de Marketing:</strong> Se utilizan para mostrar anuncios relevantes para el usuario.</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8">Cómo desactivar las cookies</h2>
        <p>Puede restringir, bloquear o borrar las cookies de este sitio web utilizando la configuración de su navegador.</p>
      </div>
    </div>
  );
}
