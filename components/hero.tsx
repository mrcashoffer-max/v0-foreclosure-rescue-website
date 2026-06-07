import { LeadForm } from "@/components/lead-form"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Clock, Phone } from "lucide-react"

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            <ShieldCheck className="size-3.5 text-primary" aria-hidden="true" />
            Trusted by Texas homeowners for 20+ years
          </span>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Behind on your mortgage? You still have options.
          </h1>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Pre-foreclosure feels overwhelming, but it&apos;s rarely the end of the road. Learn every
            path available to keep or sell your Texas home, and talk to a specialist who has helped
            families for two decades.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button render={<a href="#consultation" />} size="lg" className="text-base">
              Talk to a specialist
            </Button>
            <Button
              render={<a href="#options" />}
              size="lg"
              variant="outline"
              className="text-base"
            >
              Explore your options
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Clock className="size-4 text-primary" aria-hidden="true" />
              Free, confidential consultation
            </span>
            <span className="flex items-center gap-2">
              <Phone className="size-4 text-primary" aria-hidden="true" />
              No obligation
            </span>
          </div>
        </div>

        <div className="lg:pl-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex flex-col gap-1">
              <h2 className="text-xl font-semibold text-card-foreground">
                Request your free consultation
              </h2>
              <p className="text-sm text-muted-foreground">
                Tell us about your situation and a foreclosure specialist will reach out.
              </p>
            </div>
            <LeadForm source="hero" />
          </div>
        </div>
      </div>
    </section>
  )
}
