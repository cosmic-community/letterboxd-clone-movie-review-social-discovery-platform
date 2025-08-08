# 🎬 Letterboxd Clone - Movie Review & Social Discovery Platform

A modern movie review and social discovery platform built with Next.js, TypeScript, and Cosmic CMS. Discover films, read reviews, create lists, and track your viewing history in a beautifully designed, cinematic interface.

## ✨ Features

### 🎥 Core Movie Features
- **Movie Database** - Comprehensive movie information with IMDb integration
- **Advanced Search** - Find movies by title, director, cast, genre, and more
- **Movie Details** - Rich movie pages with posters, trailers, cast, and crew information
- **Related Movies** - Smart recommendations based on genres and directors

### ⭐ Review System
- **User Reviews** - Rate and review movies with detailed feedback
- **Star Ratings** - 10-point rating system
- **Spoiler Protection** - Toggle spoiler warnings for sensitive content
- **Review Interactions** - Like reviews and track rewatches

### 📋 Lists & Collections
- **Curated Lists** - Create and share movie collections
- **Public/Private Lists** - Control visibility of your movie lists
- **Cover Images** - Beautiful visual representations of your lists
- **Collaborative Lists** - Work together on movie collections

### 👥 People & Credits
- **Cast & Crew** - Detailed profiles for directors, actors, and crew
- **Filmography** - Complete filmographies for people in the database
- **Biography** - Rich biographical information and career highlights

### 📊 Personal Tracking
- **Watchlist** - Keep track of movies you want to watch
- **Watch Status** - Mark movies as watched, currently watching, or want to watch
- **Personal Ratings** - Rate movies and track your viewing history
- **Personal Notes** - Add private notes to your movie experiences

### 🎯 Social Features
- **Movie Submissions** - Community-driven movie database expansion
- **User Profiles** - Track your movie journey and statistics
- **Community Reviews** - Discover what others think about films

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **CMS**: Cosmic CMS for content management
- **Icons**: Lucide React
- **Package Manager**: Bun
- **Deployment**: Vercel-ready

## 🎨 Design Features

- **Dark Theme** - Cinematic dark interface optimized for movie content
- **Responsive Design** - Beautiful on desktop, tablet, and mobile
- **Image Optimization** - Automatic image optimization with Imgix
- **Smooth Animations** - Polished transitions and interactions
- **Accessibility** - ARIA labels and keyboard navigation support

## 📁 Project Structure

```
├── app/                          # Next.js App Router pages
│   ├── movies/                   # Movie browsing and details
│   ├── reviews/                  # Review listings
│   ├── lists/                    # Movie lists and collections
│   ├── people/                   # Cast and crew profiles
│   ├── watchlist/               # Personal watchlist
│   └── movie-submissions/       # Community movie submissions
├── components/                   # Reusable React components
│   ├── MovieCard.tsx            # Movie poster card
│   ├── ReviewCard.tsx           # Review display component
│   ├── PersonCard.tsx           # Cast/crew profile card
│   ├── WatchlistButton.tsx      # Watchlist toggle
│   ├── RatingStars.tsx          # Interactive rating component
│   └── ...more
├── lib/                         # Utility functions
│   ├── cosmic.ts                # Cosmic CMS API functions
│   └── utils.ts                 # Helper utilities
├── hooks/                       # Custom React hooks
│   ├── useMovieState.ts         # Movie tracking state
│   └── useWatchlist.ts          # Watchlist management
└── types.ts                     # TypeScript type definitions
```

## 🛠️ Installation & Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd letterboxd-clone
```

2. **Install dependencies**
```bash
bun install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Fill in your Cosmic CMS credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. **Run the development server**
```bash
bun dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Content Management

This project uses Cosmic CMS with the following content structure:

### Content Types
- **Movies** - Movie information, metadata, and media
- **Reviews** - User reviews with ratings and spoiler flags
- **Lists** - Curated movie collections
- **People** - Cast and crew profiles
- **User Movie States** - Personal tracking data
- **Movie Submissions** - Community submissions for new movies

### Key Features
- **Rich Metadata** - Comprehensive movie information
- **Relationship Fields** - Connected content between movies, reviews, and people
- **Image Optimization** - Automatic image processing with Imgix
- **Content Validation** - Structured data with required fields

## 🎬 Usage Examples

### Movie Discovery
- Browse movies by genre, year, or rating
- Use advanced filters to find specific films
- Get personalized recommendations

### Personal Tracking
- Add movies to your watchlist
- Rate and review films you've watched
- Keep personal notes on your movie experiences

### Social Interaction
- Read community reviews
- Create and share movie lists
- Submit new movies to the database

## 🚀 Deployment

This project is optimized for deployment on Vercel:

1. **Deploy to Vercel**
```bash
vercel
```

2. **Set environment variables** in your Vercel dashboard

3. **Configure your Cosmic CMS** bucket with the required content types

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Cosmic CMS](https://cosmicjs.com) for content management
- Inspired by [Letterboxd](https://letterboxd.com) for the user experience
- Movie data integration with IMDb
- Icons by [Lucide](https://lucide.dev)

## 📧 Support

For support, email support@example.com or join our community discussions.

---

**Built with ❤️ for movie lovers everywhere**