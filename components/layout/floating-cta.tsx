"use client"

import { Phone } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 400px
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <a
      href={`tel:${siteConfig.phoneClean}`}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center justify-center",
        "w-16 h-16 rounded-full bg-accent text-accent-foreground",
        "shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40",
        "transition-all duration-300 transform",
        "md:hidden", // Only show on mobile
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-20 opacity-0 pointer-events-none"
      )}
      aria-label="Call us now"
    >
      <Phone className="h-7 w-7" />
      <span className="sr-only">Call {siteConfig.phone}</span>
      
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-25" />
    </a>
  )
}
