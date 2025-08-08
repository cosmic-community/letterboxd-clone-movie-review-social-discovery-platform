import { getMovieSubmissions } from '@/lib/cosmic'
import MovieSubmissionForm from '@/components/MovieSubmissionForm'
import { Plus, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export const metadata = {
  title: 'Movie Submissions - Letterboxd Clone',
  description: 'Submit movies to be added to our database',
}

export default async function MovieSubmissionsPage() {
  const submissions = await getMovieSubmissions()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-warning" />
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-success" />
      case 'rejected':
        return <XCircle className="h-4 w-4 text-error" />
      case 'needs_changes':
        return <AlertCircle className="h-4 w-4 text-warning" />
      default:
        return <Clock className="h-4 w-4 text-warning" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-warning'
      case 'approved':
        return 'text-success'
      case 'rejected':
        return 'text-error'
      case 'needs_changes':
        return 'text-warning'
      default:
        return 'text-warning'
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Movie Submissions
          </h1>
          <p className="text-text-secondary text-lg">
            Help us expand our movie database by submitting new films
          </p>
        </div>

        {/* Submission Form */}
        <div className="mb-12">
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <Plus className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold text-text-primary">
                Submit a New Movie
              </h2>
            </div>
            <MovieSubmissionForm />
          </div>
        </div>

        {/* Submissions List */}
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Recent Submissions
          </h2>
          
          {submissions.length > 0 ? (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div key={submission.id} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-text-primary mb-2">
                        {submission.title}
                      </h3>
                      
                      <div className="space-y-2 text-sm text-text-secondary">
                        <p>
                          <span className="text-text-muted">IMDb URL:</span>{' '}
                          <a
                            href={submission.metadata.imdb_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary-hover"
                          >
                            {submission.metadata.imdb_url}
                          </a>
                        </p>
                        
                        <p>
                          <span className="text-text-muted">Submitted by:</span>{' '}
                          {submission.metadata.submitted_by}
                        </p>
                        
                        <p>
                          <span className="text-text-muted">Date:</span>{' '}
                          {new Date(submission.metadata.submission_date).toLocaleDateString()}
                        </p>
                        
                        {submission.metadata.user_justification && (
                          <p>
                            <span className="text-text-muted">Reason:</span>{' '}
                            {submission.metadata.user_justification}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className={`flex items-center gap-2 ${getStatusColor(submission.metadata.status.key)}`}>
                      {getStatusIcon(submission.metadata.status.key)}
                      <span className="font-medium">{submission.metadata.status.value}</span>
                    </div>
                  </div>
                  
                  {submission.metadata.admin_notes && (
                    <div className="border-t border-border pt-4 mt-4">
                      <p className="text-text-muted text-sm mb-2">Admin Notes:</p>
                      <div
                        className="text-text-secondary text-sm"
                        dangerouslySetInnerHTML={{ __html: submission.metadata.admin_notes }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                No submissions yet
              </h3>
              <p className="text-text-muted">
                Be the first to submit a movie for our database!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}