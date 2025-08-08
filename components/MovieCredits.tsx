import { Movie } from '@/types'
import { User, Star } from 'lucide-react'

interface MovieCreditsProps {
  movie: Movie
  className?: string
}

export default function MovieCredits({ movie, className }: MovieCreditsProps) {
  const cast = movie.metadata?.cast
  const director = movie.metadata?.director

  if (!cast && !director) {
    return null
  }

  // Parse cast string into array
  const castMembers = cast ? cast.split(',').map(name => name.trim()) : []

  return (
    <div className={`card ${className || ''}`}>
      <h3 className="text-xl font-semibold text-text-primary mb-4">
        Cast & Crew
      </h3>

      <div className="space-y-6">
        {/* Director */}
        {director && (
          <div>
            <h4 className="text-text-muted text-sm font-medium mb-2 uppercase tracking-wide">
              Director
            </h4>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center">
                <User className="h-6 w-6 text-text-muted" />
              </div>
              <div>
                <p className="font-medium text-text-primary">{director}</p>
                <p className="text-sm text-text-muted">Director</p>
              </div>
            </div>
          </div>
        )}

        {/* Cast */}
        {castMembers.length > 0 && (
          <div>
            <h4 className="text-text-muted text-sm font-medium mb-3 uppercase tracking-wide">
              Cast
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {castMembers.slice(0, 8).map((actor, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-text-muted" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-text-primary truncate">{actor}</p>
                    <p className="text-sm text-text-muted">Actor</p>
                  </div>
                  {index === 0 && (
                    <Star className="h-4 w-4 text-warning" />
                  )}
                </div>
              ))}
            </div>
            
            {castMembers.length > 8 && (
              <p className="text-text-muted text-sm mt-3">
                And {castMembers.length - 8} more...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}