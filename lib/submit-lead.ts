/**
 * Shared lead submission to platform API or legacy direct DB.
 *
 * Env:
 *   LEAD_TRANSPORT=api|db   (default: api if LEAD_API_URL set, else db)
 *   LEAD_API_URL=https://api.elevateddecksny.com/api/v1/public/leads
 *   LEAD_INGEST_KEY=...
 *   DATABASE_URL=...        (db transport only)
 */

export type SubmitLeadInput = {
  name: string
  email: string
  phone: string
  projectType: string
  location: string
  message: string
  sourcePage: string
  website?: string
  deckSize?: string
  leadSource?: string
}

export type SubmitLeadResult =
  | { ok: true; message: string; id?: string }
  | { ok: false; message: string }

function transportMode(): "api" | "db" {
  const explicit = process.env.LEAD_TRANSPORT?.toLowerCase()
  if (explicit === "api" || explicit === "db") return explicit
  if (process.env.LEAD_API_URL) return "api"
  return "db"
}

export async function submitLeadPayload(
  input: SubmitLeadInput,
  meta?: { userAgent?: string | null; ipAddress?: string | null },
): Promise<SubmitLeadResult> {
  // Honeypot
  if (input.website && input.website.trim().length > 0) {
    return {
      ok: true,
      message: "Thanks. Your request has been sent and we’ll follow up soon.",
    }
  }

  const mode = transportMode()

  if (mode === "api") {
    return submitViaApi(input)
  }

  return submitViaDb(input, meta)
}

async function submitViaApi(input: SubmitLeadInput): Promise<SubmitLeadResult> {
  const url = process.env.LEAD_API_URL
  const key = process.env.LEAD_INGEST_KEY

  if (!url || !key) {
    console.error("[submit-lead] LEAD_API_URL or LEAD_INGEST_KEY missing")
    return {
      ok: false,
      message:
        "We couldn't send your request right now. Please call or email us directly.",
    }
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        name: input.name,
        email: input.email,
        phone: input.phone,
        projectType: input.projectType,
        location: input.location,
        message: input.message,
        sourcePage: input.sourcePage,
        deckSize: input.deckSize,
        leadSource: input.leadSource ?? "website",
        website: input.website ?? "",
      }),
    })

    const data = (await res.json().catch(() => ({}))) as {
      message?: string
      id?: string
      error?: string
    }

    if (!res.ok) {
      console.error("[submit-lead] API error", res.status, data)
      return {
        ok: false,
        message:
          "We couldn't send your request right now. Please call or email us directly.",
      }
    }

    return {
      ok: true,
      id: data.id,
      message:
        data.message ??
        "Thanks. Your request has been sent and we’ll follow up soon.",
    }
  } catch (err) {
    console.error("[submit-lead] API fetch failed", err)
    return {
      ok: false,
      message:
        "We couldn't send your request right now. Please call or email us directly.",
    }
  }
}

async function submitViaDb(
  input: SubmitLeadInput,
  meta?: { userAgent?: string | null; ipAddress?: string | null },
): Promise<SubmitLeadResult> {
  try {
    const { db } = await import("@/lib/db")
    await db.query(
      `
        insert into leads (
          name, email, phone, project_type, location, message,
          source_page, user_agent, ip_address
        )
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `,
      [
        input.name,
        input.email,
        input.phone,
        input.projectType,
        input.location,
        input.message,
        input.sourcePage,
        meta?.userAgent ?? null,
        meta?.ipAddress ?? null,
      ],
    )
    return {
      ok: true,
      message: "Thanks. Your request has been sent and we’ll follow up soon.",
    }
  } catch (err) {
    console.error("[submit-lead] DB insert failed", err)
    return {
      ok: false,
      message:
        "We couldn't send your request right now. Please call or email us directly.",
    }
  }
}
