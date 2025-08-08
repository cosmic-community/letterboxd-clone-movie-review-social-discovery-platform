import { Review } from '@/types'
import ReviewCard from './ReviewCard'

interface ReviewsSectionProps {
  reviews: Review[]
  title?: string
  showMovie?: boolean
  className?: string
}

export default function ReviewsSection({ 
  reviews, 
  title = "Recent Reviews", 
  showMovie = true,
  className 
}: ReviewsSectionProps) {
  if (!reviews.length) {
    return null
  }

  return (
    <section className={className}>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
          {title}
        </h2>
        {showMovie && (
          <a 
            href="/reviews" 
            className="text-primary hover:text-primary-hover font-medium transition-colors"
          >
            View All →
          </a>
        )}
      </div>
      
      <div className="grid-reviews">
        {reviews.map((review) => (
          <ReviewCard 
            key={review.id} 
            review={review} 
            showMovie={showMovie}
          />
        ))}
      </div>
    </section>
  )
}