"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  getPdfViewerApp,
  hideNativePdfToolbar,
  isAtTopOfFirstPage,
  normalizeOutline,
  type PdfOutlineItem,
  type PdfViewerApplication,
  type PdfViewerWindow,
} from "@/lib/pdf-viewer-bridge"

type UsePdfViewerBridgeOptions = {
  iframeRef: React.RefObject<HTMLIFrameElement | null>
  open: boolean
  isLoading: boolean
  onActivity?: () => void
}

export function usePdfViewerBridge({
  iframeRef,
  open,
  isLoading,
  onActivity,
}: UsePdfViewerBridgeOptions) {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isAtPageOneTop, setIsAtPageOneTop] = useState(true)
  const [outline, setOutline] = useState<PdfOutlineItem[]>([])
  const [isReady, setIsReady] = useState(false)
  const listenersCleanupRef = useRef<(() => void) | null>(null)

  const syncViewerState = useCallback((app: PdfViewerApplication) => {
    setCurrentPage(app.page)
    setTotalPages(app.pagesCount)
    setIsAtPageOneTop(isAtTopOfFirstPage(app))
  }, [])

  const withApp = useCallback(
    async <T,>(runner: (app: PdfViewerApplication) => T | Promise<T>) => {
      const app = getPdfViewerApp(iframeRef.current)
      if (!app?.initializedPromise) return
      await app.initializedPromise
      return runner(app)
    },
    [iframeRef],
  )

  useEffect(() => {
    if (!open || isLoading) {
      setIsReady(false)
      return
    }

    let cancelled = false

    const setup = async () => {
      const viewerWindow = iframeRef.current?.contentWindow as PdfViewerWindow | null
      const app = viewerWindow?.PDFViewerApplication
      if (!app?.initializedPromise) return

      await app.initializedPromise
      if (cancelled) return

      hideNativePdfToolbar(viewerWindow!)
      syncViewerState(app)

      const outlineData = await app.pdfDocument?.getOutline()
      if (!cancelled) {
        setOutline(normalizeOutline(outlineData))
        setIsReady(true)
      }

      const onPageChange = ({ pageNumber }: { pageNumber: number }) => {
        setCurrentPage(pageNumber)
        setIsAtPageOneTop(isAtTopOfFirstPage(app))
        onActivity?.()
      }

      const onScroll = () => {
        setIsAtPageOneTop(isAtTopOfFirstPage(app))
        onActivity?.()
      }

      app.eventBus?._on("pagechanging", onPageChange)
      const container = app.pdfViewer?.container
      container?.addEventListener("scroll", onScroll, { passive: true })

      listenersCleanupRef.current = () => {
        app.eventBus?._off("pagechanging", onPageChange)
        container?.removeEventListener("scroll", onScroll)
      }
    }

    void setup()

    return () => {
      cancelled = true
      listenersCleanupRef.current?.()
      listenersCleanupRef.current = null
      setIsReady(false)
      setCurrentPage(1)
      setTotalPages(0)
      setIsAtPageOneTop(true)
      setOutline([])
    }
  }, [iframeRef, isLoading, onActivity, open, syncViewerState])

  const goToNextPage = useCallback(async () => {
    await withApp((app) => {
      app.pdfViewer?.nextPage()
      syncViewerState(app)
      onActivity?.()
    })
  }, [onActivity, syncViewerState, withApp])

  const goToPreviousPage = useCallback(async () => {
    await withApp((app) => {
      app.pdfViewer?.previousPage()
      syncViewerState(app)
      onActivity?.()
    })
  }, [onActivity, syncViewerState, withApp])

  const goToDestination = useCallback(
    async (dest: unknown) => {
      await withApp(async (app) => {
        await app.pdfLinkService?.goToDestination(dest)
        syncViewerState(app)
        onActivity?.()
      })
    },
    [onActivity, syncViewerState, withApp],
  )

  const resetScale = useCallback(async () => {
    await withApp((app) => {
      if (app.pdfViewer) {
        app.pdfViewer.currentScaleValue = "page-width"
      }
      onActivity?.()
    })
  }, [onActivity, withApp])

  return {
    currentPage,
    totalPages,
    isAtPageOneTop,
    outline,
    isReady,
    hasOutline: outline.length > 0,
    goToNextPage,
    goToPreviousPage,
    goToDestination,
    resetScale,
  }
}