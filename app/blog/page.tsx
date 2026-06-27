import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock3, MapPin } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllBlogPosts } from "../../lib/blog"
import { featuredProjects, siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Blog | Elevated Decks",
  description:
    "Read Elevated Decks articles on composite decking, premium deck materials, design trends, and maintenance advice for the Capital Region and nearby Upstate New York markets.",
  keywords: [
    "luxury deck builder saratoga springs ny blog",
    "custom deck builder loudonville ny blog",
    "premium deck contractor niskayuna ny",
    "high-end deck builder lake george ny",
    "upstate new york luxury deck ideas",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
  openGraph: {
    title: "Elevated Decks Blog | Luxury Deck Advice for Upstate New York",
    description:
      "Composite decking, deck design, product comparison, and maintenance advice for the Capital Region and nearby Upstate New York markets.",
    url: `${siteConfig.url}/blog`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
}

const posts = getAllBlogPosts()

export default function BlogPage() {
  const heroProject = featuredProjects[0]
  const [featuredPost, ...otherPosts] = posts
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.name} Blog`,
    description:
      "Composite decking, product comparison, maintenance, and custom deck design advice for homeowners in the Capital Region and nearby Upstate New York markets.",
    url: `${siteConfig.url}/blog`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${siteConfig.url}/blog/${post.slug}`,
      datePublished: post.date,
      author: {
        "@type": "Organization",
        name: post.author,
      },
      about: post.locationFocus,
    })),
  }

  return (
    <>
      <Header />
      <main className="pt-16 sm:pt-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />
        <section className="relative py-16 sm:py-24 md:py-32 bg-primary text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image
              src={heroProject.image}
              alt=""
              fill
              className="object-cover"
              aria-hidden="true"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-sm uppercase tracking-widest text-accent font-medium mb-4 block">
              Elevated Decks Journal
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-balance">
              Composite Decking and Design Advice for Upstate New York
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/70 max-w-3xl mx-auto text-pretty leading-relaxed">
              Practical articles on composite decking, premium materials, maintenance,
              and outdoor living design for homeowners across the Capital Region and
              nearby Upstate New York communities.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24 lg:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-lg border border-border bg-[var(--deck-charcoal)] px-6 py-5 md:px-8">
              <p className="font-serif text-lg md:text-xl text-white">
                Deck advice for the Capital Region
              </p>
              <div className="flex flex-wrap gap-2">
                {["Materials", "Design", "Maintenance"].map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/80"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-8 lg:gap-12 items-stretch mb-16">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group overflow-hidden rounded-lg border border-border bg-card"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.coverImageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 sm:p-8">
                  <span className="text-xs uppercase tracking-widest text-accent font-medium">
                    Featured Article
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-4 text-balance line-clamp-3">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">{featuredPost.excerpt}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                    <span className="inline-flex items-center gap-2">
                      <Clock3 className="h-4 w-4" />
                      {featuredPost.readTime}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {featuredPost.locationFocus}
                    </span>
                  </div>
                  <span className="inline-flex items-center text-accent font-medium">
                    Read article
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>

              <Card className="border bg-muted/50">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">What You’ll Find Here</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 text-muted-foreground">
                  <p>
                    We built this blog for homeowners in Albany County, Saratoga County,
                    Schenectady County, and nearby markets who want better information before
                    starting a custom deck project.
                  </p>
                  <ul className="space-y-3">
                    <li>Composite and PVC material comparisons for Upstate New York conditions</li>
                    <li>Design ideas for custom outdoor living spaces and premium deck layouts</li>
                    <li>Maintenance guidance for seasonal care, snow, moisture, and long-term durability</li>
                    <li>Local SEO-focused content tailored to the Capital Region and nearby Upstate New York communities</li>
                  </ul>
                  <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/contact">Request a Consultation</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {otherPosts.map((post) => (
                <Card key={post.slug} className="overflow-hidden border bg-card">
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.coverImageAlt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                  <CardContent className="p-6">
                    <div className="text-xs uppercase tracking-widest text-accent font-medium mb-3">
                      {post.category}
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl font-semibold text-foreground mb-3 text-balance line-clamp-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-accent transition-colors">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-5">
                      <span className="inline-flex items-center gap-2">
                        <Clock3 className="h-4 w-4" />
                        {post.readTime}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {post.locationFocus}
                      </span>
                    </div>
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-accent font-medium">
                      Read article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
