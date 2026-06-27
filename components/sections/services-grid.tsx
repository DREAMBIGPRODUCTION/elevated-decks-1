"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building2 } from "lucide-react"

export function ServicesGrid() {
  return (
    <section id="services" className="py-16 sm:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <span className="text-sm uppercase tracking-widest text-accent font-medium mb-4 block">
            How We Create Magic
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6 text-balance">
            Beautiful Outdoor Spaces, Thoughtfully Designed
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            We design custom deck spaces for homeowners across the Capital Region and nearby
            Upstate New York communities. From intimate backyard retreats to expansive
            entertaining layouts, each project is built around your home, site, and lifestyle.
          </p>
        </div>

        {/* Service Card */}
        <div className="max-w-3xl mx-auto">
          <Card className="bg-card border hover:shadow-lg transition-all duration-300">
            <CardContent className="p-8 md:p-12">
              {/* Icon */}
              <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-6 bg-accent/10">
                <Building2 className="h-7 w-7 text-accent" />
              </div>

              {/* Title & Description */}
              <h3 className="text-3xl font-semibold mb-4">Your Outdoor Oasis Awaits</h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Whether it&apos;s a quiet place for morning coffee, a clean entertaining deck,
                or a multi-level layout that solves grade changes, we build outdoor spaces
                that feel intentional and perform well over time.
              </p>

              {/* Key Services */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Materials</h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Premium Trex Composite</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>TimberTech Composite & PVC</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Trex &amp; AZEK Railing Systems</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Quality Service</h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Complimentary Renderings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Expert installation and support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Installation Warranty</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                asChild
                size="lg"
                className="w-full md:w-auto"
              >
                <Link href="/contact">
                  Start Your Dream Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
