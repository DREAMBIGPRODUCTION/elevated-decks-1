"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { PdfTocMenu } from "@/components/package-options/pdf-toc-menu"
import { Button } from "@/components/ui/button"
import { packageGuide } from "@/lib/site-config"
import type { PackagePdfOutlineItem } from "@/lib/package-pdf-types"
import { useFadingUi } from "@/hooks/use-fading-ui"
import { cn } from "@/lib/utils"
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Loader2,
  RotateCcw,
  X,
} from "lucide-react"

const PackageGuidePdfViewer = dynamic(
  () =>
    import("@/components/package-options/package-guide-pdf-viewer").then(
      (module) => module.PackageGuidePdfViewer,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
        <p className="text-sm">Preparing viewer...</p>
      </div>
    ),
  },
)

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
  const markActiveRef = useRef<() => void>(() => {})
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [outline, setOutline] = useState<PackagePdfOutlineItem[]>([])
  const [zoom, setZoom] = useState(1)
  const [navigationTick, setNavigationTick] = useState(0)
  const [isScrollAtTop, setIsScrollAtTop] = useState(true)
  const [isReady, setIsReady] = useState(false)
  const [loadError, setLoadError] = useState(false)

  const isAtPageOneTop = currentPage === 1 && isScrollAtTop

  const close = useCallback(() => {
    onOpenChange(false)
  }, [onOpenChange])

  const { controlsVisible, markActive } = useFadingUi({
    enabled: open && isReady,
    pinned: isAtPageOneTop,
  })

  useEffect(() => {
    markActiveRef.current = markActive
  }, [markActive])

  useEffect(() => {
    if (!open) {
      setCurrentPage(1)
      setTotalPages(0)
      setOutline([])
      setZoom(1)
      setNavigationTick(0)
      setIsScrollAtTop(true)
      setIsReady(false)
      setLoadError(false)
      return
    }

    document.body.style.overflow = "hidden"

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close()
        return
      }
      markActive()
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [close, markActive, open])

  const navigateToPage = useCallback((page: number) => {
    setCurrentPage(page)
    setNavigationTick((tick) => tick + 1)
    markActive()
  }, [markActive])

  const goToNextPage = useCallback(() => {
    if (currentPage >= totalPages) return
    navigateToPage(currentPage + 1)
  }, [currentPage, navigateToPage, totalPages])

  const goToPreviousPage = useCallback(() => {
    if (currentPage <= 1) return
    navigateToPage(currentPage - 1)
  }, [currentPage, navigateToPage])

  const handleTocNavigate = useCallback(
    async (dest: unknown) => {
      markActive()
      const { resolveOutlinePage } = await import(
        "@/components/package-options/package-guide-pdf-viewer"
      )
      const page = await resolveOutlinePage(pdfUrl, dest)
      if (page) navigateToPage(page)
    },
    [markActive, navigateToPage, pdfUrl],
  )

  const resetScale = useCallback(() => {
    setZoom(1)
    markActive()
  }, [markActive])

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
            controlsVisible || !isReady ? "opacity-100" : "opacity-0",
          )}
        >
          <div
            className={cn(
              "pointer-events-auto rounded-2xl border border-border/60 bg-background/95 p-2 shadow-lg backdrop-blur-sm transition-opacity duration-500",
              controlsVisible || !isReady
                ? "opacity-100"
                : "opacity-40 hover:opacity-100 focus-within:opacity-100",
            )}
          >
            <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
              <div className="flex items-center gap-1 shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={goToPreviousPage}
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
                  onClick={goToNextPage}
                  disabled={!isReady || currentPage >= totalPages}
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <PdfTocMenu
                outline={outline}
                disabled={!isReady || outline.length === 0}
                onNavigate={(dest) => {
                  void handleTocNavigate(dest)
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
                  onClick={resetScale}
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
                  onClick={resetScale}
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
          {loadError ? (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-card px-6 text-center">
              <p className="text-muted-foreground max-w-md leading-relaxed">
                The viewer couldn&apos;t load your guide. You can still open the PDF directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="h-12">
                  <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open PDF in New Tab
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12">
                  <a
                    href={pdfUrl}
                    download={packageGuide.pdfFilename}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </a>
                </Button>
              </div>
            </div>
          ) : (
            <PackageGuidePdfViewer
              pdfUrl={pdfUrl}
              currentPage={currentPage}
              zoom={zoom}
              navigationTick={navigationTick}
              onDocumentLoad={({ numPages, outline: loadedOutline }) => {
                setTotalPages(numPages)
                setOutline(loadedOutline)
                setIsReady(true)
                setLoadError(false)
                markActive()
              }}
              onPageChange={setCurrentPage}
              onScrollTopChange={setIsScrollAtTop}
              onLoadError={() => {
                setLoadError(true)
                setIsReady(false)
              }}
              onActivity={markActive}
            />
          )}
        </div>
      </div>
    </div>
  )
}