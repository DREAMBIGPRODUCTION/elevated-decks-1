"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { Button } from "@/components/ui/button"
import {
  normalizePackagePdfOutline,
  type PackagePdfOutlineItem,
} from "@/lib/package-pdf-types"
import { packageGuide } from "@/lib/site-config"
import { cn } from "@/lib/utils"
import { ExternalLink, Loader2 } from "lucide-react"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

const PDF_WORKER_SRC = "/pdfjs/build/pdf.worker.mjs"

type PdfDocumentLike = {
  numPages: number
  getOutline: () => Promise<unknown[] | null>
  getDestination: (name: string) => Promise<unknown>
  getPageIndex: (ref: unknown) => Promise<number>
}

function configurePdfWorker() {
  if (typeof window === "undefined") return
  pdfjs.GlobalWorkerOptions.workerSrc = PDF_WORKER_SRC
}

async function getPageNumberFromDest(pdf: PdfDocumentLike, dest: unknown) {
  let resolvedDest = dest

  if (typeof resolvedDest === "string") {
    resolvedDest = await pdf.getDestination(resolvedDest)
  }

  if (!Array.isArray(resolvedDest) || !resolvedDest[0]) {
    return null
  }

  const pageIndex = await pdf.getPageIndex(resolvedDest[0])
  return pageIndex + 1
}

export async function resolveOutlinePage(pdfUrl: string, dest: unknown) {
  configurePdfWorker()
  const pdf = (await pdfjs.getDocument(pdfUrl).promise) as PdfDocumentLike
  return getPageNumberFromDest(pdf, dest)
}

type PackageGuidePdfViewerProps = {
  pdfUrl: string
  currentPage: number
  zoom: number
  navigationTick: number
  onDocumentLoad: (data: {
    numPages: number
    outline: PackagePdfOutlineItem[]
  }) => void
  onPageChange: (page: number) => void
  onScrollTopChange: (isAtTop: boolean) => void
  onLoadError: () => void
  onActivity: () => void
}

export function PackageGuidePdfViewer({
  pdfUrl,
  currentPage,
  zoom,
  navigationTick,
  onDocumentLoad,
  onPageChange,
  onScrollTopChange,
  onLoadError,
  onActivity,
}: PackageGuidePdfViewerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const pageRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const [workerReady, setWorkerReady] = useState(false)
  const [pageWidth, setPageWidth] = useState(0)
  const [numPages, setNumPages] = useState(0)

  useEffect(() => {
    configurePdfWorker()
    setWorkerReady(true)
  }, [])

  const updateWidth = useCallback(() => {
    if (!scrollRef.current) return
    const styles = getComputedStyle(scrollRef.current)
    const paddingX =
      parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight)
    setPageWidth(Math.max(scrollRef.current.clientWidth - paddingX, 280))
  }, [])

  useEffect(() => {
    updateWidth()
    const observer = new ResizeObserver(updateWidth)
    if (scrollRef.current) observer.observe(scrollRef.current)
    return () => observer.disconnect()
  }, [updateWidth])

  useEffect(() => {
    const container = scrollRef.current
    if (!container || numPages === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (!visible.length) return

        const page = Number(visible[0].target.getAttribute("data-page-number"))
        if (page && page !== currentPage) {
          onPageChange(page)
        }
      },
      {
        root: container,
        threshold: [0.35, 0.55, 0.75],
      },
    )

    pageRefs.current.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [currentPage, numPages, onPageChange])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const onScroll = () => {
      onActivity()
      onScrollTopChange(container.scrollTop < 40)
    }

    container.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    return () => container.removeEventListener("scroll", onScroll)
  }, [numPages, onActivity, onScrollTopChange])

  useEffect(() => {
    if (navigationTick === 0) return

    const pageElement = pageRefs.current.get(currentPage)
    pageElement?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [navigationTick, currentPage])

  if (!workerReady) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
        <p className="text-sm">Preparing viewer...</p>
      </div>
    )
  }

  return (
    <div
      ref={scrollRef}
      className="h-full overflow-y-auto bg-muted/20 px-3 py-4 sm:px-6 sm:py-6"
      onWheel={onActivity}
      onTouchMove={onActivity}
    >
      <Document
        file={pdfUrl}
        onLoadSuccess={async (pdf) => {
          const outline = normalizePackagePdfOutline(
            (await pdf.getOutline()) as Parameters<typeof normalizePackagePdfOutline>[0],
          )
          setNumPages(pdf.numPages)
          onDocumentLoad({ numPages: pdf.numPages, outline })
        }}
        onLoadError={onLoadError}
        loading={
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
            <p className="text-sm">Loading your guide...</p>
          </div>
        }
        error={
          <div className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center">
            <p className="text-muted-foreground max-w-md leading-relaxed">
              The viewer couldn&apos;t load your guide. You can still open the PDF directly.
            </p>
            <Button asChild size="lg" className="h-12">
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open PDF in New Tab
              </a>
            </Button>
          </div>
        }
        className="mx-auto flex max-w-5xl flex-col items-center gap-4"
      >
        {Array.from({ length: numPages }, (_, index) => {
          const pageNumber = index + 1
          return (
            <div
              key={pageNumber}
              ref={(element) => {
                if (element) pageRefs.current.set(pageNumber, element)
                else pageRefs.current.delete(pageNumber)
              }}
              data-page-number={pageNumber}
              className={cn(
                "w-full scroll-mt-4",
                pageNumber === currentPage && "ring-2 ring-accent/30 rounded-sm",
              )}
            >
              <Page
                pageNumber={pageNumber}
                width={pageWidth ? pageWidth * zoom : undefined}
                renderTextLayer
                renderAnnotationLayer
                className="mx-auto shadow-md"
                loading={
                  <div className="flex items-center justify-center py-16">
                    <Loader2 className="h-6 w-6 animate-spin text-accent" />
                  </div>
                }
              />
            </div>
          )
        })}
      </Document>
      {numPages > 0 && (
        <p className="mt-6 text-center text-xs text-muted-foreground">
          {packageGuide.title} · {numPages} pages
        </p>
      )}
    </div>
  )
}