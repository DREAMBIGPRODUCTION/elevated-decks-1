import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { absoluteUrl, getBreadcrumbSchema } from "@/lib/seo"
import { getAllGalleryProjects, getGalleryProjectBySlug, siteConfig } from "@/lib/site-config"
import { ArrowRight, MapPin } from "lucide-react"

type GalleryProjectPageProps = {
  params: Promise<{ slug: string }>
}

function formatCategory(category: string) {
  return category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

export async function generateStaticParams() {
  return getAllGalleryProjects().map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: GalleryProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getGalleryProjectBySlug(slug)

  if (!project) {
    return {
      title: "Project Not Found | Elevated Decks",
    }
  }

  return {
    title: `${project.title} | Elevated Decks Project`,
    description: `${project.description} Located in ${project.location}.`,
    alternates: {
      canonical: absoluteUrl(`/gallery/${project.slug}`),
    },
    openGraph: {
      title: `${project.title} | Elevated Decks`,
      description: `${project.description} Located in ${project.location}.`,
      url: absoluteUrl(`/gallery/${project.slug}`),
      siteName: siteConfig.name,
      locale: "en_US",
      type: "article",
      images: [
        {
          url: project.image,
          alt: `${project.title} in ${project.location}`,
        },
      ],
    },
  }
}

export default async function GalleryProjectPage({ params }: GalleryProjectPageProps) {
  const { slug } = await params
  const project = getGalleryProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const galleryImages = project.images.filter((image) => image !== project.image)

  const relatedProjects = getAllGalleryProjects()
    .filter((candidate) => candidate.slug !== project.slug && candidate.category === project.category)
    .slice(0, 3)

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Projects", url: absoluteUrl("/gallery") },
    { name: project.title, url: absoluteUrl(`/gallery/${project.slug}`) },
  ])

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: project.title,
    description: project.description,
    url: absoluteUrl(`/gallery/${project.slug}`),
    about: [
      project.location,
      formatCategory(project.category),
      project.material.toUpperCase(),
    ],
    image: project.images.map((image) => absoluteUrl(image)),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }

  return (
    <>
      <Header />
      <main className="pt-16 sm:pt-20 bg-background">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
        />

        <section className="relative py-16 sm:py-24 md:py-28 bg-primary text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <Image src={project.image} alt="" fill className="object-cover" aria-hidden="true" />
          </div>
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/gallery"
              className="inline-flex items-center text-sm text-primary-foreground/70 hover:text-primary-foreground mb-6"
            >
              Back to projects
            </Link>
            <div className="text-xs uppercase tracking-widest text-accent font-medium mb-4">
              {formatCategory(project.category)}
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-balance">
              {project.title}
            </h1>
            <div className="inline-flex items-center gap-2 text-primary-foreground/70 mb-6">
              <MapPin className="h-4 w-4" />
              {project.location}
            </div>
            <p className="text-lg sm:text-xl text-primary-foreground/75 max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
              <div className="space-y-6">
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                  <Image
                    src={project.image}
                    alt={`${project.title} deck project in ${project.location}`}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {galleryImages.map((image, index) => (
                    <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={image}
                        alt={`${project.title} detail ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <Card className="border bg-card">
                  <CardContent className="p-5 sm:p-8">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-5">
                      Project Snapshot
                    </h2>
                    <ul className="space-y-4 text-muted-foreground">
                      <li>
                        <span className="block text-xs uppercase tracking-widest text-accent font-medium mb-1">
                          Location
                        </span>
                        {project.location}
                      </li>
                      <li>
                        <span className="block text-xs uppercase tracking-widest text-accent font-medium mb-1">
                          Category
                        </span>
                        {formatCategory(project.category)}
                      </li>
                      <li>
                        <span className="block text-xs uppercase tracking-widest text-accent font-medium mb-1">
                          Material
                        </span>
                        {project.material.toUpperCase()}
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border bg-muted/60">
                  <CardContent className="p-5 sm:p-8">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      Looking for a Similar Build?
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      We design decks around site conditions, material priorities, and the way
                      you want to use the space, whether that means a pool deck, elevated deck,
                      or premium outdoor living layout.
                    </p>
                    <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Link href="/contact">
                        Request a Consultation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {relatedProjects.length > 0 ? (
          <section className="pb-16 sm:pb-24 lg:pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between gap-6 mb-10">
                <div>
                  <span className="text-sm uppercase tracking-widest text-accent font-medium mb-3 block">
                    More Projects
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
                    Related Work
                  </h2>
                </div>
                <Link href="/gallery" className="text-accent font-medium hidden md:inline-flex items-center">
                  View all projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {relatedProjects.map((relatedProject) => (
                  <Card key={relatedProject.slug} className="overflow-hidden border bg-card">
                    <Link href={`/gallery/${relatedProject.slug}`} className="group block">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={relatedProject.image}
                          alt={`${relatedProject.title} in ${relatedProject.location}`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                    <CardContent className="p-6">
                      <div className="text-xs uppercase tracking-widest text-accent font-medium mb-3">
                        {formatCategory(relatedProject.category)}
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground mb-3 text-balance line-clamp-2">
                        <Link href={`/gallery/${relatedProject.slug}`} className="hover:text-accent transition-colors">
                          {relatedProject.title}
                        </Link>
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-5 line-clamp-3">{relatedProject.description}</p>
                      <Link
                        href={`/gallery/${relatedProject.slug}`}
                        className="inline-flex items-center text-accent font-medium"
                      >
                        View project
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  )
}
