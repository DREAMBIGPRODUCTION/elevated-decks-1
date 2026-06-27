import Link from "next/link"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"
import { Phone, ArrowRight, Clock, Shield, ThumbsUp } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 bg-accent text-accent-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-accent-foreground/80 mb-8 max-w-2xl mx-auto text-pretty">
            Get a free, no-obligation estimate for your epoxy flooring project. 
            Our experts will assess your space and provide a detailed quote.
          </p>

          {/* Trust Points */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>Free Estimates</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-5 w-5" />
              <span>Satisfaction Guaranteed</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8"
            >
              <Link href="/quote">
                Get Your Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8"
            >
              <a href={`tel:${siteConfig.phoneClean}`}>
                <Phone className="mr-2 h-5 w-5" />
                {siteConfig.phone}
              </a>
            </Button>
          </div>

          {/* Hours */}
          <p className="text-sm text-accent-foreground/70 mt-6">
            Call us Mon-Sat, 7am-7pm | Emergency services available
          </p>
        </div>
      </div>
    </section>
  )
}
