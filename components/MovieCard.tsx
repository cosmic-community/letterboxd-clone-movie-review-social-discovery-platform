import Link from 'next/link'
import { Movie } from '@/types'
import { Calendar, Star, Clock } from 'lucide-react'

interface MovieCardProps {
  movie: Movie
  showRating?: boolean
  className?: string
}

export default function MovieCard({ movie, showRating = false, className }: MovieCardProps) {
  const posterUrl = movie.metadata?.poster_image?.imgix_url

  return (
    <Link href={`/movies/${movie.slug}`} className={`movie-card ${className || ''}`}>
      <div className="relative aspect-poster bg-surface rounded-lg overflow-hidden">
        {posterUrl ? (
          <img
            src={`${posterUrl}?w=400&h=600&fit=crop&auto=format,compress`}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            width="200"
            height="300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface text-text-muted">
            No Poster
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-semibold mb-1 line-clamp-2">{movie.title}</h3>
            
            <div className="flex items-center gap-2 text-sm text-white/80 mb-2">
              <Calendar className="h-3 w-3" />
              <span>{movie.metadata.release_year}</span>
            </div>

            {movie.metadata.runtime_minutes && (
              <div className="flex items-center gap-2 text-sm text-white/80 mb-2">
                <Clock className="h-3 w-3" />
                <span>{movie.metadata.runtime_minutes}m</span>
              </div>
            )}

            {showRating && movie.metadata.imdb_rating && (
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-3 w-3 text-warning fill-warning" />
                <span>{movie.metadata.imdb_rating}/10</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}