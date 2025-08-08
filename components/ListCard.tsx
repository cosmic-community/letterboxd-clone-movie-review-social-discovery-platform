import Link from 'next/link'
import { MovieList } from '@/types'
import { User, Calendar, Film, Globe, Lock, Users } from 'lucide-react'

interface ListCardProps {
  list: MovieList
  className?: string
}

export default function ListCard({ list, className }: ListCardProps) {
  const coverImage = list.metadata?.cover_image?.imgix_url
  const listType = list.metadata?.list_type
  const createdBy = list.metadata?.created_by
  const creationDate = list.metadata?.creation_date
  const movies = list.metadata?.movies || []
  const description = list.metadata?.description
  const tags = list.metadata?.tags

  const getListTypeIcon = (type: string) => {
    switch (type) {
      case 'public':
        return <Globe className="h-4 w-4" />
      case 'private':
        return <Lock className="h-4 w-4" />
      case 'collaborative':
        return <Users className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  const getListTypeColor = (type: string) => {
    switch (type) {
      case 'public':
        return 'text-primary'
      case 'private':
        return 'text-warning'
      case 'collaborative':
        return 'text-accent'
      default:
        return 'text-primary'
    }
  }

  return (
    <div className={`card hover:border-primary/50 transition-colors ${className || ''}`}>
      {/* Cover Image */}
      {coverImage && (
        <div className="aspect-backdrop bg-surface rounded-lg overflow-hidden mb-4">
          <img
            src={`${coverImage}?w=600&h=338&fit=crop&auto=format,compress`}
            alt={list.title}
            className="w-full h-full object-cover"
            width="300"
            height="169"
          />
        </div>
      )}

      {/* List Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-text-primary text-lg line-clamp-2">
          {list.title}
        </h3>
        
        {listType && (
          <div className={`flex items-center gap-1 ${getListTypeColor(listType.key)} text-sm`}>
            {getListTypeIcon(listType.key)}
            <span className="capitalize">{listType.value}</span>
          </div>
        )}
      </div>

      {/* Description */}
      {description && (
        <div 
          className="text-text-secondary text-sm mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}

      {/* Movie Count */}
      <div className="flex items-center gap-2 text-text-muted text-sm mb-3">
        <Film className="h-4 w-4" />
        <span>
          {movies.length} movie{movies.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Movie Posters Preview */}
      {movies.length > 0 && (
        <div className="flex -space-x-2 mb-4">
          {movies.slice(0, 5).map((movie, index) => (
            <div key={movie.id} className="relative">
              {movie.metadata?.poster_image?.imgix_url ? (
                <img
                  src={`${movie.metadata.poster_image.imgix_url}?w=60&h=90&fit=crop&auto=format,compress`}
                  alt={movie.title}
                  className="w-10 h-15 object-cover rounded border-2 border-surface"
                  width="40"
                  height="60"
                />
              ) : (
                <div className="w-10 h-15 bg-border rounded border-2 border-surface flex items-center justify-center">
                  <Film className="h-3 w-3 text-text-muted" />
                </div>
              )}
            </div>
          ))}
          {movies.length > 5 && (
            <div className="w-10 h-15 bg-border rounded border-2 border-surface flex items-center justify-center text-xs text-text-muted">
              +{movies.length - 5}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-text-muted text-sm border-t border-border pt-3">
        <div className="flex items-center gap-2">
          <User className="h-3 w-3" />
          <span>{createdBy}</span>
        </div>
        
        {creationDate && (
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            <span>{new Date(creationDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {/* Tags */}
      {tags && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex flex-wrap gap-1">
            {tags.split(',').map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-surface text-text-muted text-xs rounded"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}