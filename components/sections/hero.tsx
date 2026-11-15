import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { mediaPath } from "@/lib/media"

const heroImage = mediaPath(
  "/images/Decks pics/trex/van schaick/9E24368C-09D2-40D4-BF95-09C8239CB07B.jpg",
)

const facts = [
  { label: "Building since", value: "2016" },
  { label: "Design", value: "In-house" },
  { label: "Permits", value: "Handled" },
  { label: "Counties", value: "Albany, Saratoga, Warren" },
]

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden">
      <Image
        src={heroImage}
        alt="A long finished deck along the back of a house in Albany"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/25" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-10 pt-32 sm:pb-14 lg:px-8">
        <p className="mb-5 text-xs uppercase tracking-[0.28em] text-white/70">
          Saratoga · Lake George · Capital Region
        </p>
        <h1 className="max-w-4xl text-balance font-serif text-4xl font-light leading-[1.05] text-white sm:text-6xl lg:text-7xl">
          Custom decks for Saratoga, Lake George, and the Capital Region.
        </h1>
        <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/80 sm:text-lg">
          Trex, TimberTech, AZEK, and pressure-treated decks in Saratoga Springs,
          Lake George, Clifton Park, Loudonville, and Albany. Each project is
          designed for the lot, the winter, and how the house is used.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            asChild
            size="lg"
            className="h-12 bg-accent px-6 text-accent-foreground hover:bg-accent/90"
          >
            <Link href="#visit">Request a site visit</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 border-white/30 bg-white/5 px-6 text-white hover:bg-white/10"
          >
            <Link href="#work">See the work</Link>
          </Button>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/20 pt-6 sm:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-[0.65rem] uppercase tracking-[0.18em] text-white/50">
                {fact.label}
              </dt>
              <dd className="mt-1 text-sm text-white">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
