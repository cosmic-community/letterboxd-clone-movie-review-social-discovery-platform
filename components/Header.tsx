'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Menu, X, Film } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-surface/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-primary hover:text-primary-hover transition-colors">
            <Film className="h-8 w-8" />
            <span className="text-xl font-bold hidden sm:block">
              Letterboxd Clone
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/movies" 
              className="text-text-secondary hover:text-text-primary transition-colors font-medium"
            >
              Movies
            </Link>
            <Link 
              href="/reviews" 
              className="text-text-secondary hover:text-text-primary transition-colors font-medium"
            >
              Reviews
            </Link>
            <Link 
              href="/lists" 
              className="text-text-secondary hover:text-text-primary transition-colors font-medium"
            >
              Lists
            </Link>
          </nav>

          {/* Search and Menu */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className="p-2 text-text-secondary hover:text-text-primary transition-colors">
              <Search className="h-5 w-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/movies" 
                className="text-text-secondary hover:text-text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Movies
              </Link>
              <Link 
                href="/reviews" 
                className="text-text-secondary hover:text-text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link 
                href="/lists" 
                className="text-text-secondary hover:text-text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Lists
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}