import Link from "next/link"

const hubs = [
  {
    title: "Saratoga Springs",
    text: "Custom decks for village and suburban properties, including lots with a change in grade.",
  },
  {
    title: "Lake George and Queensbury",
    text: "Decks for Warren County homes, built for snow load and seasonal use.",
  },
  {
    title: "Clifton Park and Loudonville",
    text: "Decks designed to meet sunrooms, sliders, and the existing backyard.",
  },
  {
    title: "Albany, Troy, and Delmar",
    text: "Decks and stairs for established neighborhoods and smaller lots.",
  },
]

export function HomeAreas() {
  return (
    <section className="border-t border-border bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Where we build
          </p>
          <h2 className="text-balance font-serif text-4xl font-light leading-tight text-foreground sm:text-5xl">
            Service area
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Site visits across Albany, Saratoga, Schenectady, and Warren counties,
            including Malta, Niskayuna, Guilderland, and Ballston Spa.
          </p>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          {hubs.map((hub) => (
            <div key={hub.title} className="border-t border-border pt-5">
              <h3 className="font-serif text-2xl font-light text-foreground">{hub.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{hub.text}</p>
            </div>
          ))}
        </div>

        <Link
          href="/contact"
          className="mt-12 inline-block border-b border-foreground/30 pb-1 text-sm text-foreground hover:border-foreground"
        >
          Contact us about your town
        </Link>
      </div>
    </section>
  )
}
