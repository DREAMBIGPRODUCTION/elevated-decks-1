"use server"

import { headers } from "next/headers"
import { ZodError } from "zod"
import { db } from "@/lib/db"
import {
  initialLeadActionState,
  parseLeadFormData,
  type LeadActionState,
} from "@/lib/lead-validation"

function getIpAddress(headerStore: Headers) {
  const forwardedFor = headerStore.get("x-forwarded-for")

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? null
  }

  return headerStore.get("x-real-ip")
}

export async function submitLead(
  _prevState: LeadActionState,
  formData: FormData,
): Promise<LeadActionState> {
  try {
    const values = parseLeadFormData(formData)

    if (values.website) {
      return {
        success: false,
        message: "Submission rejected.",
      }
    }

    const headerStore = await headers()
    const userAgent = headerStore.get("user-agent")
    const ipAddress = getIpAddress(headerStore)

    await db.query(
      `
        insert into leads (
          name,
          email,
          phone,
          project_type,
          location,
          message,
          source_page,
          user_agent,
          ip_address
        )
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `,
      [
        values.name,
        values.email,
        values.phone,
        values.projectType,
        values.location,
        values.message,
        values.sourcePage,
        userAgent,
        ipAddress,
      ],
    )

    return {
      success: true,
      message: "Thanks. Your request has been sent and we’ll follow up soon.",
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        ...initialLeadActionState,
        message: error.issues[0]?.message ?? "Please review the form and try again.",
      }
    }

    console.error("[lead-action] submission failed", error)

    return {
      ...initialLeadActionState,
      message:
        "We couldn't send your request right now. Please call or email us directly.",
    }
  }
}
