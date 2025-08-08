import Link from 'next/link'
import { Review } from '@/types'
import { Star, User, Calendar, Eye, AlertTriangle } from 'lucide-react'

interface ReviewCardProps {
  review: Review
  showMovie?: boolean
  className?: string
}

export default function ReviewCard({ review, showMovie = false, className }: ReviewCardProps) {
  const movie = review.metadata?.movie
  const rating = review.metadata?.rating
  const reviewText = review.metadata?.review_text
  const authorName = review.metadata?.author_name
  const dateWatched = review.metadata?.date_watched
  const isRewatch = review.metadata?.is_rewatch
  const containsSpoilers = review.metadata?.contains_spoilers
  const liked = review.metadata?.liked

  return (
    <div className={`card ${className || ''}`}>
      {/* Movie Info (if showing movie) */}
      {showMovie && movie && (
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
          {movie.metadata?.poster_image?.imgix_url && (
            <img
              src={`${movie.metadata.poster_image.imgix_url}?w=80&h=120&fit=crop&auto=format,compress`}
              alt={movie.title}
              className="w-12 h-18 object-cover rounded"
              width="48"
              height="72"
            />
          )}
          <div>
            <Link 
              href={`/movies/${movie.slug}`}
              className="font-semibold text-text-primary hover:text-primary transition-colors"
            >
              {movie.title}
            </Link>
            <p className="text-sm text-text-muted">
              {movie.metadata?.release_year} • {movie.metadata?.director}
            </p>
          </div>
        </div>
      )}

      {/* Review Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-text-secondary">
            <User className="h-4 w-4" />
            <span className="font-medium">{authorName}</span>
          </div>
          
          {dateWatched && (
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <Calendar className="h-3 w-3" />
              <span>{new Date(dateWatched).toLocaleDateString()}</span>
            </div>
          )}
          
          {isRewatch && (
            <div className="flex items-center gap-1 text-secondary text-sm">
              <Eye className="h-3 w-3" />
              <span>Rewatch</span>
            </div>
          )}
        </div>

        {/* Rating and Like */}
        <div className="flex items-center gap-3">
          {rating && (
            <div className="flex items-center gap-1 text-warning">
              <Star className="h-4 w-4 fill-warning" />
              <span className="font-medium">{rating}/10</span>
            </div>
          )}
          
          {liked && (
            <div className="text-red-500">
              ❤️
            </div>
          )}
        </div>
      </div>

      {/* Spoiler Warning */}
      {containsSpoilers && (
        <div className="flex items-center gap-2 bg-warning/10 text-warning px-3 py-2 rounded-lg mb-4">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm font-medium">Contains Spoilers</span>
        </div>
      )}

      {/* Review Text */}
      {reviewText && (
        <div 
          className="text-text-secondary prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: reviewText }}
        />
      )}

      {!reviewText && (
        <p className="text-text-muted italic">No written review</p>
      )}
    </div>
  )
}