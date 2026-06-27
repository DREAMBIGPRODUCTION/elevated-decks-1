import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Facebook, Instagram, Building2 } from "lucide-react"
import { siteConfig, serviceAreas as serviceAreaConfig } from "@/lib/site-config"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-deck-charcoal text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-14 h-14 overflow-hidden rounded bg-white/10">
                <Image
                  src="/images/logo.png"
                  alt="Elevated Decks"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-semibold tracking-tight">
                  {siteConfig.name}
                </span>
                <span className="text-xs uppercase tracking-widest text-white/60">
                  Est. {siteConfig.established}
                </span>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              Luxury deck design and construction for discerning homeowners across the
              Capital Region and select nearby Upstate New York markets.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.houzz}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Houzz"
              >
                <Building2 className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Deck Services</h4>
            <ul className="space-y-3">
              <li className="text-white/70 text-sm">Composite Decks</li>
              <li className="text-white/70 text-sm">Premium PVC Decks</li>
              <li className="text-white/70 text-sm">Custom Elevated Decks</li>
              <li className="text-white/70 text-sm">Structural Framing</li>
              <li className="text-white/70 text-sm">Rooftop Decks</li>
              <li className="text-white/70 text-sm">Railings & Lighting</li>
            </ul>
          </div>

          {/* Contact & Service Areas */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${siteConfig.phoneClean}`}
                  className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors text-sm"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors text-sm break-all sm:break-normal"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70 text-sm">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>{siteConfig.address.city}</span>
              </li>
            </ul>

            <h5 className="font-medium mt-8 mb-4 text-sm uppercase tracking-wider text-white/50">
              Service Areas
            </h5>
            <div className="flex flex-wrap gap-2">
              {serviceAreaConfig.cities.map((city) => (
                <span
                  key={city}
                  className="text-xs px-2 py-1 rounded bg-white/10 text-white/70"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              &copy; {currentYear} {siteConfig.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
