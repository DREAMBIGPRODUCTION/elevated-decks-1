import { cn } from "@/lib/utils"

const navItems = [
  { label: "Materials", href: "#materials" },
  { label: "Trex", href: "#trex" },
  { label: "TimberTech", href: "#timbertech" },
  { label: "Railings", href: "#railings" },
  { label: "Lighting", href: "#lighting" },
]

export function ServicesQuickNav() {
  return (
    <nav
      aria-label="Services page sections"
      className="sticky top-16 sm:top-20 z-40 bg-background/95 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 overflow-x-auto py-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center sm:gap-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap",
                "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}