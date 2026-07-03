import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { stories } from "@/lib/stories"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function SuccessStoriesPreview() {
  const featured = stories.slice(0, 3)

  return (
    <section className="border-b border-border bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              Homeowner success stories
            </p>
            <h2 className="mt-2 text-pretty text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Real Texans who found a way through
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Different situations, different solutions — from keeping the home to selling on their
              own terms. See what worked and why.
            </p>
          </div>
          <Link
            href="/success-stories"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            View all stories
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((story) => (
            <Link key={story.slug} href={`/success-stories/${story.slug}`} className="group">
              <Card className="flex h-full flex-col gap-3 p-6 transition-shadow hover:shadow-md">
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="secondary">{story.pathLabel}</Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" aria-hidden="true" />
                    {story.location}
                  </span>
                </div>
                <h3 className="text-pretty text-lg font-semibold leading-snug text-card-foreground">
                  {story.title}
                </h3>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                  {story.excerpt}
                </p>
                <div className="mt-auto flex items-center gap-2 pt-2 text-sm font-medium text-primary">
                  Read the story
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
