# Letterboxd Clone - Movie Review & Social Discovery Platform

![App Preview](https://imgix.cosmicjs.com/0a40d350-7458-11f0-a051-23c10f41277a-photo-1440404653325-ab127d49abc1-1754658191893.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A sophisticated movie review and social discovery platform inspired by Letterboxd, built with Next.js 15 and Cosmic CMS. This cinematic web application enables users to discover films, write reviews, create curated lists, and track their viewing history in a beautifully designed, social environment.

## Features

- 🎬 **Rich Movie Database** - Complete movie information with IMDb integration, cast details, ratings, and high-quality poster images
- ⭐ **Social Review System** - Write detailed reviews with star ratings, spoiler warnings, and rewatch tracking  
- 📝 **Personal Movie Tracking** - Maintain watchlists, mark movies as watched, and track personal ratings and viewing dates
- 📚 **Curated Lists & Collections** - Create and discover public, private, or collaborative movie lists with cover images
- 🔍 **Advanced Discovery** - Filter by genre, year, rating, and country with intelligent search and recommendations
- 👥 **Community Features** - User profiles, activity tracking, and social movie discovery
- 🎯 **Movie Submissions** - Community-driven movie additions with admin approval workflow
- 📊 **User Analytics** - Personal viewing statistics and rating history
- 💫 **Cinematic Design** - Premium dark theme optimized for movie discovery and visual storytelling

## ## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=6895f0c1af5d4c334a9b7557&clone_repository=6895f746af5d4c334a9b757e)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> I want to build a https://letterboxd.com/ clone.

### Code Generation Prompt

> You are building a movie review and social discovery platform similar to Letterboxd using the Cosmic CMS content model. Here's everything you need to create an engaging, functional movie database website.

🎯 Project Overview
Build a social movie platform where users can discover films, read reviews, create lists, and track their viewing history. The site should feel cinematic and encourage movie discovery.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless CMS for content management
- **Imgix** - Image optimization and transformation
- **Lucide React** - Beautiful icon library
- **Inter Font** - Modern typography

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket with the movie database content model

### Installation

1. Clone this repository
```bash
git clone <repository-url>
cd letterboxd-clone
```

2. Install dependencies
```bash
bun install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Fill in your Cosmic credentials:
- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key  
- `COSMIC_WRITE_KEY` - Your Cosmic write key

4. Run the development server
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Cosmic SDK Examples

### Fetching Movies with Relationships
```typescript
// Get movies with connected data
const movies = await cosmic.objects
  .find({
    type: 'movies',
    'metadata.status.key': 'published'
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Getting Movie Reviews
```typescript
// Fetch reviews for a specific movie
const reviews = await cosmic.objects
  .find({
    type: 'reviews',
    'metadata.movie': movieId
  })
  .depth(1)
  .sort('metadata.review_date')
```

### User Movie Tracking
```typescript
// Get user's watchlist
const watchlist = await cosmic.objects
  .find({
    type: 'user-movie-states',
    'metadata.user_name': 'Sarah Johnson',
    'metadata.status.key': 'want_to_watch'
  })
  .depth(1)
```

### Creating Movie Lists
```typescript
// Create a new movie list
await cosmic.objects.insertOne({
  type: 'lists',
  title: 'Greatest Films of All Time',
  metadata: {
    list_type: { key: 'public', value: 'Public' },
    description: '<p>Essential cinema masterpieces</p>',
    movies: [movieId1, movieId2],
    created_by: 'Film Society Admin',
    creation_date: '2024-01-15'
  }
})
```

## Cosmic CMS Integration

### Object Types Structure

- **Movies** - Core movie data with IMDb integration, posters, cast, and ratings
- **Reviews** - User reviews with ratings, spoiler flags, and viewing dates  
- **Lists** - Curated movie collections (public/private/collaborative)
- **People** - Cast and crew profiles with filmographies
- **User Movie States** - Personal tracking (watchlist, watched, ratings)
- **Movie Submissions** - Community movie additions awaiting approval

### Key Features

- **Content Relationships** - Movies connect to reviews, lists, and user states
- **Rich Media** - Poster images, backdrop galleries, and profile photos
- **Social Features** - User ratings, reviews, lists, and community discovery
- **Admin Workflow** - Movie submission approval process
- **Personal Tracking** - Watchlist, watched status, and rating history

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically

### Netlify
1. Connect your GitHub repository
2. Set build command: `bun run build`
3. Set publish directory: `out` (if using static export)
4. Configure environment variables

### Environment Variables for Production

Set these in your deployment platform:
- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key
- `COSMIC_WRITE_KEY` - Your Cosmic write key (for write operations)

<!-- README_END -->