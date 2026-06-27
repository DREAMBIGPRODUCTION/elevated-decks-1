"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Phone, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // On non-home pages, always use dark text regardless of scroll
  // On home page, use white text when not scrolled, dark text when scrolled
  const shouldUseDarkText = !isHomePage || isScrolled

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled || !isHomePage
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded bg-white shrink-0">
              <Image
                src="/images/logo.png"
                alt="Elevated Decks"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "font-serif text-lg sm:text-xl font-semibold tracking-tight transition-colors",
                shouldUseDarkText ? "text-foreground" : "text-white"
              )}>
                Elevated Decks
              </span>
              <span className={cn(
                "text-xs uppercase tracking-widest transition-colors",
                shouldUseDarkText ? "text-muted-foreground" : "text-white/70"
              )}>
                Est. 2016
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-300 hover:text-accent relative group",
                  shouldUseDarkText ? "text-foreground" : "text-white"
                )}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:+1${siteConfig.phoneClean}`}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors",
                shouldUseDarkText ? "text-foreground" : "text-white"
              )}
            >
              <Phone className="h-4 w-4" />
              {siteConfig.phone}
            </a>
            <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/contact">Get a Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "lg:hidden",
                  shouldUseDarkText ? "text-foreground" : "text-white"
                )}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              accessibilityTitle="Navigation menu"
              className="w-[min(100vw-2rem,350px)] sm:max-w-sm"
            >
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 overflow-hidden rounded bg-muted">
                    <Image
                      src="/images/logo.png"
                      alt="Elevated Decks"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif text-xl font-semibold tracking-tight">
                      Elevated Decks
                    </span>
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">
                      Est. 2016
                    </span>
                  </div>
                </div>

                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <SheetClose key={item.href} asChild>
                      <Link
                        href={item.href}
                        className="flex items-center px-4 py-3 text-lg font-medium rounded-md hover:bg-muted transition-colors"
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                <div className="mt-auto flex flex-col gap-3 pt-6 border-t">
                  <a
                    href={`tel:+1${siteConfig.phoneClean}`}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground font-medium rounded-md"
                  >
                    <Phone className="h-5 w-5" />
                    {siteConfig.phone}
                  </a>
                  <SheetClose asChild>
                    <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Link href="/contact">Get a Quote</Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
