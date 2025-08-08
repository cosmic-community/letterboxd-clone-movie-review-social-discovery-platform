'use client'

import { useState, useEffect } from 'react'
import { Movie, UserMovieState, WatchStatus } from '@/types'

interface MovieState {
  status: WatchStatus | null
  rating: number
  isLiked: boolean
  dateWatched: string | null
  personalNotes: string
}

export function useMovieState(movie: Movie, userName: string = 'Demo User') {
  const [movieState, setMovieState] = useState<MovieState>({
    status: null,
    rating: 0,
    isLiked: false,
    dateWatched: null,
    personalNotes: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load existing state on mount
  useEffect(() => {
    loadMovieState()
  }, [movie.id, userName])

  const loadMovieState = async () => {
    setLoading(true)
    setError(null)

    try {
      // In a real app, this would fetch from API
      // For now, use localStorage as a demo
      const key = `movie-state-${movie.id}-${userName}`
      const saved = localStorage.getItem(key)
      
      if (saved) {
        const state = JSON.parse(saved) as MovieState
        setMovieState(state)
      }
    } catch (err) {
      setError('Failed to load movie state')
      console.error('Error loading movie state:', err)
    } finally {
      setLoading(false)
    }
  }

  const saveMovieState = async (newState: Partial<MovieState>) => {
    setLoading(true)
    setError(null)

    try {
      const updatedState = { ...movieState, ...newState }
      setMovieState(updatedState)

      // In a real app, this would save to API
      // For now, use localStorage as a demo
      const key = `movie-state-${movie.id}-${userName}`
      localStorage.setItem(key, JSON.stringify(updatedState))

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
    } catch (err) {
      setError('Failed to save movie state')
      console.error('Error saving movie state:', err)
      // Revert state on error
      loadMovieState()
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = (status: WatchStatus | null) => {
    const updates: Partial<MovieState> = { status }
    
    // Auto-set date when marked as watched
    if (status === 'watched' && !movieState.dateWatched) {
      updates.dateWatched = new Date().toISOString().split('T')[0]
    }
    
    saveMovieState(updates)
  }

  const updateRating = (rating: number) => {
    const updates: Partial<MovieState> = { rating }
    
    // Auto-set as watched if rating is given
    if (rating > 0 && movieState.status !== 'watched') {
      updates.status = 'watched'
      if (!movieState.dateWatched) {
        updates.dateWatched = new Date().toISOString().split('T')[0]
      }
    }
    
    saveMovieState(updates)
  }

  const updateLiked = (isLiked: boolean) => {
    saveMovieState({ isLiked })
  }

  const updateNotes = (personalNotes: string) => {
    saveMovieState({ personalNotes })
  }

  const updateDateWatched = (dateWatched: string) => {
    saveMovieState({ dateWatched })
  }

  const clearState = () => {
    const clearedState: MovieState = {
      status: null,
      rating: 0,
      isLiked: false,
      dateWatched: null,
      personalNotes: ''
    }
    saveMovieState(clearedState)
  }

  return {
    movieState,
    loading,
    error,
    actions: {
      updateStatus,
      updateRating,
      updateLiked,
      updateNotes,
      updateDateWatched,
      clearState,
      reload: loadMovieState
    }
  }
}