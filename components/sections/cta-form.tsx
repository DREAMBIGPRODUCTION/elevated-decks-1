import { LeadForm } from "@/components/lead-form"

export function CTAForm() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="text-sm tracking-widest uppercase text-muted-foreground mb-4 block">
              Get Started
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-foreground leading-tight mb-6 text-balance">
              Ready to Build
              <br />
              <span className="text-[var(--deck-wood)]">Your Deck?</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Take the first step toward your dream outdoor space. Schedule a free consultation
              with our team to discuss your project, review design options, and receive a custom proposal.
            </p>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--deck-wood)]" />
                <span>Free on-site consultations</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--deck-wood)]" />
                <span>Custom 3D design renderings</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--deck-wood)]" />
                <span>Transparent project proposals</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-sm p-5 sm:p-8 lg:p-10">
            <LeadForm
              sourcePage="homepage-cta"
              successMessage="Thanks. Your request has been sent and we’ll follow up with your next steps soon."
            />
          </div>
        </div>
      </div>
    </section>
  )
}
