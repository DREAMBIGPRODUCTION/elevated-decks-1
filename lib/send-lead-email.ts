import nodemailer from "nodemailer"
import type { SubmitLeadInput } from "@/lib/submit-lead"

/** Inbox the site emails. Spelled the way the Gmail account was created. */
export const LEAD_INBOX =
  process.env.LEAD_TO_EMAIL?.trim() || "adminelevatedecksny@gmail.com"

/** The Gmail account that already delivered a test into LEAD_INBOX. */
export const LEAD_FROM_USER =
  process.env.LEAD_SMTP_USER?.trim() || "elevateddecksny@gmail.com"

export function leadEmailConfigured() {
  return Boolean(process.env.LEAD_SMTP_PASS?.trim())
}

export function formatLeadEmail(input: SubmitLeadInput) {
  const message = input.message.trim() || "(No extra details.)"
  const subject = `New website lead: ${input.name} — ${input.location} — ${input.projectType}`
  const text = [
    "New deck inquiry from elevateddecksny.com",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    `Project type: ${input.projectType}`,
    `Location: ${input.location}`,
    `Source page: ${input.sourcePage}`,
    input.deckSize ? `Deck size: ${input.deckSize}` : null,
    "",
    "Message:",
    message,
    "",
    "Reply to this email to reach the homeowner.",
  ]
    .filter((line) => line !== null)
    .join("\n")

  return { subject, text }
}

export async function sendLeadEmail(input: SubmitLeadInput) {
  const pass = process.env.LEAD_SMTP_PASS?.trim()
  if (!pass) {
    throw new Error("LEAD_SMTP_PASS is not set")
  }

  const port = Number(process.env.LEAD_SMTP_PORT || 465)
  const { subject, text } = formatLeadEmail(input)
  const transport = nodemailer.createTransport({
    host: process.env.LEAD_SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: {
      user: LEAD_FROM_USER,
      pass,
    },
  })

  const info = await transport.sendMail({
    from: `"Elevated Decks Website" <${LEAD_FROM_USER}>`,
    to: LEAD_INBOX,
    replyTo: input.email,
    subject,
    text,
  })

  return { messageId: String(info.messageId || ""), to: LEAD_INBOX }
}
