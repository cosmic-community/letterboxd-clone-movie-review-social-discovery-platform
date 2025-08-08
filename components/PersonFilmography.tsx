'use client'

import { useState, useEffect } from 'react'
import { Person, Movie } from '@/types'
import { getMovies } from '@/lib/cosmic'
import MovieCard from './MovieCard'
import { Film } from 'lucide-react'

interface PersonFilmographyProps {
  person: Person
  className?: string
}

export default function PersonFilmography({ person, className }: PersonFilmographyProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFilmography = async () => {
      try {
        const allMovies = await getMovies()
        // Filter movies where this person is involved (director or cast)
        const personMovies = allMovies.filter(movie => {
          const director = movie.metadata?.director?.toLowerCase()
          const cast = movie.metadata?.cast?.toLowerCase()
          const personName = person.metadata.full_name.toLowerCase()
          
          return (
            director?.includes(personName) ||
            cast?.includes(personName)
          )
        })
        
        // Sort by release year, newest first
        personMovies.sort((a, b) => (b.metadata.release_year || 0) - (a.metadata.release_year || 0))
        
        setMovies(personMovies)
      } catch (error) {
        console.error('Error fetching filmography:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFilmography()
  }, [person])

  if (loading) {
    return (
      <div className={`card ${className || ''}`}>
        <h3 className="text-xl font-semibold text-text-primary mb-4">
          Filmography
        </h3>
        <div className="grid-movies">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-poster bg-surface rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`card ${className || ''}`}>
      <div className="flex items-center gap-3 mb-6">
        <Film className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold text-text-primary">
          Filmography
        </h3>
        {movies.length > 0 && (
          <span className="text-text-muted">
            ({movies.length} movie{movies.length !== 1 ? 's' : ''})
          </span>
        )}
      </div>

      {movies.length > 0 ? (
        <div className="grid-movies">
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              showRating 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Film className="h-12 w-12 text-text-muted mx-auto mb-3" />
          <p className="text-text-muted">
            No movies found for this person in our database.
          </p>
        </div>
      )}
    </div>
  )
}