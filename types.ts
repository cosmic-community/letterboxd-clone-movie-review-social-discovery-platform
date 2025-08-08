// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Movie object type
export interface Movie extends CosmicObject {
  type: 'movies';
  metadata: {
    imdb_id: string;
    imdb_url?: string;
    release_year: number;
    director: string;
    synopsis?: string;
    runtime_minutes?: number;
    genres?: string[];
    content_rating?: {
      key: string;
      value: string;
    };
    cast?: string;
    imdb_rating?: number;
    poster_image?: {
      url: string;
      imgix_url: string;
    };
    backdrop_images?: Array<{
      url: string;
      imgix_url: string;
    }>;
    trailer_url?: string;
    country?: string;
    language?: string;
    status: {
      key: string;
      value: string;
    };
  };
}

// Review object type
export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    movie?: Movie;
    rating?: number;
    review_text?: string;
    contains_spoilers?: boolean;
    date_watched?: string;
    is_rewatch?: boolean;
    liked?: boolean;
    review_date: string;
    author_name: string;
  };
}

// List object type
export interface MovieList extends CosmicObject {
  type: 'lists';
  metadata: {
    description?: string;
    list_type: {
      key: string;
      value: string;
    };
    cover_image?: {
      url: string;
      imgix_url: string;
    };
    movies?: Movie[];
    created_by: string;
    creation_date: string;
    tags?: string;
  };
}

// Person object type
export interface Person extends CosmicObject {
  type: 'people';
  metadata: {
    full_name: string;
    biography?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    birth_date?: string;
    birth_place?: string;
    imdb_person_id?: string;
    primary_profession?: {
      key: string;
      value: string;
    };
  };
}

// Movie submission object type
export interface MovieSubmission extends CosmicObject {
  type: 'movie-submissions';
  metadata: {
    imdb_url: string;
    imdb_id?: string;
    submitted_by: string;
    submission_date: string;
    status: {
      key: string;
      value: string;
    };
    admin_notes?: string;
    auto_populated_data?: Record<string, any>;
    user_justification?: string;
  };
}

// User movie state object type
export interface UserMovieState extends CosmicObject {
  type: 'user-movie-states';
  metadata: {
    movie?: Movie;
    user_name: string;
    status: {
      key: string;
      value: string;
    };
    date_added: string;
    date_watched?: string;
    personal_rating?: number;
    personal_notes?: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type literals
export type MovieStatus = 'published' | 'pending' | 'draft';
export type ContentRating = 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17' | 'NR';
export type ListType = 'public' | 'private' | 'collaborative';
export type WatchStatus = 'want_to_watch' | 'watched' | 'currently_watching';
export type SubmissionStatus = 'pending' | 'approved' | 'rejected' | 'needs_changes';

// Component prop types
export interface MovieCardProps {
  movie: Movie;
  showRating?: boolean;
  className?: string;
}

export interface ReviewCardProps {
  review: Review;
  showMovie?: boolean;
  className?: string;
}

export interface ListCardProps {
  list: MovieList;
  className?: string;
}

// Utility types
export type CreateMovieData = Omit<Movie, 'id' | 'created_at' | 'modified_at'>;
export type CreateReviewData = Omit<Review, 'id' | 'created_at' | 'modified_at'>;

// Type guards
export function isMovie(obj: CosmicObject): obj is Movie {
  return obj.type === 'movies';
}

export function isReview(obj: CosmicObject): obj is Review {
  return obj.type === 'reviews';
}

export function isMovieList(obj: CosmicObject): obj is MovieList {
  return obj.type === 'lists';
}