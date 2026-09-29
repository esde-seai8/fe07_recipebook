import Link from 'next/link';
import { Search, BookOpen, Utensils, Sparkles, ChefHat } from 'lucide-react';
import { getRecipes } from '@/features/recipes/server';
import RecipeCard from '@/features/recipes/components/RecipeCard';

export default async function HomePage() {
  let featuredRecipes = [];
  try {
    featuredRecipes = await getRecipes({ limit: 6 });
  } catch (error) {
    console.error('Failed to load featured recipes for home page:', error);
  }

  const cuisines = [
    { name: 'Italian', icon: '🍕', count: 'Neapolitan pizza, Tuscan chicken' },
    { name: 'Mexican', icon: '🌮', count: 'Birria tacos, salsa verde' },
    { name: 'Asian', icon: '🍜', count: 'Tonkotsu ramen, Green curry' },
    { name: 'Mediterranean', icon: '🥗', count: 'Lemon herb salmon, Greek mezze' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-linear-to-br from-amber-500 via-orange-500 to-amber-600 text-white p-8 sm:p-14 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover & Master Culinary Art</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Cook, create, and save delicious recipes.
          </h1>

          <p className="text-amber-100 text-base sm:text-lg leading-relaxed">
            Explore curated recipes across world cuisines, save them to your personal digital cookbook, and tailor notes to perfection.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-stone-900 font-bold text-sm shadow-lg hover:bg-stone-50 transition-all hover:scale-105 active:scale-95"
            >
              <Search className="w-4 h-4 text-amber-600" />
              <span>Explore All Recipes</span>
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-black/25 backdrop-blur-md text-white font-bold text-sm border border-white/20 hover:bg-black/35 transition-all hover:scale-105 active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              <span>My Cookbook</span>
            </Link>
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </section>

      {/* Cuisine Quick Filter Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">Explore by Cuisine</h2>
            <p className="text-stone-500 text-sm">Find inspiration from world-renowned traditions</p>
          </div>
          <Link href="/search" className="text-sm font-semibold text-amber-600 hover:text-amber-700">
            View all &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {cuisines.map((item) => (
            <Link
              key={item.name}
              href={`/search?category=${item.name}`}
              className="group p-5 rounded-2xl border border-stone-200 bg-white hover:border-amber-400 hover:shadow-md transition-all flex flex-col items-center text-center space-y-2"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="font-bold text-stone-900 group-hover:text-amber-600 transition-colors">
                {item.name}
              </span>
              <span className="text-xs text-stone-500 line-clamp-1">{item.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Recipes Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <ChefHat className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-stone-900">Featured Recipes</h2>
              <p className="text-stone-500 text-sm">Hand-picked delicious dishes to try today</p>
            </div>
          </div>
          <Link href="/search" className="text-sm font-semibold text-amber-600 hover:text-amber-700">
            Browse collection &rarr;
          </Link>
        </div>

        {featuredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-12 text-center">
            <Utensils className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <p className="text-stone-600 font-medium">No recipes loaded yet.</p>
            <p className="text-xs text-stone-400 mt-1">
              Configure your Neon database in <code className="bg-stone-200 px-1.5 py-0.5 rounded">.env.local</code> and run{' '}
              <code className="bg-stone-200 px-1.5 py-0.5 rounded">npm.cmd run db:seed</code>.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
