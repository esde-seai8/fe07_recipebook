import Link from 'next/link';
import { BookOpen, Star, Trash2, Edit3, Search, Clock } from 'lucide-react';
import { getUserCookbook } from '@/features/recipes/server';
import { updateCookbookNotesAction, removeFromCookbookAction } from '@/features/recipes/actions';
import FormSingOut from '@/features/auth/components/FormSingOut';

export default async function DashboardPage() {
  let cookbookItems = [];
  try {
    cookbookItems = await getUserCookbook(1);
  } catch (error) {
    console.error('Failed to load cookbook:', error);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-stone-900 tracking-tight">My Cookbook</h1>
              <p className="text-stone-500 text-sm">Your personal culinary archive and customized recipe notes</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/search"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold shadow-xs transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Find More Recipes</span>
          </Link>
          <FormSingOut />
        </div>
      </div>

      {/* Cookbook Recipes Grid */}
      {cookbookItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cookbookItems.map((item) => (
            <div
              key={item.cookbook_id}
              className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Recipe Card Header */}
                <div className="flex gap-4 p-5">
                  <img
                    src={item.image_url || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=400&auto=format&fit=crop'}
                    alt={item.title}
                    className="w-24 h-24 rounded-xl object-cover shrink-0 bg-stone-100"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-100 text-amber-800">
                        {item.cuisine}
                      </span>
                      <div className="flex items-center text-amber-500">
                        {Array.from({ length: item.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <Link href={`/recipes/${item.recipe_id}`}>
                      <h3 className="font-bold text-lg text-stone-900 hover:text-amber-600 transition-colors mt-1 line-clamp-1">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-stone-500 text-xs mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{(item.prep_time_minutes || 0) + (item.cook_time_minutes || 0)} mins total</span>
                    </p>
                  </div>
                </div>

                {/* Personal Notes Form (Direct Server Action) */}
                <div className="px-5 pb-5">
                  <form
                    action={async (formData) => {
                      'use server';
                      const notes = formData.get('personal_notes');
                      const rating = parseInt(formData.get('rating') || '5', 10);
                      await updateCookbookNotesAction(item.cookbook_id, notes, rating);
                    }}
                    className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1">
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>My Chef Notes</span>
                      </label>
                      <select
                        name="rating"
                        defaultValue={item.rating || 5}
                        className="text-xs font-semibold bg-white border border-amber-300 rounded-lg px-2 py-0.5 text-stone-800"
                      >
                        <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                        <option value="4">⭐⭐⭐⭐ (4/5)</option>
                        <option value="3">⭐⭐⭐ (3/5)</option>
                        <option value="2">⭐⭐ (2/5)</option>
                        <option value="1">⭐ (1/5)</option>
                      </select>
                    </div>

                    <textarea
                      name="personal_notes"
                      defaultValue={item.personal_notes || ''}
                      placeholder="Add personal tweaks, cooking notes, or flavor adjustments..."
                      rows={2}
                      className="w-full p-2.5 rounded-lg border border-amber-200 bg-white text-stone-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold transition-colors"
                      >
                        Update Note
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 py-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs">
                <Link
                  href={`/recipes/${item.recipe_id}`}
                  className="font-semibold text-stone-700 hover:text-amber-600 transition-colors"
                >
                  View full recipe &rarr;
                </Link>

                <form
                  action={async () => {
                    'use server';
                    await removeFromCookbookAction(item.cookbook_id);
                  }}
                >
                  <button
                    type="submit"
                    className="flex items-center gap-1 text-stone-400 hover:text-rose-600 transition-colors font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-stone-300 bg-white p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-stone-900">Your cookbook is empty</h2>
            <p className="text-stone-500 text-sm mt-1">
              Explore recipes and click &quot;Save to Cookbook&quot; to build your personal culinary library.
            </p>
          </div>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-xs transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Search Recipes</span>
          </Link>
        </div>
      )}
    </div>
  );
}
