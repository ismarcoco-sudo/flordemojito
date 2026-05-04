import React from 'react';
import { notFound } from 'next/navigation';
import { recipesData } from '@/data/recipes';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Star, Share2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  return recipesData.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export default async function RecipeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recipe = recipesData.find(r => r.slug === slug);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="bg-bg-light min-h-screen pb-24">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px]">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-transparent" />
        
        <div className="absolute top-24 left-4 sm:left-8 z-10">
          <Link href="/recetas">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/30 backdrop-blur-md">
              <ArrowLeft className="w-4 h-4 mr-2" /> Volver
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-0 w-full p-8 md:p-16 text-text-light">
          <div className="container mx-auto">
            <div className="flex gap-2 mb-4">
              {recipe.alcoholFree && <Badge variant="secondary">Sin alcohol</Badge>}
              <Badge variant="accent">Sabor {recipe.baseFlavor}</Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">{recipe.title}</h1>
            
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                <span className="font-bold">{recipe.prepTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(3)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < recipe.difficulty ? 'fill-accent text-accent' : 'text-white/30'}`} 
                    />
                  ))}
                </div>
                <span>Nivel</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Ingredients Column */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-border sticky top-28">
              <h2 className="text-2xl font-serif font-bold text-primary mb-6 border-b border-border pb-4">
                Ingredientes
              </h2>
              <ul className="space-y-4 mb-8">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex justify-between items-center border-b border-border/50 pb-2 last:border-0">
                    <span className="font-medium text-text-primary">{ing.name}</span>
                    <span className="text-text-muted text-sm">{ing.amount}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-bg-light p-4 rounded-xl mb-6">
                <p className="text-xs text-text-muted text-center mb-3">
                  ¿Te falta el ingrediente principal?
                </p>
                <Link href="/tienda">
                  <Button className="w-full">Comprar Base {recipe.baseFlavor}</Button>
                </Link>
              </div>

              <Button variant="outline" className="w-full flex items-center justify-center gap-2 text-primary border-primary">
                <Share2 className="w-4 h-4" /> Compartir Receta
              </Button>
            </div>
          </div>

          {/* Instructions Column */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-serif font-bold text-primary mb-8">
              Preparación paso a paso
            </h2>
            
            <div className="space-y-8">
              {recipe.instructions.map((step, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-text-light flex items-center justify-center font-bold font-serif text-xl">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-lg text-text-primary mt-1">{step}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 bg-accent/10 border border-accent/20 rounded-3xl p-8 flex gap-6 items-start">
              <CheckCircle2 className="w-8 h-8 text-accent flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg text-primary mb-2">Tip del Bartender</h3>
                <p className="text-text-muted italic">&ldquo;{recipe.bartenderTip}&rdquo;</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
