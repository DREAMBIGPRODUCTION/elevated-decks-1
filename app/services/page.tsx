import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { MaterialsSections } from "@/components/services/materials-sections"
import { ServicesQuickNav } from "@/components/services/services-quick-nav"
import { deckCategories, featuredProjects, siteConfig } from "@/lib/site-config"
import { absoluteUrl, getBreadcrumbSchema } from "@/lib/seo"
import { ArrowRight, Phone, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Services & Materials | Elevated Decks",
  description:
    "Custom deck services for the Capital Region. Trex and TimberTech decking, official Trex and AZEK railings, and integrated deck lighting.",
  alternates: {
    canonical: absoluteUrl("/services"),
  },
  openGraph: {
    title: "Deck Services & Materials | Elevated Decks",
    description:
      "Explore deck services, Trex and TimberTech decking, official railings, and integrated deck lighting across the Capital Region.",
    url: absoluteUrl("/services"),
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
}


export default function ServicesPage() {
  const heroProject = featuredProjects[0]
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Services", url: absoluteUrl("/services") },
  ])
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom Deck Design and Construction",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: "Capital Region, New York",
    serviceType: deckCategories.map((category) => category.name),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <Header />
      <main className="pt-16 sm:pt-20">
        {/* Hero */}
        <section className="relative py-16 sm:py-24 md:py-32 bg-primary text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image src={heroProject.image} alt="" fill className="object-cover" aria-hidden="true" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-sm uppercase tracking-widest text-accent font-medium mb-4 block">
                Beautiful Outdoor Living
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-balance leading-tight">
                Custom Deck Services for the Capital Region
              </h1>
              <p className="text-lg sm:text-xl text-primary-foreground/70 mb-8 text-pretty leading-relaxed">
                We design and build premium low-maintenance outdoor living spaces for homeowners
                throughout the Capital Region and nearby Upstate New York communities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground h-14 px-8">
                  <Link href="/contact">
                    Start Your Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 h-14 px-8 bg-transparent">
                  <a href={`tel:+1${siteConfig.phoneClean}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    {siteConfig.phone}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <ServicesQuickNav />

        <MaterialsSections />

        {/* Why Choose Us */}
        <section className="py-16 sm:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-sm uppercase tracking-widest text-accent font-medium mb-4 block">
                  The Elevated Difference
                </span>
                <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-8 text-balance">
                  Built for Real Service Conditions
                </h2>
                <ul className="space-y-5">
                  {[
                    "Licensed, insured, and committed to quality craftsmanship",
                    "Custom design guidance tailored to your home and site",
                    "Permitting and code coordination handled from start to finish",
                    "Structural detailing for elevation changes, snow loads, and freeze-thaw exposure",
                    "Premium materials selected for long-term outdoor performance",
                    "Free on-site consultations",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-4">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-primary-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card text-foreground p-5 sm:p-8 rounded-lg">
                <h3 className="font-serif text-2xl font-semibold mb-4">Planning a Deck in the Capital Region?</h3>
                <p className="text-muted-foreground mb-6">
                  Schedule a free consultation with our team. We&apos;ll assess your site,
                  talk through layout and material options, and outline a deck plan that fits
                  your home and how you want to use the space.
                </p>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/contact">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-accent text-accent-foreground">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-6 text-balance">
              Start Your Upstate New York Deck Project
            </h2>
            <p className="text-lg text-accent-foreground/80 mb-8 max-w-2xl mx-auto text-pretty">
              If you&apos;re planning a new deck in the Capital Region, or a nearby Upstate
              New York community, we&apos;re ready to help you move from concept to construction.
            </p>
            <Button asChild size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-10">
              <Link href="/contact">
                Schedule Your Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

