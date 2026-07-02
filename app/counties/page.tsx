import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { counties } from "@/lib/counties"
import { Card } from "@/components/ui/card"
import { CtaBanner } from "@/components/cta-banner"

export const metadata: Metadata = {
  title: "Texas Counties We Serve",
  description:
    "Local foreclosure guidance for homeowners across Texas counties, including Dallas, Tarrant, Collin, Denton, Harris, and Travis. Understand your county's sale process.",
}

export default function CountiesPage() {
  const regions = Array.from(new Set(counties.map((c) => c.region)))

  return (
    <>
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-20">
          <p className="text-sm font-medium text-primary">Areas we serve</p>
          <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Local help across Texas
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Foreclosure sales happen at the county level, and every county has its own courthouse
            and process. Find yours below to learn what to expect and how to act in time.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        {regions.map((region) => (
          <div key={region} className="mb-12 last:mb-0">
            <h2 className="mb-6 text-xl font-semibold tracking-tight">{region}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {counties
                .filter((c) => c.region === region)
                .map((county) => (
                  <Link key={county.slug} href={`/counties/${county.slug}`} className="group">
                    <Card className="flex h-full flex-col gap-3 p-6 transition-shadow hover:shadow-md">
                      <div className="flex items-center gap-2 text-sm font-medium text-primary">
                        <MapPin className="size-4" aria-hidden="true" />
                        {county.name}
                      </div>
                      <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                        {county.blurb}
                      </p>
                      <div className="mt-auto flex items-center gap-2 pt-2 text-sm font-medium text-primary">
                        {county.name} resources
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </section>

      <CtaBanner />
    </>
  )
}
