import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { preconnect, prefetchDNS } from 'react-dom'
import { GoogleAnalytics } from '@/components/google-analytics'
import { isGaEnabled } from '@/lib/analytics'
import { siteConfig } from '@/lib/site-config'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Custom Deck Builder in Albany & Saratoga Springs | Elevated Decks',
    template: '%s | Elevated Decks',
  },
  description:
    'Custom deck builder for Albany, Saratoga Springs, Clifton Park, Loudonville, and the Capital Region. Trex, TimberTech, AZEK, and pressure-treated decks.',
  keywords: [
    'deck builder albany ny',
    'deck builder saratoga springs ny',
    'custom deck builder clifton park ny',
    'deck contractor loudonville ny',
    'trex deck installer capital region',
    'azek deck builder upstate ny',
    'timbertech deck contractor ny',
    'pressure treated deck builder albany',
    'capital region deck builder',
    'deck builder niskayuna ny',
  ],
  authors: [{ name: 'Elevated Decks' }],
  creator: 'Elevated Decks',
  publisher: 'Elevated Decks',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Elevated Decks',
    title: 'Custom Deck Builder in Albany & Saratoga Springs | Elevated Decks',
    description:
      'Trex, TimberTech, AZEK, and pressure-treated decks for Capital Region homes.',
    images: [
      {
        url: '/blog/p1.jpg',
        alt: 'Finished composite deck on a Capital Region home',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Deck Builder in the Capital Region | Elevated Decks',
    description:
      'Trex, TimberTech, AZEK, and pressure-treated decks for Albany, Saratoga Springs, Clifton Park, and nearby towns.',
    images: ['/blog/p1.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#111111',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (isGaEnabled()) {
    prefetchDNS('https://www.googletagmanager.com')
    preconnect('https://www.googletagmanager.com')
    preconnect('https://www.google-analytics.com')
  }

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen overflow-x-hidden">
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  )
}
