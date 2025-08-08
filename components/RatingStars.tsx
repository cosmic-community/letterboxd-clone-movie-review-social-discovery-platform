'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

interface RatingStarsProps {
  rating?: number
  maxRating?: number
  onRatingChange?: (rating: number) => void
  readonly?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function RatingStars({
  rating = 0,
  maxRating = 10,
  onRatingChange,
  readonly = false,
  size = 'md',
  className
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState(0)
  const [currentRating, setCurrentRating] = useState(rating)

  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }

  const handleClick = (value: number) => {
    if (readonly) return
    
    setCurrentRating(value)
    if (onRatingChange) {
      onRatingChange(value)
    }
  }

  const handleMouseEnter = (value: number) => {
    if (readonly) return
    setHoverRating(value)
  }

  const handleMouseLeave = () => {
    if (readonly) return
    setHoverRating(0)
  }

  // Convert rating to stars (assuming rating is out of maxRating)
  const starCount = Math.min(5, Math.ceil(maxRating / 2)) // Max 5 stars
  const starsToShow = Math.ceil(currentRating / (maxRating / starCount))
  const displayRating = hoverRating || currentRating

  return (
    <div className={`flex items-center gap-1 ${className || ''}`}>
      <div className="flex items-center">
        {Array.from({ length: starCount }).map((_, index) => {
          const starValue = (index + 1) * (maxRating / starCount)
          const isFilled = displayRating >= starValue
          const isHalfFilled = displayRating >= starValue - (maxRating / starCount / 2) && displayRating < starValue

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
              disabled={readonly}
              className={`transition-colors duration-150 ${
                readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
              }`}
            >
              <Star
                className={`${sizeClasses[size]} transition-colors duration-150 ${
                  isFilled
                    ? 'text-warning fill-warning'
                    : isHalfFilled
                    ? 'text-warning fill-warning/50'
                    : 'text-text-muted'
                }`}
              />
            </button>
          )
        })}
      </div>
      
      {!readonly && (
        <span className="text-sm text-text-muted ml-2">
          {displayRating > 0 ? `${displayRating}/${maxRating}` : 'Rate'}
        </span>
      )}
      
      {readonly && rating > 0 && (
        <span className="text-sm text-text-muted ml-1">
          {rating}/{maxRating}
        </span>
      )}
    </div>
  )
}