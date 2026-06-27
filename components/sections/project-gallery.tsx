"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { featuredProjects } from "@/lib/site-config"
import { ArrowRight, MapPin, ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  { id: "all", label: "All" },
  { id: "composite", label: "Composite Decks" },
  { id: "custom", label: "Custom Decks" },
  { id: "pressure-treated", label: "Pressure-Treated Decks" },
]

export function ProjectGallery() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedProject, setSelectedProject] = useState<(typeof featuredProjects)[0] | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const filtered =
    activeCategory === "all"
      ? featuredProjects
      : featuredProjects.filter((p) => p.category === activeCategory)

  const handleImageNav = (direction: "prev" | "next") => {
    if (!selectedProject) return
    const totalImages = selectedProject.images.length
    const isLastImage = selectedImageIndex === totalImages - 1
    const isFirstImage = selectedImageIndex === 0

    if (direction === "next" && isLastImage) {
      // Move to next project's first image
      const currentIdx = filtered.findIndex((p) => p.id === selectedProject.id)
      const nextProjectIdx = (currentIdx + 1) % filtered.length
      setSelectedProject(filtered[nextProjectIdx])
      setSelectedImageIndex(0)
    } else if (direction === "prev" && isFirstImage) {
      // Move to previous project's last image
      const currentIdx = filtered.findIndex((p) => p.id === selectedProject.id)
      const prevProjectIdx = (currentIdx - 1 + filtered.length) % filtered.length
      setSelectedProject(filtered[prevProjectIdx])
      setSelectedImageIndex(filtered[prevProjectIdx].images.length - 1)
    } else {
      // Navigate within the current project's images
      setSelectedImageIndex((prev) =>
        direction === "next"
          ? (prev + 1) % totalImages
          : (prev - 1 + totalImages) % totalImages
      )
    }
  }

  return (
    <section id="gallery" className="py-16 sm:py-24 lg:py-32 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-sm uppercase tracking-widest text-accent font-medium mb-4 block">
            Our Work
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6 text-balance">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Explore our portfolio of custom elevated decks, rooftop installations,
            and structural framing projects in the Capital Region.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 mb-12 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 sm:px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap shrink-0",
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-muted-foreground hover:bg-secondary border border-border"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {filtered.map((project, index) => (
            <button
              key={project.id}
              onClick={() => {
                setSelectedProject(project)
                setSelectedImageIndex(0)
              }}
              className={cn(
                "group relative w-full overflow-hidden rounded-lg break-inside-avoid block text-left",
                index % 3 === 0 ? "aspect-[4/5]" : index % 3 === 1 ? "aspect-[4/3]" : "aspect-square"
              )}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 translate-y-0 sm:translate-y-4 sm:group-hover:translate-y-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500">
                <h3 className="text-lg font-semibold text-white mb-1">{project.title}</h3>
                <div className="flex items-center gap-1.5 text-white/70 text-sm">
                  <MapPin className="h-3.5 w-3.5" />
                  {project.location}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground h-12 px-8"
          >
            <Link href="/gallery">
              View Full Gallery
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent
          showCloseButton={false}
          className="max-w-[calc(100vw-1rem)] sm:max-w-3xl lg:max-w-5xl p-0 bg-primary border-0 overflow-hidden"
        >
          {selectedProject && (
            <>
              <DialogTitle className="sr-only">{selectedProject.title}</DialogTitle>
              <div className="relative">
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Image carousel section */}
              <div className="relative">
                {/* Main image */}
                <div className="relative aspect-[16/10]">
                  <Image
                    src={selectedProject.images[selectedImageIndex]}
                    alt={`${selectedProject.title} - Image ${selectedImageIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Image navigation - only show if more than 1 image */}
                {selectedProject.images.length > 1 && (
                  <>
                    {/* Previous image button */}
                    <button
                      onClick={() => handleImageNav("prev")}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    {/* Next image button */}
                    <button
                      onClick={() => handleImageNav("next")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>

                    {/* Image counter */}
                    <div className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-full bg-black/60 text-white text-sm font-medium">
                      {selectedImageIndex + 1} / {selectedProject.images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Project info */}
              <div className="p-5 sm:p-6 lg:p-8 bg-primary text-primary-foreground">
                <span className="text-xs uppercase tracking-widest text-accent mb-2 block">
                  {categories.find((c) => c.id === selectedProject.category)?.label}
                </span>
                <h3 className="text-2xl font-serif font-semibold mb-1">{selectedProject.title}</h3>
                <p className="text-sm text-primary-foreground/60 mb-3">{selectedProject.location}</p>
                <p className="text-primary-foreground/80 leading-relaxed">{selectedProject.description}</p>
              </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
