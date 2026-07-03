import Link from "next/link"
import { ArrowRight, Quote } from "lucide-react"
import { stories } from "@/lib/stories"
import { Card } from "@/components/ui/card"

export function StoriesPreview() {
  const featured = stories.slice(0, 3)

  return (
    <section className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-primary">Real outcomes</p>
            <h2 className="mt-2 text-pretty text-3xl font-semibold tracking-tight md:text-4xl">
              Families who found a way forward
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Every situation is different, but no one has to face it alone. These stories show what
              becomes possible when you know your options.
            </p>
          </div>
          <Link
            href="/success-stories"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Read all stories
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((story) => (
            <Link key={story.slug} href={`/success-stories/${story.slug}`} className="group">
              <Card className="flex h-full flex-col gap-3 p-6 transition-shadow hover:shadow-md">
                <Quote className="size-6 text-primary/40" aria-hidden="true" />
                <p className="text-xs font-medium uppercase tracking-wide text-primary">
                  {story.pathLabel}
                </p>
                <h3 className="text-pretty text-lg font-semibold leading-snug">{story.title}</h3>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                  {story.excerpt}
                </p>
                <div className="mt-auto flex flex-col gap-2 pt-2">
                  <span className="text-xs text-muted-foreground">
                    {story.homeowner} · {story.location}
                  </span>
                  <span className="flex items-center gap-2 text-sm font-medium text-primary">
                    Read story
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
