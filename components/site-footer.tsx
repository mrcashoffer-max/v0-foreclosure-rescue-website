import Link from "next/link"
import { ShieldCheck } from "lucide-react"
import { site, footerNav } from "@/lib/site"
import { counties } from "@/lib/counties"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="flex flex-col gap-3 md:col-span-1">
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ShieldCheck className="size-4" aria-hidden="true" />
              </span>
              {site.name}
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Clear, honest guidance for Texas homeowners facing pre-foreclosure. No pressure, no
              judgment — just options.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <span className="font-medium text-foreground">Explore</span>
            {footerNav.explore.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <span className="font-medium text-foreground">Learn &amp; help</span>
            {footerNav.resources.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <span className="font-medium text-foreground">Talk to a specialist</span>
            <a href={site.phoneHref} className="text-muted-foreground hover:text-foreground">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="text-muted-foreground hover:text-foreground">
              {site.email}
            </a>
            <span className="text-muted-foreground">{site.serviceArea}</span>
            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
              {counties.slice(0, 4).map((c) => (
                <Link
                  key={c.slug}
                  href={`/counties/${c.slug}`}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            {site.name} is run by a Texas real estate investor. Buying your home is one option we
            offer, but never the only one — and often not the right one. We&apos;ll always tell you
            honestly.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            This website is for informational purposes only and does not constitute legal, financial,
            or tax advice. Foreclosure laws and timelines vary by situation. Consult a qualified
            professional or a HUD-certified housing counselor before making decisions. &copy;{" "}
            {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
