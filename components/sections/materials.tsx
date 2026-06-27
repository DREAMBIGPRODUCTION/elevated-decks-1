"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Check, ExternalLink } from "lucide-react"

const materials = [
  {
    id: "trex",
    title: "Trex Decking",
    image: "/images/Decks pics/trex/van schaick/02FAF800-5BA6-417F-B695-67F0B90E1E8D.jpg",
    description: "Trex composite decking combines 95% recycled materials with advanced technology to create beautiful, virtually maintenance-free decks. Industry-leading fade and stain protection.",
    benefits: [
      "25-30 year warranty",
      "95% recycled content",
      "Low maintenance",
      "Fade & stain resistant"
    ],
    website: "https://www.trex.com/products/decking/"
  },
  {
    id: "timbertech",
    title: "TimberTech Decking",
    image: "/images/material-timbertech.jpg",
    description:
      "TimberTech composite and capped polymer decking delivers premium aesthetics, strong moisture resistance, and long-term color retention — including AZEK PVC lines within the TimberTech family.",
    benefits: [
      "30-year structural warranty",
      "4-sided capping technology",
      "Composite and PVC options",
      "Built for Upstate New York weather"
    ],
    website: "https://www.timbertech.com/products/decking-overview/"
  }
]

export function Materials() {
  const [activeId, setActiveId] = useState("trex")
  const activeMaterial = materials.find(m => m.id === activeId)!

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-16 lg:mb-20">
          <span className="text-sm tracking-widest uppercase text-muted-foreground mb-4 block">
            Premium Material Brands
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-foreground leading-tight mb-6 text-balance">
            Industry-Leading Decking Systems
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We partner with Trex and TimberTech, two of the most trusted decking brands
            for long-term performance in the Capital Region and nearby Upstate New York
            markets.
          </p>
        </div>

        {/* Material Tabs - Mobile */}
        <div className="flex overflow-x-auto gap-2 mb-8 lg:hidden pb-4 -mx-6 px-6">
          {materials.map((material) => (
            <button
              key={material.id}
              onClick={() => setActiveId(material.id)}
              className={cn(
                "px-4 py-2 text-sm whitespace-nowrap rounded-sm transition-all duration-300 flex-shrink-0",
                activeId === material.id
                  ? "bg-[var(--deck-charcoal)] text-white"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              )}
            >
              {material.title}
            </button>
          ))}
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8">
          {/* Material Tabs - Desktop */}
          <div className="col-span-3 space-y-2">
            {materials.map((material) => (
              <button
                key={material.id}
                onClick={() => setActiveId(material.id)}
                className={cn(
                  "w-full text-left px-6 py-4 rounded-sm transition-all duration-300 border",
                  activeId === material.id
                    ? "bg-[var(--deck-charcoal)] text-white border-[var(--deck-charcoal)]"
                    : "bg-card text-foreground border-border hover:border-[var(--deck-wood)]/50"
                )}
              >
                <span className="font-medium">{material.title}</span>
              </button>
            ))}
          </div>

          {/* Active Material Content */}
          <div className="col-span-9 grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-square rounded-sm overflow-hidden">
              <Image
                src={activeMaterial.image}
                alt={activeMaterial.title}
                fill
                className="object-cover transition-all duration-500"
                sizes="(max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div>
              <h3 className="text-3xl font-serif font-light text-foreground mb-4">
                {activeMaterial.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {activeMaterial.description}
              </p>
              <ul className="space-y-3 mb-8">
                {activeMaterial.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--deck-wood)]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-[var(--deck-wood)]" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={activeMaterial.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-sm font-medium transition-colors"
              >
                Visit {activeMaterial.title} Website
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="lg:hidden">
          <div className="grid gap-6">
            <div className="relative aspect-video rounded-sm overflow-hidden">
              <Image
                src={activeMaterial.image}
                alt={activeMaterial.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div>
              <h3 className="text-2xl font-serif font-light text-foreground mb-4">
                {activeMaterial.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {activeMaterial.description}
              </p>
              <ul className="space-y-3 mb-6">
                {activeMaterial.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--deck-wood)]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-[var(--deck-wood)]" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={activeMaterial.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-sm font-medium transition-colors"
              >
                Visit {activeMaterial.title} Website
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
