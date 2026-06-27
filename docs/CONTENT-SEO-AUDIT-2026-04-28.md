# Elevated Decks Content, SEO, and Conversion Audit

Date: April 28, 2026

Scope reviewed:
- Core routes: `app/page.tsx`, `app/services/page.tsx`, `app/materials/page.tsx`, `app/gallery/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`
- Shared content/config: `app/layout.tsx`, `lib/site-config.ts`, `lib/blog.ts`
- Shared UX/content blocks: header, footer, home sections, testimonials, process, CTA form

## Executive Summary

The site has a strong visual direction and a usable top-level page structure, but it is not ready for aggressive SEO or paid traffic yet. The biggest problems are not stylistic. They are trust, market consistency, and conversion reliability.

The highest-priority issues are:

1. Lead capture is effectively broken on the two main form experiences.
2. The live site still contains conflicting market signals, including Florida testimonials and a Maryland project featured inside a New York positioning strategy.
3. Local SEO foundations are incomplete: missing route-specific metadata on major pages, no sitemap route, no robots route, no LocalBusiness schema, and incomplete NAP data.
4. Much of the copy sounds polished but generic. It does not yet answer enough bottom-of-funnel questions that drive quote requests.
5. The gallery is visually strong but weak as an SEO asset because projects do not have crawlable detail pages.

If the goal is more qualified leads, the right order is:

1. Fix conversion plumbing and trust inconsistencies.
2. Tighten local identity and service-page targeting.
3. Turn the gallery and blog into search-entry assets for real buyer intent.

## Priority Findings

### P0: Conversion blockers

- The contact page form never sends data anywhere. It just flips a local `submitted` state and shows a success message in `app/contact/page.tsx:23-26` and `app/contact/page.tsx:175-188`.
- The homepage CTA form is also simulated and never posts to an email inbox, CRM, webhook, or database in `components/sections/cta-form.tsx:20-29`.
- Both forms promise a response within 24 hours, but there is no delivery mechanism behind that promise in `app/contact/page.tsx:121-124`, `app/contact/page.tsx:183-185`, and `components/sections/cta-form.tsx:49-50`.

Recommendation:
- Wire both forms to a real lead destination first.
- Add spam protection, consent language, and source tracking.
- Only promise a response SLA that the business can actually support.

### P0: Live market inconsistency damages trust

- The homepage testimonials are still in Florida markets: `Coral Gables, FL`, `Miami Beach, FL`, `Fort Lauderdale, FL`, and `Boca Raton, FL` in `components/sections/testimonials.tsx:7-35`.
- The homepage process section still references Florida codes and hurricane-rated hardware in `components/sections/process.tsx:24` and `components/sections/process.tsx:30`.
- The homepage CTA form still uses `City, FL` as the project-location placeholder in `components/sections/cta-form.tsx:145-153`.
- Shared config still features a Maryland pressure-treated project as a featured project with `location: "MD"` in `lib/site-config.ts:450-471`.
- The current featured-project array makes that mixed-market content likely to surface as hero imagery across key pages in `lib/site-config.ts:466-471`.

Recommendation:
- Remove all Florida language from live homepage sections immediately.
- Decide whether Maryland work should stay on the site. If it stays, label it as an out-of-market showcase and do not use it as a primary hero asset for New York landing pages.

### P1: Local SEO foundations are incomplete

- Only some routes define page-level metadata. `services`, `materials`, `about`, and `blog` do. `home`, `gallery`, and `contact` do not have dedicated route metadata exports.
- Global metadata exists in `app/layout.tsx:17-69`, but core landing pages still need route-specific titles, descriptions, canonicals, and Open Graph data.
- There is no `app/sitemap.ts`, `app/robots.ts`, or route-level image-sharing strategy in the current app structure.
- The site uses blog schema and article schema, but not LocalBusiness, Service, FAQPage, BreadcrumbList, or project/gallery schema.
- `siteConfig.address` is incomplete, with blank `street` and `zip` in `lib/site-config.ts:11-16`, and the footer only prints `Latham` in `components/layout/footer.tsx:131-134`.

Recommendation:
- Add route-specific metadata for `/`, `/gallery`, and `/contact`.
- Add `sitemap.ts` and `robots.ts`.
- Add LocalBusiness schema site-wide and Service schema on service pages.
- Either publish a complete, consistent service-area business identity or deliberately structure the site as a service-area business with consistent city/state/NAP references.

### P1: Trust signals are asserted more than proved

- The About page claims `200+ Decks Built`, `100% Satisfaction`, and `3 Counties Served` in `app/about/page.tsx:27-32`, but the site does not provide proof, review volume, associations, licenses, awards, or certification evidence near those claims.
- The footer has social links, but no license number, no insurance statement, no business entity details, and no physical office or mailing address in `components/layout/footer.tsx:109-149`.
- The About page uses the company logo as major visual real estate in the hero instead of team, build, or jobsite proof in `app/about/page.tsx:63-104`.

