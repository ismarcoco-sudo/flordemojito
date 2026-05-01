import React from 'react';

export default function TerminosPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-4xl font-serif font-bold text-primary mb-8">Aviso Legal</h1>
      <div className="prose prose-slate max-w-none space-y-6 text-text-primary">
        <h2 className="text-2xl font-bold mt-8">1. Datos Identificativos</h2>
        <p>En cumplimiento con el deber de información, se reflejan los siguientes datos: la empresa titular de este dominio es M-CUBA, con marca comercial Flor de Mojito.</p>
        
        <h2 className="text-2xl font-bold mt-8">2. Usuarios</h2>
        <p>El acceso y/o uso de este portal atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas.</p>
        
        <h2 className="text-2xl font-bold mt-8">3. Uso del Portal</h2>
        <p>flordemojito.es proporciona el acceso a multitud de informaciones, servicios o datos en Internet pertenecientes a Flor de Mojito o a sus licenciantes a los que el USUARIO pueda tener acceso.</p>
        
        <h2 className="text-2xl font-bold mt-8">4. Propiedad Intelectual e Industrial</h2>
        <p>Flor de Mojito por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma. Todos los derechos reservados bajo la marca M-CUBA.</p>
      </div>
    </div>
  );
}
