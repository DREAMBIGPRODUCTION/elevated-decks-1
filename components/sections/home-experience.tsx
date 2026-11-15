import Link from "next/link"

const capabilities = [
  {
    number: "01",
    title: "Custom decks",
    text: "A deck planned around the doors, the yard, and how the house is actually used. Stairs, rail, and the path from the kitchen are part of the design.",
    href: "/services",
  },
  {
    number: "02",
    title: "Multi-level decks",
    text: "Landings and stairs are designed for the slope of the lot, including properties in Saratoga and around Lake George.",
    href: "/services",
  },
  {
    number: "03",
    title: "Railings and lighting",
    text: "Composite, PVC, and cable rail systems, with stair and post lighting specified as part of the deck.",
    href: "/services#railings",
  },
  {
    number: "04",
    title: "Decking materials",
    text: "Trex and TimberTech composite, AZEK PVC, or pressure-treated wood, selected for sun, moisture, and maintenance.",
    href: "/services#materials",
  },
]

export function HomeExperience() {
  return (
    <section id="services" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="mb-4 text-xs uppercase tracking-[0.28em] text-muted-foreground">
              What we build
            </p>
            <h2 className="text-balance font-serif text-4xl font-light leading-tight text-foreground sm:text-5xl">
              Layout, structure, and finish in one project.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="text-lg leading-relaxed text-muted-foreground">
              A deck includes the framing, the walking surface, the railing,
              the lighting, and the drawings for the permit. We design those
              together so the finished space fits the house.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-px bg-border sm:grid-cols-2">
          {capabilities.map((item) => (
            <Link
              key={item.number}
              href={item.href}
              className="group bg-background p-6 transition-colors hover:bg-muted/60 sm:p-8"
            >
              <p className="text-xs tracking-[0.2em] text-muted-foreground">{item.number}</p>
              <h3 className="mt-4 font-serif text-2xl font-light text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
                {item.text}
              </p>
              <p className="mt-5 text-sm text-foreground group-hover:underline">
                View details
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
