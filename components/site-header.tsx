"use client"

import { Button } from "@/components/ui/button"
import { Home, Phone } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 font-semibold text-foreground">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Home className="size-4" aria-hidden="true" />
          </span>
          <span className="tracking-tight">Texas Foreclosure Relief</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a href="#options" className="transition-colors hover:text-foreground">
            Your Options
          </a>
          <a href="#timeline" className="transition-colors hover:text-foreground">
            Timeline
          </a>
          <a href="#advisor" className="transition-colors hover:text-foreground">
            About Chris
          </a>
          <a href="#faq" className="transition-colors hover:text-foreground">
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="tel:+14695093031"
            className="hidden items-center gap-2 text-sm font-medium text-foreground sm:flex"
          >
            <Phone className="size-4 text-primary" aria-hidden="true" />
            469-509-3031
          </a>
          <Button asChild size="sm">
            <a href="#consultation">Get help now</a>
          </Button>
        </div>
      </div>
    </header>
  )
}
