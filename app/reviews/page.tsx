import { getReviews } from '@/lib/cosmic'
import ReviewCard from '@/components/ReviewCard'

export const metadata = {
  title: 'Reviews - Letterboxd Clone',
  description: 'Read movie reviews from our community',
}

export default async function ReviewsPage() {
  const reviews = await getReviews()

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Reviews
          </h1>
          <p className="text-text-secondary text-lg">
            Discover what our community thinks about the latest films
          </p>
        </div>

        {/* Reviews Grid */}
        {reviews.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-text-muted">
                {reviews.length} review{reviews.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <div className="grid-reviews">
              {reviews.map((review) => (
                <ReviewCard 
                  key={review.id} 
                  review={review}
                  showMovie 
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No reviews found
            </h3>
            <p className="text-text-muted">
              Be the first to write a review!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}