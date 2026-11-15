"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { projectTypes, serviceAreas, siteConfig } from "@/lib/site-config"
import { submitQuoteLead } from "@/app/actions/lead-actions"
import { trackGenerateLead } from "@/lib/analytics"
import { CheckCircle } from "lucide-react"

export function QuickQuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "",
    squareFootage: "",
    city: "",
    website: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const result = await submitQuoteLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      projectType: formData.projectType || "General inquiry",
      location: formData.city || "Not specified",
      message: formData.squareFootage
        ? `Quick quote request. Approx. size: ${formData.squareFootage}.`
        : "Quick quote request from website.",
      sourcePage: typeof window !== "undefined" ? window.location.pathname : "/quick-quote",
      deckSize: formData.squareFootage || undefined,
      website: formData.website,
    })

    setIsSubmitting(false)

    if (!result.success) {
      setError(result.message)
      return
    }

    trackGenerateLead({
      form: "quick_quote",
      sourcePage: typeof window !== "undefined" ? window.location.pathname : "/quick-quote",
      projectType: formData.projectType || undefined,
    })
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        phone: "",
        email: "",
        projectType: "",
        squareFootage: "",
        city: "",
        website: "",
      })
    }, 4000)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <div className="bg-card/95 backdrop-blur-sm rounded-lg p-6 shadow-2xl">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <h3 className="text-xl font-semibold text-card-foreground mb-2">
            Quote Request Received!
          </h3>
          <p className="text-muted-foreground">
            We&apos;ll contact you within 24 hours with your free estimate.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Or call{" "}
            <a href={`tel:${siteConfig.phoneClean}`} className="text-accent font-medium">
              {siteConfig.phone}
            </a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card/95 backdrop-blur-sm rounded-lg p-6 shadow-2xl"
    >
      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        Get Your Free Estimate
      </h3>

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={(e) => handleChange("website", e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-card-foreground">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            required
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-card-foreground">Phone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(555) 555-5555"
            required
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-card-foreground">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            required
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="projectType" className="text-card-foreground">Project Type</Label>
          <Select
            value={formData.projectType}
            onValueChange={(value) => handleChange("projectType", value)}
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {projectTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="squareFootage" className="text-card-foreground">Square Footage</Label>
          <Input
            id="squareFootage"
            type="text"
            placeholder="e.g., 500 sq ft"
            value={formData.squareFootage}
            onChange={(e) => handleChange("squareFootage", e.target.value)}
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city" className="text-card-foreground">City</Label>
          <Select
            value={formData.city}
            onValueChange={(value) => handleChange("city", value)}
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {serviceAreas.cities.map((city) => (
                <SelectItem key={city.slug} value={city.slug}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {error ? (
        <p className="text-sm text-destructive mt-4" role="alert">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="w-full mt-6 bg-accent text-accent-foreground hover:bg-accent/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Spinner className="mr-2 h-4 w-4" />
            Submitting...
          </>
        ) : (
          "Get My Free Estimate"
        )}
      </Button>

      <p className="text-xs text-muted-foreground mt-3 text-center">
        No obligation. We&apos;ll respond within 24 hours.
      </p>
    </form>
  )
}
