import { siteConfig, serviceAreas } from "@/lib/site-config"

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path
  return `${siteConfig.url}${path}`
}

export function getSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
      {
        "@type": "GeneralContractor",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        email: siteConfig.email,
        telephone: `+1${siteConfig.phoneClean}`,
        foundingDate: siteConfig.established,
        areaServed: [
          ...serviceAreas.counties.map((county) => ({
            "@type": "AdministrativeArea",
            name: county,
          })),
          ...serviceAreas.cities.map((city) => ({
            "@type": "City",
            name: city,
          })),
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.address.city,
          addressRegion: siteConfig.address.state,
          addressCountry: "US",
        },
        sameAs: [
          siteConfig.social.facebook,
          siteConfig.social.instagram,
          siteConfig.social.houzz,
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: siteConfig.email,
            telephone: `+1${siteConfig.phoneClean}`,
            areaServed: "US-NY",
            availableLanguage: "en",
          },
        ],
      },
    ],
  }
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
