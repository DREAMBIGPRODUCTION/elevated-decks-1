export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-RZ4813GQ71"

const GA_ID_PATTERN = /^G-[A-Z0-9]+$/i

export function isGaEnabled() {
  return GA_ID_PATTERN.test(GA_MEASUREMENT_ID)
}

type GtagCommand = "js" | "config" | "event" | "set" | "consent"

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (command: GtagCommand, ...args: unknown[]) => void
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  window.gtag("event", name, params)
}

export function trackPageView(url: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  window.gtag("event", "page_view", {
    page_path: url,
    page_location: window.location.href,
    page_title: document.title,
  })
}

export function trackGenerateLead(params: {
  form: "consultation" | "quick_quote" | "full_quote"
  sourcePage?: string
  projectType?: string
}) {
  trackEvent("generate_lead", {
    currency: "USD",
    form_name: params.form,
    source_page: params.sourcePage,
    project_type: params.projectType,
  })
}
