import { Home } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Home className="size-4" aria-hidden="true" />
              </span>
              Texas Foreclosure Relief
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Helping Texas homeowners navigate pre-foreclosure with clear, honest guidance for over
              20 years.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Contact</span>
            <a href="tel:+14695093031" className="hover:text-foreground">
              469-509-3031
            </a>
            <a href="mailto:Chris@mrcashoffer.com" className="hover:text-foreground">
              Chris@mrcashoffer.com
            </a>
            <span>mrcashoffer.com</span>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            This website is for informational purposes only and does not constitute legal,
            financial, or tax advice. Foreclosure laws and timelines vary by situation. Consult a
            qualified professional or a HUD-certified housing counselor before making decisions.
            &copy; {new Date().getFullYear()} Texas Foreclosure Relief. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
