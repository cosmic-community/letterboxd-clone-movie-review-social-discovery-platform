import Link from 'next/link'
import { Person } from '@/types'
import { User, Calendar, MapPin } from 'lucide-react'

interface PersonCardProps {
  person: Person
  className?: string
}

export default function PersonCard({ person, className }: PersonCardProps) {
  const profilePhotoUrl = person.metadata?.profile_photo?.imgix_url
  const fullName = person.metadata.full_name
  const profession = person.metadata?.primary_profession
  const birthPlace = person.metadata?.birth_place
  const birthDate = person.metadata?.birth_date

  return (
    <Link href={`/people/${person.slug}`} className={`group ${className || ''}`}>
      <div className="card hover:border-primary/50 transition-all duration-300">
        {/* Profile Photo */}
        <div className="aspect-square bg-surface rounded-lg overflow-hidden mb-4">
          {profilePhotoUrl ? (
            <img
              src={`${profilePhotoUrl}?w=300&h=300&fit=crop&auto=format,compress`}
              alt={fullName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width="150"
              height="150"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-surface text-text-muted">
              <User className="h-12 w-12" />
            </div>
          )}
        </div>

        {/* Person Info */}
        <div className="space-y-2">
          <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors line-clamp-2">
            {fullName}
          </h3>

          {profession && (
            <p className="text-sm text-primary font-medium">
              {profession.value}
            </p>
          )}

          {birthPlace && (
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <MapPin className="h-3 w-3" />
              <span className="line-clamp-1">{birthPlace}</span>
            </div>
          )}

          {birthDate && (
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <Calendar className="h-3 w-3" />
              <span>{new Date(birthDate).getFullYear()}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}