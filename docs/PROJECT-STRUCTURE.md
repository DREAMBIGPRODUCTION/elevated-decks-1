# Elevated Decks — Project Structure

Last reviewed: June 27, 2026

Next.js 16 marketing site for **Elevated Decks** — luxury deck builder in the **Capital Region / Upstate New York**.

Stack: Next.js App Router · React 19 · TypeScript · Tailwind CSS 4 · Radix/shadcn UI · PostgreSQL (leads)

---

## Directory tree

```
ed1/
├── app/                          # Next.js App Router (routes & server actions)
│   ├── layout.tsx                # Root layout, fonts (Inter + Playfair), global metadata
│   ├── globals.css                 # Theme tokens, deck brand CSS variables
│   ├── page.tsx                  # Homepage — composes section components
│   ├── about/page.tsx
│   ├── blog/
│   │   ├── page.tsx              # Blog index
│   │   └── [slug]/page.tsx       # Individual posts (SSG)
│   ├── contact/page.tsx
│   ├── gallery/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx       # Project detail pages (SSG)
│   ├── materials/page.tsx
│   ├── services/page.tsx
│   ├── actions/
│   │   └── lead-actions.ts       # Server action: validate + insert lead into Postgres
│   ├── robots.ts
│   └── sitemap.ts
│
├── components/
│   ├── layout/
│   │   ├── header.tsx            # Fixed nav, mobile sheet, phone CTA
│   │   ├── footer.tsx            # Quick links, contact, service area chips
│   │   └── floating-cta.tsx      # ⚠️ Unused — mobile call button
│   ├── sections/                 # ★ Live homepage sections
│   │   ├── hero.tsx
│   │   ├── services-grid.tsx
│   │   ├── design-section.tsx
│   │   ├── project-gallery.tsx
│   │   ├── materials.tsx         # Homepage teaser (local 2-brand array)
│   │   ├── process.tsx
│   │   ├── testimonials.tsx
│   │   ├── cta-form.tsx
│   │   └── structural-expertise.tsx  # ⚠️ Unused — Florida-era copy
│   ├── gallery/
│   │   └── gallery-page-content.tsx
│   ├── contact/
│   │   └── contact-page-content.tsx
│   ├── lead-form.tsx             # ★ Shared lead form (homepage + contact)
│   ├── forms/                    # ⚠️ Legacy — broken TS, not used on live pages
│   │   ├── full-quote-form.tsx
│   │   └── quick-quote-form.tsx
│   ├── home/                     # ⚠️ Legacy epoxy-era — not imported by live routes
│   │   ├── hero-section.tsx
│   │   ├── benefits-section.tsx
│   │   ├── cta-section.tsx
│   │   ├── testimonials.tsx
│   │   ├── before-after.tsx
│   │   ├── coming-soon-store.tsx
│   │   ├── epoxy-animation.tsx
│   │   └── service-areas-map.tsx
│   ├── ui/                       # shadcn/Radix primitives (~40 components)
│   └── theme-provider.tsx
│
├── lib/
│   ├── site-config.ts            # ★ Primary content source (business data)
│   ├── blog.ts                   # Blog post content
│   ├── seo.ts                    # absoluteUrl, JSON-LD schema helpers
│   ├── lead-validation.ts        # Zod schema for lead form
│   ├── db.ts                     # pg Pool singleton (requires DATABASE_URL)
│   ├── utils.ts                  # cn() helper
│   └── images.ts                 # ⚠️ Legacy epoxy image map — unused, paths missing
│
├── hooks/
│   ├── use-mobile.ts
│   └── use-toast.ts
│
├── db/
│   └── migrations/
│       └── 001_create_leads.sql
│
├── public/
│   ├── images/
│   │   ├── logo.png
│   │   ├── hero-deck.jpg         # Legacy generic hero (live hero uses project photo)
│   │   ├── structural-framing.jpg
│   │   ├── material-*.jpg        # Brand showcase images
│   │   ├── gallery-*.jpg         # Legacy placeholder gallery
│   │   ├── Decks pics/           # ★ Real project photography
│   │   │   ├── trex/
│   │   │   ├── azek/
│   │   │   ├── PT/
│   │   │   └── design/
│   │   ├── 28 BALTIMORE PICS/
│   │   ├── AZEK CP/
│   │   └── PRESSURETREATEDMD/
│   ├── blog/                     # Blog cover images
│   └── videos/hero-loop.mp4      # Used only by legacy home hero
│
├── docs/                         # Internal docs (some stale — see todo.md)
├── scripts/update-globals.mjs
├── overview.md                   # High-level orientation (partially stale paths)
├── todo.md                       # ★ Canonical task list & edit guide
├── next.config.mjs
├── postcss.config.mjs
├── components.json               # shadcn config
├── package.json
├── tsconfig.json
└── .env.example
```

