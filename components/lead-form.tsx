"use client"

import { useActionState, useEffect, useRef } from "react"
import { submitLead } from "@/app/actions/lead-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  initialLeadActionState,
  type LeadActionState,
} from "@/lib/lead-validation"
import { trackGenerateLead } from "@/lib/analytics"
import { ArrowRight, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type LeadFormProps = {
  sourcePage: string
  className?: string
  successTitle?: string
  successMessage?: string
  submitLabel?: string
  hideProjectType?: boolean
  messagePlaceholder?: string
  footnote?: string
}

const projectTypeOptions = [
  "Composite Deck",
  "TimberTech / PVC Deck",
  "Pressure-Treated Deck",
  "Multi-Level Deck",
  "Deck Resurface",
  "Trex / AZEK Railings",
  "Deck Lighting",
  "Other",
]

export function LeadForm({
  sourcePage,
  className,
  successTitle = "Thank You!",
  successMessage = "Your request has been sent. We’ll follow up soon.",
  submitLabel = "Request Consultation",
  hideProjectType = false,
  messagePlaceholder = "Size, materials, timeline, or anything we should know",
  footnote = "We'll follow up by phone or email with next steps for your project.",
}: LeadFormProps) {
  const [state, formAction, isPending] = useActionState<LeadActionState, FormData>(
    submitLead,
    initialLeadActionState,
  )
  const formRef = useRef<HTMLFormElement>(null)
  const leadTracked = useRef(false)

  useEffect(() => {
    if (!state.success || leadTracked.current) return
    leadTracked.current = true
    formRef.current?.reset()
    trackGenerateLead({ form: "consultation", sourcePage })
  }, [state.success, sourcePage])

  if (state.success) {
    return (
      <div className={cn("text-center py-12", className)}>
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-accent" />
        </div>
        <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
          {successTitle}
        </h3>
        <p className="text-muted-foreground leading-relaxed">{successMessage}</p>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className={cn("space-y-6", className)}
      key={state.message ? `retry-${state.message}` : "fresh"}
    >
      <input type="hidden" name="sourcePage" value={sourcePage} />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor={`${sourcePage}-name`} className="block text-sm font-medium text-foreground mb-2">
            Name
          </label>
          <Input
            id={`${sourcePage}-name`}
            name="name"
            type="text"
            required
            className="h-12"
            placeholder="Your full name"
            defaultValue={state.values?.name ?? ""}
          />
        </div>
        <div>
          <label htmlFor={`${sourcePage}-email`} className="block text-sm font-medium text-foreground mb-2">
            Email
          </label>
          <Input
            id={`${sourcePage}-email`}
            name="email"
            type="email"
            required
            className="h-12"
            placeholder="you@email.com"
            defaultValue={state.values?.email ?? ""}
          />
        </div>
      </div>

      {hideProjectType ? (
        <input type="hidden" name="projectType" value="Site visit" />
      ) : null}

      <div className="grid sm:grid-cols-2 gap-6">
        <div className={hideProjectType ? "sm:col-span-2" : undefined}>
          <label htmlFor={`${sourcePage}-phone`} className="block text-sm font-medium text-foreground mb-2">
            Phone
          </label>
          <Input
            id={`${sourcePage}-phone`}
            name="phone"
            type="tel"
            required
            className="h-12"
            placeholder="(555) 123-4567"
            defaultValue={state.values?.phone ?? ""}
          />
        </div>
        {hideProjectType ? null : (
          <div>
            <label htmlFor={`${sourcePage}-project-type`} className="block text-sm font-medium text-foreground mb-2">
              Project Type
            </label>
            <select
              id={`${sourcePage}-project-type`}
              name="projectType"
              required
              defaultValue={state.values?.projectType ?? ""}
              className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <option value="" disabled>
                Select a project type
              </option>
              {projectTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div>
        <label htmlFor={`${sourcePage}-location`} className="block text-sm font-medium text-foreground mb-2">
          Project Location
        </label>
        <Input
          id={`${sourcePage}-location`}
          name="location"
          type="text"
          required
          className="h-12"
          placeholder="City, NY"
          defaultValue={state.values?.location ?? ""}
        />
      </div>

      <div>
        <label htmlFor={`${sourcePage}-message`} className="block text-sm font-medium text-foreground mb-2">
          Message
        </label>
        <Textarea
          id={`${sourcePage}-message`}
          name="message"
          rows={4}
          className="resize-none"
          placeholder={messagePlaceholder}
          defaultValue={state.values?.message ?? ""}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-14 text-base font-medium group"
      >
        {isPending ? (
          "Sending..."
        ) : (
          <>
            {submitLabel}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </Button>

      {state.message ? (
        <p className={cn("text-sm", state.success ? "text-foreground" : "text-destructive")}>
          {state.message}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">{footnote}</p>
      )}
    </form>
  )
}
