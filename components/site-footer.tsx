import Link from "next/link"
import { ShieldCheck } from "lucide-react"
import { site } from "@/lib/site"
import { guides } from "@/lib/guides"
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
            <Link href="/options" className="text-muted-foreground hover:text-foreground">
              Your options
            </Link>
            <Link href="/guides" className="text-muted-foreground hover:text-foreground">
              Guides
            </Link>
            <Link href="/counties" className="text-muted-foreground hover:text-foreground">
              Counties we serve
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground">
              About {site.specialist}
            </Link>
            <Link href="/faq" className="text-muted-foreground hover:text-foreground">
              FAQ
            </Link>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <span className="font-medium text-foreground">Popular guides</span>
            {guides.slice(0, 4).map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="text-muted-foreground hover:text-foreground"
              >
                {g.title.length > 34 ? `${g.title.slice(0, 34)}…` : g.title}
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
