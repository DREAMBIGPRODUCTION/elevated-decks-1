"use server"

import { headers } from "next/headers"
import { ZodError } from "zod"
import {
  initialLeadActionState,
  parseLeadFormData,
  type LeadActionState,
} from "@/lib/lead-validation"
import { submitLeadPayload } from "@/lib/submit-lead"

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

    const headerStore = await headers()
    const userAgent = headerStore.get("user-agent")
    const ipAddress = getIpAddress(headerStore)

    const result = await submitLeadPayload(
      {
        name: values.name,
        email: values.email,
        phone: values.phone,
        projectType: values.projectType,
        location: values.location,
        message: values.message,
        sourcePage: values.sourcePage,
        website: values.website,
        leadSource: "website",
      },
      { userAgent, ipAddress },
    )

    return {
      success: result.ok,
      message: result.message,
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

/** Client quote forms (quick / full) call this with a plain object. */
export async function submitQuoteLead(input: {
  name: string
  email: string
  phone: string
  projectType: string
  location: string
  message: string
  sourcePage?: string
  deckSize?: string
  website?: string
}): Promise<LeadActionState> {
  try {
    const headerStore = await headers()
    const result = await submitLeadPayload(
      {
        name: input.name,
        email: input.email,
        phone: input.phone,
        projectType: input.projectType || "General inquiry",
        location: input.location || "Not specified",
        message:
          input.message ||
          "Quote form submission — customer did not add extra details.",
        sourcePage: input.sourcePage || "/quote",
        deckSize: input.deckSize,
        website: input.website ?? "",
        leadSource: "website",
      },
      {
        userAgent: headerStore.get("user-agent"),
        ipAddress: getIpAddress(headerStore),
      },
    )

    return { success: result.ok, message: result.message }
  } catch (error) {
    console.error("[submitQuoteLead] failed", error)
    return {
      success: false,
      message:
        "We couldn't send your request right now. Please call or email us directly.",
    }
  }
}
