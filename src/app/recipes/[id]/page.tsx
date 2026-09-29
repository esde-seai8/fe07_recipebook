import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Bookmark, ChefHat, CheckCircle2 } from 'lucide-react';
import { getRecipeById } from '@/features/recipes/server';
import { addToCookbookAction } from '@/features/recipes/actions';

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipeId = parseInt(id, 10);

  if (isNaN(recipeId)) {
    notFound();
  }

  const recipe = await getRecipeById(recipeId);

  if (!recipe) {
    notFound();
  }

  const ingredients = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : typeof recipe.ingredients === 'string'
    ? JSON.parse(recipe.ingredients)
    : [];

  const instructions = Array.isArray(recipe.instructions)
    ? recipe.instructions
    : typeof recipe.instructions === 'string'
    ? JSON.parse(recipe.instructions)
    : [];

  const totalTime = (recipe.prep_time_minutes || 0) + (recipe.cook_time_minutes || 0);

  return (
    <article className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Back button */}
      <div>
        <Link
          href="/search"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-600 hover:text-amber-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to recipes</span>
        </Link>
      </div>

      {/* Hero Image & Header */}
      <div className="rounded-3xl overflow-hidden bg-white border border-stone-200 shadow-md">
        <div className="relative h-72 sm:h-96 w-full bg-stone-100 overflow-hidden">
          <img
            src={recipe.image_url || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=1000&auto=format&fit=crop'}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-500 text-white shadow-xs">
                {recipe.cuisine}
              </span>
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 shadow-xs">
                {recipe.difficulty}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">{recipe.title}</h1>
          </div>
        </div>

        {/* Quick Meta Stats Bar */}
        <div className="p-6 bg-stone-50 border-t border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-white rounded-xl border border-stone-200/60 shadow-2xs">
            <span className="block text-xs font-semibold text-stone-500 uppercase tracking-wider">Prep Time</span>
            <span className="text-lg font-bold text-stone-900">{recipe.prep_time_minutes} min</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-stone-200/60 shadow-2xs">
            <span className="block text-xs font-semibold text-stone-500 uppercase tracking-wider">Cook Time</span>
            <span className="text-lg font-bold text-stone-900">{recipe.cook_time_minutes} min</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-stone-200/60 shadow-2xs">
            <span className="block text-xs font-semibold text-stone-500 uppercase tracking-wider">Total Time</span>
            <span className="text-lg font-bold text-stone-900">{totalTime} min</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-stone-200/60 shadow-2xs">
            <span className="block text-xs font-semibold text-stone-500 uppercase tracking-wider">Servings</span>
            <span className="text-lg font-bold text-stone-900">{recipe.servings} people</span>
          </div>
        </div>
      </div>

      {/* Description & Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-stone-200 shadow-xs">
        <p className="text-stone-700 leading-relaxed max-w-2xl">{recipe.description}</p>
        <form
          action={async () => {
            'use server';
            await addToCookbookAction(recipeId, 'Saved from detail page', 5);
          }}
        >
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-md transition-all active:scale-95 whitespace-nowrap"
          >
            <Bookmark className="w-4 h-4 fill-current" />
            <span>Save to Cookbook</span>
          </button>
        </form>
      </div>

      {/* Two-Column Recipe Details: Ingredients & Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Ingredients Column */}
        <section className="md:col-span-1 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs h-fit space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <ChefHat className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl font-bold text-stone-900">Ingredients</h2>
          </div>
          <ul className="space-y-3">
            {ingredients.map((item: string | { name: string; amount?: string }, idx: number) => {
              const name = typeof item === 'string' ? item : item.name;
              const amount = typeof item === 'object' && item.amount ? item.amount : '';
              return (
                <li key={idx} className="flex items-start justify-between text-sm py-1 border-b border-stone-50">
                  <span className="text-stone-800 font-medium">{name}</span>
                  {amount && <span className="text-amber-700 font-semibold ml-2">{amount}</span>}
                </li>
              );
            })}
          </ul>
        </section>

        {/* Step-by-Step Instructions Column */}
        <section className="md:col-span-2 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <CheckCircle2 className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl font-bold text-stone-900">Cooking Steps</h2>
          </div>
          <div className="space-y-4">
            {instructions.map((step: string, idx: number) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200/70">
                <span className="w-8 h-8 rounded-full bg-amber-500 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  {idx + 1}
                </span>
                <p className="text-stone-800 text-sm leading-relaxed pt-1">{step}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
