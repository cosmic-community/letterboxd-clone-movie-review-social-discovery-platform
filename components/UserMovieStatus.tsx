'use client'

import { useState } from 'react'
import { Movie } from '@/types'
import { Eye, Clock, Check, Heart } from 'lucide-react'
import RatingStars from './RatingStars'

interface UserMovieStatusProps {
  movie: Movie
  className?: string
}

export default function UserMovieStatus({ movie, className }: UserMovieStatusProps) {
  const [status, setStatus] = useState<'want_to_watch' | 'watched' | 'currently_watching' | null>(null)
  const [rating, setRating] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleStatusChange = async (newStatus: typeof status) => {
    if (isLoading) return
    
    setIsLoading(true)
    
    try {
      // In a real app, this would make an API call
      setStatus(newStatus === status ? null : newStatus)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (error) {
      console.error('Error updating status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRatingChange = async (newRating: number) => {
    if (isLoading) return
    
    setIsLoading(true)
    
    try {
      // In a real app, this would make an API call
      setRating(newRating)
      
      // Automatically set to watched if rating is given
      if (newRating > 0 && status !== 'watched') {
        setStatus('watched')
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (error) {
      console.error('Error updating rating:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLikeToggle = async () => {
    if (isLoading) return
    
    setIsLoading(true)
    
    try {
      // In a real app, this would make an API call
      setIsLiked(!isLiked)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
    } catch (error) {
      console.error('Error updating like:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusButton = (buttonStatus: typeof status, icon: React.ReactNode, label: string) => (
    <button
      onClick={() => handleStatusChange(buttonStatus)}
      disabled={isLoading}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
        status === buttonStatus
          ? 'bg-primary/20 text-primary border-primary/50'
          : 'bg-surface hover:bg-surface-hover text-text-secondary hover:text-text-primary'
      } border ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  )

  return (
    <div className={`card ${className || ''}`}>
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        Your Status
      </h3>

      {/* Status Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {getStatusButton('want_to_watch', <Eye className="h-4 w-4" />, 'Want to Watch')}
        {getStatusButton('currently_watching', <Clock className="h-4 w-4" />, 'Watching')}
        {getStatusButton('watched', <Check className="h-4 w-4" />, 'Watched')}
      </div>

      {/* Rating */}
      <div className="mb-4">
        <label className="block text-text-muted text-sm font-medium mb-2">
          Your Rating
        </label>
        <RatingStars
          rating={rating}
          maxRating={10}
          onRatingChange={handleRatingChange}
          readonly={isLoading}
        />
      </div>

      {/* Like Button */}
      <div className="flex items-center justify-between">
        <span className="text-text-muted text-sm">
          Like this movie?
        </span>
        <button
          onClick={handleLikeToggle}
          disabled={isLoading}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all duration-200 ${
            isLiked
              ? 'text-red-500 hover:text-red-400'
              : 'text-text-muted hover:text-red-500'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          <span className="text-sm">{isLiked ? 'Liked' : 'Like'}</span>
        </button>
      </div>

      {/* Status Summary */}
      {(status || rating > 0 || isLiked) && (
        <div className="mt-4 pt-4 border-t border-border text-sm text-text-muted">
          {status === 'watched' && rating > 0 && (
            <p>You rated this movie {rating}/10</p>
          )}
          {status === 'want_to_watch' && (
            <p>Added to your watchlist</p>
          )}
          {status === 'currently_watching' && (
            <p>Currently watching this movie</p>
          )}
        </div>
      )}
    </div>
  )
}