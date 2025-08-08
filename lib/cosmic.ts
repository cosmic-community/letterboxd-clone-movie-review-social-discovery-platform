import { createBucketClient } from '@cosmicjs/sdk'
import { Movie, Review, MovieList, Person, MovieSubmission, UserMovieState } from '../types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Movies
export async function getMovies(): Promise<Movie[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'movies',
        'metadata.status.key': 'published'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Movie[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch movies')
  }
}

export async function getMovie(slug: string): Promise<Movie | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'movies',
        slug
      })
      .depth(1)
    
    const movie = response.object as Movie
    
    if (!movie || movie.metadata?.status?.key !== 'published') {
      return null
    }
    
    return movie
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

export async function getMoviesByGenre(genre: string): Promise<Movie[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'movies',
        'metadata.genres': genre,
        'metadata.status.key': 'published'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Movie[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch movies by genre')
  }
}

// Reviews
export async function getReviews(): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'reviews'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-metadata.review_date')
    return response.objects as Review[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch reviews')
  }
}

export async function getMovieReviews(movieId: string): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'reviews',
        'metadata.movie': movieId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-metadata.review_date')
    return response.objects as Review[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch movie reviews')
  }
}

export async function getReview(slug: string): Promise<Review | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'reviews',
        slug
      })
      .depth(1)
    
    return response.object as Review
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

// Lists
export async function getMovieLists(): Promise<MovieList[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'lists',
        'metadata.list_type.key': 'public'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-metadata.creation_date')
    return response.objects as MovieList[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch movie lists')
  }
}

export async function getMovieList(slug: string): Promise<MovieList | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'lists',
        slug
      })
      .depth(1)
    
    return response.object as MovieList
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

// People
export async function getPeople(): Promise<Person[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'people'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Person[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch people')
  }
}

export async function getPerson(slug: string): Promise<Person | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'people',
        slug
      })
      .depth(1)
    
    return response.object as Person
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

// User Movie States
export async function getUserMovieStates(userName: string): Promise<UserMovieState[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'user-movie-states',
        'metadata.user_name': userName
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-metadata.date_added')
    return response.objects as UserMovieState[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch user movie states')
  }
}

export async function getUserWatchlist(userName: string): Promise<UserMovieState[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'user-movie-states',
        'metadata.user_name': userName,
        'metadata.status.key': 'want_to_watch'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-metadata.date_added')
    return response.objects as UserMovieState[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch user watchlist')
  }
}

// Movie Submissions
export async function getMovieSubmissions(): Promise<MovieSubmission[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'movie-submissions'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .sort('-metadata.submission_date')
    return response.objects as MovieSubmission[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch movie submissions')
  }
}

// Search functionality
export async function searchMovies(query: string): Promise<Movie[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'movies',
        'metadata.status.key': 'published'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    const movies = response.objects as Movie[]
    
    // Simple client-side search - in production, use full-text search
    return movies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.metadata?.director?.toLowerCase().includes(query.toLowerCase()) ||
      movie.metadata?.cast?.toLowerCase().includes(query.toLowerCase())
    )
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to search movies')
  }
}