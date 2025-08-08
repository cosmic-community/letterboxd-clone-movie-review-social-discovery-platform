export default function Loading() {
  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <div className="animate-pulse space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="h-8 bg-surface rounded w-64"></div>
            <div className="h-4 bg-surface rounded w-96"></div>
          </div>

          {/* Grid */}
          <div className="grid-movies">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-poster bg-surface rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}