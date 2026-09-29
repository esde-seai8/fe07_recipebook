'use client';

import { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';

export default function AddRecipeForm({ isOpen, onClose, onSubmit, isSubmitting = false }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cuisine: 'Italian',
    difficulty: 'Medium',
    prep_time_minutes: 15,
    cook_time_minutes: 30,
    servings: 4,
    image_url: '',
    ingredients: [{ name: '', amount: '' }],
    instructions: [''],
  });

  if (!isOpen) return null;

  const handleIngredientChange = (index, field, value) => {
    const updated = [...formData.ingredients];
    updated[index][field] = value;
    setFormData({ ...formData, ingredients: updated });
  };

  const addIngredientField = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: '', amount: '' }],
    });
  };

  const removeIngredientField = (index) => {
    const updated = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: updated.length ? updated : [{ name: '', amount: '' }] });
  };

  const handleInstructionChange = (index, value) => {
    const updated = [...formData.instructions];
    updated[index] = value;
    setFormData({ ...formData, instructions: updated });
  };

  const addInstructionField = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, ''],
    });
  };

  const removeInstructionField = (index) => {
    const updated = formData.instructions.filter((_, i) => i !== index);
    setFormData({ ...formData, instructions: updated.length ? updated : [''] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-2 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-stone-900 mb-1">Add New Recipe</h2>
        <p className="text-stone-500 text-sm mb-6">Create a recipe and save it directly to the database.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">Recipe Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Grandma's Lemon Ricotta Pancakes"
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">Short Description</label>
            <textarea
              required
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="A brief culinary description of this dish..."
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Cuisine</label>
              <select
                value={formData.cuisine}
                onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option>Italian</option>
                <option>Mexican</option>
                <option>Asian</option>
                <option>Mediterranean</option>
                <option>French</option>
                <option>American</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Prep Time (min)</label>
              <input
                type="number"
                min="0"
                value={formData.prep_time_minutes}
                onChange={(e) => setFormData({ ...formData, prep_time_minutes: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Cook Time (min)</label>
              <input
                type="number"
                min="0"
                value={formData.cook_time_minutes}
                onChange={(e) => setFormData({ ...formData, cook_time_minutes: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">Image URL</label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Ingredients list */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-semibold text-stone-700">Ingredients</label>
              <button
                type="button"
                onClick={addIngredientField}
                className="text-xs text-amber-600 font-semibold hover:text-amber-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Item
              </button>
            </div>
            <div className="space-y-2">
              {formData.ingredients.map((ing, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Ingredient (e.g. Flour)"
                    value={ing.name}
                    onChange={(e) => handleIngredientChange(idx, 'name', e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-stone-300 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Amount (e.g. 2 cups)"
                    value={ing.amount}
                    onChange={(e) => handleIngredientChange(idx, 'amount', e.target.value)}
                    className="w-32 px-3 py-1.5 rounded-lg border border-stone-300 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeIngredientField(idx)}
                    className="p-1.5 text-stone-400 hover:text-rose-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions list */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-semibold text-stone-700">Instructions (Steps)</label>
              <button
                type="button"
                onClick={addInstructionField}
                className="text-xs text-amber-600 font-semibold hover:text-amber-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Step
              </button>
            </div>
            <div className="space-y-2">
              {formData.instructions.map((step, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <span className="text-xs font-bold text-stone-400 w-5">{idx + 1}.</span>
                  <input
                    type="text"
                    placeholder="Describe step..."
                    value={step}
                    onChange={(e) => handleInstructionChange(idx, e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-stone-300 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeInstructionField(idx)}
                    className="p-1.5 text-stone-400 hover:text-rose-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold shadow-xs disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
