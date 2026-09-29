import Link from 'next/link';
import { BookOpen, Search } from 'lucide-react';
import { getUserCookbook } from '@/features/recipes/server';
import CookbookManager from '@/features/recipes/components/CookbookManager';
import FormSignOut from '@/features/auth/components/FormSignOut';

export default async function DashboardPage() {
  let cookbookItems = [];
  try {
    cookbookItems = await getUserCookbook(1);
  } catch (error) {
    console.error('Failed to load cookbook items from Neon:', error);
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
            <span>Find Recipes</span>
          </Link>
          <FormSignOut />
        </div>
      </div>

      {/* Interactive Cookbook Manager (List, Search, Edit Notes, Remove) */}
      <CookbookManager initialItems={cookbookItems} />
    </div>
  );
}
