export default function CampaignsLoading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="h-9 w-48 animate-pulse rounded bg-gray-200" />

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border bg-white p-4 shadow-sm"
          >
            {/* Image skeleton */}
            <div className="h-40 animate-pulse rounded-xl bg-gray-200" />

            {/* Text skeleton */}
            <div className="mt-4 h-5 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="mt-3 h-4 w-full animate-pulse rounded bg-gray-100" />
            <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-gray-100" />

            {/* Progress skeleton */}
            <div className="mt-6 h-3 animate-pulse rounded-full bg-gray-100" />
          </div>
        ))}
      </div>
    </main>
  );
}
