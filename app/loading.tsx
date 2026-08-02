export default function Loading() {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-950 to-[#0f0720] px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 h-48 animate-pulse rounded-lg bg-white" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-lg bg-white">
              <div className="aspect-4/3 animate-pulse bg-violet-300" />
              <div className="space-y-3 p-4">
                <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200" />
                <div className="h-5 w-full animate-pulse rounded bg-slate-200" />
                <div className="h-5 w-1/2 animate-pulse rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
