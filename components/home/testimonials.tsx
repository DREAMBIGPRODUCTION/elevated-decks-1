import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { testimonials } from "@/lib/site-config"
import { Star, Quote } from "lucide-react"

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4">Testimonials</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Don&apos;t just take our word for it. Here&apos;s what property owners 
            across South Florida have to say about our work.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="absolute top-4 right-4 h-8 w-8 text-accent/20" />

                {/* Rating */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-foreground leading-relaxed mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {testimonial.project}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-12 border-t border-border">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="font-medium">5.0 Average Rating</span>
          </div>
          <div className="h-6 w-px bg-border hidden md:block" />
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">200+</span> Verified Reviews
          </p>
          <div className="h-6 w-px bg-border hidden md:block" />
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">A+</span> BBB Rating
          </p>
        </div>
      </div>
    </section>
  )
}
