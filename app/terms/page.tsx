import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/legal-page"
import { siteConfig } from "@/lib/site-config"
import { absoluteUrl } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using the Elevated Decks website, quote tools, and related online services.",
  alternates: { canonical: absoluteUrl("/terms") },
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="August 27, 2026">
      <p>
        These terms govern your use of elevateddecksny.com, online quote and contact
        forms, staff operations tools, and any client portal we provide. By using
        those services you agree to these terms. Construction work itself is
        governed by a signed project agreement, not this page.
      </p>

      <h2>Who we are</h2>
      <p>
        Elevated Decks, Latham, New York. {siteConfig.email} · {siteConfig.phone}.
      </p>

      <h2>The website</h2>
      <p>
        Content on this site is for general information. Photos, prices, and package
        descriptions are examples. A quote or estimate is not a contract until both
        sides sign an agreement and any required deposit is arranged.
      </p>

      <h2>Inquiries and leads</h2>
      <p>
        When you submit a form, call, email, or come through Angi, you ask us to
        contact you about a deck project. Provide accurate contact details. Do not
        submit other people’s information without permission.
      </p>

      <h2>Accounts and portals</h2>
      <p>
        Staff tools are for Elevated Decks employees and contractors we authorize.
        A future client portal, if offered, is only for customers we invite. You
        are responsible for keeping login credentials confidential. Do not share
        access.
      </p>

      <h2>Google and other connections</h2>
      <p>
        Staff may connect Gmail so our operations app can read Angi lead mail and
        sent estimates. That connection is optional, can be revoked at any time,
        and is limited to the scopes Google shows during consent. Connecting
        QuickBooks, DocuSign, or similar tools is likewise optional and subject to
        those providers’ terms.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>No scraping, spam, or attempts to break the site</li>
        <li>No uploading malware or content you do not have rights to</li>
        <li>No using the site to impersonate Elevated Decks</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        Site design, copy, logos, and project photos are owned by Elevated Decks or
        used with permission. Do not copy them for commercial use without written
        consent. Renderings we prepare for a job remain our working files until the
        contract says otherwise.
      </p>

      <h2>Disclaimers</h2>
      <p>
        The website is provided “as is.” We do not warrant uninterrupted or
        error-free operation. To the fullest extent allowed by New York law, we are
        not liable for indirect or consequential damages arising from use of the
        website. Liability related to construction is defined in your project
        contract.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the State of New York, without
        regard to conflict-of-law rules. Venue for disputes about the website is
        the state or federal courts sitting in New York.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms. Continued use of the site after changes are
        posted means you accept the new terms. The date at the top is the current
        version.
      </p>

      <h2>Contact</h2>
      <p>
        Questions: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> ·{" "}
        {siteConfig.phone}
      </p>
    </LegalPage>
  )
}
