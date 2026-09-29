'use client';

import { useState } from 'react';
import { Bookmark, Check, Star, Edit3 } from 'lucide-react';
import { useAddToCookbook } from '../mutations';

export default function DetailCookbookSave({ recipeId, initialSaved = false }) {
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [showNotesForm, setShowNotesForm] = useState(false);
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState(5);
  const [statusMessage, setStatusMessage] = useState('');

  const addToCookbook = useAddToCookbook();

  const handleQuickSave = async () => {
    try {
      await addToCookbook.mutateAsync({ recipeId, notes: notes || 'Saved from recipe detail', rating });
      setIsSaved(true);
      setStatusMessage('Saved to your cookbook!');
      setShowNotesForm(false);
      setTimeout(() => setStatusMessage(''), 3500);
    } catch {
      setStatusMessage('Error saving to cookbook. Verify connection.');
    }
  };

  return (
    <div className="space-y-3">
      {statusMessage && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span>{statusMessage}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleQuickSave}
          disabled={addToCookbook.isPending}
          className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer ${
            isSaved
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-amber-600 hover:bg-amber-700 text-white'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          <span>{addToCookbook.isPending ? 'Saving...' : isSaved ? 'Saved to Cookbook' : 'Save to Cookbook'}</span>
        </button>

        <button
          type="button"
          onClick={() => setShowNotesForm(!showNotesForm)}
          className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 text-sm font-semibold transition-colors cursor-pointer"
        >
          <Edit3 className="w-4 h-4 text-amber-600" />
          <span>{showNotesForm ? 'Close Notes' : 'Add Note'}</span>
        </button>
      </div>

      {showNotesForm && (
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Add Personal Note & Rating
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-0.5 text-amber-500 hover:scale-110 transition-transform cursor-pointer"
                >
                  <Star className={`w-4 h-4 ${star <= rating ? 'fill-current' : 'text-stone-300'}`} />
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="E.g. Roasted the spices first, reduced salt to 1/2 tsp..."
            rows={2}
            className="w-full p-2.5 rounded-lg border border-amber-200 bg-white text-stone-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleQuickSave}
              disabled={addToCookbook.isPending}
              className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
            >
              {addToCookbook.isPending ? 'Saving...' : 'Save with Note'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
