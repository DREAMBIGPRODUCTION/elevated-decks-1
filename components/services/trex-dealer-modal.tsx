"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { trexDealerEmbed } from "@/lib/site-config"
import { cn } from "@/lib/utils"
import { ExternalLink, Loader2, X } from "lucide-react"

type TrexDealerModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function buildDealerSrc(maxWidth: number) {
  const width = Math.max(320, Math.min(Math.round(maxWidth), trexDealerEmbed.maxWidth))
  const params = new URLSearchParams({
    utm_id: trexDealerEmbed.utmId,
    max_width: String(width),
  })
  return `${trexDealerEmbed.baseUrl}?${params.toString()}`
}

export function TrexDealerModal({ open, onOpenChange }: TrexDealerModalProps) {
  const frameContainerRef = useRef<HTMLDivElement>(null)
  const [frameWidth, setFrameWidth] = useState(trexDealerEmbed.maxWidth)
  const [isFrameLoading, setIsFrameLoading] = useState(true)

  const close = useCallback(() => {
    onOpenChange(false)
  }, [onOpenChange])

  const dealerSrc = useMemo(() => buildDealerSrc(frameWidth), [frameWidth])

  useEffect(() => {
    if (!open) {
      setIsFrameLoading(true)
      return
    }

    document.body.style.overflow = "hidden"

    let resizeTimer: ReturnType<typeof setTimeout> | undefined

    const updateFrameWidth = () => {
      const containerWidth = frameContainerRef.current?.clientWidth
      if (!containerWidth) return
      const clamped = Math.max(320, Math.min(Math.round(containerWidth), trexDealerEmbed.maxWidth))
      setFrameWidth((prev) => (prev === clamped ? prev : clamped))
    }

    const scheduleFrameWidthUpdate = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(updateFrameWidth, 150)
    }

    updateFrameWidth()

    const observer = new ResizeObserver(scheduleFrameWidthUpdate)
    if (frameContainerRef.current) {
      observer.observe(frameContainerRef.current)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      clearTimeout(resizeTimer)
      document.body.style.overflow = ""
      observer.disconnect()
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [close, open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-3 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Trex product explorer"
      onClick={close}
    >
      <div
        className="relative flex w-full max-w-[1120px] flex-col overflow-hidden rounded-xl bg-card shadow-2xl h-[min(720px,calc(100dvh-1.5rem))] sm:h-[min(720px,calc(100dvh-3rem))]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
          <div>
            <p className="text-sm font-semibold text-foreground">Trex Product Explorer</p>
            <p className="text-xs text-muted-foreground">Browse official Trex decking options</p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm" className="hidden h-9 sm:inline-flex">
              <a
                href={dealerSrc}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Open in New Tab
              </a>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-9 w-9 shrink-0"
              aria-label="Close Trex product explorer"
              onClick={close}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div ref={frameContainerRef} className="relative min-h-0 flex-1 bg-muted/20">
          {isFrameLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-card text-muted-foreground">
              <Loader2 className="h-7 w-7 animate-spin text-accent" />
              <p className="text-sm">Loading Trex catalog...</p>
            </div>
          )}
          <iframe
            id="dealer-frame"
            key={dealerSrc}
            title="Trex dealer product explorer"
            src={dealerSrc}
            className="h-full w-full border-0"
            onLoad={() => setIsFrameLoading(false)}
          />
        </div>
      </div>
    </div>
  )
}