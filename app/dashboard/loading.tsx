export default function DashboardLoading() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="h-8 w-40 animate-pulse rounded bg-gray-200" />
            <div className="mt-4 h-5 w-64 animate-pulse rounded bg-gray-100" />
          </div>

          <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-200" />
        </div>

        <div className="mt-8 h-7 w-40 animate-pulse rounded bg-gray-200" />

        <div className="mt-4 space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-lg border p-4">
              <div className="h-5 w-2/3 animate-pulse rounded bg-gray-200" />
              <div className="mt-3 h-4 w-32 animate-pulse rounded bg-gray-100" />
              <div className="mt-4 h-6 w-24 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
