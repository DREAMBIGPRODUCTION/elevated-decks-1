"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { Button } from "@/components/ui/button"
import { packageGuide } from "@/lib/site-config"
import { ChevronLeft, ChevronRight, Download, ExternalLink, Loader2 } from "lucide-react"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs"

type PackageGuideViewerProps = {
  pdfUrl: string
}

export function PackageGuideViewer({ pdfUrl }: PackageGuideViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageWidth, setPageWidth] = useState(0)
  const [loadError, setLoadError] = useState(false)

  const updateWidth = useCallback(() => {
    if (!containerRef.current) return
    const styles = getComputedStyle(containerRef.current)
    const paddingX =
      parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight)
    setPageWidth(Math.max(containerRef.current.clientWidth - paddingX, 280))
  }, [])

  useEffect(() => {
    updateWidth()
    const observer = new ResizeObserver(updateWidth)
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [updateWidth])

  const goToPreviousPage = () => {
    setPageNumber((current) => Math.max(current - 1, 1))
  }

  const goToNextPage = () => {
    setPageNumber((current) => Math.min(current + 1, numPages))
  }

  if (loadError) {
    return (
      <div className="rounded-lg border border-border bg-card p-6 sm:p-8 text-center">
        <p className="text-muted-foreground mb-6 leading-relaxed">
          The in-page viewer couldn&apos;t load this guide. You can still open or download
          the PDF directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="h-12">
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Open PDF
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
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 py-3 border-b border-border bg-muted/40">
        <p className="text-sm font-medium text-foreground">
          {numPages > 0 ? (
            <>
              Page {pageNumber} of {numPages}
            </>
          ) : (
            "Loading guide..."
          )}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-10 px-3"
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">Previous</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-10 px-3"
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            aria-label="Next page"
          >
            <span className="hidden sm:inline mr-1">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button asChild variant="outline" size="sm" className="h-10">
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">Open</span>
            </a>
          </Button>
          <Button asChild size="sm" className="h-10 bg-accent hover:bg-accent/90 text-accent-foreground">
            <a
              href={pdfUrl}
              download={packageGuide.pdfFilename}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">Download</span>
            </a>
          </Button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="bg-muted/20 px-3 py-4 sm:px-6 sm:py-6 flex justify-center min-h-[420px] sm:min-h-[560px]"
      >
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages: total }) => {
            setNumPages(total)
            setLoadError(false)
          }}
          onLoadError={() => setLoadError(true)}
          loading={
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
              <p className="text-sm">Loading your guide...</p>
            </div>
          }
          className="flex justify-center"
        >
          <Page
            pageNumber={pageNumber}
            width={pageWidth || undefined}
            renderTextLayer
            renderAnnotationLayer
            className="shadow-md"
            loading={
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-6 w-6 animate-spin text-accent" />
              </div>
            }
          />
        </Document>
      </div>

      {numPages > 1 && (
        <div className="flex sm:hidden items-center justify-between gap-3 px-4 py-3 border-t border-border bg-muted/40">
          <Button
            type="button"
            variant="outline"
            className="flex-1 h-12"
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1 h-12"
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}