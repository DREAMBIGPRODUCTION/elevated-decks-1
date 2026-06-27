"use client"

import { useState, useRef, useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { stockImages } from "@/lib/images"

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
}

function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }, [])

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX)
  }
  const handleMouseLeave = () => setIsDragging(false)

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] overflow-hidden rounded-lg cursor-ew-resize select-none"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Background) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${afterImage})` }}
      />
      
      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${beforeImage})`,
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      />

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-primary-foreground shadow-lg z-10"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        {/* Slider Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary-foreground rounded-full shadow-lg flex items-center justify-center">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-6 bg-primary/50 rounded" />
            <div className="w-0.5 h-6 bg-primary/50 rounded" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div
        className={cn(
          "absolute top-4 left-4 px-3 py-1.5 bg-primary/80 text-primary-foreground text-sm font-medium rounded transition-opacity",
          sliderPosition < 15 && "opacity-0"
        )}
      >
        {beforeLabel}
      </div>
      <div
        className={cn(
          "absolute top-4 right-4 px-3 py-1.5 bg-accent/80 text-accent-foreground text-sm font-medium rounded transition-opacity",
          sliderPosition > 85 && "opacity-0"
        )}
      >
        {afterLabel}
      </div>
    </div>
  )
}

const projects = [
  {
    id: 1,
    title: "Residential Garage",
    location: "Coral Gables, FL",
    category: "Garage Floors",
    beforeImage: stockImages.beforeAfter.garage.before,
    afterImage: stockImages.beforeAfter.garage.after,
  },
  {
    id: 2,
    title: "Warehouse Floor",
    location: "Doral, FL",
    category: "Industrial",
    beforeImage: stockImages.beforeAfter.warehouse.before,
    afterImage: stockImages.beforeAfter.warehouse.after,
  },
  {
    id: 3,
    title: "Auto Showroom",
    location: "Miami Beach, FL",
    category: "Commercial",
    beforeImage: stockImages.beforeAfter.commercial.before,
    afterImage: stockImages.beforeAfter.commercial.after,
  },
]

export function BeforeAfterSection() {
  const [activeProject, setActiveProject] = useState(0)

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4">Results</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            See the Transformation
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Drag the slider to compare before and after. Our epoxy floor coatings 
            completely transform any space.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => setActiveProject(index)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeProject === index
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {project.category}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="max-w-4xl mx-auto">
          <BeforeAfterSlider
            beforeImage={projects[activeProject].beforeImage}
            afterImage={projects[activeProject].afterImage}
          />

          {/* Project Info */}
          <div className="flex items-center justify-between mt-4">
            <div>
              <h3 className="font-semibold text-foreground">
                {projects[activeProject].title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {projects[activeProject].location}
              </p>
            </div>
            <Badge variant="outline">{projects[activeProject].category}</Badge>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex justify-center gap-4 mt-8">
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => setActiveProject(index)}
              className={cn(
                "relative w-20 h-14 rounded-md overflow-hidden transition-all",
                activeProject === index
                  ? "ring-2 ring-accent ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              )}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${project.afterImage})` }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
