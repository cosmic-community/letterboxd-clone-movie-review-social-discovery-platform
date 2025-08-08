import { MovieList } from '@/types'
import ListCard from './ListCard'

interface ListsSectionProps {
  lists: MovieList[]
  title?: string
  className?: string
}

export default function ListsSection({ 
  lists, 
  title = "Popular Lists", 
  className 
}: ListsSectionProps) {
  if (!lists.length) {
    return null
  }

  return (
    <section className={className}>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
          {title}
        </h2>
        <a 
          href="/lists" 
          className="text-primary hover:text-primary-hover font-medium transition-colors"
        >
          View All →
        </a>
      </div>
      
      <div className="grid-lists">
        {lists.map((list) => (
          <ListCard key={list.id} list={list} />
        ))}
      </div>
    </section>
  )
}