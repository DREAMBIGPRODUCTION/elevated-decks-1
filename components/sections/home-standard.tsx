const standards = [
  {
    title: "Structure",
    text: "Footings, frame, and stairs are settled for snow load and the slope before the surface goes down.",
  },
  {
    title: "Surface",
    text: "Trex, TimberTech, AZEK, or pressure-treated wood, picked for the sun on that side of the house and the upkeep you want.",
  },
  {
    title: "Rail and light",
    text: "Railing and lighting are specified with the deck, including lights at the stairs and posts.",
  },
  {
    title: "Drawings and permits",
    text: "Structural plans are drawn in-house, and we submit the permit application required for the project.",
  },
]

const steps = [
  { number: "01", title: "Site visit", text: "We walk the house, the doors, and the grade." },
  { number: "02", title: "Design", text: "A layout and material plan for your review." },
  { number: "03", title: "Permits", text: "We file what the municipality requires." },
  { number: "04", title: "Build", text: "Our crew builds it and walks it with you at the end." },
]

export function HomeStandard() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="mb-4 text-xs uppercase tracking-[0.28em] text-muted-foreground">
              Built for this climate
            </p>
            <h2 className="text-balance font-serif text-4xl font-light leading-tight text-foreground sm:text-5xl">
              Specified for Capital Region winters.
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground lg:col-span-6 lg:col-start-7">
            Decks in this region carry snow, go through freeze-thaw, and need to
            be ready when the season opens. Framing and decking are selected for
            those conditions.
          </p>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {standards.map((item) => (
            <div key={item.title} className="border-t border-border pt-5">
              <h3 className="font-serif text-2xl font-light text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>

        <ol className="mt-16 grid gap-8 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.number}>
              <p className="text-xs tracking-[0.2em] text-muted-foreground">{step.number}</p>
              <h3 className="mt-2 text-lg text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
