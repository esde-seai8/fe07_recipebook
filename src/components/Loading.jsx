'use client';

export default function Loading({ message = 'Loading recipes...' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8 space-y-4">
      <div className="relative w-12 h-12">
        <div className="w-12 h-12 rounded-full border-4 border-amber-200 border-t-amber-600 animate-spin"></div>
      </div>
      <p className="text-stone-600 text-sm font-medium animate-pulse">{message}</p>
    </div>
  );
}

export function RecipeCardSkeleton() {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-sm animate-pulse">
      <div className="h-48 bg-stone-200 w-full" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-stone-200 rounded w-1/4" />
        <div className="h-6 bg-stone-200 rounded w-3/4" />
        <div className="h-4 bg-stone-200 rounded w-full" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-4 bg-stone-200 rounded w-1/3" />
          <div className="h-8 bg-stone-200 rounded-lg w-20" />
        </div>
      </div>
    </div>
  );
}

export function RecipeGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <RecipeCardSkeleton key={index} />
      ))}
    </div>
  );
}
