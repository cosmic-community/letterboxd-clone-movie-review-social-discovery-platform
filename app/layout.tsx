import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Letterboxd Clone - Movie Review & Social Discovery',
  description: 'Discover, review, and track the films you love. A social movie platform for cinephiles.',
  keywords: 'movies, reviews, films, cinema, social, discovery, ratings, watchlist',
  authors: [{ name: 'Letterboxd Clone Team' }],
  openGraph: {
    title: 'Letterboxd Clone - Movie Review & Social Discovery',
    description: 'Discover, review, and track the films you love',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}