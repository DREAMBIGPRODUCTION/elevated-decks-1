"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { cn } from "@/lib/utils"
import { testimonials } from "@/lib/site-config"

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrev = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-[var(--deck-charcoal)]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <span className="text-sm tracking-widest uppercase text-[var(--deck-wood)] mb-4 block">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white mb-10 sm:mb-16 text-balance">
            What Our Clients Say
          </h2>

          {/* Testimonial Card */}
          <div className="relative">
            <Quote className="w-10 h-10 sm:w-16 sm:h-16 text-[var(--deck-wood)]/20 mx-auto mb-6 sm:mb-8" />
            
            <div className="min-h-[200px] flex items-center justify-center">
              {testimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.name}-${testimonial.project}`}
                  className={cn(
                    "absolute inset-0 transition-all duration-500",
                    index === currentIndex 
                      ? "opacity-100 translate-x-0" 
                      : index < currentIndex 
                        ? "opacity-0 -translate-x-12" 
                        : "opacity-0 translate-x-12"
                  )}
                >
                  <blockquote className="text-xl lg:text-2xl text-white/90 font-light leading-relaxed italic mb-8">
                    &ldquo;{testimonial.text}&rdquo;
                  </blockquote>
                  <div>
                    <p className="text-lg font-medium text-white">{testimonial.name}</p>
                    <p className="text-sm text-white/50">
                      {testimonial.project} — {testimonial.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={goToPrev}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-[var(--deck-wood)] hover:text-[var(--deck-wood)] transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false)
                      setCurrentIndex(index)
                    }}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      index === currentIndex 
                        ? "bg-[var(--deck-wood)] w-8" 
                        : "bg-white/30 hover:bg-white/50"
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-[var(--deck-wood)] hover:text-[var(--deck-wood)] transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
