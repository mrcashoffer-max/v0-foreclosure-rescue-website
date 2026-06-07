import { Clock, AlertTriangle } from "lucide-react"

export function Timeline() {
  return (
    <section id="timeline" className="border-y border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-4">
            <span className="flex w-fit items-center gap-2 text-sm font-medium text-primary">
              <Clock className="size-4" aria-hidden="true" />
              Understanding the timeline
            </span>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              The clock is ticking, but the right move now changes everything.
            </h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              Texas has one of the fastest foreclosure processes in the country. Ignoring lender
              notices won&apos;t make the problem disappear, but acting early opens nearly every door
              available to you.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                  The 120-Day Rule
                </span>
              </div>
              <p className="text-pretty leading-relaxed text-card-foreground">
                Federal law (CFPB Regulation X) generally prevents your servicer from starting
                foreclosure until you&apos;re more than{" "}
                <strong className="font-semibold">120 days behind</strong>. This window is your
                opportunity to explore solutions before foreclosure officially begins.
              </p>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-accent bg-accent/40 p-6">
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-accent-foreground" aria-hidden="true" />
              <p className="text-pretty leading-relaxed text-accent-foreground">
                Use this time wisely. The sooner you communicate with your lender or speak with a
                specialist, the more options remain on the table.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
