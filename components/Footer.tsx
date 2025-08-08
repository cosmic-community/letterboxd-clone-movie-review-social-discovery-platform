import Link from 'next/link'
import { Film, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center space-x-2 text-primary hover:text-primary-hover transition-colors mb-4">
              <Film className="h-6 w-6" />
              <span className="text-lg font-bold">Letterboxd Clone</span>
            </Link>
            <p className="text-text-muted text-sm">
              Discover, review, and track the films you love. A social movie platform for cinephiles.
            </p>
          </div>

          {/* Movies */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Movies</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/movies" className="text-text-secondary hover:text-text-primary transition-colors">
                  Browse Movies
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-text-secondary hover:text-text-primary transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/lists" className="text-text-secondary hover:text-text-primary transition-colors">
                  Lists
                </Link>
              </li>
              <li>
                <Link href="/people" className="text-text-secondary hover:text-text-primary transition-colors">
                  People
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/movie-submissions" className="text-text-secondary hover:text-text-primary transition-colors">
                  Submit Movies
                </Link>
              </li>
              <li>
                <Link href="/watchlist" className="text-text-secondary hover:text-text-primary transition-colors">
                  Watchlist
                </Link>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
                  Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
                  Help
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} Letterboxd Clone. All rights reserved.
          </p>
          <p className="text-text-muted text-sm flex items-center gap-1 mt-4 md:mt-0">
            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for movie lovers
          </p>
        </div>
      </div>
    </footer>
  )
}