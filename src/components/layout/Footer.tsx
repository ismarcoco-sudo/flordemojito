import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Mail, Linkedin, Youtube } from 'lucide-react';

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
            <div className="flex flex-wrap gap-3 mb-6">
              <a href="https://www.instagram.com/flordemojito_es/" target="_blank" rel="noreferrer" className="bg-primary p-2 rounded-full hover:bg-secondary hover:text-primary transition-all text-bg-light" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61560629620932" target="_blank" rel="noreferrer" className="bg-primary p-2 rounded-full hover:bg-secondary hover:text-primary transition-all text-bg-light" title="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.tiktok.com/@flordemojito.es" target="_blank" rel="noreferrer" className="bg-primary p-2 rounded-full hover:bg-secondary hover:text-primary transition-all text-bg-light" title="TikTok">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
              </a>
              <a href="https://www.youtube.com/@FlordeMojitoEspa%C3%B1a" target="_blank" rel="noreferrer" className="bg-primary p-2 rounded-full hover:bg-secondary hover:text-primary transition-all text-bg-light" title="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/company/113251472/" target="_blank" rel="noreferrer" className="bg-primary p-2 rounded-full hover:bg-secondary hover:text-primary transition-all text-bg-light" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
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

        <div className="border-t border-bg-light/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-bg-light/60 text-center md:text-left">
          <div>
            <p>© {new Date().getFullYear()} Flor de Mojito. Todos los derechos reservados.</p>
            <p className="mt-1 font-semibold">Una marca de M-CUBA</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/legal/privacidad" className="hover:text-secondary">Política de Privacidad</Link>
            <Link href="/legal/terminos" className="hover:text-secondary">Aviso Legal</Link>
            <Link href="/legal/cookies" className="hover:text-secondary">Política de Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
