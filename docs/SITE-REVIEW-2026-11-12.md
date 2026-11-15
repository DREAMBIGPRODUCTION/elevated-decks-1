# Elevated Decks site review

Reviewed 12 November 2026 against the working tree in `/home/dbsu33/repos/elevated-decks-1` and the live site at `https://www.elevateddecksny.com`.

## Where the site is

- Vercel project `elevated-decks-1` (`prj_pDHpWDABBSsthoPVVMB7o4mwk4y0`), team `team_gXQ0ycrjiBjeld93YbhPiOvg`.
- GitHub: `DREAMBIGPRODUCTION/elevated-decks-1`.
- `elevateddecksny.com` redirects to `www.elevateddecksny.com`. The apex response is Vercel. `www` is behind Cloudflare.
- Google Analytics `G-RZ4813GQ71` is already in the live HTML and in `components/google-analytics.tsx`.

The live site was deployed from this working tree, including files that are not committed. A push of `master` alone would drop those files. Publish with `vercel deploy --prod` from this directory after `vercel login`.

## What the company sells

The company name is Elevated Decks. The work is custom decks: Trex composite, TimberTech and AZEK PVC, pressure-treated wood, railings, and lighting, for Capital Region homes. The product is not a line called an "elevated deck," and the site should not sell rooftop decks.

An earlier pass removed rooftop copy and product-name uses of "elevated deck" from the main pages, forms, project blurbs, testimonials, and two blog paragraphs. This review started from that copy.

## Verbiage

What was still weak:

- The homepage H1 was "Luxury decks. Stronger first impression." That line does not say who the builder is, what is built, or where.
- Services, About, and the homepage intro talked about "outdoor living" and "premium" without naming Trex, TimberTech, AZEK, or pressure-treated wood in the first screen.
- The services page still had an eyebrow, "The Elevated Difference," which reads like a product name.
- Footer service names were plain text, so they did not help a visitor or a crawler reach the matching section.
- Town names were mostly in the footer chips. The main headline did not say Albany, Saratoga, or Clifton Park.
- Blog articles are the most specific writing on the site. They already name towns, weather, and brands. The marketing pages were vaguer than the blog.
- `components/home/service-areas-map.tsx` links to `/service-areas` and `/service-areas/[city]`. Those routes do not exist. The component is not mounted. Do not add it to a page until those routes exist or the links are removed.
- `components/sections/structural-expertise.tsx` still describes Florida hurricane construction. It is not mounted. Leave it off the site.
- `components/forms/quick-quote-form.tsx` and `full-quote-form.tsx` import `projectTypes` and `getAllLocations`, which are not exported. Those forms are not on the current pages. The live forms use `components/lead-form.tsx`.

Claims to confirm before they stay in public copy:

- About page stats: "200+ decks," "100% satisfaction," and "3 counties served." The service list is four counties.
- About page: "Every project is backed by structural engineering calculations" and "Fully licensed New York contractor."
- Testimonials are first name and last initial only. They read as sample quotes. Unverified reviews do not help search or trust.

Public contact stays `sales@elevateddecksny.com` and `(838) 280-0308`. The new lead inbox is not printed on the site.

## The form

The quote form is not a broken `href`. Home and Contact render `LeadForm`, which posts to the server action `submitLead`.

That action called `https://api.elevateddecksny.com/api/v1/public/leads`. That host does not answer, so every submission returned "We couldn't send your request right now."

Resend's free plan does not fit this domain. FormSubmit's activation email did not arrive in any mailbox. A message sent directly from `elevateddecksny@gmail.com` did arrive at `adminelevatedecksny@gmail.com`. The form is set up to send that same way once a Gmail app password is on the Vercel project. Details are in `docs/SEO-COPY-UPDATE-2026-11-12.md`.

The message field is optional. An empty note is sent as "(No extra details.)" so a name, phone, and town are enough.

## SEO findings

- Page titles included "Elevated Decks" and the root layout template adds " | Elevated Decks" again. Rendered titles looked like "About Us | Elevated Decks | Elevated Decks."
- Canonicals used `https://elevateddecksny.com` while the live host is `www`. That splits signals between two hosts.
- Homepage title and H1 did not match searches such as "deck builder Albany NY," "Trex deck Saratoga Springs," or "AZEK deck Clifton Park."
- There is no Open Graph image on the default metadata.
- JSON-LD had the business name and towns, and did not list materials or the hours shown on the contact page (Mon–Sat, 7am–7pm).
- `/package-options` is `noindex`. It is a material guide used in estimate emails. Leaving it out of the sitemap is correct while `noindex` stays. Index it only if the pricing in that guide is meant to be public.
- Separate city landing pages were not added. Thin town pages with the same paragraph swapped would look like doorway pages. One service-area section with the real town list is the safer fix.
- Social profile URLs in `site-config.ts` (`facebook.com/elevateddecks`, Instagram, Houzz) should be checked. Wrong profiles in schema are worse than omitting them.

## Files

- `docs/SEO-COPY-UPDATE-2026-11-12.md` records the copy and technical SEO edits made after this review.
