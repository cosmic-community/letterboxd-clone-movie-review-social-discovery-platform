import { getPeople } from '@/lib/cosmic'
import PersonCard from '@/components/PersonCard'

export const metadata = {
  title: 'People - Letterboxd Clone',
  description: 'Explore directors, actors, and other film professionals',
}

export default async function PeoplePage() {
  const people = await getPeople()

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            People
          </h1>
          <p className="text-text-secondary text-lg">
            Explore the talented individuals behind your favorite films
          </p>
        </div>

        {/* People Grid */}
        {people.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-text-muted">
                {people.length} {people.length !== 1 ? 'people' : 'person'} found
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {people.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No people found
            </h3>
            <p className="text-text-muted">
              Check back later for new additions to our people database.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}