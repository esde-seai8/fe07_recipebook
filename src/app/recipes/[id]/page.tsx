import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Users, BookOpen, Utensils } from 'lucide-react';
import { getRecipeById } from '@/features/recipes/server';
import InteractiveIngredients from '@/features/recipes/components/InteractiveIngredients';
import DetailCookbookSave from '@/features/recipes/components/DetailCookbookSave';

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

  const ingredients: string[] = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : [];

  const duration = recipe.duration || 30;

  return (
    <article className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/search"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-600 hover:text-amber-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to recipes</span>
        </Link>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-stone-100 text-stone-600">
          Recipe #{recipe.id}
        </span>
      </div>

      {/* Visual Card */}
      <div className="rounded-3xl overflow-hidden bg-white border border-stone-200 shadow-md">
        <div className="relative h-72 sm:h-96 w-full bg-stone-100 overflow-hidden">
          <img
            src={recipe.image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1200&q=80'}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-500 text-white shadow-xs">
                {recipe.category}
              </span>
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 shadow-xs">
                {recipe.difficulty}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {recipe.title}
            </h1>
          </div>
        </div>

        {/* Quick Recipe Metrics */}
        <div className="p-6 bg-stone-50 border-t border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-white rounded-xl border border-stone-200/60 shadow-2xs">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" /> Total Time
            </span>
            <span className="text-lg font-bold text-stone-900 mt-1 flex">{duration} mins</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-stone-200/60 shadow-2xs">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider flex items-center justify-center gap-1">
              <Users className="w-3.5 h-3.5 text-amber-500" /> Servings
            </span>
            <span className="text-lg font-bold text-stone-900 mt-1 block">{recipe.servings} portions</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-stone-200/60 shadow-2xs">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider flex items-center justify-center gap-1">
              <Utensils className="w-3.5 h-3.5 text-amber-500" /> Ingredients
            </span>
            <span className="text-lg font-bold text-stone-900 mt-1 block">{ingredients.length} items</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-stone-200/60 shadow-2xs">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider flex items-center justify-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-amber-500" /> Cuisine
            </span>
            <span className="text-lg font-bold text-stone-900 mt-1 block">{recipe.category}</span>
          </div>
        </div>
      </div>

      {/* Two-Column Recipe Details: Interactive Ingredients & Recipe Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Ingredients Column with interactive checkboxes */}
        <div className="md:col-span-1">
          <InteractiveIngredients ingredients={ingredients} />
        </div>

        {/* Recipe Overview Column */}
        <div className="md:col-span-2 space-y-6">
          <section className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-5">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <Utensils className="w-5 h-5 text-amber-600" />
              <h2 className="text-xl font-bold text-stone-900">Recipe Overview</h2>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-3">
              <p className="text-sm font-medium text-amber-950 leading-relaxed">
                {recipe.description}
              </p>
              <div className="pt-2 text-xs text-stone-500 flex items-center justify-between">
                <span>Estimated duration: <strong>{duration} minutes</strong></span>
                <span>Serves: <strong>{recipe.servings} people</strong></span>
              </div>
            </div>

            {/* Save to Cookbook & Add Note Actions */}
            <div className="pt-2 border-t border-stone-100">
              <DetailCookbookSave recipeId={recipeId} />
            </div>

            {/* Kitchen Tip Card */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-1">
              <span className="font-bold text-stone-800 flex items-center gap-1">
                💡 Kitchen Tip:
              </span>
              <p>
                Have all ingredients prepped and measured beforehand to ensure a smooth, enjoyable cooking experience.
              </p>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
