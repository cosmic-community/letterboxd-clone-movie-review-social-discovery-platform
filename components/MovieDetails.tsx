import { Movie } from '@/types'
import { Calendar, Clock, Globe, Film, User } from 'lucide-react'

interface MovieDetailsProps {
  movie: Movie
}

export default function MovieDetails({ movie }: MovieDetailsProps) {
  return (
    <div className="space-y-8">
      {/* Technical Details */}
      <div className="card">
        <h3 className="text-xl font-semibold text-text-primary mb-4">
          Movie Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-text-muted" />
              <div>
                <span className="text-text-muted">Release Year:</span>{' '}
                <span className="text-text-primary font-medium">{movie.metadata.release_year}</span>
              </div>
            </div>

            {movie.metadata.runtime_minutes && (
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-text-muted" />
                <div>
                  <span className="text-text-muted">Runtime:</span>{' '}
                  <span className="text-text-primary font-medium">
                    {Math.floor(movie.metadata.runtime_minutes / 60)}h {movie.metadata.runtime_minutes % 60}m
                  </span>
                </div>
              </div>
            )}

            {movie.metadata.country && (
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-text-muted" />
                <div>
                  <span className="text-text-muted">Country:</span>{' '}
                  <span className="text-text-primary font-medium">{movie.metadata.country}</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-text-muted" />
              <div>
                <span className="text-text-muted">Director:</span>{' '}
                <span className="text-text-primary font-medium">{movie.metadata.director}</span>
              </div>
            </div>

            {movie.metadata.language && (
              <div className="flex items-center gap-3">
                <Film className="h-5 w-5 text-text-muted" />
                <div>
                  <span className="text-text-muted">Language:</span>{' '}
                  <span className="text-text-primary font-medium">{movie.metadata.language}</span>
                </div>
              </div>
            )}

            {movie.metadata.content_rating?.value && (
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 bg-warning text-black text-xs rounded flex items-center justify-center font-bold">
                  {movie.metadata.content_rating.value.charAt(0)}
                </span>
                <div>
                  <span className="text-text-muted">Rating:</span>{' '}
                  <span className="text-text-primary font-medium">{movie.metadata.content_rating.value}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cast */}
      {movie.metadata.cast && (
        <div className="card">
          <h3 className="text-xl font-semibold text-text-primary mb-4">
            Cast
          </h3>
          <p className="text-text-secondary">{movie.metadata.cast}</p>
        </div>
      )}

      {/* Genres */}
      {movie.metadata.genres && movie.metadata.genres.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-semibold text-text-primary mb-4">
            Genres
          </h3>
          <div className="flex flex-wrap gap-2">
            {movie.metadata.genres.map((genre) => (
              <span 
                key={genre}
                className="px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}