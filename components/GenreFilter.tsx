'use client'

import { useState } from 'react'
import { Filter } from 'lucide-react'

const genres = [
  'All',
  'Action',
  'Adventure', 
  'Animation',
  'Biography',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'Horror',
  'Musical',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'War',
  'Western'
]

interface GenreFilterProps {
  selectedGenre?: string
  onGenreChange?: (genre: string) => void
  className?: string
}

export default function GenreFilter({ 
  selectedGenre = 'All', 
  onGenreChange,
  className 
}: GenreFilterProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleGenreSelect = (genre: string) => {
    if (onGenreChange) {
      onGenreChange(genre)
    }
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className || ''}`}>
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-surface hover:bg-surface-hover border border-border rounded-lg text-text-secondary hover:text-text-primary transition-colors"
      >
        <Filter className="h-4 w-4" />
        <span>Genre: {selectedGenre}</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-surface border border-border rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="p-2">
            <div className="max-h-64 overflow-y-auto">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleGenreSelect(genre)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    selectedGenre === genre
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40"
        />
      )}
    </div>
  )
}