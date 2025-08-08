import { Movie } from '@/types'
import { Star, Calendar, Clock, Globe, Play } from 'lucide-react'

interface MovieHeroProps {
  movie: Movie
}

export default function MovieHero({ movie }: MovieHeroProps) {
  const posterUrl = movie.metadata?.poster_image?.imgix_url
  const backdropUrl = movie.metadata?.backdrop_images?.[0]?.imgix_url || posterUrl

  return (
    <div className="relative min-h-[80vh] overflow-hidden">
      {/* Background */}
      {backdropUrl && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backdropUrl}?w=1920&h=1080&fit=crop&auto=format,compress)`,
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex items-end">
        <div className="container-custom pb-12">
          <div className="flex flex-col lg:flex-row gap-8 items-end">
            {/* Poster */}
            {posterUrl && (
              <div className="flex-shrink-0">
                <img
                  src={`${posterUrl}?w=400&h=600&fit=crop&auto=format,compress`}
                  alt={movie.title}
                  className="w-64 h-96 object-cover rounded-lg shadow-2xl"
                  width="256"
                  height="384"
                />
              </div>
            )}

            {/* Movie Info */}
            <div className="flex-1 text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {movie.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{movie.metadata.release_year}</span>
                </div>

                {movie.metadata.runtime_minutes && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{Math.floor(movie.metadata.runtime_minutes / 60)}h {movie.metadata.runtime_minutes % 60}m</span>
                  </div>
                )}

                {movie.metadata.content_rating?.value && (
                  <span className="px-2 py-1 bg-white/20 rounded text-sm">
                    {movie.metadata.content_rating.value}
                  </span>
                )}

                {movie.metadata.country && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    <span>{movie.metadata.country}</span>
                  </div>
                )}
              </div>

              {/* Director & Cast */}
              <div className="space-y-2 mb-6">
                <p className="text-lg">
                  <span className="text-white/60">Directed by</span>{' '}
                  <span className="text-white font-medium">{movie.metadata.director}</span>
                </p>
                
                {movie.metadata.cast && (
                  <p>
                    <span className="text-white/60">Starring</span>{' '}
                    <span className="text-white">{movie.metadata.cast}</span>
                  </p>
                )}
              </div>

              {/* Rating */}
              {movie.metadata.imdb_rating && (
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 bg-warning/20 px-4 py-2 rounded-lg">
                    <Star className="h-6 w-6 text-warning fill-warning" />
                    <span className="text-xl font-bold">{movie.metadata.imdb_rating}/10</span>
                    <span className="text-white/60">IMDb</span>
                  </div>
                </div>
              )}

              {/* Genres */}
              {movie.metadata.genres && movie.metadata.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {movie.metadata.genres.map((genre) => (
                    <span 
                      key={genre}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              {/* Synopsis */}
              {movie.metadata.synopsis && (
                <div className="max-w-3xl mb-8">
                  <div 
                    className="text-white/90 text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: movie.metadata.synopsis }}
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4">
                {movie.metadata.trailer_url && (
                  <a
                    href={movie.metadata.trailer_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center gap-2"
                  >
                    <Play className="h-5 w-5" />
                    Watch Trailer
                  </a>
                )}

                {movie.metadata.imdb_url && (
                  <a
                    href={movie.metadata.imdb_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center gap-2"
                  >
                    View on IMDb
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}