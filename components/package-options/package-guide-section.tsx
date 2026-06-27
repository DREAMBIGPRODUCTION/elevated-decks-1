"use client"

import { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { PackageGuideViewerModal } from "@/components/package-options/package-guide-viewer-modal"
import { packageGuide } from "@/lib/site-config"
import { BookOpen, Download, ExternalLink } from "lucide-react"

type PackageGuideSectionProps = {
  pdfUrl: string
}

export function PackageGuideSection({ pdfUrl }: PackageGuideSectionProps) {
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const openViewer = useCallback(() => {
    setIsViewerOpen(true)
    if (window.location.hash !== "#guide-viewer") {
      window.history.replaceState(null, "", "#guide-viewer")
    }
  }, [])

  const closeViewer = useCallback((open: boolean) => {
    setIsViewerOpen(open)
    if (!open && window.location.hash === "#guide-viewer") {
      window.history.replaceState(null, "", window.location.pathname)
    }
  }, [])

  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash === "#guide-viewer") {
        setIsViewerOpen(true)
      }
    }

    syncFromHash()
    window.addEventListener("hashchange", syncFromHash)
    return () => window.removeEventListener("hashchange", syncFromHash)
  }, [])

  return (
    <>
      <section
        id="guide-viewer"
        className="py-12 sm:py-16 bg-background border-b border-border scroll-mt-24"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-sm uppercase tracking-widest text-accent font-medium mb-3 block">
              Interactive Viewer
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground text-balance">
              Read Your Guide Here
            </h2>
            <p className="mt-3 text-muted-foreground text-pretty leading-relaxed max-w-2xl mx-auto">
              Open the full-screen viewer to flip through your guide with clickable links,
              zoom controls, and a reset scale option.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
            <div className="aspect-[16/10] sm:aspect-[16/9] bg-muted/30 flex flex-col items-center justify-center gap-4 p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                <BookOpen className="h-7 w-7 text-accent" />
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">{packageGuide.title}</p>
                <p className="text-sm text-muted-foreground">
                  Full PDF.js viewer with working links and zoom
                </p>
              </div>
              <Button
                type="button"
                size="lg"
                className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground h-14 px-8"
                onClick={openViewer}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Open Full-Screen Viewer
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center px-4 py-4 border-t border-border bg-muted/30">
              <Button asChild variant="outline" className="h-11">
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open PDF in New Tab
                </a>
              </Button>
              <Button asChild variant="outline" className="h-11">
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
        </div>
      </section>

      <PackageGuideViewerModal
        pdfUrl={pdfUrl}
        open={isViewerOpen}
        onOpenChange={closeViewer}
      />
    </>
  )
}