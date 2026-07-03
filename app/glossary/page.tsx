import type { Metadata } from "next"
import { glossary } from "@/lib/glossary"
import { CtaBanner } from "@/components/cta-banner"

export const metadata: Metadata = {
  title: "Foreclosure Terms Glossary",
  description:
    "Plain-English definitions of the foreclosure terms Texas homeowners encounter — from arrears and reinstatement to short sale, subject-to, and Chapter 13.",
}

export default function GlossaryPage() {
  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-20">
          <span className="text-sm font-medium uppercase tracking-wide text-primary">Glossary</span>
          <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Foreclosure terms, in plain English
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            The paperwork is full of jargon. Here&apos;s what the words actually mean, so nothing
            catches you off guard.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16">
        <dl className="flex flex-col gap-6">
          {glossary.map((entry) => (
            <div
              key={entry.term}
              id={entry.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              className="scroll-mt-24 rounded-2xl border border-border bg-card p-6"
            >
              <dt className="text-lg font-semibold text-card-foreground">{entry.term}</dt>
              <dd className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                {entry.definition}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <CtaBanner
        title="Confused by a letter you received?"
        description="Take the two-minute finder or call us — we'll help you understand exactly where you stand and what to do next."
      />
    </>
  )
}
