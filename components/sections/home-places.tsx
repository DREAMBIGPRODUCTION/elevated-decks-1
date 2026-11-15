import Image from "next/image"
import Link from "next/link"
import { featuredProjects } from "@/lib/site-config"

export function HomePlaces() {
  return (
    <section id="work" className="bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="mb-4 text-xs uppercase tracking-[0.28em] text-muted-foreground">
              Recent work
            </p>
            <h2 className="font-serif text-4xl font-light text-foreground sm:text-5xl">
              Selected projects
            </h2>
          </div>
          <Link
            href="/gallery"
            className="border-b border-foreground/30 pb-1 text-sm text-foreground hover:border-foreground"
          >
            View the gallery
          </Link>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <Link key={project.id} href={`/gallery/${project.slug}`} className="group block">
              <div className="overflow-hidden bg-muted">
                <Image
                  src={project.image}
                  alt={`${project.title}, ${project.location}`}
                  width={1600}
                  height={1200}
                  className="h-auto w-full"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {project.location}
              </p>
              <h3 className="mt-2 font-serif text-2xl font-light text-foreground">
                {project.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
