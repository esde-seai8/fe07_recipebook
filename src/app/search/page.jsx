'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search as SearchIcon, Filter, Plus, Check, Clock, RotateCcw } from 'lucide-react';
import { useRecipes } from '@/features/recipes/queries';
import { useAddToCookbook, useCreateRecipe } from '@/features/recipes/mutations';
import { useSession } from '@/features/auth/hooks';
import RecipesList from '@/features/recipes/components/RecipesList';
import AddRecipeForm from '@/features/recipes/components/AddRecipeForm';
import Loading from '@/components/Loading';

const CATEGORIES = [
  'All',
  'Breakfast',
  'Italian',
  'Asian',
  'Mexican',
  'American',
  'Indian',
  'Japanese',
  'Mediterranean',
  'Dessert',
  'Soup',
];

const DURATION_OPTIONS = [
  { label: 'All Times', value: 'All' },
  { label: '⚡ Under 20 min', value: '20' },
  { label: '⏱️ Under 35 min', value: '35' },
  { label: '🍲 Under 60 min', value: '60' },
];

function SearchContent() {
  const { data: user } = useSession();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || searchParams.get('cuisine') || 'All';
  const initialQuery = searchParams.get('q') || searchParams.get('search') || '';

  const [search, setSearch] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [savedRecipeIds, setSavedRecipeIds] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  // Synchronize state if URL query params change (React recommended pattern)
  const [prevCategoryParam, setPrevCategoryParam] = useState(initialCategory);
  if (initialCategory !== prevCategoryParam) {
    setPrevCategoryParam(initialCategory);
    setSelectedCategory(initialCategory);
  }

  const { data: recipes = [], isLoading, error } = useRecipes({
    search,
    category: selectedCategory,
    maxDuration: selectedDuration !== 'All' ? selectedDuration : undefined,
  });

  const addToCookbook = useAddToCookbook();
  const createRecipe = useCreateRecipe();

  const handleSaveToCookbook = async (recipeId) => {
    if (!user) {
      showToast('Please sign in to save recipes to your cookbook.');
      return;
    }
    try {
      const res = await addToCookbook.mutateAsync({ recipeId, notes: 'Saved from search', rating: 5 });
      if (res && res.success === false) {
        showToast(res.error || 'Failed to save recipe.');
        return;
      }
      setSavedRecipeIds((prev) => [...prev, recipeId]);
      showToast('Recipe added to your cookbook!');
    } catch {
      showToast('Could not save to cookbook. Verify database connection.');
    }
  };

  const handleCreateRecipe = async (recipeData) => {
    if (!user) {
      showToast('Please sign in to create a recipe.');
      return;
    }
    try {
      const res = await createRecipe.mutateAsync(recipeData);
      if (res && res.success === false) {
        showToast('Error: ' + res.error);
        return;
      }
      setIsAddModalOpen(false);
      showToast('New recipe created successfully!');
    } catch (err) {
      showToast('Error creating recipe: ' + err.message);
    }
  };

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSelectedDuration('All');
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const hasActiveFilters = search || selectedCategory !== 'All' || selectedDuration !== 'All';

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-xl shadow-xl text-sm flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">Search Recipes</h1>
          <p className="text-stone-500 text-sm mt-1">
            Browse through 40+ curated culinary recipes from our Neon database
          </p>
        </div>

        {user ? (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Recipe</span>
          </button>
        ) : (
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-semibold shadow-xs transition-colors self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-stone-500" />
            <span>Sign in to Add Recipe</span>
          </Link>
        )}
      </div>

      {/* Search Bar & Filter Controls */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipes, ingredients, or cooking styles (e.g. Carbonara, Curry, Tacos)..."
            className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base placeholder:text-stone-400"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-400 hover:text-stone-700 px-2 py-1 rounded"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="space-y-1 pt-2 border-t border-stone-100">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 mb-1.5">
            <Filter className="w-3.5 h-3.5" />
            <span>Category / Cuisine:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === c
                    ? 'bg-amber-600 text-white shadow-xs scale-105'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Duration Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 mr-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Cooking Time:</span>
            </div>
            {DURATION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelectedDuration(opt.value)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedDuration === opt.value
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 hover:text-amber-700 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-stone-900">
            {isLoading
              ? 'Searching database...'
              : `Found ${recipes.length} ${recipes.length === 1 ? 'recipe' : 'recipes'}`}
          </h2>
          {selectedCategory !== 'All' && (
            <span className="text-xs font-medium text-stone-500">
              Filtered by: <span className="font-bold text-stone-800">{selectedCategory}</span>
            </span>
          )}
        </div>

        {/* Recipes Grid */}
        <RecipesList
          recipes={recipes}
          isLoading={isLoading}
          error={error}
          savedRecipeIds={savedRecipeIds}
          onSaveRecipe={handleSaveToCookbook}
          emptyMessage="Try adjusting your keyword, category, or time filters to see more results."
        />
      </div>

      {/* Add Recipe Modal (Only for Authenticated Users) */}
      {user && (
        <AddRecipeForm
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleCreateRecipe}
          isSubmitting={createRecipe.isPending}
        />
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<Loading message="Loading recipe search catalog..." />}>
      <SearchContent />
    </Suspense>
  );
}
