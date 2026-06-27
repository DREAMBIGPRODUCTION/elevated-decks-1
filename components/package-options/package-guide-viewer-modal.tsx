"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { PdfTocMenu } from "@/components/package-options/pdf-toc-menu"
import { Button } from "@/components/ui/button"
import { packageGuide } from "@/lib/site-config"
import { useFadingUi } from "@/hooks/use-fading-ui"
import { usePdfViewerBridge } from "@/hooks/use-pdf-viewer-bridge"
import { cn } from "@/lib/utils"
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  RotateCcw,
  X,
} from "lucide-react"

type PackageGuideViewerModalProps = {
  pdfUrl: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PackageGuideViewerModal({
  pdfUrl,
  open,
  onOpenChange,
}: PackageGuideViewerModalProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const markActiveRef = useRef<() => void>(() => {})
  const [isLoading, setIsLoading] = useState(true)

  const close = useCallback(() => {
    onOpenChange(false)
  }, [onOpenChange])

  const {
    currentPage,
    totalPages,
    isAtPageOneTop,
    outline,
    isReady,
    hasOutline,
    goToNextPage,
    goToPreviousPage,
    goToDestination,
    resetScale,
  } = usePdfViewerBridge({
    iframeRef,
    open,
    isLoading,
    onActivity: () => markActiveRef.current(),
  })

  const { controlsVisible, markActive } = useFadingUi({
    enabled: open && !isLoading,
    pinned: isAtPageOneTop,
  })

  useEffect(() => {
    markActiveRef.current = markActive
  }, [markActive])

  const viewerSrc = useMemo(() => {
    if (!open || typeof window === "undefined") return ""
    const file = `${window.location.origin}${pdfUrl}`
    return `/pdfjs/web/viewer.html?file=${encodeURIComponent(file)}`
  }, [open, pdfUrl])

  useEffect(() => {
    if (!open) return

    setIsLoading(true)
    document.body.style.overflow = "hidden"

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close()
        return
      }
      markActive()
    }

    const onWindowBlur = () => markActive()

    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("blur", onWindowBlur)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("blur", onWindowBlur)
    }
  }, [close, markActive, open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-stretch justify-center bg-black/80 p-0 sm:p-3 md:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={packageGuide.title}
      onMouseMove={markActive}
      onTouchStart={markActive}
    >
      <div className="relative flex h-full w-full max-w-[1600px] flex-col overflow-hidden rounded-none bg-card shadow-2xl sm:rounded-lg">
        <header
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 z-20 px-3 pt-3 sm:px-4 sm:pt-4 transition-opacity duration-500",
            controlsVisible ? "opacity-100" : "opacity-0",
          )}
        >
          <div
            className={cn(
              "pointer-events-auto rounded-2xl border border-border/60 bg-background/95 p-2 shadow-lg backdrop-blur-sm transition-opacity duration-500",
              controlsVisible ? "opacity-100" : "opacity-40 hover:opacity-100 focus-within:opacity-100",
            )}
          >
            <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
              <div className="flex items-center gap-1 shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => {
                    markActive()
                    void goToPreviousPage()
                  }}
                  disabled={!isReady || currentPage <= 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="min-w-[5.5rem] text-center text-sm font-medium tabular-nums text-foreground">
                  {isReady && totalPages > 0 ? (
                    <>
                      <span className="sm:hidden">
                        {currentPage}/{totalPages}
                      </span>
                      <span className="hidden sm:inline">
                        Page {currentPage} of {totalPages}
                      </span>
                    </>
                  ) : (
                    <span className="text-muted-foreground">...</span>
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => {
                    markActive()
                    void goToNextPage()
                  }}
                  disabled={!isReady || currentPage >= totalPages}
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <PdfTocMenu
                outline={outline}
                disabled={!isReady || !hasOutline}
                onNavigate={(dest) => {
                  markActive()
                  void goToDestination(dest)
                }}
                onOpenChange={(menuOpen) => {
                  if (menuOpen) markActive()
                }}
              />

              <div className="flex w-full items-center justify-end gap-2 sm:ml-auto sm:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="hidden h-10 rounded-full px-4 md:inline-flex"
                  onClick={() => {
                    markActive()
                    void resetScale()
                  }}
                  disabled={!isReady}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset Scale
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full md:hidden"
                  onClick={() => {
                    markActive()
                    void resetScale()
                  }}
                  disabled={!isReady}
                  aria-label="Reset scale"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="h-10 rounded-full bg-accent px-3 text-accent-foreground hover:bg-accent/90 sm:px-4"
                >
                  <a
                    href={pdfUrl}
                    download={packageGuide.pdfFilename}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={markActive}
                  >
                    <Download className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Close guide viewer"
                  className="h-10 w-10 rounded-full"
                  onClick={close}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="relative min-h-0 flex-1 bg-[#404040]">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-card text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
              <p className="text-sm">Loading your guide...</p>
            </div>
          )}
          {viewerSrc && (
            <iframe
              ref={iframeRef}
              title={packageGuide.title}
              src={viewerSrc}
              className="h-full w-full border-0"
              allow="fullscreen"
              onLoad={() => {
                setIsLoading(false)
                markActive()
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}