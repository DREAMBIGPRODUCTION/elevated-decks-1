# Elevated Decks — TODO & Edit Guide

Last reviewed: June 27, 2026

This is the canonical task list for the repo. Older docs in `docs/` may be stale — trust this file and `docs/PROJECT-STRUCTURE.md` first.

---

## Quick edit guide

| What you want to change | Where to edit |
|-------------------------|---------------|
| Company name, phone, email, social links | `lib/site-config.ts` → `siteConfig` |
| Service areas & cities | `lib/site-config.ts` → `serviceAreas` |
| Main nav links | `lib/site-config.ts` → `navigation.main` **and** `components/layout/header.tsx` → `navItems` (currently duplicated) |
| Gallery projects & images | `lib/site-config.ts` → `galleryProjects`, `featuredProjects` |
| Testimonials | `lib/site-config.ts` → `testimonials` |
| Process steps | `lib/site-config.ts` → `processSteps` |
| Decking brands & materials (full page) | `lib/site-config.ts` → `deckingBrands`, `materials` |
| Homepage section order | `app/page.tsx` |
| Homepage hero image & copy | `components/sections/hero.tsx` |
| Homepage materials teaser (Trex/AZEK only) | `components/sections/materials.tsx` (local array, not `site-config`) |
| Blog posts | `lib/blog.ts` |
| SEO defaults & schema | `app/layout.tsx`, `lib/seo.ts`, per-page `metadata` exports |
| Lead form fields & validation | `components/lead-form.tsx`, `lib/lead-validation.ts` |
| Lead storage (Postgres) | `app/actions/lead-actions.ts`, `lib/db.ts`, `db/migrations/001_create_leads.sql` |
| Global styles & brand tokens | `app/globals.css` |

**Run locally:** `pnpm dev` → http://localhost:3000  
**Env:** copy `.env.example` → `.env.local` and set `DATABASE_URL` for lead forms to work.

---

## Critical — fix before relying on leads

- [ ] **Wire up `DATABASE_URL` in production** — `LeadForm` (homepage CTA + contact page) posts to Postgres via `submitLead`. Without a valid connection string, users see *"We couldn't send your request right now."*
- [ ] **Run DB migration** — apply `db/migrations/001_create_leads.sql` on the target Postgres instance before go-live.
- [ ] **Remove `typescript.ignoreBuildErrors`** in `next.config.mjs` and fix the 15 TypeScript errors currently hidden (see Build & tooling below). Builds succeed today only because type-checking is skipped.

---

## Broken links & dead routes

| Issue | Location | Notes |
|-------|----------|-------|
| `/quote` does not exist | `components/home/hero-section.tsx`, `cta-section.tsx`, `service-areas-map.tsx` | Legacy epoxy components link here. Not used on live pages, but will 404 if re-enabled. |
| Service anchor links go nowhere | `lib/site-config.ts` → `navigation.services` | Links like `/services#elevated-decks` — **no matching `id=` attributes** on `app/services/page.tsx`. Anchors never scroll. |
| Social URLs are generic placeholders | `lib/site-config.ts` → `siteConfig.social` | `facebook.com/elevateddecks`, etc. may not be real profiles. Verify or remove. |
| `navigation.services` is unused | `lib/site-config.ts` | Defined but not rendered in header/footer. Either wire it up or delete to avoid drift. |

### Resolved (no longer broken)

- Header logo → `/images/logo.png` ✓
- Header phone → uses `siteConfig.phone` ✓
- Nav "Projects" → `/gallery` ✓
- Gallery detail pages → `/gallery/[slug]` ✓
- Sitemap & robots → `app/sitemap.ts`, `app/robots.ts` ✓

---

## Incomplete / inconsistent content

### Live site (served today)

- [ ] **Out-of-market gallery projects** — `lib/site-config.ts` includes Baltimore, MD and Maryland pressure-treated projects while the site targets Capital Region, NY. Decide: remove, relocate to "past work", or clearly label as out-of-area.
- [ ] **Homepage materials section only shows Trex + AZEK** — `components/sections/materials.tsx` hardcodes 2 brands; `/materials` page shows all 3 (`deckingBrands` in site-config). Add TimberTech or pull from shared config.
- [ ] **Incomplete NAP (address)** — `siteConfig.address.street` and `.zip` are empty; footer only shows "Latham".
- [ ] **Header nav duplicated** — `header.tsx` hardcodes `navItems` instead of importing `navigation.main` from site-config. Easy to desync when adding pages.
- [ ] **AZEK card links to TimberTech URL** — `components/sections/materials.tsx` line 34: AZEK description but `website` points to `timbertech.com`.

