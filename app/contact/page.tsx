import type { Metadata } from "next"
import { ContactPageContent } from "@/components/contact/contact-page-content"
import { absoluteUrl, getBreadcrumbSchema } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Contact | Elevated Decks",
  description:
    "Request a consultation for a custom deck project in Albany, Saratoga, Schenectady, Warren County, and nearby Capital Region markets.",
  keywords: [
    "deck consultation capital region ny",
    "contact custom deck builder albany ny",
    "saratoga springs deck estimate",
    "upstate new york deck contractor contact",
  ],
  alternates: {
    canonical: absoluteUrl("/contact"),
  },
  openGraph: {
    title: "Contact Elevated Decks | Capital Region Deck Consultations",
    description:
      "Talk with Elevated Decks about your custom deck, rooftop deck, or premium outdoor living project in Upstate New York.",
    url: absoluteUrl("/contact"),
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
}

export default function ContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Contact", url: absoluteUrl("/contact") },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactPageContent />
    </>
  )
}
