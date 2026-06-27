"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown, Sparkles, Layers3, ShieldCheck } from "lucide-react"

const heroNotes = [
  {
    id: "materials",
    label: "Premium Materials",
    title: "Built to last",
    text: "Trex, TimberTech, and quality railing systems selected for your project and climate.",
    icon: Sparkles,
  },
  {
    id: "layouts",
    label: "Custom Layouts",
    title: "Designed for your site",
    text: "Multi-level decks, stairs, railings, and layouts shaped around your home and yard.",
    icon: Layers3,
  },
  {
    id: "service",
    label: "Quality Service",
    title: "Start to finish",
    text: "Complimentary renderings, expert installation, and an installation warranty.",
    icon: ShieldCheck,
  },
]

export function Hero() {
  const imageRef = useRef<HTMLDivElement>(null)
  const [activeNote, setActiveNote] = useState(heroNotes[0].id)
  const [pointer, setPointer] = useState({ x: 50, y: 45 })

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const scrollY = window.scrollY
        imageRef.current.style.transform = `scale(${1 + scrollY * 0.00028}) translateY(${scrollY * 0.12}px)`
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const currentNote = heroNotes.find((note) => note.id === activeNote) ?? heroNotes[0]

  return (
    <section
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-16 sm:pt-20"
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect()
        const x = ((event.clientX - bounds.left) / bounds.width) * 100
        const y = ((event.clientY - bounds.top) / bounds.height) * 100
        setPointer({ x, y })
      }}
    >
      {/* Background Image with Parallax */}
      <div ref={imageRef} className="absolute inset-0 will-change-transform">
        <Image
          src="/images/Decks pics/trex/van schaick/9E24368C-09D2-40D4-BF95-09C8239CB07B.jpg"
          alt="Luxury elevated deck overlooking waterfront"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/15" />
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(214, 140, 86, 0.22), transparent 28%)`,
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-end">
          <div className="max-w-4xl">
          {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs sm:text-sm text-white/90 tracking-wide uppercase">
                Luxury Deck Builder in Upstate New York
            </span>
          </div>

          {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[5.6rem] font-semibold text-white mb-5 tracking-tight text-balance leading-[0.95]">
              Luxury decks.
              <br />
              <span className="text-white/82">Stronger first impression.</span>
          </h1>

          {/* Sub headline */}
            <p className="text-base sm:text-lg md:text-xl text-white/85 font-light tracking-wide mb-8 sm:mb-10 text-balance">
              Premium outdoor living spaces for the Greater Capital Region.
          </p>

          {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Button
              asChild
              size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground h-12 sm:h-14 px-6 sm:px-8 text-base w-full sm:w-auto sm:min-w-[220px] shadow-lg shadow-black/20"
            >
              <Link href="/contact">
                  Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
                className="border-white/30 text-white hover:bg-white/10 h-12 sm:h-14 px-6 sm:px-8 text-base w-full sm:w-auto sm:min-w-[220px] bg-white/5 backdrop-blur-sm"
            >
              <Link href="/gallery">View Our Work</Link>
            </Button>
          </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {heroNotes.map((note) => {
                const Icon = note.icon
                const isActive = note.id === activeNote

                return (
                  <button
                    key={note.id}
                    onMouseEnter={() => setActiveNote(note.id)}
                    onFocus={() => setActiveNote(note.id)}
                    onClick={() => setActiveNote(note.id)}
                    className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-all duration-300 ${
                      isActive
                        ? "border-white/35 bg-white/16 text-white shadow-lg shadow-black/15"
                        : "border-white/15 bg-black/20 text-white/72 hover:border-white/30 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{note.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="hidden lg:flex lg:justify-end">
            <div className="relative w-full max-w-md rounded-[1.4rem] border border-white/16 bg-white/10 p-5 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.28)] hero-float">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-white/52">Featured Focus</p>
                  <h2 className="mt-2 font-serif text-3xl text-white">{currentNote.title}</h2>
                </div>
                <div className="rounded-full border border-white/14 bg-white/10 p-3">
                  <currentNote.icon className="h-5 w-5 text-accent" />
                </div>
              </div>

              <p className="text-base leading-relaxed text-white/76">{currentNote.text}</p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-black/18 px-3 py-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-white/45">Location</p>
                  <p className="mt-2 text-sm text-white">Capital Region</p>
                </div>
                <div className="rounded-2xl bg-black/18 px-3 py-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-white/45">Style</p>
                  <p className="mt-2 text-sm text-white">High-End Custom</p>
                </div>
                <div className="rounded-2xl bg-black/18 px-3 py-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-white/45">Focus</p>
                  <p className="mt-2 text-sm text-white">Luxury Decks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          className="flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors"
          aria-label="Scroll down"
        >
          <span className="text-xs uppercase tracking-[0.28em]">Explore</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </button>
      </div>
    </section>
  )
}
