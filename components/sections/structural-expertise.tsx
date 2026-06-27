"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Shield, Calculator, HardHat, Wind } from "lucide-react"

const features = [
  {
    icon: Calculator,
    title: "Load Calculations",
    description: "Precise structural engineering with load-bearing calculations for every project."
  },
  {
    icon: Shield,
    title: "Elevated Safety",
    description: "Elevated deck systems designed with multiple safety redundancies and code compliance."
  },
  {
    icon: Wind,
    title: "Hurricane Rated",
    description: "Florida-certified construction with hurricane-rated hardware and wind resistance."
  },
  {
    icon: HardHat,
    title: "Expert Installation",
    description: "Licensed and insured crews with decades of elevated deck construction experience."
  }
]

export function StructuralExpertise() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-[var(--deck-charcoal)] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div 
            className={`relative aspect-[4/5] rounded-sm overflow-hidden transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <Image
              src="/images/structural-framing.jpg"
              alt="Structural deck framing with steel and timber construction"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--deck-charcoal)] via-transparent to-transparent" />
            
            {/* Stats Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <span className="block text-4xl lg:text-5xl font-serif text-[var(--deck-wood)]">500+</span>
                  <span className="text-sm text-white/60 uppercase tracking-wider">Decks Built</span>
                </div>
                <div className="text-center">
                  <span className="block text-4xl lg:text-5xl font-serif text-[var(--deck-wood)]">8+</span>
                  <span className="text-sm text-white/60 uppercase tracking-wider">Years Experience</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div 
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <span className="text-sm tracking-widest uppercase text-[var(--deck-wood)] mb-4 block">
              Structural Excellence
            </span>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-light text-white leading-tight mb-6">
              Built for Strength.<br />
              <span className="text-[var(--deck-wood)]">Designed for Living.</span>
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-10">
              Every Elevated Decks project begins with precision engineering. We work with licensed structural engineers to ensure your deck exceeds Florida building codes and withstands the elements for decades to come.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div 
                    key={feature.title}
                    className={`transition-all duration-500 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${500 + index * 100}ms` }}
                  >
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-sm bg-[var(--deck-wood)]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[var(--deck-wood)]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-1">{feature.title}</h3>
                        <p className="text-sm text-white/60 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
