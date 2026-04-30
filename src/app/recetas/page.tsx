"use client";

import React, { useState } from 'react';
import { recipesData } from '@/data/recipes';
import { RecipeCard } from '@/components/recipes/RecipeCard';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

export default function RecetasPage() {
  const [filter, setFilter] = useState('Todas');
  const [search, setSearch] = useState('');

  const categories = ['Todas', 'Sin Alcohol', 'Clásico', 'Fresa', 'Fiesta'];

  const filteredRecipes = recipesData.filter(recipe => {
    const matchSearch = recipe.title.toLowerCase().includes(search.toLowerCase());
    
    if (filter === 'Todas') return matchSearch;
    if (filter === 'Sin Alcohol') return matchSearch && recipe.alcoholFree;
    if (filter === 'Clásico' || filter === 'Fresa') return matchSearch && recipe.baseFlavor === filter;
    if (filter === 'Fiesta') return matchSearch && recipe.occasion.includes('Fiesta');
    
    return matchSearch;
  });

  return (
    <div className="bg-bg-light min-h-screen pb-24">
      <div className="bg-primary text-text-light pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Tu bar en casa</h1>
          <p className="text-lg max-w-2xl mx-auto text-text-light/80">
            Descubre cócteles para cada momento. Con y sin alcohol, listos en segundos.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        
        {/* FilterBar Inline */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-white p-4 rounded-2xl shadow-sm border border-border">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <Badge 
                key={cat}
                variant={filter === cat ? 'default' : 'secondary'}
                className="cursor-pointer px-4 py-2 text-sm"
                onClick={() => setFilter(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <input 
              type="text"
              placeholder="Buscar receta..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-bg-light border border-border rounded-full pl-10 pr-4 py-2 focus:outline-none focus:border-primary"
            />
            <Search className="w-4 h-4 text-text-muted absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
          {filteredRecipes.length === 0 && (
            <div className="col-span-full text-center py-12 text-text-muted">
              No encontramos recetas con esos filtros.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
