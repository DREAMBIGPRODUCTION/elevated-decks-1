import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Clock3, MapPin } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getAllBlogPosts, getBlogPostBySlug } from "../../../lib/blog"
import { siteConfig } from "@/lib/site-config"

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: "Article Not Found | Elevated Decks",
    }
  }

  return {
    title: `${post.title} | Elevated Decks`,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `${siteConfig.url}/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Elevated Decks`,
      description: post.excerpt,
      url: `${siteConfig.url}/blog/${post.slug}`,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "article",
      images: [
        {
          url: post.coverImage,
          alt: post.coverImageAlt,
        },
      ],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getAllBlogPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .slice(0, 3)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${siteConfig.url}${post.coverImage}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    about: [
      "Upstate New York deck building",
      post.locationFocus,
      post.category,
    ],
    keywords: post.keywords.join(", "),
  }

  return (
    <>
      <Header />
      <main className="pt-16 sm:pt-20 bg-background">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <article>
          <section className="relative py-16 sm:py-24 md:py-28 bg-primary text-primary-foreground overflow-hidden">
            <div className="absolute inset-0 opacity-15">
              <Image
                src={post.coverImage}
                alt=""
                fill
                className="object-cover"
                aria-hidden="true"
              />
            </div>
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link
                href="/blog"
                className="inline-flex items-center text-sm text-primary-foreground/70 hover:text-primary-foreground mb-6"
              >
                Back to blog
              </Link>
              <div className="text-xs uppercase tracking-widest text-accent font-medium mb-4">
                {post.category}
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-balance">
                {post.title}
              </h1>
              <p className="text-lg sm:text-xl text-primary-foreground/70 leading-relaxed mb-6">{post.excerpt}</p>
              <div className="flex flex-wrap gap-5 text-sm text-primary-foreground/70">
                <span>{post.date}</span>
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-4 w-4" />
                  {post.readTime}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {post.locationFocus}
                </span>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-12">
                <Image src={post.coverImage} alt={post.coverImageAlt} fill className="object-cover" />
              </div>

              <div className="space-y-12">
                {post.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-5 text-balance">
                      {section.heading}
                    </h2>
                    <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <Card className="border bg-muted/60 mt-14">
                <CardContent className="p-5 sm:p-8">
                  <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-5">
                    Key Takeaways
                  </h2>
                  <ul className="space-y-3 text-muted-foreground">
                    {post.takeaways.map((takeaway) => (
                      <li key={takeaway}>{takeaway}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <section className="mt-14 rounded-lg bg-accent text-accent-foreground p-5 sm:p-8 md:p-10">
                <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4 text-balance">
                  Planning a Deck Project in Upstate New York?
                </h2>
                <p className="text-lg text-accent-foreground/80 mb-6 max-w-2xl">
                  Elevated Decks designs and builds custom outdoor spaces for homeowners across
                  Latham, Albany, Troy, and the surrounding Capital Region.
                </p>
                <Button asChild size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href={post.ctaHref ?? "/contact"}>
                    {post.ctaLabel ?? "Request a Consultation"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </section>
            </div>
          </section>
        </article>

        <section className="pb-16 sm:pb-24 lg:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-6 mb-10">
              <div>
                <span className="text-sm uppercase tracking-widest text-accent font-medium mb-3 block">
                  More Reading
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
                  Related Articles
                </h2>
              </div>
              <Link href="/blog" className="text-accent font-medium hidden md:inline-flex items-center">
                View all articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.slug} className="overflow-hidden border bg-card">
                  <Link href={`/blog/${relatedPost.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={relatedPost.coverImage}
                        alt={relatedPost.coverImageAlt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                  <CardContent className="p-6">
                    <div className="text-xs uppercase tracking-widest text-accent font-medium mb-3">
                      {relatedPost.category}
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground mb-3 text-balance line-clamp-2">
                      <Link href={`/blog/${relatedPost.slug}`} className="hover:text-accent transition-colors">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-5 line-clamp-3">{relatedPost.excerpt}</p>
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="inline-flex items-center text-accent font-medium"
                    >
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
