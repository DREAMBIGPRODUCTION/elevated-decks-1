import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PackageGuideSection } from "@/components/package-options/package-guide-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { deckCategories, packageGuide, siteConfig } from "@/lib/site-config"
import { absoluteUrl } from "@/lib/seo"
import {
  Download,
  Phone,
  Mail,
  CheckCircle,
  FileText,
  Layers,
  BookOpen,
} from "lucide-react"

export const metadata: Metadata = {
  title: packageGuide.title,
  description: packageGuide.description,
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: absoluteUrl("/package-options"),
  },
}

const guideHighlights = [
  "Three package tiers: Pressure-Treated, Composite, and Custom Premium",
  "Material comparisons across Trex, TimberTech, and AZEK product lines",
  "Railing, lighting, and accessory options for each tier",
  "What to expect from consultation through final walkthrough",
]

export default function PackageOptionsPage() {
  return (
    <>
      <Header />
      <main className="pt-16 sm:pt-20">
        <section className="relative py-14 sm:py-20 md:py-24 bg-primary text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="/images/logo.png"
              alt=""
              fill
              className="object-contain p-12"
              aria-hidden="true"
            />
          </div>
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-sm uppercase tracking-widest text-accent font-medium mb-4 block">
              Your Project Guide
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-5 text-balance leading-tight">
              {packageGuide.title}
            </h1>
            <p className="text-base sm:text-lg text-primary-foreground/75 mb-8 text-pretty leading-relaxed max-w-2xl mx-auto">
              Thank you for scheduling your site visit with {siteConfig.name}. View or
              download your product guide to review package options, materials, and next
              steps before we meet.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground h-14 px-8 text-base"
              >
                <a href="#guide-viewer">
                  <BookOpen className="mr-2 h-5 w-5" />
                  View Guide Online
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 h-14 px-8 bg-transparent"
              >
                <a
                  href={packageGuide.pdfPath}
                  download={packageGuide.pdfFilename}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download PDF
                </a>
              </Button>
            </div>
            <p className="mt-4 text-sm text-primary-foreground/50">
              Optimized for phone, tablet, and desktop
            </p>
          </div>
        </section>

        <PackageGuideSection pdfUrl={packageGuide.pdfPath} />

        <section className="py-12 sm:py-16 bg-background border-b border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <Card className="border bg-card">
                <CardContent className="p-5 sm:p-6 flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground mb-1">What&apos;s inside</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Package tiers, material options, and a clear overview of how we
                      approach design, permitting, and construction.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border bg-card">
                <CardContent className="p-5 sm:p-6 flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Layers className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground mb-1">Review before your visit</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Come prepared with questions. We&apos;ll tailor recommendations to
                      your home, layout, and budget during the consultation.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20 bg-muted">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12">
              <span className="text-sm uppercase tracking-widest text-accent font-medium mb-3 block">
                Package Overview
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground text-balance">
                Three Paths to Your Outdoor Space
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {deckCategories.map((category) => (
                <Card key={category.id} className="border bg-card h-full">
                  <CardContent className="p-5 sm:p-6 flex flex-col h-full">
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-accent font-medium mb-3">{category.tagline}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                      {category.description}
                    </p>
                    <ul className="space-y-2">
                      {category.services.map((service) => (
                        <li key={service.id} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          <span className="text-foreground">{service.title}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mb-6 text-center text-balance">
              Included in the Full Guide
            </h2>
            <ul className="space-y-3 mb-10">
              {guideHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-muted-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="text-center">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground h-14 px-8"
              >
                <a
                  href={packageGuide.pdfPath}
                  download={packageGuide.pdfFilename}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Guide (PDF)
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-primary text-primary-foreground">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-4 text-balance">
              Questions Before Your Visit?
            </h2>
            <p className="text-primary-foreground/70 mb-8 text-pretty leading-relaxed">
              Our team is happy to help. Reach out anytime before your scheduled site visit.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 h-14 px-8 bg-transparent"
              >
                <a href={`tel:+1${siteConfig.phoneClean}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  {siteConfig.phone}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 h-14 px-8 bg-transparent"
              >
                <a href={`mailto:${siteConfig.email}`}>
                  <Mail className="mr-2 h-5 w-5" />
                  Email Us
                </a>
              </Button>
            </div>
            <p className="mt-6 text-sm text-primary-foreground/50">
              <Link href="/" className="hover:text-primary-foreground/70 transition-colors">
                Return to homepage
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}