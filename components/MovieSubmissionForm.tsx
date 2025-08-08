'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

export default function MovieSubmissionForm() {
  const [formData, setFormData] = useState({
    imdbUrl: '',
    justification: '',
    submittedBy: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const validateImdbUrl = (url: string): boolean => {
    const imdbRegex = /^https?:\/\/(www\.)?imdb\.com\/title\/tt\d+\/?$/
    return imdbRegex.test(url)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Validation
    if (!formData.imdbUrl || !formData.submittedBy) {
      setError('Please fill in all required fields')
      return
    }
    
    if (!validateImdbUrl(formData.imdbUrl)) {
      setError('Please enter a valid IMDb URL (e.g., https://www.imdb.com/title/tt0111161/)')
      return
    }
    
    setIsLoading(true)
    
    try {
      // In a real app, this would submit to an API
      console.log('Submitting movie:', formData)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setIsSubmitted(true)
      setFormData({
        imdbUrl: '',
        justification: '',
        submittedBy: ''
      })
    } catch (error) {
      console.error('Error submitting movie:', error)
      setError('Failed to submit movie. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="h-8 w-8 text-success" />
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Submission Received!
        </h3>
        <p className="text-text-secondary mb-4">
          Thank you for your movie submission. We'll review it and add it to our database if approved.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="btn-primary"
        >
          Submit Another Movie
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* IMDb URL */}
      <div>
        <label htmlFor="imdbUrl" className="block text-text-primary font-medium mb-2">
          IMDb URL *
        </label>
        <input
          type="url"
          id="imdbUrl"
          name="imdbUrl"
          value={formData.imdbUrl}
          onChange={handleChange}
          placeholder="https://www.imdb.com/title/tt0111161/"
          className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          required
        />
        <p className="text-text-muted text-sm mt-2">
          Enter the full IMDb URL for the movie you want to submit
        </p>
      </div>

      {/* Submitted By */}
      <div>
        <label htmlFor="submittedBy" className="block text-text-primary font-medium mb-2">
          Your Name *
        </label>
        <input
          type="text"
          id="submittedBy"
          name="submittedBy"
          value={formData.submittedBy}
          onChange={handleChange}
          placeholder="Your name"
          className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          required
        />
      </div>

      {/* Justification */}
      <div>
        <label htmlFor="justification" className="block text-text-primary font-medium mb-2">
          Why should this movie be added?
        </label>
        <textarea
          id="justification"
          name="justification"
          value={formData.justification}
          onChange={handleChange}
          placeholder="Tell us why this movie deserves to be in our database..."
          rows={4}
          className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-vertical"
        />
        <p className="text-text-muted text-sm mt-2">
          Optional: Help us understand why this movie should be included
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-lg text-error">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`btn-primary w-full flex items-center justify-center gap-2 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
            Submitting...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Submit Movie
          </>
        )}
      </button>
    </form>
  )
}