import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="bg-deck-cream pt-28 pb-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Legal</p>
          <h1 className="font-serif text-4xl mt-2 mb-2">{title}</h1>
          <p className="text-sm text-muted-foreground mb-10">Last updated {updated}</p>
          <div className="space-y-6 text-[15px] leading-relaxed text-foreground/90 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:text-foreground/80 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_a]:underline">
            {children}
          </div>
          <p className="mt-12 text-sm text-muted-foreground">
            Also see our{" "}
            <Link href="/privacy">Privacy Policy</Link> and{" "}
            <Link href="/terms">Terms of Service</Link>.
          </p>
        </article>
      </main>
      <Footer />
    </>
  )
}
