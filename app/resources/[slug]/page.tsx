import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { resources, getResource } from "@/lib/resources"
import { getGuide } from "@/lib/guides"
import { CtaBanner } from "@/components/cta-banner"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react"

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const resource = getResource(slug)
  if (!resource) return {}
  return {
    title: resource.title,
    description: resource.description,
  }
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const resource = getResource(slug)
  if (!resource) notFound()

  const relatedGuides = resource.relatedGuides
    .map((g) => getGuide(g))
    .filter((g): g is NonNullable<typeof g> => Boolean(g))

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <Link
          href="/resources"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          All resources
        </Link>

        <div className="mt-6 flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-primary">
            {resource.type}
          </span>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {resource.title}
          </h1>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            {resource.intro}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-8">
          {resource.sections.map((section) => (
            <div key={section.heading} className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-foreground">{section.heading}</h2>
              <ul className="flex flex-col gap-3">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                  >
                    <CheckCircle2
                      className="mt-0.5 size-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span className="text-pretty text-sm leading-relaxed text-card-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {relatedGuides.length > 0 && (
          <div className="mt-12 border-t border-border pt-8">
            <h2 className="text-lg font-semibold text-foreground">Related guides</h2>
            <div className="mt-4 flex flex-col gap-3">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
                >
                  <span className="font-medium text-card-foreground">{guide.title}</span>
                  <ArrowRight
                    className="size-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-3 rounded-2xl bg-secondary/50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-pretty font-medium text-foreground">
            Want a personalized set of next steps?
          </p>
          <Button render={<Link href="/options" />} nativeButton={false} className="shrink-0">
            Take the options finder
          </Button>
        </div>
      </article>

      <CtaBanner />
    </>
  )
}
