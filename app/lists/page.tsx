import { getMovieLists } from '@/lib/cosmic'
import ListCard from '@/components/ListCard'

export const metadata = {
  title: 'Lists - Letterboxd Clone',
  description: 'Explore curated movie lists from our community',
}

export default async function ListsPage() {
  const lists = await getMovieLists()

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Lists
          </h1>
          <p className="text-text-secondary text-lg">
            Discover curated collections of great films
          </p>
        </div>

        {/* Lists Grid */}
        {lists.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-text-muted">
                {lists.length} list{lists.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <div className="grid-lists">
              {lists.map((list) => (
                <ListCard key={list.id} list={list} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No lists found
            </h3>
            <p className="text-text-muted">
              Create the first movie list!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}