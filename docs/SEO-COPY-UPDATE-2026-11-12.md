# SEO copy and lead email update

12 November 2026. Follows `docs/SITE-REVIEW-2026-11-12.md`.

## Copy now aimed at real searches

People looking for this company search for a deck builder plus a town, or a brand plus the Capital Region. The visible copy now says that, without calling the product an elevated deck and without rooftop decks.

- Homepage eyebrow: "Deck builder in Albany, Saratoga & Clifton Park."
- Homepage H1: "Custom decks for Capital Region homes."
- Subhead names Trex, TimberTech, AZEK, pressure-treated wood, and the main towns.
- New homepage section: "Deck builder for Albany, Saratoga, and Schenectady counties," with the existing town list linking to the contact form.
- Services H1 support copy names the same materials and the four counties.
- Services eyebrow "The Elevated Difference" is now "How we build."
- Gallery intro names Trex, AZEK, pressure-treated decks, and towns.
- Footer service labels are links to `/services#trex`, `#timbertech`, `#railings`, `#lighting`, the gallery, and the contact form.

The company name stays Elevated Decks.

## Titles and canonical host

Root layout template remains `%s | Elevated Decks`. Page titles no longer include the brand, so the brand is not doubled.

| Page | Title tag |
| --- | --- |
| Home | Custom Deck Builder in Albany & Saratoga Springs \| Elevated Decks |
| Services | Trex, TimberTech and AZEK Decks \| Elevated Decks |
| Gallery | Deck Projects in the Capital Region \| Elevated Decks |
| About | About Our Deck Building Company \| Elevated Decks |
| Contact | Request a Deck Estimate \| Elevated Decks |
| Blog | Deck Building Guides \| Elevated Decks |
| A post | The article title, then the template |
| A project | Project name and town, then the template |

`siteConfig.url` is `https://www.elevateddecksny.com`. Canonicals, the sitemap, and JSON-LD use that host. The apex domain still redirects to `www`.

Default Open Graph and Twitter cards use `/blog/p1.jpg`. JSON-LD now includes Trex, TimberTech, AZEK, pressure-treated decks, railings, and Mon–Sat 7:00–19:00.

`/package-options` stays `noindex` and is not in the sitemap.

## Lead email

Resend's free Vercel plan needs a domain purchased on Vercel. FormSubmit's activation email never arrived in any mailbox.

A direct message from `elevateddecksny@gmail.com` to `adminelevatedecksny@gmail.com` did arrive. The quote form now sends the same way: Gmail SMTP from `elevateddecksny@gmail.com`, To `adminelevatedecksny@gmail.com`, Reply-To the homeowner.

That login needs a Gmail app password in `LEAD_SMTP_PASS` on the Vercel project, then a redeploy. The normal Gmail password will not work.

## Not deployed

These edits are in the local repo. They are not on `www.elevateddecksny.com` until a production deploy.
