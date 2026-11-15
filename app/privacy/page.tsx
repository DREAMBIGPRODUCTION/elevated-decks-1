import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/legal-page"
import { siteConfig } from "@/lib/site-config"
import { absoluteUrl } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Elevated Decks collects, uses, and protects information on our website, operations tools, and client communications.",
  alternates: { canonical: absoluteUrl("/privacy") },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="August 28, 2026">
      <p>
        Elevated Decks (“we,” “us”) builds custom decks in the Capital Region of New
        York. This policy covers elevateddecksny.com, quote and contact forms, our
        staff operations tools, email we send and receive for jobs, and any client
        portal we operate.
      </p>

      <h2>Who we are</h2>
      <p>
        Elevated Decks, Latham, New York. Contact:{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or{" "}
        {siteConfig.phone}.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Project inquiries.</strong> Name, email, phone, project
          type, location, and message you submit on our website, or details you
          give us by phone, email, or Angi. Website form submissions are emailed
          to our project inbox so we can reply and schedule a visit.
        </li>
        <li>
          <strong>Job records.</strong> Estimates, contracts, renderings, permits,
          payment notes, and correspondence needed to design and build your deck.
        </li>
        <li>
          <strong>Email access (staff only).</strong> If a staff member connects
          Gmail to our operations app, we request read-only access to that mailbox
          so we can file Angi lead notices and sent estimates against the right
          job. We do not use Gmail to send mail as you without a separate, explicit
          action.
        </li>
        <li>
          <strong>Technical data.</strong> IP address, browser type, and pages
          visited, used to run the site and reduce spam.
        </li>
        <li>
          <strong>Analytics.</strong> We use Google Analytics 4 to see which
          pages are visited and which quote forms are submitted. We do not send
          your name, email, or phone number to Google. Google may set cookies
          and process data as described in the{" "}
          <a href="https://policies.google.com/privacy">Google Privacy Policy</a>
          . You can opt out with the{" "}
          <a href="https://tools.google.com/dlpage/gaoptout">
            Google Analytics opt-out browser add-on
          </a>
          .
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>Respond to quote requests and schedule site visits</li>
        <li>Prepare estimates, contracts, and project documents</li>
        <li>Coordinate work, materials, and payments</li>
        <li>Improve our website and prevent abuse</li>
      </ul>
      <p>
        We do not sell personal information. We do not use Gmail data to train
        generalized AI models or to advertise to third parties.
      </p>

      <h2>Google user data</h2>
      <p>
        If you authorize Google for our staff operations app, we access Gmail only
        to import Angi/HomeAdvisor lead emails and sent project emails into the
        matching job file. Access is limited to the Gmail read-only scope we
        request. You can disconnect Google in the app or at{" "}
        <a href="https://myaccount.google.com/permissions">Google Account permissions</a>
        . When disconnected, we stop new reads; copies already stored in a job
        file remain as business records unless you ask us to delete them where
        legally allowed.
      </p>

      <h2>Sharing</h2>
      <p>
        We share information with service providers who help us operate (website
        hosting on Vercel, Google Analytics, email, e-signature, and accounting
        tools such as DocuSign or QuickBooks when connected), and when required
        by law. Those providers may only use the data to perform services for us.
      </p>

      <h2>Retention</h2>
      <p>
        Inquiry and project records are kept for as long as needed to complete the
        job, honor warranties, and meet tax and legal requirements.
      </p>

      <h2>Your choices</h2>
      <p>
        Email {siteConfig.email} to access, correct, or delete information we hold,
        subject to records we must keep. You may opt out of marketing email. You
        cannot opt out of transactional project email while we are working for you.
      </p>

      <h2>Children</h2>
      <p>Our services are for adults seeking construction work. We do not knowingly collect information from children.</p>

      <h2>Changes</h2>
      <p>
        We may update this policy. The date at the top is the current version. Material
        changes will be posted on this page.
      </p>

      <h2>Contact</h2>
      <p>
        Privacy questions:{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> · {siteConfig.phone} ·{" "}
        {siteConfig.address.city}, {siteConfig.address.state}
      </p>
    </LegalPage>
  )
}
