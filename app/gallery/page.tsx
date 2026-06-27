import type { Metadata } from "next"
import { GalleryPageContent } from "@/components/gallery/gallery-page-content"
import { absoluteUrl, getBreadcrumbSchema } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Project Gallery | Elevated Decks",
  description:
    "Explore custom deck projects from Albany, Saratoga, Troy, Delmar, Guilderland, and surrounding Capital Region communities.",
  keywords: [
    "deck projects capital region ny",
    "albany ny deck gallery",
    "saratoga springs custom deck examples",
    "upstate new york deck portfolio",
  ],
  alternates: {
    canonical: absoluteUrl("/gallery"),
  },
  openGraph: {
    title: "Elevated Decks Project Gallery | Upstate New York Deck Portfolio",
    description:
      "Browse completed composite, PVC, and pressure-treated deck projects from the Capital Region and nearby Upstate New York markets.",
    url: absoluteUrl("/gallery"),
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
}

export default function GalleryPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Projects", url: absoluteUrl("/gallery") },
  ])
  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${siteConfig.name} Project Gallery`,
    description:
      "Completed custom deck projects across the Capital Region and nearby Upstate New York markets.",
    url: absoluteUrl("/gallery"),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
      />
      <GalleryPageContent />
    </>
  )
}
