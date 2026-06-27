import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LeadForm } from "@/components/lead-form"
import { featuredProjects, serviceAreas, siteConfig } from "@/lib/site-config"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export function ContactPageContent() {
  const heroProject = featuredProjects[1] ?? featuredProjects[0]

  return (
    <>
      <Header />
      <main className="pt-16 sm:pt-20">
        <section className="relative py-16 sm:py-24 md:py-32 bg-primary text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image src={heroProject.image} alt="" fill className="object-cover" aria-hidden="true" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-sm uppercase tracking-widest text-accent font-medium mb-4 block">
              Contact Us
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-balance">
              Let&apos;s Plan Your Upstate New York Deck Project
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/70 max-w-2xl mx-auto text-pretty leading-relaxed">
              Have a project in mind in the Capital Region or a nearby Upstate New York
              community? Reach out for a free, no-obligation consultation.
            </p>
          </div>
        </section>

        <section className="py-16 bg-background border-b border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center border">
                <CardHeader className="pb-2">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-2">
                    <Phone className="h-7 w-7 text-accent" />
                  </div>
                  <CardTitle className="text-lg">Call Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href={`tel:${siteConfig.phoneClean}`}
                    className="text-xl font-semibold text-foreground hover:text-accent transition-colors"
                  >
                    {siteConfig.phone}
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">Mon-Sat, 7am-7pm</p>
                </CardContent>
              </Card>

              <Card className="text-center border">
                <CardHeader className="pb-2">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-2">
                    <Mail className="h-7 w-7 text-accent" />
                  </div>
                  <CardTitle className="text-lg">Email Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-base sm:text-lg font-medium text-foreground hover:text-accent transition-colors break-all sm:break-normal"
                  >
                    {siteConfig.email}
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">Typical response within 1 business day</p>
                </CardContent>
              </Card>

              <Card className="text-center border">
                <CardHeader className="pb-2">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-2">
                    <MapPin className="h-7 w-7 text-accent" />
                  </div>
                  <CardTitle className="text-lg">Service Area</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium text-foreground">Capital Region & Nearby Upstate NY</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 lg:py-32 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              <div className="space-y-8">
                <div>
                  <span className="text-sm uppercase tracking-widest text-accent font-medium mb-4 block">
                    Ready to Build Your Deck?
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
                    Request a Consultation
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Fill out the form and we will follow up with next steps. We can schedule an
                    on-site visit to assess your property, discuss layout options, and provide a
                    detailed proposal.
                  </p>
                </div>

                <Card className="border">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="h-6 w-6 text-accent" />
                      <h3 className="text-lg font-semibold text-foreground">Business Hours</h3>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
                        <span className="text-muted-foreground">Monday - Friday</span>
                        <span className="font-medium text-foreground">7:00 AM - 7:00 PM</span>
                      </div>
                      <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
                        <span className="text-muted-foreground">Saturday</span>
                        <span className="font-medium text-foreground">8:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
                        <span className="text-muted-foreground">Sunday</span>
                        <span className="font-medium text-foreground">By Appointment</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <MapPin className="h-6 w-6 text-accent" />
                      <h3 className="text-lg font-semibold text-foreground">Service Areas</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[...serviceAreas.counties, ...serviceAreas.cities].map((area) => (
                        <span
                          key={area}
                          className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border shadow-lg">
                <CardContent className="p-5 sm:p-8">
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                    Request Consultation
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Tell us where the project is located and what you want to build.
                  </p>
                  <LeadForm
                    sourcePage="contact-page"
                    successMessage="Thanks. Your request has been sent and we’ll follow up with next steps as soon as possible."
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
