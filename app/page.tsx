import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { ServicesGrid } from "@/components/sections/services-grid"
import { DesignSection } from "@/components/sections/design-section"
import { ProjectGallery } from "@/components/sections/project-gallery"
import { FacebookReelsSection } from "@/components/sections/facebook-reels"
import { Materials } from "@/components/sections/materials"
import { Process } from "@/components/sections/process"
import { Testimonials } from "@/components/sections/testimonials"
import { CTAForm } from "@/components/sections/cta-form"
import { absoluteUrl, getBreadcrumbSchema, getSiteSchema } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Luxury Deck Builder in the Capital Region",
  description:
    "Elevated Decks designs and builds custom composite, AZEK, elevated, and rooftop decks across Albany, Saratoga, Loudonville, Clifton Park, and nearby Upstate New York markets.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: "Elevated Decks | Custom Deck Builder in Upstate New York",
    description:
      "Luxury deck design, structural expertise, and premium outdoor living construction for the Capital Region and nearby Upstate New York communities.",
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
}

export default function HomePage() {
  const siteSchema = getSiteSchema()
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: absoluteUrl("/") },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main>
        <Hero />
        <ServicesGrid />
        <DesignSection />
        <ProjectGallery />
        <FacebookReelsSection />
        <Materials />
        <Process />
        <Testimonials />
        <CTAForm />
      </main>
      <Footer />
    </>
  )
}
