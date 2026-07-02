import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Building2, CalendarClock, MapPin } from "lucide-react"
import { counties, getCounty } from "@/lib/counties"
import { guides } from "@/lib/guides"
import { Card } from "@/components/ui/card"
import { OptionsWizard } from "@/components/options-wizard"

export function generateStaticParams() {
  return counties.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const county = getCounty(slug)
  if (!county) return {}
  return {
    title: `${county.name} Foreclosure Help`,
    description: `Facing foreclosure in ${county.name}? Learn how the sale process works at the ${county.courthouseCity} courthouse and explore your options before the sale date.`,
  }
}

export default async function CountyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const county = getCounty(slug)
  if (!county) notFound()

  const featuredGuides = guides.slice(0, 3)

  return (
    <>
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16">
          <Link
            href="/counties"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All counties
          </Link>
          <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary">
            <MapPin className="size-4" aria-hidden="true" />
            {county.region}
          </div>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Foreclosure help in {county.name}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {county.blurb}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Card className="flex items-start gap-3 p-5">
              <Building2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-medium">Courthouse location</p>
                <p className="text-sm text-muted-foreground">{county.courthouseCity}, Texas</p>
              </div>
            </Card>
            <Card className="flex items-start gap-3 p-5">
              <CalendarClock className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-medium">Sale schedule</p>
                <p className="text-sm text-muted-foreground">
                  First Tuesday of each month, 10 a.m.–4 p.m.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight">
            See your options in {county.name}
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Answer a few quick questions to get a personalized list of the paths that fit your
            situation. Free and confidential.
          </p>
        </div>
        <div className="mt-10">
          <OptionsWizard source={`county-${county.slug}`} />
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight">Helpful guides</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {featuredGuides.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="group">
                <Card className="flex h-full flex-col gap-3 p-6 transition-shadow hover:shadow-md">
                  <p className="text-xs font-medium uppercase tracking-wide text-primary">
                    {g.category}
                  </p>
                  <h3 className="text-pretty text-lg font-semibold leading-snug">{g.title}</h3>
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
    </>
  )
}
