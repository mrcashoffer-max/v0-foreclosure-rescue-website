import { Phone, ExternalLink } from "lucide-react"

export function FreeHelp() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
        <div className="grid gap-6 lg:grid-cols-3 lg:items-center lg:gap-10">
          <div className="lg:col-span-2">
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-card-foreground">
              Free help is available right now
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              HUD-certified housing counselors are a free, non-profit resource and experts in
              foreclosure prevention. They can help you negotiate directly with your lender at no
              cost.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href="tel:+18889954673"
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Phone className="size-4" aria-hidden="true" />
              1-888-995-HOPE
            </a>
            <a
              href="https://www.hud.gov/findacounselor"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 font-medium text-foreground transition-colors hover:bg-muted"
            >
              Find a HUD counselor
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
