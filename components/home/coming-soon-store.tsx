"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Wrench, Palette, SprayCan } from "lucide-react"

const upcomingProducts = [
  {
    icon: Package,
    title: "Epoxy Kits",
    description: "Complete DIY epoxy floor kits for small projects",
  },
  {
    icon: Palette,
    title: "Coating Systems",
    description: "Professional-grade metallic and flake systems",
  },
  {
    icon: Wrench,
    title: "Contractor Tools",
    description: "Squeegees, rollers, and application tools",
  },
  {
    icon: SprayCan,
    title: "Application Supplies",
    description: "Primers, topcoats, and surface prep materials",
  },
]

export function ComingSoonStore() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setIsSubmitted(true)
    setEmail("")
  }

  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary to-accent/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <Badge variant="outline" className="mb-4 border-primary-foreground/30 text-primary-foreground">
            Coming Soon
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
            Professional Epoxy Products
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-12 max-w-2xl mx-auto text-pretty">
            Soon you&apos;ll be able to purchase the same industrial-grade materials we use 
            on our professional installations. Perfect for DIY enthusiasts and contractors.
          </p>

          {/* Product Preview */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {upcomingProducts.map((product) => (
              <Card
                key={product.title}
                className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur-sm"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4">
                    <product.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-primary-foreground mb-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-primary-foreground/70">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Early Access Form */}
          <div className="max-w-md mx-auto">
            {isSubmitted ? (
              <div className="flex flex-col items-center gap-4 py-8">
                <CheckCircle className="h-12 w-12 text-green-400" />
                <div>
                  <h3 className="text-xl font-semibold text-primary-foreground">
                    You&apos;re on the list!
                  </h3>
                  <p className="text-primary-foreground/70">
                    We&apos;ll notify you when the store launches.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="earlyAccessEmail" className="sr-only">
                    Email Address
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="earlyAccessEmail"
                      type="email"
                      placeholder="Enter your email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                    />
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shrink-0"
                    >
                      {isLoading ? "Joining..." : "Join Early Access"}
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-primary-foreground/60">
                  Be the first to know when we launch. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
