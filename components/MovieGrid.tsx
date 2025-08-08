import { Movie } from '@/types'
import MovieCard from './MovieCard'

interface MovieGridProps {
  movies: Movie[]
  showRating?: boolean
  className?: string
}

export default function MovieGrid({ movies, showRating = false, className }: MovieGridProps) {
  if (!movies.length) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          No movies found
        </h3>
        <p className="text-text-muted">
          Check back later for new additions to our movie database.
        </p>
      </div>
    )
  }

  return (
    <div className={`grid-movies ${className || ''}`}>
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id} 
          movie={movie} 
          showRating={showRating}
        />
      ))}
    </div>
  )
}