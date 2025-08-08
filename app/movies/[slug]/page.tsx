// app/movies/[slug]/page.tsx
import { getMovie, getMovieReviews } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import MovieHero from '@/components/MovieHero'
import MovieDetails from '@/components/MovieDetails'
import ReviewsSection from '@/components/ReviewsSection'
import { Movie, Review } from '@/types'

interface MoviePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: MoviePageProps) {
  const { slug } = await params
  const movie = await getMovie(slug)

  if (!movie) {
    return {
      title: 'Movie Not Found',
    }
  }

  return {
    title: `${movie.title} (${movie.metadata.release_year}) - Letterboxd Clone`,
    description: movie.metadata.synopsis ? movie.metadata.synopsis.replace(/<[^>]*>/g, '') : `Watch and review ${movie.title}`,
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { slug } = await params
  const [movie, reviews] = await Promise.all([
    getMovie(slug),
    getMovie(slug).then(movie => movie ? getMovieReviews(movie.id) : [])
  ])

  if (!movie) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <MovieHero movie={movie} />
      
      <div className="container-custom py-12 space-y-12">
        <MovieDetails movie={movie} />
        
        {reviews.length > 0 && (
          <ReviewsSection 
            reviews={reviews} 
            title="Reviews" 
            showMovie={false}
          />
        )}
      </div>
    </div>
  )
}