Recommendation:
- Replace abstract proof claims with verifiable proof.
- Add review-source attribution, certification badges, contractor license details if available, insurance language, and team/jobsite photography.
- Use the About page to establish real-world legitimacy, not just brand tone.

### P1: Gallery underperforms as an SEO and conversion asset

- The gallery is a client-side filter plus lightbox in `app/gallery/page.tsx:21-259`.
- Project details are hidden behind a dialog instead of having crawlable URLs.
- Image alts are minimal, mostly just project titles in `app/gallery/page.tsx:135-140`.
- The page copy is short and generic for a route that should attract project-intent searches.

Recommendation:
- Create individual project detail pages with their own metadata and copy.
- Include location, material, project type, design problem, solution, build details, and CTA on each project page.
- Keep the masonry gallery, but make it an index into real project pages.

### P2: Service and materials pages are attractive but too broad

- The Services page is positioned as a broad overview rather than separate landing pages for specific intents in `app/services/page.tsx:34-40` and `app/services/page.tsx:76-96`.
- The Materials page is informative, but it is still mostly catalog copy rather than bottom-of-funnel guidance tied to local climate, budget, and use case.
- The site currently relies heavily on broad phrases like `premium`, `luxury`, `refined`, and `purposeful`, but gives fewer hard decision aids such as budget ranges, product fit guidance, planning constraints, permit expectations, or maintenance differences.

Recommendation:
- Break out service-specific landing pages.
- Add concrete buyer decision content: who each option fits, when it is overkill, expected upkeep, and common tradeoffs.

### P2: Blog quality is decent but not yet a lead engine

- Blog metadata is better than most other routes and includes schema in `app/blog/page.tsx:12-35` and `app/blog/page.tsx:42-65`.
- The blog openly describes itself as `Local SEO-focused content` in `app/blog/page.tsx:166`, which is useful internally but should not be stated to users.
- The current post set is heavily top-of-funnel and all current articles share the same publication date in `lib/blog.ts`.
- The articles do not yet appear to be supported by author credentials, project examples, expert quotes, or strong internal linking to matching gallery work.

Recommendation:
- Add case-study posts, pricing/timeline posts, permit/process posts, and comparison posts tied directly to service pages and project pages.
- Add author/about signals and revise date strategy so it reflects actual publishing or updating.

## Route-by-Route Review

### Home

Strengths:
- Strong visual first impression.
- Clear top-level CTA placement.
- Good premium positioning.

Issues:
- Homepage trust content is currently compromised by Florida testimonials in `components/sections/testimonials.tsx:7-35`.
- Homepage process copy still references Florida conditions in `components/sections/process.tsx:24-30`.
- Homepage CTA form is fake in `components/sections/cta-form.tsx:20-29`.
- There is no dedicated homepage metadata export or homepage schema beyond layout defaults.
- The homepage speaks well to aspiration, but not enough to purchase questions. There is little on cost guidance, timelines, permitting, service radius, materials fit, or why this company beats local alternatives.

Recommendation:
- Fix geography and form behavior first.
- Add homepage LocalBusiness schema, FAQs, trust badges, review proof, and a concise “why choose us” section grounded in evidence rather than mood.

### Services

Strengths:
- Strong overall service framing.
- Clear CTAs and reasonable information hierarchy.

Issues:
- Only overview-level targeting. There are no dedicated landing pages for high-intent searches like `composite deck builder Saratoga Springs NY` or `rooftop deck builder Albany NY`.
- Service cards push users into filtered gallery views rather than specific service detail pages in `app/services/page.tsx:88-93`.
- Metadata is thin for such an important route in `app/services/page.tsx:10-13`.

Recommendation:
- Create individual pages for composite decks, AZEK/PVC decks, elevated decks, rooftop decks, railings/lighting, and pressure-treated decks if that service is still strategic.

### Materials

Strengths:
- Better buyer education than many contractor sites.
- Brand sections are visually organized and climate-aware.

Issues:
- The page still reads like product marketing more than homeowner decision support.
- It needs stronger “which material is right for which homeowner” framing.
- There is no FAQ schema or decision-assist structure for bottom-of-funnel material searches.

Recommendation:
- Add comparison blocks such as `Best for`, `Avoid if`, `Typical budget tier`, `Maintenance profile`, and `Ideal project types`.
- Build at least one deeper comparison page such as `Trex vs AZEK in the Capital Region`.

### Gallery

Strengths:
- Strong photography and interaction design.
- Category filtering is straightforward.

Issues:
- Weak crawlability and minimal text content.
- No project pages means poor organic visibility for local project-intent searches.
- Several projects are thinly labeled and one is explicitly Maryland-based in `lib/site-config.ts:450-463`.

