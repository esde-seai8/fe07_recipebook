export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header skeleton */}
      <div className="flex justify-between items-center border-b border-stone-200 pb-6">
        <div className="space-y-2">
          <div className="h-8 bg-stone-200 rounded w-48" />
          <div className="h-4 bg-stone-200 rounded w-72" />
        </div>
        <div className="h-10 bg-stone-200 rounded-xl w-36" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4">
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-stone-200 rounded-xl shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-stone-200 rounded w-1/4" />
                <div className="h-6 bg-stone-200 rounded w-3/4" />
                <div className="h-4 bg-stone-200 rounded w-1/2" />
              </div>
            </div>
            <div className="h-20 bg-stone-100 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
