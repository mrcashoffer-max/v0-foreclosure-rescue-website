import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, Mail, Globe } from "lucide-react"

export function Advisor() {
  return (
    <section id="advisor" className="border-y border-border bg-muted/40 scroll-mt-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-5 lg:gap-16 lg:py-24">
        <div className="lg:col-span-2">
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card">
            <Image
              src="/chris-scott.png"
              alt="Chris Scott, Texas foreclosure specialist"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5 lg:col-span-3">
          <span className="text-sm font-medium uppercase tracking-wide text-primary">
            Meet your specialist
          </span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Chris Scott has guided Texas families for 20 years.
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            &ldquo;Facing pre-foreclosure is stressful and confusing, and it&apos;s easy to feel
            like you&apos;re out of options. That&apos;s rarely the case. My first priority is to
            help you understand every path forward, even if that means working with your bank or
            another resource. No pressure, just honest guidance.&rdquo;
          </p>
          <p className="font-medium text-foreground">Chris Scott, Pre-Foreclosure Specialist</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <a href="tel:+14695093031" className="flex items-center gap-2 hover:text-foreground">
              <Phone className="size-4 text-primary" aria-hidden="true" />
              469-509-3031
            </a>
            <a
              href="mailto:Chris@mrcashoffer.com"
              className="flex items-center gap-2 hover:text-foreground"
            >
              <Mail className="size-4 text-primary" aria-hidden="true" />
              Chris@mrcashoffer.com
            </a>
            <span className="flex items-center gap-2">
              <Globe className="size-4 text-primary" aria-hidden="true" />
              mrcashoffer.com
            </span>
          </div>
          <div className="pt-1">
            <Button asChild size="lg">
              <a href="#consultation">Schedule a confidential call</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
