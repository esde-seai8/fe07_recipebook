'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bookmark, Check, Star, Edit3, LogIn, AlertCircle } from 'lucide-react';
import { useAddToCookbook } from '../mutations';
import { useSession } from '@/features/auth/hooks';

export default function DetailCookbookSave({ recipeId, initialSaved = false }) {
  const { data: user } = useSession();
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [showNotesForm, setShowNotesForm] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState(5);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const addToCookbook = useAddToCookbook();

  const handleQuickSave = async () => {
    if (!user) {
      setShowAuthPrompt(true);
      return;
    }
    setShowAuthPrompt(false);
    setErrorMessage('');

    try {
      const res = await addToCookbook.mutateAsync({
        recipeId,
        notes: notes || 'Saved from recipe detail',
        rating,
      });

      if (res && res.success === false) {
        setErrorMessage(res.error || 'Failed to save to cookbook.');
        return;
      }

      setIsSaved(true);
      setStatusMessage('Saved to your cookbook!');
      setShowNotesForm(false);
      setTimeout(() => setStatusMessage(''), 3500);
    } catch {
      setErrorMessage('Error saving to cookbook. Please verify connection.');
    }
  };

  const handleToggleNotes = () => {
    if (!user) {
      setShowAuthPrompt(true);
      return;
    }
    setShowAuthPrompt(false);
    setShowNotesForm((prev) => !prev);
  };

  return (
    <div className="space-y-3">
      {statusMessage && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 animate-fadeIn">
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span>{statusMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 text-xs font-semibold border border-rose-200 animate-fadeIn">
          <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Inline Auth Prompt for guests */}
      {showAuthPrompt && (
        <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 text-stone-800 text-xs flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2">
            <LogIn className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Please{' '}
              <Link href="/login" className="font-bold text-amber-800 underline hover:text-amber-900">
                sign in
              </Link>{' '}
              to save recipes and add personal cooking notes.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowAuthPrompt(false)}
            className="text-stone-400 hover:text-stone-700 px-1 font-bold text-sm cursor-pointer"
            aria-label="Dismiss notice"
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={handleQuickSave}
          disabled={addToCookbook.isPending}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm shadow-xs transition-all active:scale-95 cursor-pointer ${
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
          onClick={handleToggleNotes}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 text-sm font-semibold transition-colors cursor-pointer"
        >
          <Edit3 className="w-4 h-4 text-amber-600" />
          <span>{showNotesForm ? 'Close Notes' : 'Add Note'}</span>
        </button>
      </div>

      {showNotesForm && (
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Personal Recipe Notes & Rating
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-0.5 text-amber-500 hover:scale-110 transition-transform cursor-pointer"
                  aria-label={`Rate ${star} star`}
                >
                  <Star className={`w-4 h-4 ${star <= rating ? 'fill-current' : 'text-stone-300'}`} />
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add your personal touches (e.g., Reduced salt by half, oven took 22 mins, pairs great with Pinot Noir)..."
            rows={3}
            className="w-full p-2.5 rounded-lg border border-amber-200 bg-white text-stone-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowNotesForm(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-stone-600 hover:bg-stone-200/60 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleQuickSave}
              disabled={addToCookbook.isPending}
              className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
            >
              {addToCookbook.isPending ? 'Saving...' : 'Save with Note'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
