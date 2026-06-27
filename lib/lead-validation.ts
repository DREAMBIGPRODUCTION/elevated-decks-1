import { z } from "zod"

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().min(7, "Please enter a valid phone number."),
  projectType: z.string().trim().min(2, "Please choose a project type."),
  location: z.string().trim().min(2, "Please enter the project location."),
  message: z.string().trim().min(10, "Please share a few project details."),
  sourcePage: z.string().trim().min(1, "Missing source page."),
  website: z.string().trim().optional().default(""),
})

export type LeadFormValues = z.infer<typeof leadSchema>

export type LeadActionState = {
  success: boolean
  message: string
}

export const initialLeadActionState: LeadActionState = {
  success: false,
  message: "",
}

export function parseLeadFormData(formData: FormData): LeadFormValues {
  return leadSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    projectType: formData.get("projectType"),
    location: formData.get("location"),
    message: formData.get("message"),
    sourcePage: formData.get("sourcePage"),
    website: formData.get("website"),
  })
}