Recommendation:
- Turn the gallery into a searchable library of project detail pages.
- Add project-specific copy, FAQs, material notes, and conversion CTAs.

### About

Strengths:
- Good high-level narrative structure.
- Strong company-positioning theme around engineering and craftsmanship.

Issues:
- Uses logo art where real people and projects would build more trust in `app/about/page.tsx:63-104`.
- Several trust claims need proof.
- The page does not clearly answer who the owner is, who leads projects, what certifications exist, or why the company is uniquely credible in the local market.

Recommendation:
- Add founder/team section, real photo set, certifications, service process proof, and stronger local history.

### Contact

Strengths:
- Clear CTA path.
- Phone and email are visible.
- Service areas are listed.

Issues:
- Form is non-functional in `app/contact/page.tsx:23-26`.
- The route has no page-level metadata.
- Address details are incomplete and there is no map, office context, or local-business schema.

Recommendation:
- Make this the highest-converting page on the site.
- Add functional submission handling, calendar booking if applicable, FAQs, trust indicators, and complete contact/NAP data.

### Blog

Strengths:
- Best schema implementation on the site today.
- Clear topic clustering around decking, materials, and maintenance.

Issues:
- Topic set is narrow and repetitive.
- It lacks stronger internal links to services and projects.
- The copy is polished but occasionally over-optimized in phrasing.
- Stating `Local SEO-focused content` on the page weakens editorial credibility in `app/blog/page.tsx:166`.

Recommendation:
- Shift from generic educational copy toward content that closes buying gaps.

## Technical SEO Gaps

- No `sitemap.ts`.
- No `robots.ts`.
- No LocalBusiness schema.
- No Service schema on service pages.
- No FAQ schema on major commercial pages.
- No project-detail URLs for gallery items.
- No route-specific metadata for `/`, `/gallery`, or `/contact`.
- Incomplete NAP in shared config and footer.
- Open Graph strategy is inconsistent outside the blog.

## Content Strategy Recommendations

### SEO

- Build dedicated service pages for the highest-intent offerings.
- Build city/service-area pages only where there is real supporting proof, project coverage, and non-duplicate copy.
- Turn gallery items into project-case-study URLs.
- Add content for pricing, timing, materials, permits, design trends, and maintenance.
- Tighten internal linking between blog posts, service pages, materials pages, and projects.

### Conversion

- Standardize one primary CTA phrase site-wide. Right now the site uses `Get a Quote`, `Start Your Project`, `Start Your Journey`, `Request Consultation`, and `Schedule Your Free Consultation`.
- Put more hard proof near CTAs: review counts, project counts, service areas, response times, and license/insurance proof.
- Add one higher-intent CTA option such as `Book Site Visit` or `Request Estimate`.
- Add a short “what happens next” block near every form.
- If you offer financing, warranty support, or design consultations, surface that near the CTA.

### Messaging

- Reduce generalized luxury language by about 20 to 30 percent.
- Replace some abstract copy with concrete buyer-facing detail: materials, climate fit, structural considerations, budget tiers, turnaround expectations, and permitting expertise.
- Keep the premium tone, but make it more specific and less interchangeable.

## 30-60-90 Day Execution Plan

### Next 7 days

- Fix both forms so leads are actually captured.
- Remove Florida references from live components.
- Remove or reposition Maryland showcase content from core New York hero usage.
- Add metadata to home, gallery, and contact.
- Add `sitemap.ts` and `robots.ts`.

### Next 30 days

- Add LocalBusiness schema and complete NAP details.
- Launch first three service landing pages.
- Create first three project detail pages.
- Rework About page with real people/proof photography.
- Replace homepage testimonial carousel content with verified local testimonials.

### Next 60 days

- Expand the blog into bottom-of-funnel topics.
- Add FAQ sections with schema on services, materials, and contact.
- Build a stronger internal linking map.
- Add conversion tracking and form attribution.

### Next 90 days

- Build city-plus-service landing pages only for the markets with enough supporting proof.
- Publish case studies tied to completed projects.
- Test CTA language, contact layout, and trust element placement for conversion lift.

## KPIs To Track

- Organic traffic by route group: services, gallery/project pages, blog, contact.
- Form submissions by source and landing page.
- Call clicks from mobile.
- Click-through rate from gallery/blog into contact.
- Lead-to-consultation rate.
- Consultation-to-signed-project rate.
- Rankings for primary commercial terms by city.

## Bottom Line

The site can become a strong local lead generator, but only after the trust and conversion fundamentals are corrected. Right now the visual brand is ahead of the operational and SEO foundation. Fix the live inconsistencies, make lead capture real, then build search depth through service pages and project pages. That sequence will produce better returns than publishing more blog content first.
