import { Person } from '@/types'
import { Calendar, MapPin, User, ExternalLink } from 'lucide-react'

interface PersonDetailsProps {
  person: Person
}

export default function PersonDetails({ person }: PersonDetailsProps) {
  const profilePhotoUrl = person.metadata?.profile_photo?.imgix_url
  const fullName = person.metadata.full_name
  const biography = person.metadata?.biography
  const profession = person.metadata?.primary_profession
  const birthPlace = person.metadata?.birth_place
  const birthDate = person.metadata?.birth_date
  const imdbPersonId = person.metadata?.imdb_person_id

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Photo */}
        <div className="flex-shrink-0">
          <div className="w-64 aspect-square bg-surface rounded-xl overflow-hidden">
            {profilePhotoUrl ? (
              <img
                src={`${profilePhotoUrl}?w=512&h=512&fit=crop&auto=format,compress`}
                alt={fullName}
                className="w-full h-full object-cover"
                width="256"
                height="256"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-surface text-text-muted">
                <User className="h-24 w-24" />
              </div>
            )}
          </div>
        </div>

        {/* Person Info */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            {fullName}
          </h1>

          {profession && (
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium mb-6">
              {profession.value}
            </div>
          )}

          <div className="space-y-3 mb-6">
            {birthDate && (
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-text-muted" />
                <div>
                  <span className="text-text-muted">Born:</span>{' '}
                  <span className="text-text-primary font-medium">
                    {new Date(birthDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            )}

            {birthPlace && (
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-text-muted" />
                <div>
                  <span className="text-text-muted">Birth Place:</span>{' '}
                  <span className="text-text-primary font-medium">{birthPlace}</span>
                </div>
              </div>
            )}
          </div>

          {imdbPersonId && (
            <a
              href={`https://www.imdb.com/name/${imdbPersonId}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-hover transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              View on IMDb
            </a>
          )}
        </div>
      </div>

      {/* Biography */}
      {biography && (
        <div className="card">
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            Biography
          </h2>
          <div
            className="text-text-secondary prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: biography }}
          />
        </div>
      )}
    </div>
  )
}