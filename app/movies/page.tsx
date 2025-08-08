import { getMovies } from '@/lib/cosmic'
import MovieGrid from '@/components/MovieGrid'
import SearchBar from '@/components/SearchBar'
import GenreFilter from '@/components/GenreFilter'

export const metadata = {
  title: 'Movies - Letterboxd Clone',
  description: 'Discover and explore our collection of movies',
}

export default async function MoviesPage() {
  const movies = await getMovies()

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Movies
          </h1>
          <p className="text-text-secondary text-lg">
            Discover films, read reviews, and build your watchlist
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <SearchBar placeholder="Search movies, directors, or actors..." />
          <GenreFilter />
        </div>

        {/* Movie Grid */}
        {movies.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-text-muted">
                {movies.length} movie{movies.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <MovieGrid movies={movies} showRating />
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No movies found
            </h3>
            <p className="text-text-muted">
              Check back later for new additions to our movie database.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}