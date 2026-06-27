import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { serviceAreas } from "@/lib/site-config"
import { MapPin, ArrowRight } from "lucide-react"

export function ServiceAreasSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map Placeholder */}
          <div className="relative">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center">
              {/* Simple map representation */}
              <div className="relative w-full h-full p-8">
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Florida outline simplified */}
                  <path
                    d="M50 50 L350 50 L350 200 L300 350 L200 380 L100 350 L50 200 Z"
                    className="fill-accent/10 stroke-accent/30"
                    strokeWidth="2"
                  />
                  
                  {/* Service area highlight */}
                  <ellipse
                    cx="250"
                    cy="300"
                    rx="80"
                    ry="60"
                    className="fill-accent/30 stroke-accent"
                    strokeWidth="2"
                    strokeDasharray="5 3"
                  />
                  
                  {/* City markers */}
                  <g className="fill-accent">
                    <circle cx="260" cy="320" r="8" />
                    <circle cx="240" cy="280" r="6" />
                    <circle cx="280" cy="290" r="6" />
                    <circle cx="220" cy="310" r="5" />
                    <circle cx="290" cy="330" r="5" />
                  </g>
                </svg>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full bg-accent" />
                    <span className="text-foreground">Service Area</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <Badge variant="outline" className="mb-4">Service Areas</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                Serving South Florida
              </h2>
              <p className="text-lg text-muted-foreground text-pretty">
                We proudly serve residential and commercial clients across Miami-Dade, 
                Broward, and Palm Beach counties. Our expert team delivers premium 
                epoxy floor coatings throughout the region.
              </p>
            </div>

            {/* Counties */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Counties We Serve:</h3>
              <div className="flex flex-wrap gap-2">
                {serviceAreas.counties.map((county) => (
                  <Badge key={county} className="bg-accent/10 text-accent hover:bg-accent/20">
                    <MapPin className="h-3 w-3 mr-1" />
                    {county}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Cities */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Popular Cities:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {serviceAreas.cities.slice(0, 9).map((city) => (
                  <Link
                    key={city.slug}
                    href={`/service-areas/${city.slug}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted hover:bg-muted/80 text-foreground text-sm transition-colors"
                  >
                    <MapPin className="h-3 w-3 text-accent" />
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/service-areas">
                  View All Service Areas
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/quote">Get a Free Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
