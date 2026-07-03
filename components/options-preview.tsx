import Link from "next/link"
import { Button } from "@/components/ui/button"
import { categoryMeta, options, optionsByCategory, type OptionCategory } from "@/lib/options"
import { Landmark, Lightbulb, KeyRound, ArrowRight, type LucideIcon } from "lucide-react"

const order: { key: OptionCategory; icon: LucideIcon }[] = [
  { key: "keep", icon: Landmark },
  { key: "creative", icon: Lightbulb },
  { key: "sell", icon: KeyRound },
]

export function OptionsPreview() {
  return (
    <section id="options" className="scroll-mt-20 border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-wide text-primary">
            Your options
          </span>
          <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Three paths forward — and {options.length} ways to get there
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            The right choice depends on your equity, your income, and your goals — and selling is
            only one of them. Here&apos;s the big picture. Take the finder to see which specific
            options fit your situation.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {order.map(({ key, icon: Icon }) => {
            const items = optionsByCategory(key)
            return (
              <div
                key={key}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {categoryMeta[key].label}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {categoryMeta[key].description}
                  </p>
                </div>
                <ul className="mt-1 flex flex-col gap-2 border-t border-border pt-4">
                  {items.map((o) => (
                    <li key={o.slug}>
                      <Link
                        href={`/options#${o.slug}`}
                        className="flex items-center justify-between gap-2 text-sm text-card-foreground transition-colors hover:text-primary"
                      >
                        {o.title}
                        <ArrowRight className="size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Button render={<Link href="/options" />} nativeButton={false} size="lg">
            See which options fit me
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  )
}
