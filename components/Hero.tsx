'use client'

import { useState, useEffect } from 'react'
import { Movie } from '@/types'
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react'

interface HeroProps {
  movies: Movie[]
}

export default function Hero({ movies }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-rotate hero images
  useEffect(() => {
    if (movies.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % movies.length)
      }, 6000)
      return () => clearInterval(interval)
    }
  }, [movies.length])

  if (!movies.length) {
    return (
      <div className="relative h-[60vh] bg-surface flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            Welcome to Letterboxd Clone
          </h1>
          <p className="text-text-secondary text-lg">
            Discover, review, and track the films you love
          </p>
        </div>
      </div>
    )
  }

  const currentMovie = movies[currentIndex]
  const backdropUrl = currentMovie?.metadata?.poster_image?.imgix_url

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length)
  }

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Background Image */}
      {backdropUrl && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backdropUrl}?w=1920&h=1080&fit=crop&auto=format,compress)`,
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
              {currentMovie.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-6 text-white/80">
              <span>{currentMovie.metadata.release_year}</span>
              <span>•</span>
              <span>{currentMovie.metadata.director}</span>
              {currentMovie.metadata.imdb_rating && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <span className="text-warning">★</span>
                    <span>{currentMovie.metadata.imdb_rating}/10</span>
                  </div>
                </>
              )}
            </div>

            {currentMovie.metadata.synopsis && (
              <p className="text-white/90 text-lg mb-8 line-clamp-3">
                {currentMovie.metadata.synopsis.replace(/<[^>]*>/g, '')}
              </p>
            )}

            <div className="flex gap-4">
              <button className="btn-primary flex items-center gap-2">
                <Play className="h-5 w-5" />
                Watch Trailer
              </button>
              <a 
                href={`/movies/${currentMovie.slug}`}
                className="btn-secondary flex items-center gap-2"
              >
                <Info className="h-5 w-5" />
                More Info
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      {movies.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {movies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}