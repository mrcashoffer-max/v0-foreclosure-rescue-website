import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, MapPin, Lightbulb } from "lucide-react"
import { stories, getStory } from "@/lib/stories"
import { getOption } from "@/lib/options"
import { getGuide } from "@/lib/guides"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CtaBanner } from "@/components/cta-banner"

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const story = getStory(slug)
  if (!story) return {}
  return {
    title: story.title,
    description: story.excerpt,
  }
}

const storyParts = [
  { key: "situation" as const, label: "The situation" },
  { key: "challenge" as const, label: "The challenge" },
  { key: "solution" as const, label: "The solution" },
  { key: "outcome" as const, label: "The outcome" },
]

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const story = getStory(slug)
  if (!story) notFound()

  const relatedOpts = story.relatedOptions
    .map((s) => getOption(s))
    .filter((o): o is NonNullable<typeof o> => Boolean(o))
  const relatedGuides = story.relatedGuides
    .map((s) => getGuide(s))
    .filter((g): g is NonNullable<typeof g> => Boolean(g))

  return (
    <>
      <article>
        <header className="border-b border-border bg-muted/40">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
            <Link
              href="/success-stories"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              All success stories
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Badge variant="secondary">{story.pathLabel}</Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3" aria-hidden="true" />
                {story.location}
              </span>
            </div>
            <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              {story.title}
            </h1>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              {story.homeowner}
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
          <div className="flex flex-col gap-10">
            {storyParts.map((part) => (
              <section key={part.key} className="flex flex-col gap-3">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {part.label}
                </h2>
                <p className="text-pretty text-lg leading-relaxed text-foreground">
                  {story[part.key]}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
              <Lightbulb className="size-5 text-primary" aria-hidden="true" />
              Lesson learned
            </h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">{story.lesson}</p>
          </div>

          {relatedOpts.length > 0 && (
            <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h2 className="text-xl font-semibold tracking-tight">Options in this story</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                See how each of these could apply to your own situation.
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

      <CtaBanner
        title="Your story can end well, too"
        description="Take the 2-minute options finder or talk to a specialist about your situation. Free and confidential."
      />

      {relatedGuides.length > 0 && (
        <section className="border-t border-border bg-muted/40 py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight">Related guides</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {relatedGuides.map((g) => (
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
