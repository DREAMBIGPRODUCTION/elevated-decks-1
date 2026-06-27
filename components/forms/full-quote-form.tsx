"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { projectTypes, getAllLocations } from "@/lib/site-config"
import { CheckCircle, Upload, X } from "lucide-react"

interface FullQuoteFormProps {
  compact?: boolean
  defaultMessage?: string
}

export function FullQuoteForm({ compact = false, defaultMessage = "" }: FullQuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "",
    squareFootage: "",
    city: "",
    description: defaultMessage,
  })
  
  const allLocations = getAllLocations()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles].slice(0, 5)) // Max 5 files
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  if (isSubmitted) {
    return (
      <div className="bg-card rounded-lg p-8 shadow-lg border">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">
            Quote Request Received!
          </h3>
          <p className="text-muted-foreground max-w-md mb-6">
            Thank you for your interest in Stand Clear Epoxy. Our team will review 
            your project details and contact you within 24 hours with a detailed estimate.
          </p>
          <p className="text-sm text-muted-foreground">
            Questions? Call us at{" "}
            <a href="tel:3055553769" className="text-accent font-medium">
              (305) 555-EPOXY
            </a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={compact ? "" : "bg-card rounded-lg p-6 md:p-8 shadow-lg border"}
    >
      {!compact && (
        <>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Request Free Estimate
          </h2>
          <p className="text-muted-foreground mb-6">
            Fill out the form below and we&apos;ll get back to you within 24 hours.
          </p>
        </>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-foreground">
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="fullName"
            type="text"
            placeholder="John Smith"
            required
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="fullPhone" className="text-foreground">
            Phone Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="fullPhone"
            type="tel"
            placeholder="(555) 555-5555"
            required
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="fullEmail" className="text-foreground">
            Email Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="fullEmail"
            type="email"
            placeholder="john@example.com"
            required
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        {/* Project Type */}
        <div className="space-y-2">
          <Label htmlFor="fullProjectType" className="text-foreground">
            Project Type <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.projectType}
            onValueChange={(value) => handleChange("projectType", value)}
            required
          >
            <SelectTrigger id="fullProjectType">
              <SelectValue placeholder="Select project type" />
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

        {/* Square Footage */}
        <div className="space-y-2">
          <Label htmlFor="fullSquareFootage" className="text-foreground">
            Approximate Square Footage
          </Label>
          <Input
            id="fullSquareFootage"
            type="text"
            placeholder="e.g., 500 sq ft"
            value={formData.squareFootage}
            onChange={(e) => handleChange("squareFootage", e.target.value)}
          />
        </div>

        {/* City */}
        <div className="space-y-2">
          <Label htmlFor="fullCity" className="text-foreground">
            City <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.city}
            onValueChange={(value) => handleChange("city", value)}
            required
          >
            <SelectTrigger id="fullCity">
              <SelectValue placeholder="Select your city" />
            </SelectTrigger>
            <SelectContent>
              {allLocations.map((location) => (
                <SelectItem key={location.slug} value={location.slug}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Project Description */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description" className="text-foreground">
            Project Description
          </Label>
          <Textarea
            id="description"
            placeholder="Tell us about your project... What type of finish are you looking for? Any specific requirements or concerns?"
            rows={4}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        {/* Photo Upload */}
        <div className="space-y-2 md:col-span-2">
          <Label className="text-foreground">Upload Photos (Optional)</Label>
          <div className="border-2 border-dashed border-input rounded-lg p-6 text-center">
            <input
              type="file"
              id="photos"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="photos"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <Upload className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Click to upload photos of your floor
              </span>
              <span className="text-xs text-muted-foreground">
                (Max 5 images, PNG/JPG)
              </span>
            </label>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md text-sm"
                >
                  <span className="truncate max-w-[150px]">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full mt-8 bg-accent text-accent-foreground hover:bg-accent/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Spinner className="mr-2 h-5 w-5" />
            Submitting Request...
          </>
        ) : (
          "Request Free Estimate"
        )}
      </Button>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        By submitting this form, you agree to be contacted about your project. 
        We respect your privacy and will never share your information.
      </p>
    </form>
  )
}