---

## Routes

| Route | File | Purpose |
|-------|------|---------|
| `/` | `app/page.tsx` | Homepage: hero → services → design → gallery → materials → process → testimonials → CTA |
| `/services` | `app/services/page.tsx` | Deck service categories & positioning |
| `/gallery` | `app/gallery/page.tsx` | Filterable project grid |
| `/gallery/[slug]` | `app/gallery/[slug]/page.tsx` | Project detail + related projects |
| `/materials` | `app/materials/page.tsx` | Trex, TimberTech, AZEK brand deep-dive |
| `/about` | `app/about/page.tsx` | Company story |
| `/contact` | `app/contact/page.tsx` | Contact info + `LeadForm` |
| `/blog` | `app/blog/page.tsx` | Blog index |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Long-form SEO articles |
| `/sitemap.xml` | `app/sitemap.ts` | Auto-generated |
| `/robots.txt` | `app/robots.ts` | Crawl rules |

**No route for:** `/quote`, `/projects` (nav correctly uses `/gallery`)

---

## Architecture

### Content model

Most editable business content lives in **`lib/site-config.ts`**:

```typescript
siteConfig          // name, phone, email, address, social, url
navigation          // main nav + service anchor links (anchors currently broken)
serviceAreas        // counties + cities
deckCategories      // 3 deck system groupings with nested services
services            // flat array (backward compat)
deckingBrands       // Trex, TimberTech, AZEK
materials           // hardwood, railings
galleryProjects     // 11 projects with slugs, images, locations
featuredProjects    // 4 projects used as hero imagery on inner pages
designServices      // design section copy + screenshots
testimonials        // 4 NY-area reviews
processSteps        // 5-step timeline
```

Blog content is separate in **`lib/blog.ts`** (6 posts).

**Exceptions** — content NOT in site-config:
- `components/sections/materials.tsx` — local Trex/AZEK array
- `components/sections/hero.tsx` — local `heroNotes` array
- Per-page metadata in each `app/*/page.tsx`

### Form pipeline

```
LeadForm (client)
  → submitLead server action
    → parseLeadFormData (Zod)
    → db.query INSERT INTO leads
```

Requires `DATABASE_URL` in `.env.local` / Vercel env vars.

### Component layers

```
app/*/page.tsx
  └── layout/header + footer
  └── page-specific content components
  └── sections/* (homepage blocks)
  └── ui/* (primitives)
```

### Two parallel component trees

| Tree | Status |
|------|--------|
| `components/sections/*` | **Live** — used by `app/page.tsx` |
| `components/home/*` | **Dead** — epoxy-era, Florida market, broken imports |

---

## Key config files

| File | Role |
|------|------|
| `next.config.mjs` | `images.unoptimized: true`; `typescript.ignoreBuildErrors: true` ⚠️ |
| `app/globals.css` | `--deck-charcoal`, `--deck-wood`, light/dark tokens |
| `lib/seo.ts` | `GeneralContractor` + `WebSite` JSON-LD, breadcrumb helper |
| `.env.example` | `DATABASE_URL` template for Postgres |

---

## Service areas (current)

**Counties:** Albany, Saratoga, Schenectady, Warren  
**Cities:** Loudonville, Saratoga Springs, Malta, Niskayuna, Lake George, Clifton Park, Delmar, Albany, Troy, Ballston Spa, Queensbury, Guilderland

---

## Design system

| Token | Usage |
|-------|-------|
| `--deck-charcoal` | Dark section backgrounds |
| `--deck-wood` | Accent / wood-tone highlights |
| `font-serif` | Playfair Display (headings) |
| `font-sans` | Inter (body) |

Breakpoints: Tailwind defaults (`sm`, `md`, `lg`, `xl`)

---

## Known issues

See **`todo.md`** at repo root for the full prioritized list. Highlights:

1. Lead forms need production `DATABASE_URL` + migration
2. TypeScript errors hidden at build time
3. Legacy `components/home/*` and `components/forms/*` have broken imports
4. `navigation.services` anchor links don't match any page `id` attributes
5. Several internal docs describe the old South Florida / epoxy site

---

## Dev commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build (skips TS validation)
pnpm start        # Serve production build
./node_modules/.bin/tsc --noEmit   # Actual type check
```