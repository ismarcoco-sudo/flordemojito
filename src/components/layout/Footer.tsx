import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-bg-dark text-text-light pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl font-bold text-secondary mb-4">Flor de Mojito</h3>
            <p className="text-bg-light/80 text-sm mb-6">
              El mojito perfecto en 30 segundos. Artesanal, natural, sin límites.
            </p>
            <div className="flex items-center gap-2 text-xs text-bg-light/60">
              <span>🇫🇷 Fabricación artesanal en Lyon</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-bg-light/60 mt-1">
              <span>🇨🇺 Receta cubana original</span>
            </div>
          </div>

          <div>
            <h4 className="font-accent font-semibold mb-4 text-accent">Explorar</h4>
            <ul className="space-y-3 text-sm text-bg-light/80">
              <li><Link href="/tienda" className="hover:text-secondary transition-colors">Tienda</Link></li>
              <li><Link href="/marca" className="hover:text-secondary transition-colors">Nuestra Historia</Link></li>
              <li><Link href="/recetas" className="hover:text-secondary transition-colors">Recetas</Link></li>
              <li><Link href="/resenas" className="hover:text-secondary transition-colors">Reseñas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-accent font-semibold mb-4 text-accent">Ayuda</h4>
            <ul className="space-y-3 text-sm text-bg-light/80">
              <li><Link href="/contacto" className="hover:text-secondary transition-colors">Contacto B2B</Link></li>
              <li><Link href="/envios" className="hover:text-secondary transition-colors">Envíos y Devoluciones</Link></li>
              <li><Link href="/faq" className="hover:text-secondary transition-colors">Preguntas Frecuentes</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-accent font-semibold mb-4 text-accent">Síguenos</h4>
            <div className="flex gap-4 mb-6">
              <a href="https://instagram.com/flor_de_mojito" target="_blank" rel="noreferrer" className="bg-primary p-2 rounded-full hover:bg-secondary hover:text-primary transition-all text-bg-light">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com/flordemojito" target="_blank" rel="noreferrer" className="bg-primary p-2 rounded-full hover:bg-secondary hover:text-primary transition-all text-bg-light">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <h4 className="font-accent font-semibold mb-2 text-accent">Newsletter</h4>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Tu email" 
                className="bg-bg-light/10 border border-bg-light/20 rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:border-secondary"
              />
              <button type="submit" className="bg-secondary text-primary px-3 py-2 rounded-md hover:bg-secondary/80 transition-colors">
                <Mail className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-bg-light/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-bg-light/60">
          <p>© {new Date().getFullYear()} Flor de Mojito. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/legal/privacidad" className="hover:text-secondary">Política de Privacidad</Link>
            <Link href="/legal/terminos" className="hover:text-secondary">Aviso Legal</Link>
            <Link href="/legal/cookies" className="hover:text-secondary">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