### Orphaned components (not on any live page)

These files exist but are **not imported** by current routes. They contain epoxy / Florida-era copy and broken imports:

| File | Problems |
|------|----------|
| `components/home/*` (9 files) | Epoxy branding, Miami/South Florida copy, `/quote` links |
| `components/forms/full-quote-form.tsx` | Imports missing `projectTypes`, `getAllLocations`; "Stand Clear Epoxy" success copy; fake phone `(305) 555-EPOXY` |
| `components/forms/quick-quote-form.tsx` | Same missing imports; demo-only submit (no backend) |
| `components/sections/structural-expertise.tsx` | Florida / hurricane-rated copy; image `/images/structural-framing.jpg` exists but section unused |
| `components/layout/floating-cta.tsx` | Built but never mounted in `app/layout.tsx` |
| `lib/images.ts` | Entire epoxy image map; `public/images/epoxy/` **does not exist** |

**Recommendation:** Delete or move to `archive/` after confirming nothing imports them.

---

## Build & tooling

- [ ] **Fix TypeScript errors** (15 total from `tsc --noEmit`):
  - `components/forms/full-quote-form.tsx` — missing exports `projectTypes`, `getAllLocations`
  - `components/forms/quick-quote-form.tsx` — same
  - `components/home/benefits-section.tsx` — missing export `benefits`
  - `components/home/hero-section.tsx` — missing export `trustIndicators`
  - `components/home/service-areas-map.tsx` — treats `serviceAreas.cities` strings as objects with `.slug`/`.name`
  - `lib/db.ts` — missing `@types/pg`
- [ ] **ESLint not installed** — `package.json` has `"lint": "eslint ."` but `eslint` is not a dependency. `pnpm lint` fails.
- [ ] **`@vercel/analytics` installed but unused** — add `<Analytics />` to `app/layout.tsx` or remove dependency.
- [ ] **`pnpm-workspace.yaml`** — untracked file with only `allowBuilds: sharp`; likely accidental for a single-package repo. Delete or commit intentionally.

---

## SEO & conversion polish

- [ ] Add email notification (or CRM webhook) when a lead is inserted — DB-only storage means no one gets alerted today.
- [ ] Add spam/rate limiting beyond honeypot field in `LeadForm`.
- [ ] Add Open Graph images per major route (blog/gallery have content images; others rely on defaults).
- [ ] Consider re-adding `StructuralExpertise` to homepage **after** rewriting Florida copy for NY freeze-thaw / snow load messaging.
- [ ] Unify `overview.md` and `docs/*.md` — many still describe South Florida, epoxy, or already-fixed bugs.

---

## Content already in good shape

- Homepage testimonials → NY locations via `site-config` ✓
- Process section → NY-friendly copy via `processSteps` ✓
- Lead form placeholder → `City, NY` ✓
- Core routes build and prerender: `/`, `/services`, `/gallery`, `/gallery/[slug]`, `/materials`, `/about`, `/contact`, `/blog`, `/blog/[slug]` ✓
- Real project photos under `public/images/Decks pics/` ✓

---

## Suggested priority order

1. **Database + migration** — make lead capture real in prod
2. **TypeScript cleanup** — remove `ignoreBuildErrors`, fix or delete legacy components
3. **Content consistency** — NY market focus, out-of-area gallery projects, materials section
4. **Legacy cleanup** — remove `components/home/*`, broken quote forms, `lib/images.ts`
5. **SEO polish** — lead notifications, OG images, doc refresh

---

## Related docs

| File | Status |
|------|--------|
| `docs/PROJECT-STRUCTURE.md` | Updated — folder map & architecture |
| `overview.md` | Partially accurate; path links point to old Windows mount |
| `docs/TODO.md` | **Stale** — references South Florida, unfixed header bugs |
| `docs/CODE-REVIEW.md` | **Stale** — claims all critical issues resolved |
| `docs/CONTENT-SEO-AUDIT-2026-04-28.md` | **Partially stale** — forms/SEO items fixed since April audit |