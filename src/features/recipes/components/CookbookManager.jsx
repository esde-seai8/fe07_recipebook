'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Search, Plus, Filter, Star, Sparkles, ChefHat } from 'lucide-react';
import CookbookItemCard from './CookbookItemCard';
import AddRecipeForm from './AddRecipeForm';
import { useCreateRecipe } from '../mutations';

export default function CookbookManager({ initialItems = [] }) {
  const [items, setItems] = useState(initialItems);
  const [search, setSearch] = useState('');
  const [selectedRating, setSelectedRating] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const createRecipe = useCreateRecipe();

  const handleRemoved = (cookbookId) => {
    setItems((prev) => prev.filter((item) => item.cookbook_id !== cookbookId));
  };

  const handleCreateRecipe = async (recipeData) => {
    try {
      await createRecipe.mutateAsync(recipeData);
      setIsAddModalOpen(false);
    } catch (err) {
      console.error('Failed to create recipe:', err);
    }
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesSearch = !search ||
      (item.title && item.title.toLowerCase().includes(search.toLowerCase())) ||
      (item.personal_notes && item.personal_notes.toLowerCase().includes(search.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(search.toLowerCase()));

    const matchesRating = selectedRating === 'All' || item.rating >= Number(selectedRating);

    return matchesSearch && matchesRating;
  });

  const totalSaved = items.length;
  const avgRating = totalSaved > 0
    ? (items.reduce((acc, curr) => acc + (curr.rating || 5), 0) / totalSaved).toFixed(1)
    : '0.0';
  const fiveStarCount = items.filter((i) => i.rating === 5).length;

  return (
    <div className="space-y-8">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
              Saved Recipes
            </span>
            <span className="text-2xl font-black text-stone-900">{totalSaved}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Star className="w-6 h-6 fill-current text-amber-500" />
          </div>
          <div>
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
              Average Rating
            </span>
            <span className="text-2xl font-black text-stone-900">{avgRating} / 5.0</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
              Top Favorites (5★)
            </span>
            <span className="text-2xl font-black text-stone-900">{fiveStarCount}</span>
          </div>
        </div>
      </div>

      {/* Search & Actions Bar */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search saved recipes or your personal notes..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-stone-400"
          />
        </div>

        {/* Rating Filter & Add Recipe button */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-1.5 text-xs text-stone-600">
            <Filter className="w-3.5 h-3.5 text-stone-400" />
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="px-2.5 py-2 rounded-xl border border-stone-300 text-xs font-semibold bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="All">All Ratings</option>
              <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
              <option value="4">⭐⭐⭐⭐ (4+ Stars)</option>
              <option value="3">⭐⭐⭐ (3+ Stars)</option>
            </select>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Recipe</span>
          </button>
        </div>
      </div>

      {/* Grid of Saved Cookbook Recipes */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <CookbookItemCard
              key={item.cookbook_id}
              item={item}
              onRemoved={handleRemoved}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-stone-300 bg-white p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
            <ChefHat className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-stone-900">
              {search || selectedRating !== 'All' ? 'No Matching Cookbook Recipes' : 'Your Cookbook is Empty'}
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              {search || selectedRating !== 'All'
                ? 'Try clearing your search query or rating filter.'
                : 'Browse through our recipe catalog and click "Save to Cookbook" to add your favorites!'}
            </p>
          </div>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Explore Recipes</span>
          </Link>
        </div>
      )}

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
