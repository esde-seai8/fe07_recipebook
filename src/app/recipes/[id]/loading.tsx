export default function RecipeDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-pulse">
      {/* Back button skeleton */}
      <div className="h-5 bg-stone-200 rounded w-32" />

      {/* Hero Skeleton */}
      <div className="rounded-3xl overflow-hidden bg-white border border-stone-200 shadow-md">
        <div className="h-72 sm:h-96 w-full bg-stone-200" />
        <div className="p-6 bg-stone-50 border-t border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="h-16 bg-stone-200 rounded-xl" />
          <div className="h-16 bg-stone-200 rounded-xl" />
          <div className="h-16 bg-stone-200 rounded-xl" />
          <div className="h-16 bg-stone-200 rounded-xl" />
        </div>
      </div>

      {/* Description & Action Bar */}
      <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs flex justify-between items-center">
        <div className="h-12 bg-stone-200 rounded w-2/3" />
        <div className="h-10 bg-stone-200 rounded-xl w-36" />
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs h-72">
          <div className="h-6 bg-stone-200 rounded w-1/2 mb-4" />
          <div className="space-y-3">
            <div className="h-4 bg-stone-200 rounded w-full" />
            <div className="h-4 bg-stone-200 rounded w-5/6" />
            <div className="h-4 bg-stone-200 rounded w-4/6" />
            <div className="h-4 bg-stone-200 rounded w-full" />
          </div>
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs h-72">
          <div className="h-6 bg-stone-200 rounded w-1/3 mb-4" />
          <div className="space-y-4">
            <div className="h-16 bg-stone-200 rounded-xl w-full" />
            <div className="h-16 bg-stone-200 rounded-xl w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
