import Link from 'next/link'
import { Film } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 text-primary">
              <Film className="h-6 w-6" />
              <span className="text-lg font-bold">Letterboxd Clone</span>
            </Link>
            <p className="text-text-muted text-sm">
              A social movie discovery platform for film lovers. Track, rate, and discover your next favorite film.
            </p>
          </div>

          {/* Discover */}
          <div className="space-y-4">
            <h3 className="text-text-primary font-semibold">Discover</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/movies" className="text-text-muted hover:text-text-primary transition-colors">
                  Browse Movies
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-text-muted hover:text-text-primary transition-colors">
                  Recent Reviews
                </Link>
              </li>
              <li>
                <Link href="/lists" className="text-text-muted hover:text-text-primary transition-colors">
                  Popular Lists
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="text-text-primary font-semibold">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-text-muted">Top Reviewers</span>
              </li>
              <li>
                <span className="text-text-muted">Popular Critics</span>
              </li>
              <li>
                <span className="text-text-muted">Film Discussions</span>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="text-text-primary font-semibold">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-text-muted">About Us</span>
              </li>
              <li>
                <a 
                  href="https://www.cosmicjs.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-text-primary transition-colors"
                >
                  Powered by Cosmic
                </a>
              </li>
              <li>
                <span className="text-text-muted">Privacy Policy</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-text-muted text-sm">
              © 2024 Letterboxd Clone. Built with Cosmic CMS.
            </p>
            <p className="text-text-muted text-sm">
              Made for movie lovers, by movie lovers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}