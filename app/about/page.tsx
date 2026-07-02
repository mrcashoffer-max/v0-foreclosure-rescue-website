import type { Metadata } from "next"
import Image from "next/image"
import { Phone, Mail, ShieldCheck, HeartHandshake, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CtaBanner } from "@/components/cta-banner"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: `About ${site.specialist}`,
  description: `Meet ${site.specialist}, a Texas pre-foreclosure specialist who has spent two decades helping families understand their options and protect their homes and equity.`,
}

const values = [
  {
    icon: HeartHandshake,
    title: "People before transactions",
    body: "Every recommendation starts with what's best for your family — not what's best for a sale. Sometimes that means pointing you to a free resource.",
  },
  {
    icon: Scale,
    title: "Honest, complete options",
    body: "You'll hear about every path available to you, including keeping your home, so you can make a fully informed decision.",
  },
  {
    icon: ShieldCheck,
    title: "Confidential and no pressure",
    body: "Your situation stays private. There's never an obligation, and you set the pace of every conversation.",
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-5 lg:gap-16 lg:py-20">
          <div className="lg:col-span-2">
            <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card">
              <Image
                src="/chris-scott.png"
                alt={`${site.specialist}, Texas foreclosure specialist`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:col-span-3">
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              Meet your specialist
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              {site.specialist} has walked alongside Texas families for 20 years.
            </h1>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              For two decades, Chris has helped homeowners across Texas navigate one of the most
              stressful moments of their lives. He&apos;s seen every situation — job loss, medical
              bills, divorce, the loss of a loved one — and he knows that behind every late payment
              is a real person doing their best.
            </p>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              His approach is simple: listen first, explain every option in plain English, and help
              you choose the path that&apos;s right for you — even when that path doesn&apos;t
              involve him at all. No pressure, no judgment, just honest guidance.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button render={<a href={site.phoneHref} />} nativeButton={false} size="lg">
                <Phone className="size-4" aria-hidden="true" />
                Call {site.phone}
              </Button>
              <Button
                render={<a href={`mailto:${site.email}`} />}
                nativeButton={false}
                variant="outline"
                size="lg"
              >
                <Mail className="size-4" aria-hidden="true" />
                Email Chris
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight">
            What you can count on
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            These aren&apos;t slogans — they&apos;re the standards behind every conversation.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <Card key={value.title} className="flex flex-col gap-3 p-6">
              <div className="flex size-11 items-center justify-center rounded-xl bg-secondary">
                <value.icon className="size-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold">{value.title}</h3>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                {value.body}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Ready to talk it through?"
        description="Reach out for a free, confidential conversation. No obligation — just a clear picture of your options."
      />
    </>
  )
}
