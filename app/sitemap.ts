import type { MetadataRoute } from "next"
import { getAllBlogPosts } from "@/lib/blog"
import { getAllGalleryProjects, siteConfig } from "@/lib/site-config"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",

    "/gallery",
    "/about",
    "/contact",
    "/blog",
  ].map((path) => ({
    url: `${siteConfig.url}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }))

  const blogRoutes = getAllBlogPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const galleryRoutes = getAllGalleryProjects().map((project) => ({
    url: `${siteConfig.url}/gallery/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes, ...galleryRoutes]
}
