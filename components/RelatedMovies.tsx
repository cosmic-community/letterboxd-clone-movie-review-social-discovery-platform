'use client'

import { useState, useEffect } from 'react'
import { Movie } from '@/types'
import { getMovies } from '@/lib/cosmic'
import MovieCard from './MovieCard'
import { Film } from 'lucide-react'

interface RelatedMoviesProps {
  movie: Movie
  limit?: number
  className?: string
}

export default function RelatedMovies({ movie, limit = 6, className }: RelatedMoviesProps) {
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedMovies = async () => {
      try {
        const allMovies = await getMovies()
        
        // Filter out the current movie
        const otherMovies = allMovies.filter(m => m.id !== movie.id)
        
        // Find movies with matching criteria
        const related = otherMovies.filter(m => {
          const movieGenres = movie.metadata?.genres || []
          const otherGenres = m.metadata?.genres || []
          const movieDirector = movie.metadata?.director
          const otherDirector = m.metadata?.director
          const movieYear = movie.metadata?.release_year
          const otherYear = m.metadata?.release_year
          
          // Score based on matching criteria
          let score = 0
          
          // Same director (highest priority)
          if (movieDirector && otherDirector && movieDirector === otherDirector) {
            score += 10
          }
          
          // Shared genres
          const sharedGenres = movieGenres.filter(genre => otherGenres.includes(genre))
          score += sharedGenres.length * 3
          
          // Similar release year (within 5 years)
          if (movieYear && otherYear && Math.abs(movieYear - otherYear) <= 5) {
            score += 2
          }
          
          return score > 0
        })
        
        // Sort by relevance score (recalculate for sorting)
        related.sort((a, b) => {
          const scoreA = calculateScore(movie, a)
          const scoreB = calculateScore(movie, b)
          return scoreB - scoreA
        })
        
        setRelatedMovies(related.slice(0, limit))
      } catch (error) {
        console.error('Error fetching related movies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedMovies()
  }, [movie, limit])

  const calculateScore = (baseMovie: Movie, compareMovie: Movie): number => {
    const baseGenres = baseMovie.metadata?.genres || []
    const compareGenres = compareMovie.metadata?.genres || []
    const baseDirector = baseMovie.metadata?.director
    const compareDirector = compareMovie.metadata?.director
    const baseYear = baseMovie.metadata?.release_year
    const compareYear = compareMovie.metadata?.release_year
    
    let score = 0
    
    if (baseDirector && compareDirector && baseDirector === compareDirector) {
      score += 10
    }
    
    const sharedGenres = baseGenres.filter(genre => compareGenres.includes(genre))
    score += sharedGenres.length * 3
    
    if (baseYear && compareYear && Math.abs(baseYear - compareYear) <= 5) {
      score += 2
    }
    
    return score
  }

  if (loading) {
    return (
      <div className={`card ${className || ''}`}>
        <h3 className="text-xl font-semibold text-text-primary mb-6">
          Related Movies
        </h3>
        <div className="grid-movies">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="aspect-poster bg-surface rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  if (relatedMovies.length === 0) {
    return null
  }

  return (
    <div className={`card ${className || ''}`}>
      <div className="flex items-center gap-3 mb-6">
        <Film className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold text-text-primary">
          Related Movies
        </h3>
      </div>

      <div className="grid-movies">
        {relatedMovies.map((relatedMovie) => (
          <MovieCard 
            key={relatedMovie.id} 
            movie={relatedMovie} 
            showRating 
          />
        ))}
      </div>
    </div>
  )
}