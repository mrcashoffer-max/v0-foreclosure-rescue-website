import Link from "next/link"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

type CtaBannerProps = {
  title?: string
  description?: string
}

export function CtaBanner({
  title = "Not sure which option is right for you?",
  description = "Take the 2-minute options finder or talk to a specialist. Free, confidential, and no obligation.",
}: CtaBannerProps) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="flex flex-col items-start gap-6 rounded-2xl bg-primary p-8 text-primary-foreground sm:p-10 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-balance text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-2 text-pretty leading-relaxed text-primary-foreground/80">
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            render={<Link href="/options" />}
            nativeButton={false}
            size="lg"
            variant="secondary"
            className="whitespace-nowrap"
          >
            Find my options
          </Button>
          <Button
            render={<a href={site.phoneHref} />}
            nativeButton={false}
            size="lg"
            variant="outline"
            className="whitespace-nowrap border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <Phone className="size-4" aria-hidden="true" />
            {site.phone}
          </Button>
        </div>
      </div>
    </section>
  )
}
