"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { facebookReels, siteConfig } from "@/lib/site-config"
import { ArrowRight, Facebook } from "lucide-react"

const REEL_ASPECT_WIDTH = 267
const REEL_ASPECT_HEIGHT = 476

function buildReelEmbedSrc(href: string, width: number, autoplay: boolean) {
  const height = Math.round(width * (REEL_ASPECT_HEIGHT / REEL_ASPECT_WIDTH))
  const params = new URLSearchParams({
    height: String(height),
    href,
    show_text: "true",
    width: String(Math.round(width)),
    t: "0",
  })

  if (autoplay) {
    params.set("autoplay", "true")
  }

  return `https://www.facebook.com/plugins/video.php?${params.toString()}`
}

type FacebookReelCardProps = {
  href: string
  title: string
}

function FacebookReelCard({ href, title }: FacebookReelCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [embedWidth, setEmbedWidth] = useState(REEL_ASPECT_WIDTH)
  const [isVisible, setIsVisible] = useState(false)
  const [loopKey, setLoopKey] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateWidth = () => {
      setEmbedWidth(Math.max(container.clientWidth, 240))
    }

    updateWidth()

    const resizeObserver = new ResizeObserver(updateWidth)
    resizeObserver.observe(container)

    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.4 },
    )

    intersectionObserver.observe(container)
    return () => intersectionObserver.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const loopTimer = window.setInterval(() => {
      setLoopKey((key) => key + 1)
    }, facebookReels.loopIntervalMs)

    return () => window.clearInterval(loopTimer)
  }, [href, isVisible])

  const embedSrc = useMemo(
    () => buildReelEmbedSrc(href, embedWidth, isVisible),
    [embedWidth, href, isVisible],
  )

  return (
    <div
      ref={containerRef}
      className="mx-auto w-full max-w-[320px]"
      style={{ aspectRatio: `${REEL_ASPECT_WIDTH} / ${REEL_ASPECT_HEIGHT}` }}
    >
      <iframe
        key={`${href}-${loopKey}`}
        src={embedSrc}
        title={title}
        className="h-full w-full border-0"
        scrolling="no"
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  )
}

export function FacebookReelsSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-muted/40 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <span className="text-sm uppercase tracking-widest text-accent font-medium mb-4 block">
            Facebook Reels
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-5 text-balance">
            {facebookReels.title}
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            {facebookReels.description}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-10 justify-items-center max-w-4xl mx-auto">
          {facebookReels.reels.map((reel, index) => (
            <FacebookReelCard
              key={reel.id}
              href={reel.href}
              title={`Elevated Decks Facebook reel ${index + 1}`}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild variant="outline" className="h-11 px-6">
            <Link href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer">
              <Facebook className="mr-2 h-4 w-4" />
              Follow on Facebook
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}