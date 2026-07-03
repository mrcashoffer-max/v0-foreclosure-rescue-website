import type { Metadata } from "next"
import { professionals } from "@/lib/professionals"
import { CtaBanner } from "@/components/cta-banner"
import { ExternalLink, UserCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "Who Can Help: Trusted Professionals",
  description:
    "Know which professional to turn to — HUD housing counselors, bankruptcy and real estate attorneys, title companies, and more — and how to find reputable help in Texas.",
}

export default function ProfessionalsPage() {
  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-20">
          <span className="text-sm font-medium uppercase tracking-wide text-primary">
            Who can help
          </span>
          <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            The right professional for each situation
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            You don&apos;t have to navigate this alone — and you don&apos;t have to pay to get
            started. Here&apos;s who does what, when to call them, and how to find reputable help.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16">
        <div className="flex flex-col gap-6">
          {professionals.map((pro) => (
            <div
              key={pro.slug}
              className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 sm:p-7"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <UserCheck className="size-5" aria-hidden="true" />
                </span>
                <h2 className="text-xl font-semibold text-card-foreground">{pro.title}</h2>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    When you need them
                  </span>
                  <p className="text-pretty text-sm leading-relaxed text-card-foreground">
                    {pro.whenYouNeedThem}
                  </p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    What they do
                  </span>
                  <p className="text-pretty text-sm leading-relaxed text-card-foreground">
                    {pro.whatTheyDo}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 border-t border-border pt-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                  How to find one
                </span>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                  {pro.howToFind}
                </p>
                {pro.resourceHref && (
                  <a
                    href={pro.resourceHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    {pro.resourceLabel}
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-pretty text-center text-sm leading-relaxed text-muted-foreground">
          This page is educational and not a referral or endorsement. Always verify licensing and
          credentials, and never pay large upfront fees or sign over your deed to anyone promising to
          &quot;rescue&quot; your home.
        </p>
      </section>

      <CtaBanner />
    </>
  )
}
