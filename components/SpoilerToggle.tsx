'use client'

import { useState } from 'react'
import { Eye, EyeOff, AlertTriangle } from 'lucide-react'

interface SpoilerToggleProps {
  children: React.ReactNode
  containsSpoilers: boolean
  className?: string
}

export default function SpoilerToggle({ children, containsSpoilers, className }: SpoilerToggleProps) {
  const [isRevealed, setIsRevealed] = useState(false)

  if (!containsSpoilers) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={`relative ${className || ''}`}>
      {!isRevealed ? (
        <div className="relative">
          {/* Blurred Content */}
          <div className="blur-sm select-none pointer-events-none">
            {children}
          </div>
          
          {/* Spoiler Overlay */}
          <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm border-2 border-dashed border-warning/50 rounded-lg flex flex-col items-center justify-center text-center p-6">
            <AlertTriangle className="h-8 w-8 text-warning mb-3" />
            <h3 className="font-semibold text-text-primary mb-2">
              Spoiler Warning
            </h3>
            <p className="text-text-muted text-sm mb-4">
              This content contains spoilers. Click to reveal.
            </p>
            <button
              onClick={() => setIsRevealed(true)}
              className="flex items-center gap-2 px-4 py-2 bg-warning text-black rounded-lg font-medium hover:bg-warning/90 transition-colors"
            >
              <Eye className="h-4 w-4" />
              Show Spoilers
            </button>
          </div>
        </div>
      ) : (
        <div className="relative">
          {children}
          
          {/* Hide Button */}
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-2 text-warning text-sm">
              <AlertTriangle className="h-4 w-4" />
              <span>Spoiler content revealed</span>
            </div>
            <button
              onClick={() => setIsRevealed(false)}
              className="flex items-center gap-2 text-text-muted hover:text-text-primary text-sm transition-colors"
            >
              <EyeOff className="h-3 w-3" />
              Hide Spoilers
            </button>
          </div>
        </div>
      )}
    </div>
  )
}