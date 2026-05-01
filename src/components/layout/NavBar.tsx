"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/hooks/use-cart';
import Image from 'next/image';

export function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'La Historia', href: '/#history-section' },
    { name: 'Tienda', href: '/tienda' },
    { name: 'Recetas', href: '/recetas' },
    { name: 'Reseñas', href: '/resenas' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname?.startsWith(path);
  };

  const { itemCount, setIsOpen: setOpenCart } = useCart();

  return (
    <header className="fixed top-0 w-full z-50 bg-bg-light/90 backdrop-blur-md border-b border-border transition-all">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-border bg-white flex-shrink-0">
              <Image 
                src="/images/logo.png" 
                alt="Flor de Mojito Logo" 
                fill
                className="object-contain p-1 group-hover:scale-110 transition-transform"
              />
            </div>
            <div className="text-2xl font-serif font-bold text-primary tracking-tight group-hover:text-secondary transition-colors">
              Flor de Mojito
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.href) ? 'text-primary font-bold' : 'text-text-muted'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setOpenCart(true)}
              className="relative p-2 text-text-primary hover:text-primary transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-primary text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-bg-light border-b border-border absolute w-full left-0 top-20 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-medium ${
                  isActive(link.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-muted hover:bg-primary/5 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
