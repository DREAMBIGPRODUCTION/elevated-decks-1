# Elevated Decks Project Overview

## Summary

This repository is a Next.js 16 marketing site for **Elevated Decks**, a deck builder serving **Latham / Albany / the Capital Region in New York**.

The app is built with:

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Radix UI / shadcn-style UI components

The site is content-heavy and mostly static. Business copy, navigation, services, materials, gallery entries, testimonials, and process steps are centralized in [`lib/site-config.ts`](/mnt/c/Users/sasxl/v0-elevated-decks-website/lib/site-config.ts).

## Current Routes

- `/` homepage assembled from section components in [`components/sections/`](/mnt/c/Users/sasxl/v0-elevated-decks-website/components/sections)
- `/services` service and material positioning page
- `/gallery` project gallery with category filtering and a lightbox
- `/materials` brand and material detail page
- `/about` company story page
- `/contact` contact page with a local-only form

## Important Files

- [`app/layout.tsx`](/mnt/c/Users/sasxl/v0-elevated-decks-website/app/layout.tsx): global metadata, fonts, viewport
- [`app/page.tsx`](/mnt/c/Users/sasxl/v0-elevated-decks-website/app/page.tsx): homepage composition
- [`lib/site-config.ts`](/mnt/c/Users/sasxl/v0-elevated-decks-website/lib/site-config.ts): primary content/config source
- [`components/layout/header.tsx`](/mnt/c/Users/sasxl/v0-elevated-decks-website/components/layout/header.tsx): fixed header and nav
- [`components/layout/footer.tsx`](/mnt/c/Users/sasxl/v0-elevated-decks-website/components/layout/footer.tsx): footer and service area display
- [`components/sections/cta-form.tsx`](/mnt/c/Users/sasxl/v0-elevated-decks-website/components/sections/cta-form.tsx): homepage CTA form
- [`components/forms/full-quote-form.tsx`](/mnt/c/Users/sasxl/v0-elevated-decks-website/components/forms/full-quote-form.tsx): richer quote form component, currently inconsistent with live config
- [`components/forms/quick-quote-form.tsx`](/mnt/c/Users/sasxl/v0-elevated-decks-website/components/forms/quick-quote-form.tsx): compact lead form, currently inconsistent with live config
- [`next.config.mjs`](/mnt/c/Users/sasxl/v0-elevated-decks-website/next.config.mjs): build behavior

## Architecture Notes

### Content model

Most business content is hardcoded in `site-config.ts`, including:

- company/contact details
- navigation
- service areas
- deck categories and service descriptions
- decking brands and materials
- gallery project data
- testimonials
- process steps

This keeps the site simple, but it also means copy drift shows up quickly when content is migrated or partially rewritten.

### UI structure

The repo contains two parallel component groupings:

- `components/sections/*`: current deck-site homepage sections
- `components/home/*`: older epoxy-oriented components that still exist in the repo

The live homepage uses `components/sections/*`, not `components/home/*`.

### Forms

There is **no real form backend wired up** in the current codebase. The visible forms use local React state and success messages only.

Affected files:

- [`components/sections/cta-form.tsx`](/mnt/c/Users/sasxl/v0-elevated-decks-website/components/sections/cta-form.tsx)
- [`app/contact/page.tsx`](/mnt/c/Users/sasxl/v0-elevated-decks-website/app/contact/page.tsx)
- [`components/forms/full-quote-form.tsx`](/mnt/c/Users/sasxl/v0-elevated-decks-website/components/forms/full-quote-form.tsx)
- [`components/forms/quick-quote-form.tsx`](/mnt/c/Users/sasxl/v0-elevated-decks-website/components/forms/quick-quote-form.tsx)

## Current State

The repo appears to be partway through a migration:

- branding and core route structure are now for a New York deck company
- real deck images have been added under `public/images/Decks pics/`
- several pages and content blocks still contain South Florida / epoxy-era copy
- some legacy components remain in the tree and are not aligned with the current config

## High-Signal Risks

### 1. Type errors are being hidden at build time

[`next.config.mjs`](/mnt/c/Users/sasxl/v0-elevated-decks-website/next.config.mjs) sets `typescript.ignoreBuildErrors = true`.

This is masking real problems, including broken imports in the form components.

### 2. Quote form components reference missing exports

[`components/forms/full-quote-form.tsx`](/mnt/c/Users/sasxl/v0-elevated-decks-website/components/forms/full-quote-form.tsx) and [`components/forms/quick-quote-form.tsx`](/mnt/c/Users/sasxl/v0-elevated-decks-website/components/forms/quick-quote-form.tsx) import `projectTypes` and/or `getAllLocations`, but those exports are not present in [`lib/site-config.ts`](/mnt/c/Users/sasxl/v0-elevated-decks-website/lib/site-config.ts).

### 3. Regional messaging is internally inconsistent

The codebase mixes:

- Capital Region / Latham, NY messaging
- South Florida service area copy
- hurricane-rated language
- Florida testimonials

This affects credibility and local SEO.

### 4. Several forms are demo-only

The homepage CTA, contact page form, and quote forms currently simulate submission or just toggle success state. They do not send data anywhere.

### 5. Repo contains stale epoxy assets/components/docs

Legacy epoxy content still exists in:

- `components/home/*`
- `lib/images.ts`
- several `docs/*.md` files

That increases maintenance noise and makes it harder to trust the docs.

## Recommended Next Steps

1. Remove `ignoreBuildErrors` and fix the resulting TypeScript issues.
2. Decide which form components are real product surface and either wire them to a backend or remove them.
3. Do a full copy sweep for South Florida / epoxy leftovers.
4. Delete or archive unused epoxy-era components and docs.
5. Replace stale internal docs with a smaller set of accurate project docs.

## Validation Notes

During review:

- `pnpm lint` failed because `eslint` is referenced in `package.json` but is not installed as a dependency.
- I did not change application code.
- I added this file to provide a current, source-based orientation document.
