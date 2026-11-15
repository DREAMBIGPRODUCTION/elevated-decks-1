import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { HomeExperience } from "@/components/sections/home-experience"
import { HomePlaces } from "@/components/sections/home-places"
import { HomeStandard } from "@/components/sections/home-standard"
import { HomeAreas } from "@/components/sections/home-areas"
import { CTAForm } from "@/components/sections/cta-form"
import { absoluteUrl, getBreadcrumbSchema, getSiteSchema } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: {
    absolute: "Custom Deck Builder in Albany & Saratoga Springs | Elevated Decks",
  },
  description:
    "Custom Trex, TimberTech, AZEK, and pressure-treated decks in Saratoga Springs, Lake George, Clifton Park, Loudonville, Albany, and the Capital Region.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: "Custom Deck Builder in Saratoga, Lake George, and Albany | Elevated Decks",
    description:
      "Trex, TimberTech, AZEK, and pressure-treated decks for Saratoga Springs, Lake George, Clifton Park, and the Capital Region.",
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
        <HomeExperience />
        <HomePlaces />
        <HomeStandard />
        <HomeAreas />
        <CTAForm />
      </main>
      <Footer />
    </>
  )
}
