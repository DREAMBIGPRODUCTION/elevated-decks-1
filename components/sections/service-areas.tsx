import Link from "next/link"
import { serviceAreas, siteConfig } from "@/lib/site-config"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function ServiceAreas() {
  return (
    <section id="service-areas" className="py-16 sm:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <span className="text-sm uppercase tracking-widest text-accent font-medium mb-4 block">
            Where we build
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mb-6 text-balance">
            Deck builder for Albany, Saratoga, and Schenectady counties
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {siteConfig.name} designs and builds Trex, TimberTech, AZEK, and
            pressure-treated decks for homes across the Capital Region. Site
            visits cover these towns and nearby communities in Warren County.
          </p>
        </div>
        <ul className="flex flex-wrap gap-2 mb-8">
          {serviceAreas.cities.map((city) => (
            <li
              key={city}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground"
            >
              {city}, NY
            </li>
          ))}
        </ul>
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/contact">
            Request a site visit
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
