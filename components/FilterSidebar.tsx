'use client'

import { useState } from 'react'
import { Filter, X, Calendar, Star, Globe, Clock } from 'lucide-react'

interface FilterOptions {
  genres: string[]
  yearRange: [number, number]
  ratingRange: [number, number]
  countries: string[]
  runtimeRange: [number, number]
}

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  onFiltersChange: (filters: FilterOptions) => void
  className?: string
}

const genres = [
  'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime',
  'Documentary', 'Drama', 'Family', 'Fantasy', 'Horror', 'Musical',
  'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'War', 'Western'
]

const countries = [
  'United States', 'United Kingdom', 'France', 'Germany', 'Italy',
  'Japan', 'South Korea', 'Spain', 'Canada', 'Australia', 'India'
]

export default function FilterSidebar({ isOpen, onClose, onFiltersChange, className }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    genres: [],
    yearRange: [1900, new Date().getFullYear()],
    ratingRange: [0, 10],
    countries: [],
    runtimeRange: [0, 300]
  })

  const handleGenreToggle = (genre: string) => {
    const newGenres = filters.genres.includes(genre)
      ? filters.genres.filter(g => g !== genre)
      : [...filters.genres, genre]
    
    const newFilters = { ...filters, genres: newGenres }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleCountryToggle = (country: string) => {
    const newCountries = filters.countries.includes(country)
      ? filters.countries.filter(c => c !== country)
      : [...filters.countries, country]
    
    const newFilters = { ...filters, countries: newCountries }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleYearRangeChange = (index: number, value: number) => {
    const newYearRange: [number, number] = [...filters.yearRange]
    newYearRange[index] = value
    
    const newFilters = { ...filters, yearRange: newYearRange }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleRatingRangeChange = (index: number, value: number) => {
    const newRatingRange: [number, number] = [...filters.ratingRange]
    newRatingRange[index] = value
    
    const newFilters = { ...filters, ratingRange: newRatingRange }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleRuntimeRangeChange = (index: number, value: number) => {
    const newRuntimeRange: [number, number] = [...filters.runtimeRange]
    newRuntimeRange[index] = value
    
    const newFilters = { ...filters, runtimeRange: newRuntimeRange }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const defaultFilters: FilterOptions = {
      genres: [],
      yearRange: [1900, new Date().getFullYear()],
      ratingRange: [0, 10],
      countries: [],
      runtimeRange: [0, 300]
    }
    setFilters(defaultFilters)
    onFiltersChange(defaultFilters)
  }

  const hasActiveFilters = 
    filters.genres.length > 0 ||
    filters.countries.length > 0 ||
    filters.yearRange[0] !== 1900 ||
    filters.yearRange[1] !== new Date().getFullYear() ||
    filters.ratingRange[0] !== 0 ||
    filters.ratingRange[1] !== 10 ||
    filters.runtimeRange[0] !== 0 ||
    filters.runtimeRange[1] !== 300

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static top-0 right-0 h-full lg:h-auto w-80 lg:w-full
        bg-surface lg:bg-transparent border-l lg:border-l-0 border-border
        z-50 lg:z-auto transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        ${className || ''}
      `}>
        <div className="p-6 lg:p-0 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-text-muted hover:text-text-primary transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="w-full text-left text-primary hover:text-primary-hover transition-colors text-sm"
              >
                Clear all filters
              </button>
            )}

            {/* Genres */}
            <div>
              <h3 className="font-semibold text-text-primary mb-3">Genres</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {genres.map(genre => (
                  <label key={genre} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.genres.includes(genre)}
                      onChange={() => handleGenreToggle(genre)}
                      className="rounded border-border bg-surface text-primary focus:ring-primary focus:ring-offset-0 focus:ring-offset-background"
                    />
                    <span className="text-text-secondary text-sm">{genre}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Year Range */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-4 w-4 text-text-muted" />
                <h3 className="font-semibold text-text-primary">Release Year</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-text-muted text-sm w-8">From</span>
                  <input
                    type="range"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={filters.yearRange[0]}
                    onChange={e => handleYearRangeChange(0, parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-text-secondary text-sm w-12">{filters.yearRange[0]}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-text-muted text-sm w-8">To</span>
                  <input
                    type="range"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={filters.yearRange[1]}
                    onChange={e => handleYearRangeChange(1, parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-text-secondary text-sm w-12">{filters.yearRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Rating Range */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-4 w-4 text-text-muted" />
                <h3 className="font-semibold text-text-primary">IMDb Rating</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-text-muted text-sm w-8">Min</span>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={filters.ratingRange[0]}
                    onChange={e => handleRatingRangeChange(0, parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-text-secondary text-sm w-12">{filters.ratingRange[0].toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-text-muted text-sm w-8">Max</span>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={filters.ratingRange[1]}
                    onChange={e => handleRatingRangeChange(1, parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-text-secondary text-sm w-12">{filters.ratingRange[1].toFixed(1)}</span>
                </div>
              </div>
            </div>

            {/* Runtime */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-text-muted" />
                <h3 className="font-semibold text-text-primary">Runtime (minutes)</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-text-muted text-sm w-8">Min</span>
                  <input
                    type="range"
                    min="0"
                    max="300"
                    step="10"
                    value={filters.runtimeRange[0]}
                    onChange={e => handleRuntimeRangeChange(0, parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-text-secondary text-sm w-12">{filters.runtimeRange[0]}m</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-text-muted text-sm w-8">Max</span>
                  <input
                    type="range"
                    min="0"
                    max="300"
                    step="10"
                    value={filters.runtimeRange[1]}
                    onChange={e => handleRuntimeRangeChange(1, parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-text-secondary text-sm w-12">{filters.runtimeRange[1]}m</span>
                </div>
              </div>
            </div>

            {/* Countries */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Globe className="h-4 w-4 text-text-muted" />
                <h3 className="font-semibold text-text-primary">Country</h3>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {countries.map(country => (
                  <label key={country} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.countries.includes(country)}
                      onChange={() => handleCountryToggle(country)}
                      className="rounded border-border bg-surface text-primary focus:ring-primary focus:ring-offset-0 focus:ring-offset-background"
                    />
                    <span className="text-text-secondary text-sm">{country}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}