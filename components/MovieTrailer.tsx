'use client'

import { useState } from 'react'
import { Play, X, ExternalLink } from 'lucide-react'

interface MovieTrailerProps {
  trailerUrl?: string | null
  movieTitle: string
  className?: string
}

export default function MovieTrailer({ trailerUrl, movieTitle, className }: MovieTrailerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!trailerUrl) {
    return null
  }

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const videoId = getYouTubeVideoId(trailerUrl)
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : trailerUrl || ''

  const openModal = () => {
    setIsModalOpen(true)
    // Prevent body scroll
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    // Restore body scroll
    document.body.style.overflow = 'unset'
  }

  return (
    <>
      {/* Trailer Button */}
      <button
        onClick={openModal}
        className={`btn-primary flex items-center gap-2 ${className || ''}`}
      >
        <Play className="h-5 w-5" />
        Watch Trailer
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80"
            onClick={closeModal}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-4xl mx-4 aspect-video bg-black rounded-lg overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            {/* Video Embed */}
            {videoId ? (
              <iframe
                src={embedUrl}
                title={`${movieTitle} Trailer`}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white">
                <ExternalLink className="h-12 w-12 mb-4" />
                <p className="text-lg mb-4">External trailer link</p>
                <a
                  href={trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-4 w-4" />
                  Open in New Tab
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}