import type { Metadata } from "next"
import { ContactPageContent } from "@/components/contact/contact-page-content"
import { absoluteUrl, getBreadcrumbSchema } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Request a Deck Estimate",
  description:
    "Request a deck estimate in Albany, Saratoga Springs, Clifton Park, Loudonville, or nearby Capital Region towns. Call (838) 280-0308 or send the form.",
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
      "Request a Trex, TimberTech, AZEK, or pressure-treated deck estimate in the Capital Region.",
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
