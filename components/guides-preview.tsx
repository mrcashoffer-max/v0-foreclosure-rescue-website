import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { guides } from "@/lib/guides"
import { Card } from "@/components/ui/card"

export function GuidesPreview() {
  const featured = guides.slice(0, 3)

  return (
    <section className="border-t border-border bg-muted/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-primary">Free educational guides</p>
            <h2 className="mt-2 text-pretty text-3xl font-semibold tracking-tight md:text-4xl">
              Understand the process before you make a decision
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Clear, jargon-free answers written for Texas homeowners. No sign-up required to read
              them.
            </p>
          </div>
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            View all guides
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group">
              <Card className="flex h-full flex-col gap-3 p-6 transition-shadow hover:shadow-md">
                <p className="text-xs font-medium uppercase tracking-wide text-primary">
                  {guide.category}
                </p>
                <h3 className="text-pretty text-lg font-semibold leading-snug">{guide.title}</h3>
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
      </div>
    </section>
  )
}
