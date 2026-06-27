"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  getPdfViewerApp,
  hideNativePdfToolbar,
  isAtTopOfFirstPage,
  normalizeOutline,
  waitForPdfViewerApp,
  type PdfOutlineItem,
  type PdfViewerApplication,
  type PdfViewerWindow,
} from "@/lib/pdf-viewer-bridge"

type UsePdfViewerBridgeOptions = {
  iframeRef: React.RefObject<HTMLIFrameElement | null>
  open: boolean
  iframeReady: boolean
  onActivity?: () => void
  onDocumentReady?: () => void
  onDocumentError?: () => void
}

export function usePdfViewerBridge({
  iframeRef,
  open,
  iframeReady,
  onActivity,
  onDocumentReady,
  onDocumentError,
}: UsePdfViewerBridgeOptions) {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isAtPageOneTop, setIsAtPageOneTop] = useState(true)
  const [outline, setOutline] = useState<PdfOutlineItem[]>([])
  const [isReady, setIsReady] = useState(false)
  const [loadError, setLoadError] = useState(false)
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
    if (!open || !iframeReady) {
      setIsReady(false)
      setLoadError(false)
      return
    }

    let cancelled = false

    const setup = async () => {
      const viewerWindow = iframeRef.current?.contentWindow as PdfViewerWindow | null
      const app = await waitForPdfViewerApp(viewerWindow)
      if (!app || cancelled) {
        if (!cancelled) {
          setLoadError(true)
          onDocumentError?.()
        }
        return
      }

      const onDocumentErrorEvent = () => {
        if (cancelled) return
        setLoadError(true)
        setIsReady(false)
        onDocumentError?.()
      }

      const onDocumentLoaded = async () => {
        if (cancelled) return

        hideNativePdfToolbar(viewerWindow!)
        syncViewerState(app)

        const outlineData = await app.pdfDocument?.getOutline()
        if (!cancelled) {
          setOutline(normalizeOutline(outlineData))
          setIsReady(true)
          setLoadError(false)
          onDocumentReady?.()
        }
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

      app.eventBus?._on("documenterror", onDocumentErrorEvent)
      app.eventBus?._on("documentloaded", onDocumentLoaded)
      app.eventBus?._on("pagechanging", onPageChange)

      const container = app.pdfViewer?.container
      container?.addEventListener("scroll", onScroll, { passive: true })

      listenersCleanupRef.current = () => {
        app.eventBus?._off("documenterror", onDocumentErrorEvent)
        app.eventBus?._off("documentloaded", onDocumentLoaded)
        app.eventBus?._off("pagechanging", onPageChange)
        container?.removeEventListener("scroll", onScroll)
      }

      try {
        await app.initializedPromise
        if (cancelled) return

        if (app.pdfDocument) {
          await onDocumentLoaded()
        }
      } catch {
        if (!cancelled) {
          onDocumentErrorEvent()
        }
      }
    }

    void setup()

    return () => {
      cancelled = true
      listenersCleanupRef.current?.()
      listenersCleanupRef.current = null
      setIsReady(false)
      setLoadError(false)
      setCurrentPage(1)
      setTotalPages(0)
      setIsAtPageOneTop(true)
      setOutline([])
    }
  }, [
    iframeReady,
    iframeRef,
    onActivity,
    onDocumentError,
    onDocumentReady,
    open,
    syncViewerState,
  ])

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
    loadError,
    hasOutline: outline.length > 0,
    goToNextPage,
    goToPreviousPage,
    goToDestination,
    resetScale,
  }
}