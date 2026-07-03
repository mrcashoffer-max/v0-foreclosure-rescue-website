import type { Metadata } from "next"
import Link from "next/link"
import { resources } from "@/lib/resources"
import { CtaBanner } from "@/components/cta-banner"
import { ClipboardCheck, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Free Foreclosure Resources & Checklists",
  description:
    "Free, practical checklists and worksheets for Texas homeowners facing foreclosure — first-week steps, questions to ask your lender, document checklists, and more.",
}

export default function ResourcesPage() {
  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-20">
          <span className="text-sm font-medium uppercase tracking-wide text-primary">
            Resources
          </span>
          <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Free checklists to help you act with confidence
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Clear, practical tools you can use today — no sign-up required. Print them, work through
            them, and take back a sense of control.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-5 sm:grid-cols-2">
          {resources.map((resource) => (
            <Link
              key={resource.slug}
              href={`/resources/${resource.slug}`}
              className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ClipboardCheck className="size-5" aria-hidden="true" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {resource.type}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-card-foreground">{resource.title}</h2>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                {resource.description}
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Open checklist
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Not sure which resource you need?"
        description="Take the two-minute options finder and we'll point you to the right next steps for your situation."
      />
    </>
  )
}
