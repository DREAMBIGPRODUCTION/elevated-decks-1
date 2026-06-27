export type PdfOutlineItem = {
  title: string
  dest?: unknown
  items?: PdfOutlineItem[]
}

export type PdfViewerApplication = {
  initializedPromise?: Promise<void>
  page: number
  pagesCount: number
  pdfDocument?: {
    getOutline: () => Promise<PdfOutlineRawItem[] | null>
  }
  pdfViewer?: {
    currentPageNumber: number
    currentScaleValue: number | string
    container?: HTMLElement
    nextPage: () => boolean
    previousPage: () => boolean
  }
  pdfLinkService?: {
    goToDestination: (dest: unknown) => Promise<void>
  }
  eventBus?: {
    _on: (event: string, listener: (data: { pageNumber: number }) => void) => void
    _off: (event: string, listener: (data: { pageNumber: number }) => void) => void
  }
}

export type PdfViewerWindow = Window & {
  PDFViewerApplication?: PdfViewerApplication
}

type PdfOutlineRawItem = {
  title: string
  dest?: unknown
  items?: PdfOutlineRawItem[]
}

export function getPdfViewerApp(iframe: HTMLIFrameElement | null) {
  return (iframe?.contentWindow as PdfViewerWindow | null)?.PDFViewerApplication
}

export function normalizeOutline(
  outline: PdfOutlineRawItem[] | null | undefined,
): PdfOutlineItem[] {
  if (!outline?.length) return []

  return outline.map((item) => ({
    title: item.title || "Untitled",
    dest: item.dest,
    items: item.items?.length ? normalizeOutline(item.items) : undefined,
  }))
}

export function isAtTopOfFirstPage(app: PdfViewerApplication, threshold = 40) {
  const scrollTop = app.pdfViewer?.container?.scrollTop ?? 0
  return app.page === 1 && scrollTop < threshold
}

export function hideNativePdfToolbar(viewerWindow: PdfViewerWindow) {
  const doc = viewerWindow.document
  if (!doc || doc.getElementById("elevated-decks-pdf-chrome")) return

  const style = doc.createElement("style")
  style.id = "elevated-decks-pdf-chrome"
  style.textContent = `
    #toolbarContainer,
    #sidebarContainer,
    #secondaryToolbarToggle {
      display: none !important;
    }
    #viewerContainer {
      inset: 0 !important;
      top: 0 !important;
    }
  `
  doc.head.appendChild(style)
}