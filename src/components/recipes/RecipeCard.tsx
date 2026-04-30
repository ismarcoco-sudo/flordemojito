import React from 'react';
import Link from 'next/link';
import { Clock, Star, WineOff } from 'lucide-react';
import { Recipe } from '@/data/recipes';
import { Badge } from '@/components/ui/badge';

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recetas/${recipe.slug}`} className="group block h-full">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-border transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col h-full">
        
        <div className="relative aspect-video overflow-hidden bg-bg-light">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex gap-2 flex-col items-start">
            {recipe.alcoholFree && (
              <Badge variant="secondary" className="flex items-center gap-1 shadow-sm">
                <WineOff className="w-3 h-3" /> Sin alcohol
              </Badge>
            )}
            <Badge variant="default" className="shadow-sm">{recipe.baseFlavor}</Badge>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-xl font-serif font-bold text-primary mb-2 group-hover:text-accent transition-colors">
            {recipe.title}
          </h3>
          
          <div className="flex items-center gap-4 text-xs text-text-muted mt-auto pt-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-accent" /> {recipe.prepTime}
            </div>
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(3)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 ${i < recipe.difficulty ? 'fill-accent text-accent' : 'text-border'}`} 
                  />
                ))}
              </div>
              Dificultad
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
