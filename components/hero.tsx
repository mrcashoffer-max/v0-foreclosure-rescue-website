import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"
import { ShieldCheck, Phone, Sparkles, ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            <ShieldCheck className="size-3.5 text-primary" aria-hidden="true" />
            Trusted by Texas homeowners for 20+ years
          </span>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Behind on your mortgage? You still have options.
          </h1>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Pre-foreclosure feels overwhelming, but it&apos;s rarely the end of the road. In two
            minutes, discover the paths that fit your situation — then talk to a specialist who has
            guided Texas families for two decades.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button render={<Link href="/options" />} nativeButton={false} size="lg" className="text-base">
              <Sparkles className="size-4" aria-hidden="true" />
              Find my options
            </Button>
            <Button
              render={<a href={site.phoneHref} />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="text-base"
            >
              <Phone className="size-4" aria-hidden="true" />
              Call {site.phone}
            </Button>
          </div>
          <dl className="grid max-w-md grid-cols-3 gap-4 pt-4">
            {[
              { value: "20+", label: "Years helping Texans" },
              { value: "11", label: "Ways to stop foreclosure" },
              { value: "100%", label: "Free & confidential" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="text-2xl font-semibold text-foreground">{stat.value}</dt>
                <dd className="text-xs leading-snug text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:pl-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border shadow-sm">
            <Image
              src="/texas-home-hero.png"
              alt="A welcoming Texas home at golden hour"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <Link
            href="/guides/texas-foreclosure-timeline"
            className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-secondary/50"
          >
            <span className="text-sm text-card-foreground">
              <span className="font-medium">New here?</span> Start with how the Texas timeline works.
            </span>
            <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
