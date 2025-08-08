// app/people/[slug]/page.tsx
import { getPerson } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PersonDetails from '@/components/PersonDetails'
import PersonFilmography from '@/components/PersonFilmography'
import { Person } from '@/types'

interface PersonPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PersonPageProps) {
  const { slug } = await params
  const person = await getPerson(slug)

  if (!person) {
    return {
      title: 'Person Not Found',
    }
  }

  return {
    title: `${person.metadata.full_name} - Letterboxd Clone`,
    description: person.metadata.biography ? person.metadata.biography.replace(/<[^>]*>/g, '').substring(0, 160) : `Explore the filmography of ${person.metadata.full_name}`,
  }
}

export default async function PersonPage({ params }: PersonPageProps) {
  const { slug } = await params
  const person = await getPerson(slug)

  if (!person) {
    notFound()
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <PersonDetails person={person} />
        <div className="mt-12">
          <PersonFilmography person={person} />
        </div>
      </div>
    </div>
  )
}