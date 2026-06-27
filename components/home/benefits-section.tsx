import { Badge } from "@/components/ui/badge"
import { benefits } from "@/lib/site-config"
import { Shield, FlaskConical, Sparkles, Sun, Eye, Zap, type LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  Shield,
  FlaskConical,
  Sparkles,
  Sun,
  Eye,
  Zap,
}

export function BenefitsSection() {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 border-primary-foreground/30 text-primary-foreground">
            Why Epoxy?
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            The Smart Choice for Your Floors
          </h2>
          <p className="text-lg text-primary-foreground/80 text-pretty">
            Epoxy floor coatings offer unmatched durability, beauty, and value. 
            Here&apos;s why property owners across South Florida choose epoxy.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => {
            const Icon = iconMap[benefit.icon] || Sparkles
            return (
              <div
                key={benefit.title}
                className="flex gap-4 p-6 rounded-lg bg-primary-foreground/5 hover:bg-primary-foreground/10 transition-colors"
              >
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-primary-foreground/70 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-primary-foreground/10">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">15+</div>
            <p className="text-primary-foreground/70">Years Experience</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">500+</div>
            <p className="text-primary-foreground/70">Projects Completed</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">100%</div>
            <p className="text-primary-foreground/70">Satisfaction Rate</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">10yr</div>
            <p className="text-primary-foreground/70">Warranty Available</p>
          </div>
        </div>
      </div>
    </section>
  )
}
