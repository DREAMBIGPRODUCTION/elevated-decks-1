"use client"

import Image from "next/image"
import { designServices } from "@/lib/site-config"
import { Check } from "lucide-react"

export function DesignSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div>
            <span className="text-sm uppercase tracking-widest text-accent mb-4 block">
              Design Excellence
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-6 leading-tight">
              {designServices.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {designServices.description}
            </p>
            <ul className="space-y-4 mb-8">
              {designServices.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground italic">
              Our design team draws all structural plans and renderings in-house, ensuring quality control and attention to detail at every stage.
            </p>
          </div>

          {/* Right - Images */}
          <div className="space-y-6">
            {/* Main Design Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
              <Image
                src={designServices.mainImage}
                alt="3D Deck Rendering"
                fill
                className="object-cover"
              />
            </div>

            {/* Plan Screenshots Grid */}
            <div className="grid grid-cols-2 gap-4">
              {designServices.screenshots.map((screenshot, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded-lg overflow-hidden shadow-md border border-border"
                >
                  <Image
                    src={screenshot}
                    alt={`Structural Plan ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
