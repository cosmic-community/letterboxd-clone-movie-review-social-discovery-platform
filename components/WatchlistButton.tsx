'use client'

import { useState } from 'react'
import { Bookmark, BookmarkCheck, Plus } from 'lucide-react'
import { Movie } from '@/types'

interface WatchlistButtonProps {
  movie: Movie
  isInWatchlist?: boolean
  onToggle?: (movie: Movie, isInWatchlist: boolean) => void
  className?: string
}

export default function WatchlistButton({ 
  movie, 
  isInWatchlist = false, 
  onToggle,
  className 
}: WatchlistButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [inWatchlist, setInWatchlist] = useState(isInWatchlist)

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isLoading) return

    setIsLoading(true)
    
    try {
      // In a real app, this would make an API call
      const newStatus = !inWatchlist
      setInWatchlist(newStatus)
      
      if (onToggle) {
        onToggle(movie, newStatus)
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (error) {
      console.error('Error toggling watchlist:', error)
      // Revert on error
      setInWatchlist(inWatchlist)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${
        inWatchlist
          ? 'bg-primary/10 text-primary hover:bg-primary/20'
          : 'bg-surface hover:bg-surface-hover text-text-secondary hover:text-text-primary border border-border'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${className || ''}`}
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
      ) : inWatchlist ? (
        <BookmarkCheck className="h-4 w-4" />
      ) : (
        <Plus className="h-4 w-4" />
      )}
      <span>
        {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
      </span>
    </button>
  )
}