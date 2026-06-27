import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
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
    default: 'Elevated Decks | Luxury Deck Builder in Saratoga Springs, Loudonville & Upstate NY',
    template: '%s | Elevated Decks',
  },
  description:
    'Luxury deck builder serving Saratoga Springs, Loudonville, Niskayuna, Malta, Lake George, and select Upstate New York markets. Custom decks, elevated decks, premium materials, and refined outdoor living design.',
  keywords: [
    'luxury deck builder saratoga springs ny',
    'custom deck builder loudonville ny',
    'premium deck contractor niskayuna ny',
    'high-end deck builder lake george ny',
    'custom deck design malta ny',
    'luxury deck builder clifton park ny',
    'capital region deck contractor',
    'upstate new york composite decking',
    'trex deck builder saratoga county',
    'azek deck contractor upstate ny',
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
    title: 'Elevated Decks | Luxury Deck Builder in Saratoga Springs, Loudonville & Upstate NY',
    description:
      'Luxury deck builder serving Saratoga Springs, Loudonville, Niskayuna, Malta, Lake George, and select Upstate New York markets.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elevated Decks | Luxury Deck Builder in Upstate New York',
    description:
      'Custom luxury decks for Saratoga Springs, Loudonville, Niskayuna, Malta, Lake George, and nearby Upstate NY markets.',
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
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen overflow-x-hidden">{children}</body>
    </html>
  )
}
