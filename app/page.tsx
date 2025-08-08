import { getMovies, getReviews, getMovieLists } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import MovieGrid from '@/components/MovieGrid'
import ReviewsSection from '@/components/ReviewsSection'
import ListsSection from '@/components/ListsSection'
import { Movie, Review, MovieList } from '@/types'

export default async function HomePage() {
  const [movies, reviews, lists] = await Promise.all([
    getMovies(),
    getReviews(),
    getMovieLists()
  ])

  // Get featured movies (first 12)
  const featuredMovies = movies.slice(0, 12)
  
  // Get recent reviews (first 6)
  const recentReviews = reviews.slice(0, 6)
  
  // Get popular lists (first 3)
  const popularLists = lists.slice(0, 3)

  return (
    <div className="min-h-screen">
      <Hero movies={featuredMovies} />
      
      <div className="container-custom py-12 space-y-16">
        {/* Featured Movies */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
              Featured Movies
            </h2>
            <a 
              href="/movies" 
              className="text-primary hover:text-primary-hover font-medium transition-colors"
            >
              View All →
            </a>
          </div>
          <MovieGrid movies={featuredMovies} />
        </section>

        {/* Recent Reviews */}
        {recentReviews.length > 0 && (
          <ReviewsSection reviews={recentReviews} />
        )}

        {/* Popular Lists */}
        {popularLists.length > 0 && (
          <ListsSection lists={popularLists} />
        )}
      </div>
    </div>
  )
}