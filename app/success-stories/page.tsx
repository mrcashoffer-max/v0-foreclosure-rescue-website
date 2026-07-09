import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { stories } from "@/lib/stories"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CtaBanner } from "@/components/cta-banner"

export const metadata: Metadata = {
  title: "Homeowner Success Stories",
  description:
    "Real-world examples of how Texas homeowners navigated pre-foreclosure — through loan modifications, forbearance, cash sales, mortgage takeovers, and more. See the situation, the challenge, the solution, and the lesson learned.",
}

export default function SuccessStoriesPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-20">
          <p className="text-sm font-medium text-primary">Homeowner success stories</p>
          <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Different families, different paths, the same relief
          </h1>
          <p className="mt-3 max-w-2xl text-pretty text-sm italic leading-relaxed text-muted-foreground">
            These stories are illustrative examples based on common Texas foreclosure situations.
            Details have been changed to protect privacy.
          </p>
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Every situation is unique — and the right answer isn&apos;t always the same. These
            educational stories show how Texas families thought through their options and found a
            path forward.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {stories.map((story) => (
            <Link key={story.slug} href={`/success-stories/${story.slug}`} className="group">
              <Card className="flex h-full flex-col gap-3 p-6 transition-shadow hover:shadow-md">
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="secondary">{story.pathLabel}</Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" aria-hidden="true" />
                    {story.location}
                  </span>
                </div>
                <h2 className="text-pretty text-xl font-semibold leading-snug">{story.title}</h2>
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
      </section>

      <CtaBanner
        title="Wondering which path fits your family?"
        description="Take the 2-minute options finder or talk it through with a specialist. Free, confidential, and no obligation."
      />
    </>
  )
}
