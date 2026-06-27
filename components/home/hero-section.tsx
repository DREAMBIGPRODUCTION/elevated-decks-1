"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QuickQuoteForm } from "@/components/forms/quick-quote-form"
import { trustIndicators } from "@/lib/site-config"
import { CheckCircle, Star, ArrowRight } from "lucide-react"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/50" />
      </div>
      
      {/* Logo Overlay - Same style as navbar */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] pointer-events-none select-none opacity-10">
        <div className="flex flex-col items-center">
          <span className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-bold tracking-tight text-primary-foreground whitespace-nowrap">
            STAND CLEAR
          </span>
          <span className="text-[3vw] md:text-[2.5vw] lg:text-[2vw] font-medium tracking-[0.5em] uppercase text-primary-foreground/80">
            EPOXY
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-32 relative z-10 pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div
            className={`space-y-6 transition-all duration-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* Trust Badge */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-primary-foreground/90 text-sm font-medium">
                5.0 Rating | 200+ Projects Completed
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight text-balance">
              Professional Epoxy Floor Coatings in{" "}
              <span className="text-accent">Miami</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-primary-foreground/80 leading-relaxed max-w-xl text-pretty">
              Transform garages, warehouses, and commercial spaces with durable,
              high-gloss epoxy flooring. Industrial-grade materials. Expert
              installation.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-3">
              {trustIndicators.map((indicator) => (
                <Badge
                  key={indicator}
                  variant="outline"
                  className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 px-3 py-1.5"
                >
                  <CheckCircle className="h-4 w-4 mr-1.5" />
                  {indicator}
                </Badge>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8"
              >
                <Link href="/quote">
                  Get a Free Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8"
              >
                <Link href="/gallery">View Our Work</Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Quote Form */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <QuickQuoteForm />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <div className="flex flex-col items-center gap-2 text-primary-foreground/60">
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary-foreground/60 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
