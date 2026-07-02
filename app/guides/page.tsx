import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import { guides } from "@/lib/guides"
import { Card } from "@/components/ui/card"
import { CtaBanner } from "@/components/cta-banner"

export const metadata: Metadata = {
  title: "Foreclosure Guides for Texas Homeowners",
  description:
    "Free, plain-English guides on the Texas foreclosure timeline, your rights, how to stop a sale, and your options to keep or sell your home. No sign-up required.",
}

export default function GuidesPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-20">
          <p className="text-sm font-medium text-primary">Educational guides</p>
          <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Understand your situation, one step at a time
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Clear answers written for Texas homeowners facing pre-foreclosure. Read as much as you
            want — there&apos;s no sign-up and no obligation.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {guides.map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group">
              <Card className="flex h-full flex-col gap-3 p-6 transition-shadow hover:shadow-md">
                <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-primary">
                  <span>{guide.category}</span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="size-3" aria-hidden="true" />
                    {guide.readingTime}
                  </span>
                </div>
                <h2 className="text-pretty text-xl font-semibold leading-snug">{guide.title}</h2>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                  {guide.excerpt}
                </p>
                <div className="mt-auto flex items-center gap-2 pt-2 text-sm font-medium text-primary">
                  Read guide
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
