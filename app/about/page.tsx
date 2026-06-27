import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { siteConfig, testimonials } from "@/lib/site-config"
import { absoluteUrl, getBreadcrumbSchema } from "@/lib/seo"
import {
  ArrowRight,
  Phone,
  CheckCircle,
  Star,
  Award,
  Users,
  Clock,
  Shield,
  Hammer,
  Target,
} from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | Elevated Decks",
  description: "Learn about Elevated Decks — the Capital Region's trusted custom elevated deck and rooftop deck construction company. Established 2016.",
  alternates: {
    canonical: absoluteUrl("/about"),
  },
  openGraph: {
    title: "About Elevated Decks | Capital Region Deck Builder",
    description:
      "Learn about Elevated Decks, our structural-first approach, and our custom deck work across the Capital Region and nearby Upstate New York markets.",
    url: absoluteUrl("/about"),
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
}

const stats = [
  { value: "10+", label: "Years Experience", icon: Clock },
  { value: "200+", label: "Decks Built", icon: Hammer },
  { value: "100%", label: "Satisfaction", icon: Target },
  { value: "3", label: "Counties Served", icon: Users },
]

const values = [
  {
    icon: Shield,
    title: "Structural Integrity",
    description: "Every deck we build is engineered for strength, safety, and longevity. We never compromise on structural quality.",
  },
  {
    icon: Award,
    title: "Master Craftsmanship",
    description: "Our team brings decades of combined experience in elevated deck construction and luxury outdoor finishes.",
  },
  {
    icon: Users,
    title: "Client Partnership",
    description: "We work closely with homeowners and developers to deliver results that exceed expectations.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "We respect your timeline. Projects are completed on schedule with constant communication throughout.",
  },
]

export default function AboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: absoluteUrl("/") },
    { name: "About", url: absoluteUrl("/about") },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="pt-16 sm:pt-20">
        {/* Hero */}
        <section className="relative py-16 sm:py-24 md:py-32 bg-primary text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image src="/images/logo.png" alt="" fill className="object-contain p-12" aria-hidden="true" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-sm uppercase tracking-widest text-accent font-medium mb-4 block">
                  About Us
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-balance leading-tight">
                  Building Elevated Spaces Since 2016
                </h1>
                <p className="text-lg sm:text-xl text-primary-foreground/70 mb-8 text-pretty leading-relaxed">
                  Elevated Decks builds custom elevated and rooftop decks for homeowners across
                  the Capital Region and select Upstate New York markets. We combine structural
                  expertise with premium craftsmanship to create outdoor spaces that feel
                  purposeful, refined, and built to last.
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
              <div className="relative aspect-square lg:aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="Elevated Decks logo"
                  fill
                  className="object-contain p-8 bg-white/5"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="h-6 w-6 text-accent" />
                  </div>
                  <p className="text-4xl font-serif font-semibold text-foreground">{stat.value}</p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 sm:py-24 lg:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/images/Decks pics/trex/van schaick/51AC5E23-B0A2-47FF-8BF3-BCFDF0C8EAC5.jpg"
                  alt="Structural deck framing"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-sm uppercase tracking-widest text-accent font-medium mb-4 block">
                  Our Story
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6 text-balance">
                  From Blueprint to Build
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Elevated Decks was founded in 2016 with a clear mission: to bring
                    structural engineering precision and luxury craftsmanship to every
                    outdoor deck project across the Capital Region and broader Upstate
                    New York market we serve.
                  </p>
                  <p>
                    Our founder saw a gap in the market — homeowners wanted premium elevated
                    and rooftop decks, but most contractors lacked the structural expertise
                    to build them safely and beautifully.
                  </p>
                  <p>
                    Today, we have built over 200 decks across Albany, Saratoga, Schenectady,
                    and Warren County communities. Every project is custom-engineered,
                    fully permitted, and detailed for real Northeast weather, from heavy snow
                    loads to repeated freeze-thaw cycles.
                  </p>
                  <p>
                    We are not just deck builders — we are structural specialists who happen
                    to create beautiful outdoor living spaces.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 sm:py-24 lg:py-32 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm uppercase tracking-widest text-accent font-medium mb-4 block">
                Our Values
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4 text-balance">
                What Sets Us Apart
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <Card key={value.title} className="bg-card border">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <value.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us with Testimonial */}
        <section className="py-16 sm:py-24 lg:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <span className="text-sm uppercase tracking-widest text-accent font-medium mb-4 block">
                  Why Choose Us
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6 text-balance">
                  The Elevated Difference
                </h2>
                <ul className="space-y-4">
                  {[
                    { title: "Licensed & Insured", desc: "Fully licensed New York contractor with comprehensive liability coverage." },
                    { title: "Structural Engineers", desc: "Every project is backed by structural engineering calculations." },
                    { title: "Free Consultations", desc: "On-site assessments with detailed proposals at no obligation." },
                  ].map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-foreground">{item.title}</p>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <Card className="bg-primary text-primary-foreground border-0">
                <CardContent className="p-8">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(testimonials[0].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <blockquote className="text-lg mb-6 leading-relaxed italic">
                    &ldquo;{testimonials[0].text}&rdquo;
                  </blockquote>
                  <div>
                    <p className="font-semibold">{testimonials[0].name}</p>
                    <p className="text-sm text-primary-foreground/60">{testimonials[0].location}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-accent text-accent-foreground">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-6 text-balance">
              Ready to Work With Us?
            </h2>
            <p className="text-lg text-accent-foreground/80 mb-8 max-w-2xl mx-auto text-pretty">
              Let us design and build your elevated outdoor space. Get a free consultation today.
            </p>
            <Button asChild size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-10">
              <Link href="/contact">
                Request Consultation
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
