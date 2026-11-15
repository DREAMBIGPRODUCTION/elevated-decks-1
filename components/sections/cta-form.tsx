import { LeadForm } from "@/components/lead-form"
import { siteConfig } from "@/lib/site-config"

export function CTAForm() {
  return (
    <section id="visit" className="border-t border-border bg-background py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-12 lg:gap-20 lg:px-8">
        <div className="lg:col-span-5">
          <h2 className="text-balance font-serif text-4xl font-light leading-tight text-foreground sm:text-5xl">
            Request a site visit.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            We visit the property, review the grade and access, and discuss
            layout and materials before preparing a proposal.
          </p>
          <div className="mt-10 space-y-3 text-sm">
            {siteConfig.hours.map((row) => (
              <div key={row.days} className="flex justify-between gap-6 border-b border-border py-2">
                <span className="text-muted-foreground">{row.days}</span>
                <span className="text-foreground">{row.label}</span>
              </div>
            ))}
          </div>
          <a
            href={`tel:${siteConfig.phoneClean}`}
            className="mt-8 inline-block text-foreground hover:text-accent"
          >
            {siteConfig.phone}
          </a>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <LeadForm
            sourcePage="homepage-cta"
            submitLabel="Request a site visit"
            messagePlaceholder="The house, the yard, and what you want the deck to do."
            footnote="We'll call or write back during business hours."
            successTitle="Request received."
            successMessage="We'll follow up to set a time to see the house."
          />
        </div>
      </div>
    </section>
  )
}
