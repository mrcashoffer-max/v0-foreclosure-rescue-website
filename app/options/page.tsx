import type { Metadata } from "next"
import Link from "next/link"
import { OptionsWizard } from "@/components/options-wizard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { categoryMeta, optionsByCategory, type OptionCategory } from "@/lib/options"
import { site } from "@/lib/site"
import { CheckCircle2, Phone, ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Your Foreclosure Options in Texas | Find What Fits",
  description:
    "Explore every option for a Texas homeowner in pre-foreclosure — from loan modifications and reinstatement to cash sales and short sales. Take our 2-minute finder to see what fits your situation.",
}

const order: OptionCategory[] = ["keep", "creative", "sell"]

export default function OptionsPage() {
  return (
    <>
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:py-20">
          <Badge variant="secondary" className="mb-4">
            2-minute options finder
          </Badge>
          <h1 className="mx-auto max-w-3xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            You have more options than you think
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Every situation is different. Answer a few quick questions and we&apos;ll show you the
            paths that make the most sense for you — no pressure, no obligation.
          </p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4">
          <OptionsWizard />
        </div>
      </section>

      <section className="border-t border-border bg-secondary/20 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Every option, explained plainly
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Browse the full range of solutions available to Texas homeowners, grouped by goal.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-14">
            {order.map((category) => (
              <div key={category} className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-semibold text-foreground">
                    {categoryMeta[category].label}
                  </h3>
                  <p className="text-pretty text-muted-foreground">
                    {categoryMeta[category].description}
                  </p>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  {optionsByCategory(category).map((opt) => (
                    <div
                      key={opt.slug}
                      id={opt.slug}
                      className="scroll-mt-24 flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
                    >
                      <div className="flex flex-col gap-1">
                        <h4 className="text-lg font-semibold text-card-foreground">{opt.title}</h4>
                        <p className="text-sm font-medium text-primary">{opt.tagline}</p>
                      </div>
                      <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                        {opt.summary}
                      </p>
                      <div className="flex flex-col gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Best if
                        </span>
                        <ul className="flex flex-col gap-1.5">
                          {opt.bestFor.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-card-foreground">
                              <CheckCircle2
                                className="mt-0.5 size-4 shrink-0 text-primary"
                                aria-hidden="true"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-balance text-2xl font-semibold sm:text-3xl">
            Not sure which option is right?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-primary-foreground/90">
            Talk it through with {site.specialist}, a specialist with 20+ years of experience helping
            Texas homeowners. It&apos;s free, confidential, and there&apos;s no obligation.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              render={<a href={site.phoneHref} />}
              nativeButton={false}
              size="lg"
              variant="secondary"
            >
              <Phone className="size-4" aria-hidden="true" />
              Call {site.phone}
            </Button>
            <Button
              render={<Link href="/guides" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              Read the free guides
              <ChevronRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
