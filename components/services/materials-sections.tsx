import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  deckingBrands,
  lightingProducts,
  railingProducts,
  type AccessoryProduct,
} from "@/lib/site-config"
import { ArrowRight, CheckCircle, ExternalLink, Lightbulb, Shield, Palette, Award, Droplets } from "lucide-react"

function AccessoryProductBlock({
  product,
  reversed = false,
  dark = false,
}: {
  product: AccessoryProduct
  reversed?: boolean
  dark?: boolean
}) {
  return (
    <div
      className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}
    >
      <div className="w-full lg:w-1/2">
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted shadow-lg">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            className="object-cover"
          />
        </div>
        <p className={`mt-3 text-xs ${dark ? "text-[var(--deck-cream)]/50" : "text-muted-foreground"}`}>
          Product imagery courtesy of {product.brand}.
        </p>
      </div>
      <div className="w-full lg:w-1/2">
        <span className="text-sm uppercase tracking-widest text-accent font-medium mb-2 block">
          {product.subtitle}
        </span>
        <h3 className={`font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 text-balance ${dark ? "text-[var(--deck-cream)]" : "text-foreground"}`}>
          {product.title}
        </h3>
        <p className={`text-sm font-medium mb-4 ${dark ? "text-[var(--deck-cream)]/60" : "text-muted-foreground"}`}>
          {product.brand}
        </p>
        <p className={`leading-relaxed mb-6 ${dark ? "text-[var(--deck-cream)]/75" : "text-muted-foreground"}`}>
          {product.description}
        </p>
        <ul className="space-y-3 mb-6">
          {product.highlights.map((highlight) => (
            <li key={highlight} className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
              <span className={`font-medium ${dark ? "text-[var(--deck-cream)]/90" : "text-foreground"}`}>
                {highlight}
              </span>
            </li>
          ))}
        </ul>
        <div className="mb-6">
          <p className={`text-xs uppercase tracking-wider mb-3 font-medium ${dark ? "text-[var(--deck-cream)]/50" : "text-muted-foreground"}`}>
            Popular lines we install
          </p>
          <div className="flex flex-wrap gap-2">
            {product.lines.map((line) => (
              <span
                key={line}
                className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                  dark
                    ? "bg-[var(--deck-cream)]/10 text-[var(--deck-cream)]/80"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {line}
              </span>
            ))}
          </div>
        </div>
        <Link
          href={product.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
        >
          View official {product.brand} products
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

export function MaterialsSections() {
  return (
    <>
      {/* Brand Navigation Bar */}
      <section id="materials" className="py-12 bg-secondary border-b border-border scroll-mt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm uppercase tracking-widest text-muted-foreground mb-8 font-medium">
            Authorized Installer
          </p>
          <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center items-center gap-8 md:gap-20 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:pb-0">
            {deckingBrands.map((brand) => (
              <a
                key={brand.id}
                href={`#${brand.id}`}
                className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-foreground/60 hover:text-accent transition-colors whitespace-nowrap shrink-0"
              >
                {brand.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Product Sections */}
      {deckingBrands.map((brand, brandIndex) => {
        const isDark = brandIndex % 2 === 0
        return (
          <section
            key={brand.id}
            id={brand.id}
            className={`py-16 sm:py-24 lg:py-32 scroll-mt-36 ${isDark ? "bg-[var(--deck-charcoal)] text-[var(--deck-cream)]" : "bg-background text-foreground"}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-center mb-20 ${brandIndex % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
                <div className="w-full lg:w-1/2">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                    <Image
                      src={brand.image}
                      alt={`${brand.name} decking installed`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <span className="text-sm uppercase tracking-widest text-accent font-medium mb-3 block">
                    {brand.tagline}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">
                    {brand.name}
                  </h2>
                  <p className={`text-lg leading-relaxed mb-8 ${isDark ? "text-[var(--deck-cream)]/70" : "text-muted-foreground"}`}>
                    {brand.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {brand.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className={`text-sm font-medium ${isDark ? "text-[var(--deck-cream)]/80" : "text-foreground"}`}>
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-serif text-2xl md:text-3xl font-semibold mb-2 text-center">
                  {brand.name} Product Lines
                </h3>
                <p className={`text-center mb-12 ${isDark ? "text-[var(--deck-cream)]/60" : "text-muted-foreground"}`}>
                  Explore the full range of collections we install
                </p>
              </div>
              <div className={`grid md:grid-cols-2 ${brand.collections.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-6`}>
                {brand.collections.map((collection) => (
                  <Card
                    key={collection.name}
                    className={`overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                      isDark
                        ? "bg-[var(--deck-dark-card)] border-[var(--deck-cream)]/10 text-[var(--deck-cream)]"
                        : "bg-card border-border"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-full ${
                          collection.tier === "Ultra Premium"
                            ? "bg-accent/20 text-accent"
                            : collection.tier === "Premium"
                              ? "bg-accent/10 text-accent"
                              : isDark
                                ? "bg-[var(--deck-cream)]/10 text-[var(--deck-cream)]/60"
                                : "bg-muted text-muted-foreground"
                        }`}>
                          {collection.tier}
                        </span>
                        <Award className={`h-5 w-5 ${isDark ? "text-[var(--deck-cream)]/30" : "text-muted-foreground/40"}`} />
                      </div>
                      <h4 className="font-serif text-xl font-semibold mb-3">
                        {collection.name}
                      </h4>
                      <p className={`text-sm leading-relaxed mb-5 ${isDark ? "text-[var(--deck-cream)]/60" : "text-muted-foreground"}`}>
                        {collection.description}
                      </p>
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Palette className={`h-4 w-4 ${isDark ? "text-[var(--deck-cream)]/40" : "text-muted-foreground/50"}`} />
                          <span className={`text-xs uppercase tracking-wider font-medium ${isDark ? "text-[var(--deck-cream)]/40" : "text-muted-foreground/60"}`}>
                            Available Colors
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {collection.colors.map((color) => (
                            <span
                              key={color}
                              className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                                isDark
                                  ? "bg-[var(--deck-cream)]/8 text-[var(--deck-cream)]/70"
                                  : "bg-secondary text-secondary-foreground"
                              }`}
                            >
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* Railings — primary product focus */}
      <section id="railings" className="py-16 sm:py-24 lg:py-32 bg-background scroll-mt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-widest text-accent font-medium mb-4 block">
              Our Specialty
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4 text-balance">
              Trex &amp; TimberTech AZEK Railings
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
              Railing is a core part of what we sell and install. We are an authorized installer
              for official Trex and TimberTech AZEK railing systems.
            </p>
          </div>
          <div className="space-y-16 sm:space-y-24">
            {railingProducts.map((product, index) => (
              <AccessoryProductBlock
                key={product.id}
                product={product}
                reversed={index % 2 !== 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Official deck lighting */}
      <section id="lighting" className="py-16 sm:py-24 lg:py-32 bg-[var(--deck-charcoal)] text-[var(--deck-cream)] scroll-mt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Lightbulb className="h-10 w-10 text-accent mx-auto mb-4" />
            <span className="text-sm uppercase tracking-widest text-[var(--deck-wood)] font-medium mb-4 block">
              Integrated Illumination
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4 text-balance">
              Official Trex &amp; AZEK Lighting
            </h2>
            <p className="text-[var(--deck-cream)]/70 text-lg max-w-2xl mx-auto text-pretty">
              We provide and install official Trex and TimberTech AZEK lighting products — from
              post caps and riser lights to under-rail accents that extend deck time after sunset.
            </p>
          </div>
          <div className="space-y-16 sm:space-y-24">
            {lightingProducts.map((product, index) => (
              <AccessoryProductBlock
                key={product.id}
                product={product}
                reversed={index % 2 !== 0}
                dark
              />
            ))}
          </div>
        </div>
      </section>

      {/* Upstate Performance Grid */}
      <section className="py-16 sm:py-20 bg-secondary border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4 text-balance">
              Chosen for Upstate New York Performance
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
              Every material we recommend is selected with moisture, snow, UV exposure,
              and freeze-thaw movement in mind.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Droplets, title: "Moisture Resistant", desc: "Decking and railing systems selected for wet springs and seasonal exposure" },
              { icon: Shield, title: "Weather Ready", desc: "Material choices aligned with Upstate New York durability demands" },
              { icon: Award, title: "UV Stabilized", desc: "Fade-resistant cap technology for long summer sun exposure" },
              { icon: CheckCircle, title: "Warranty Protected", desc: "25-year to lifetime warranties on all decking products" },
            ].map((item) => (
              <Card key={item.title} className="bg-card border-border text-center">
                <CardContent className="p-6">
                  <item.icon className="h-8 w-8 text-accent mx-auto mb-4" />
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Material guidance CTA */}
      <section className="py-16 sm:py-20 bg-[var(--deck-charcoal)] text-[var(--deck-cream)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="h-12 w-12 text-accent mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-6 text-balance">
            Not Sure Which Material Is Right?
          </h2>
          <p className="text-lg text-[var(--deck-cream)]/70 leading-relaxed mb-8 text-pretty">
            Our team will help you choose the right Trex or TimberTech decking, railing,
            and lighting combination for your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground h-14 px-10"
            >
              <Link href="/contact">
                Discuss Material Options
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-[var(--deck-cream)]/30 text-[var(--deck-cream)] hover:bg-[var(--deck-cream)]/10 h-14 px-10 bg-transparent"
            >
              <Link href="/gallery">View Installed Projects</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}