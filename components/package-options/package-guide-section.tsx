"use client"

import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

const PackageGuideViewer = dynamic(
  () =>
    import("@/components/package-options/package-guide-viewer").then(
      (module) => module.PackageGuideViewer,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-lg border border-border bg-card flex flex-col items-center justify-center gap-3 py-24 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
        <p className="text-sm">Preparing viewer...</p>
      </div>
    ),
  },
)

type PackageGuideSectionProps = {
  pdfUrl: string
}

export function PackageGuideSection({ pdfUrl }: PackageGuideSectionProps) {
  return (
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
            Flip through the full guide below, or download a copy to keep.
          </p>
        </div>
        <PackageGuideViewer pdfUrl={pdfUrl} />
      </div>
    </section>
  )
}