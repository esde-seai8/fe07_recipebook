import { RecipeGridSkeleton } from '@/components/Loading';

export default function SearchLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header skeleton */}
      <div className="space-y-3">
        <div className="h-8 bg-stone-200 rounded-lg w-48" />
        <div className="h-4 bg-stone-200 rounded-lg w-80" />
      </div>

      {/* Search Input skeleton */}
      <div className="h-14 bg-stone-200 rounded-2xl w-full" />

      {/* Category Pills skeleton */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-9 bg-stone-200 rounded-xl w-24 shrink-0" />
        ))}
      </div>

      {/* Recipe Grid skeleton */}
      <RecipeGridSkeleton count={6} />
    </div>
  );
}
