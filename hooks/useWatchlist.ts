'use client'

import { useState, useEffect } from 'react'
import { Movie, UserMovieState } from '@/types'
import { getUserWatchlist } from '@/lib/cosmic'

export function useWatchlist(userName: string = 'Demo User') {
  const [watchlist, setWatchlist] = useState<UserMovieState[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadWatchlist()
  }, [userName])

  const loadWatchlist = async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await getUserWatchlist(userName)
      setWatchlist(data)
    } catch (err) {
      setError('Failed to load watchlist')
      console.error('Error loading watchlist:', err)
    } finally {
      setLoading(false)
    }
  }

  const isInWatchlist = (movieId: string): boolean => {
    return watchlist.some(item => item.metadata?.movie?.id === movieId)
  }

  const addToWatchlist = async (movie: Movie) => {
    try {
      // In a real app, this would create a new UserMovieState object via API
      const newWatchlistItem: UserMovieState = {
        id: `temp-${Date.now()}`,
        slug: `${userName.toLowerCase().replace(/\s+/g, '-')}-${movie.slug}-watchlist`,
        title: `${userName}'s ${movie.title} Status`,
        type: 'user-movie-states',
        created_at: new Date().toISOString(),
        modified_at: new Date().toISOString(),
        metadata: {
          movie,
          user_name: userName,
          status: {
            key: 'want_to_watch',
            value: 'Want to Watch'
          },
          date_added: new Date().toISOString().split('T')[0]
        }
      }

      setWatchlist(prev => [...prev, newWatchlistItem])
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      return true
    } catch (err) {
      console.error('Error adding to watchlist:', err)
      setError('Failed to add to watchlist')
      return false
    }
  }

  const removeFromWatchlist = async (movieId: string) => {
    try {
      setWatchlist(prev => prev.filter(item => item.metadata?.movie?.id !== movieId))
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      return true
    } catch (err) {
      console.error('Error removing from watchlist:', err)
      setError('Failed to remove from watchlist')
      loadWatchlist() // Reload on error
      return false
    }
  }

  const toggleWatchlist = async (movie: Movie): Promise<boolean> => {
    if (!movie.id) {
      console.error('Movie ID is required for watchlist operations')
      return false
    }
    
    const inWatchlist = isInWatchlist(movie.id)
    
    if (inWatchlist) {
      return await removeFromWatchlist(movie.id)
    } else {
      return await addToWatchlist(movie)
    }
  }

  const getWatchlistMovies = (): Movie[] => {
    return watchlist
      .map(item => item.metadata?.movie)
      .filter((movie): movie is Movie => movie !== undefined)
  }

  const getWatchlistCount = (): number => {
    return watchlist.length
  }

  return {
    watchlist,
    loading,
    error,
    actions: {
      loadWatchlist,
      addToWatchlist,
      removeFromWatchlist,
      toggleWatchlist,
      isInWatchlist,
      getWatchlistMovies,
      getWatchlistCount
    }
  }
}