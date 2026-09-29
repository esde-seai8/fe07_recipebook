'use client';

import { useState } from 'react';
import { Search as SearchIcon, Filter, Plus, Check } from 'lucide-react';
import { useRecipes } from '@/features/recipes/queries';
import { useAddToCookbook, useCreateRecipe } from '@/features/recipes/mutations';
import RecipesList from '@/features/recipes/components/RecipesList';
import AddRecipeForm from '@/features/recipes/components/AddRecipeForm';

const CUISINES = ['All', 'Italian', 'Mexican', 'Asian', 'Mediterranean', 'French', 'Indian'];
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];

export default function SearchPage() {
  const [search, setSearch] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [savedRecipeIds, setSavedRecipeIds] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  const { data: recipes = [], isLoading, error } = useRecipes({
    search,
    cuisine: selectedCuisine,
    difficulty: selectedDifficulty,
  });

  const addToCookbook = useAddToCookbook();
  const createRecipe = useCreateRecipe();

  const handleSaveToCookbook = async (recipeId) => {
    try {
      await addToCookbook.mutateAsync({ recipeId, notes: 'Saved from search', rating: 5 });
      setSavedRecipeIds((prev) => [...prev, recipeId]);
      showToast('Recipe added to your cookbook!');
    } catch {
      showToast('Could not save to cookbook. Verify database connection.');
    }
  };

  const handleCreateRecipe = async (recipeData) => {
    try {
      await createRecipe.mutateAsync(recipeData);
      setIsAddModalOpen(false);
      showToast('New recipe created successfully!');
    } catch (err) {
      showToast('Error creating recipe: ' + err.message);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

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
            Browse through our culinary archive or add your own creations
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Recipe</span>
        </button>
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
            placeholder="Search by recipe name or description (e.g., Pizza, Salmon, Curry)..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-400 hover:text-stone-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Cuisine:</span>
          </div>
          {CUISINES.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCuisine(c)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedCuisine === c
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Difficulty:</span>
          </div>
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDifficulty(d)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedDifficulty === d
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Recipes List Component */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-stone-900">
            {isLoading ? 'Searching...' : `Found ${recipes.length} ${recipes.length === 1 ? 'recipe' : 'recipes'}`}
          </h2>
        </div>

        <RecipesList
          recipes={recipes}
          isLoading={isLoading}
          error={error}
          savedRecipeIds={savedRecipeIds}
          onSaveRecipe={handleSaveToCookbook}
        />
      </div>

      {/* Add Recipe Modal */}
      <AddRecipeForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreateRecipe}
        isSubmitting={createRecipe.isPending}
      />
    </div>
  );
}
