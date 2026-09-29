'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, Trash2, Edit3, Clock, Check, ArrowRight } from 'lucide-react';
import { useUpdateCookbookNotes, useRemoveFromCookbook } from '../mutations';

export default function CookbookItemCard({ item, onRemoved }) {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(item.personal_notes || '');
  const [rating, setRating] = useState(item.rating || 5);
  const [statusMsg, setStatusMsg] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const updateNotes = useUpdateCookbookNotes();
  const removeRecipe = useRemoveFromCookbook();

  const handleSaveNotes = async () => {
    try {
      await updateNotes.mutateAsync({
        cookbookId: item.cookbook_id,
        notes,
        rating,
      });
      setIsEditing(false);
      setStatusMsg('Saved!');
      setTimeout(() => setStatusMsg(''), 2500);
    } catch {
      setStatusMsg('Failed to update.');
    }
  };

  const handleDelete = async () => {
    try {
      await removeRecipe.mutateAsync(item.cookbook_id);
      if (onRemoved) {
        onRemoved(item.cookbook_id);
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const duration = item.duration || (item.prep_time_minutes || 0) + (item.cook_time_minutes || 0) || 30;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        {/* Header with image and title */}
        <div className="flex gap-4 p-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image || item.image_url || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=400&q=80'}
            alt={item.title}
            className="w-24 h-24 rounded-2xl object-cover shrink-0 bg-stone-100 shadow-xs"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-100 text-amber-800">
                {item.category || item.cuisine || 'General'}
              </span>

              {/* Star Rating Display */}
              <div className="flex items-center text-amber-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${star <= rating ? 'fill-current' : 'text-stone-300'}`}
                  />
                ))}
              </div>
            </div>

            <Link href={`/recipes/${item.recipe_id}`}>
              <h3 className="font-bold text-lg text-stone-900 hover:text-amber-600 transition-colors mt-1 line-clamp-1">
                {item.title}
              </h3>
            </Link>

            <p className="text-stone-500 text-xs mt-1.5 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>{duration} mins cooking time</span>
            </p>
          </div>
        </div>

        {/* Personal Notes Box */}
        <div className="px-5 pb-4">
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                <span>My Chef Notes</span>
              </span>

              {statusMsg && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                  <Check className="w-3 h-3" /> {statusMsg}
                </span>
              )}

              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="text-xs font-semibold text-amber-700 hover:text-amber-900 hover:underline cursor-pointer"
                >
                  Edit Note
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-stone-600">Rate dish:</span>
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
                  placeholder="Record recipe tweaks, flavor adjustments, or timing secrets..."
                  rows={2}
                  className="w-full p-2.5 rounded-lg border border-amber-300 bg-white text-stone-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setNotes(item.personal_notes || '');
                    }}
                    className="px-3 py-1 rounded-lg text-xs font-medium text-stone-600 hover:bg-amber-100/60 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveNotes}
                    disabled={updateNotes.isPending}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs cursor-pointer"
                  >
                    {updateNotes.isPending ? 'Saving...' : 'Save Note'}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-stone-700 leading-relaxed italic">
                {notes ? `"${notes}"` : 'No personal notes added yet. Click "Edit Note" to jot down your culinary observations.'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-5 py-3.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs">
        <Link
          href={`/recipes/${item.recipe_id}`}
          className="font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1 group"
        >
          <span>View full recipe</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        {confirmDelete ? (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-stone-500">Remove?</span>
            <button
              onClick={handleDelete}
              disabled={removeRecipe.isPending}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 cursor-pointer"
            >
              {removeRecipe.isPending ? 'Removing...' : 'Yes, Delete'}
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="text-xs text-stone-500 hover:text-stone-700 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            className="flex items-center gap-1 text-stone-400 hover:text-rose-600 transition-colors font-medium cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>
        )}
      </div>
    </div>
  );
}
