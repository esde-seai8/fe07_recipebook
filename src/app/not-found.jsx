import Link from 'next/link';
import { UtensilsCrossed, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative inline-block">
          <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
            <UtensilsCrossed className="w-10 h-10" />
          </div>
          <span className="absolute -bottom-2 -right-2 bg-stone-900 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            404
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">
            Recipe Missing from Pantry
          </h1>
          <p className="text-stone-500 text-sm max-w-sm mx-auto leading-relaxed">
            The dish or page you are looking for doesn&apos;t exist, has been whisked away, or the recipe card was relocated.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/search"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-sm font-semibold shadow-xs transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Search Recipes</span>
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
