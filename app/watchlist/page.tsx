'use client'

import { useState, useEffect } from 'react'
import { getUserWatchlist } from '@/lib/cosmic'
import MovieGrid from '@/components/MovieGrid'
import { UserMovieState, Movie } from '@/types'
import { User, Calendar } from 'lucide-react'

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<UserMovieState[]>([])
  const [loading, setLoading] = useState(true)
  const [userName] = useState('Demo User') // In a real app, get from auth context

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const data = await getUserWatchlist(userName)
        setWatchlist(data)
      } catch (error) {
        console.error('Error fetching watchlist:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWatchlist()
  }, [userName])

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="container-custom">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-surface rounded w-64"></div>
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

  // Extract movies from watchlist
  const movies: Movie[] = watchlist
    .map(item => item.metadata?.movie)
    .filter((movie): movie is Movie => movie !== undefined)

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
              {userName}'s Watchlist
            </h1>
          </div>
          <p className="text-text-secondary text-lg">
            Movies you want to watch
          </p>
        </div>

        {/* Watchlist Stats */}
        {watchlist.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-4 text-text-muted">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{watchlist.length} movie{watchlist.length !== 1 ? 's' : ''} in watchlist</span>
              </div>
            </div>
          </div>
        )}

        {/* Movie Grid */}
        {movies.length > 0 ? (
          <MovieGrid movies={movies} showRating />
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              Your watchlist is empty
            </h3>
            <p className="text-text-muted mb-6">
              Start adding movies you want to watch!
            </p>
            <a
              href="/movies"
              className="btn-primary"
            >
              Browse Movies
            </a>
          </div>
        )}
      </div>
    </div>
  )
}