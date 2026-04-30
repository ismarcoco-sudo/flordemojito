import React from 'react';
import { Star, ThumbsUp, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface ReviewProps {
  id: string;
  name: string;
  location: string;
  profile: string;
  rating: number;
  text: string;
  product: string;
  verified: boolean;
  date: string;
}

export function ReviewCard({ review }: { review: ReviewProps }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3 items-center">
          <div className="w-12 h-12 bg-bg-light rounded-full flex items-center justify-center font-serif font-bold text-xl text-primary border border-border">
            {review.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-primary">{review.name}</h4>
            <div className="text-xs text-text-muted flex items-center gap-1">
              {review.location} • {review.profile}
            </div>
          </div>
        </div>
        <div className="flex text-accent">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-border'}`} />
          ))}
        </div>
      </div>

      <p className="text-text-primary mb-4 italic">"{review.text}"</p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-bg-light">{review.product}</Badge>
          {review.verified && (
            <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
              <CheckCircle className="w-3 h-3" /> Compra verificada
            </span>
          )}
        </div>
        <button className="text-text-muted hover:text-primary flex items-center gap-1 text-xs transition-colors">
          <ThumbsUp className="w-3 h-3" /> Útil
        </button>
      </div>
    </div>
  );
}
