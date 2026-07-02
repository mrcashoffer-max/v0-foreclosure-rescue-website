import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Check, Clock } from "lucide-react"
import { guides, getGuide } from "@/lib/guides"
import { getOption } from "@/lib/options"
import { Card } from "@/components/ui/card"
import { CtaBanner } from "@/components/cta-banner"

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return {}
  return {
    title: guide.title,
    description: guide.excerpt,
  }
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) notFound()

  const related = guide.relatedGuides
    .map((s) => getGuide(s))
    .filter((g): g is NonNullable<typeof g> => Boolean(g))
  const relatedOpts = guide.relatedOptions
    .map((s) => getOption(s))
    .filter((o): o is NonNullable<typeof o> => Boolean(o))

  return (
    <>
      <article>
        <header className="border-b border-border bg-muted/40">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              All guides
            </Link>
            <div className="mt-6 flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-primary">
              <span>{guide.category}</span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="size-3" aria-hidden="true" />
                {guide.readingTime}
              </span>
            </div>
            <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              {guide.title}
            </h1>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              {guide.excerpt}
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
          <div className="flex flex-col gap-10">
            {guide.sections.map((section) => (
              <section key={section.heading} className="flex flex-col gap-4">
                <h2 className="text-balance text-2xl font-semibold tracking-tight">
                  {section.heading}
                </h2>
                {section.body.map((p, i) => (
                  <p key={i} className="text-pretty leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
                {section.list && (
                  <ul className="flex flex-col gap-2">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-3 leading-relaxed">
                        <Check
                          className="mt-1 size-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {relatedOpts.length > 0 && (
            <div className="mt-12 rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h2 className="text-xl font-semibold tracking-tight">Options mentioned in this guide</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                See how each of these could apply to your situation with the free options finder.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {relatedOpts.map((opt) => (
                  <Link
                    key={opt.slug}
                    href={`/options#${opt.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                  >
                    {opt.title}
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <CtaBanner />

      {related.length > 0 && (
        <section className="border-t border-border bg-muted/40 py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight">Keep reading</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {related.map((g) => (
                <Link key={g.slug} href={`/guides/${g.slug}`} className="group">
                  <Card className="flex h-full flex-col gap-3 p-6 transition-shadow hover:shadow-md">
                    <p className="text-xs font-medium uppercase tracking-wide text-primary">
                      {g.category}
                    </p>
                    <h3 className="text-pretty text-lg font-semibold leading-snug">{g.title}</h3>
                    <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                      {g.excerpt}
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
      )}
    </>
  )
}
