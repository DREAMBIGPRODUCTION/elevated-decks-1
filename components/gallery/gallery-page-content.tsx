"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { featuredProjects, galleryProjects } from "@/lib/site-config"
import { ArrowRight, MapPin } from "lucide-react"

export function GalleryPageContent() {
  const heroProject = featuredProjects[0]

  return (
    <>
      <Header />
      <main className="pt-16 sm:pt-20">
        <section className="relative py-16 sm:py-24 md:py-32 bg-primary text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image src={heroProject.image} alt="" fill className="object-cover" aria-hidden="true" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-sm uppercase tracking-widest text-accent font-medium mb-4 block">
              Portfolio
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-balance">
              Custom Deck Projects Across the Capital Region
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/70 max-w-3xl mx-auto text-pretty leading-relaxed">
              Browse finished composite, PVC, and pressure-treated deck projects with
              location-specific examples from the Capital Region and nearby Upstate New York markets.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24 lg:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-lg border border-border bg-[var(--deck-charcoal)] px-6 py-5 md:px-8">
              <p className="font-serif text-lg md:text-xl text-white">
                Real projects from the Capital Region
              </p>
              <div className="flex flex-wrap gap-2">
                {["Composite", "PVC", "Pressure-Treated"].map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/80"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {galleryProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/gallery/${project.slug}`}
                  className="group overflow-hidden rounded-lg border border-border bg-card"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`${project.title} deck project in ${project.location}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="text-xs uppercase tracking-widest text-accent font-medium mb-3">
                      {project.category.replace("-", " ")}
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl font-semibold text-foreground mb-3 text-balance">
                      {project.title}
                    </h2>
                    <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4" />
                      {project.location}
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-5 line-clamp-3">{project.description}</p>
                    <span className="inline-flex items-center text-accent font-medium">
                      View project details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-accent text-accent-foreground">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-6 text-balance">
              Want a Deck Like These?
            </h2>
            <p className="text-lg text-accent-foreground/80 mb-8 max-w-2xl mx-auto text-pretty">
              Tell us where your project is located, what material you&apos;re considering,
              and how you want to use the space.
            </p>
            <Button asChild size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-10">
              <Link href="/contact">
                Request Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
