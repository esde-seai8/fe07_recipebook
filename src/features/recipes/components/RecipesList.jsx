'use client';

import RecipeCard from './RecipeCard';
import { RecipeGridSkeleton } from '@/components/Loading';
import { ChefHat } from 'lucide-react';

export default function RecipesList({
  recipes = [],
  isLoading = false,
  error = null,
  savedRecipeIds = [],
  onSaveRecipe,
  emptyMessage = 'No recipes found matching your criteria.'
}) {
  if (isLoading) {
    return <RecipeGridSkeleton count={6} />;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center">
        <p className="text-rose-700 font-semibold mb-1">Failed to load recipes</p>
        <p className="text-sm text-rose-600">{error.message || 'Please verify your database connection.'}</p>
      </div>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-12 text-center">
        <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-3">
          <ChefHat className="w-6 h-6" />
        </div>
        <h4 className="font-semibold text-stone-800 text-base mb-1">No Recipes Found</h4>
        <p className="text-stone-500 text-sm max-w-md mx-auto">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isSaved={savedRecipeIds.includes(recipe.id)}
          onSave={onSaveRecipe}
        />
      ))}
    </div>
  );
}
