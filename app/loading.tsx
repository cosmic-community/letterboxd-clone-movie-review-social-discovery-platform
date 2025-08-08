export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section Skeleton */}
      <div className="relative h-[60vh] bg-surface animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="h-12 w-64 bg-border rounded mx-auto"></div>
            <div className="h-6 w-96 bg-border rounded mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container-custom py-12 space-y-16">
        {/* Featured Movies Skeleton */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="h-8 w-48 bg-surface rounded"></div>
            <div className="h-6 w-24 bg-surface rounded"></div>
          </div>
          <div className="grid-movies">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-poster bg-surface rounded-lg animate-pulse"></div>
            ))}
          </div>
        </section>

        {/* Reviews Skeleton */}
        <section>
          <div className="h-8 w-48 bg-surface rounded mb-8"></div>
          <div className="grid-reviews">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card space-y-4">
                <div className="h-6 w-3/4 bg-border rounded"></div>
                <div className="h-4 w-full bg-border rounded"></div>
                <div className="h-4 w-2/3 bg-border rounded"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Lists Skeleton */}
        <section>
          <div className="h-8 w-48 bg-surface rounded mb-8"></div>
          <div className="grid-lists">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card space-y-4">
                <div className="aspect-backdrop bg-border rounded"></div>
                <div className="h-6 w-3/4 bg-border rounded"></div>
                <div className="h-4 w-full bg-border rounded"></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}