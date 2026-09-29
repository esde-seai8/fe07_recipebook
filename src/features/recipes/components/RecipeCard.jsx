'use client';

import Link from 'next/link';
import { Clock, Users, Bookmark } from 'lucide-react';

export default function RecipeCard({ recipe, onSave = undefined, isSaved = false }) {
  if (!recipe) return null;

  const totalTime = recipe.duration || (recipe.prep_time_minutes || 0) + (recipe.cook_time_minutes || 0) || 30;

  const difficultyColors = {
    Easy: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Medium: 'bg-amber-100 text-amber-800 border-amber-200',
    Hard: 'bg-rose-100 text-rose-800 border-rose-200',
  };

  const badgeClass = difficultyColors[recipe.difficulty] || difficultyColors.Medium;

  return (
    <div className="group rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Recipe Thumbnail */}
        <div className="relative h-48 w-full overflow-hidden bg-stone-100">
          <img
            src={recipe.image_url || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=800&auto=format&fit=crop'}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-white/90 backdrop-blur-xs text-stone-800 shadow-xs">
              {recipe.category || recipe.cuisine || 'General'}
            </span>
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${badgeClass} shadow-xs`}>
              {recipe.difficulty || 'Medium'}
            </span>
          </div>
          {onSave && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onSave(recipe.id);
              }}
              title={isSaved ? 'Saved to cookbook' : 'Save to cookbook'}
              className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-colors shadow-xs ${
                isSaved
                  ? 'bg-amber-500 text-white hover:bg-amber-600'
                  : 'bg-white/80 text-stone-700 hover:bg-white hover:text-amber-600'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <Link href={`/recipes/${recipe.id}`}>
            <h3 className="font-bold text-lg text-stone-900 group-hover:text-amber-600 transition-colors line-clamp-1">
              {recipe.title}
            </h3>
          </Link>
          <p className="mt-1 text-sm text-stone-600 line-clamp-2 leading-relaxed">
            {recipe.description}
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-5 pb-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-amber-500" />
          <span>{totalTime} mins</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-amber-500" />
          <span>{recipe.servings} servings</span>
        </div>
        <Link
          href={`/recipes/${recipe.id}`}
          className="font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1"
        >
          View Recipe &rarr;
        </Link>
      </div>
    </div>
  );
}
