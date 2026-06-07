import { LeadForm } from "@/components/lead-form"

export function FinalCta() {
  return (
    <section id="consultation" className="scroll-mt-16 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="flex flex-col gap-5">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Take the first step today
          </h2>
          <p className="text-pretty text-lg leading-relaxed text-primary-foreground/80">
            The Texas foreclosure process moves fast, but the right move now can change everything.
            Share your situation and a specialist will reach out, confidentially and with no
            obligation.
          </p>
          <ul className="flex flex-col gap-3 text-primary-foreground/90">
            <li className="flex items-center gap-3">
              <span className="size-1.5 rounded-full bg-primary-foreground" aria-hidden="true" />
              Free, confidential consultation
            </li>
            <li className="flex items-center gap-3">
              <span className="size-1.5 rounded-full bg-primary-foreground" aria-hidden="true" />
              Understand every option available to you
            </li>
            <li className="flex items-center gap-3">
              <span className="size-1.5 rounded-full bg-primary-foreground" aria-hidden="true" />
              No pressure, no obligation
            </li>
          </ul>
          <p className="pt-2 text-primary-foreground/80">
            Prefer to call?{" "}
            <a href="tel:+14695093031" className="font-semibold text-primary-foreground underline">
              469-509-3031
            </a>
          </p>
        </div>
        <div className="rounded-2xl bg-card p-6 text-card-foreground shadow-lg sm:p-8">
          <h3 className="mb-1 text-xl font-semibold">Request your free consultation</h3>
          <p className="mb-6 text-sm text-muted-foreground">
            A foreclosure specialist will contact you shortly.
          </p>
          <LeadForm source="final-cta" />
        </div>
      </div>
    </section>
  )
}
