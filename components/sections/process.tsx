"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { processSteps } from "@/lib/site-config"

export function Process() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Header */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="text-sm tracking-widest uppercase text-muted-foreground mb-4 block">
              Our Process
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-foreground leading-tight mb-6 text-balance">
              From Vision<br />to Reality
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our proven five-step process ensures every project is completed on time, on budget, and exceeds expectations. We keep you informed at every stage.
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            {processSteps.map((step, index) => {
              const isExpanded = expandedIndex === index
              
              return (
                <div 
                  key={step.number}
                  className={cn(
                    "border rounded-sm transition-all duration-300 overflow-hidden",
                    isExpanded 
                      ? "border-[var(--deck-wood)] bg-card" 
                      : "border-border bg-card hover:border-[var(--deck-wood)]/50"
                  )}
                >
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    className="w-full flex items-center gap-6 p-6 text-left"
                  >
                    <span 
                      className={cn(
                        "text-3xl font-serif transition-colors duration-300",
                        isExpanded ? "text-[var(--deck-wood)]" : "text-muted-foreground"
                      )}
                    >
                      {step.number}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-foreground mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {step.description}
                      </p>
                    </div>
                    <ChevronDown 
                      className={cn(
                        "w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0",
                        isExpanded && "rotate-180"
                      )} 
                    />
                  </button>
                  
                  <div 
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      isExpanded ? "max-h-48" : "max-h-0"
                    )}
                  >
                    <div className="px-6 pb-6 pl-20">
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
