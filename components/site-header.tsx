"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { mainNav, site } from "@/lib/site"
import { Menu, Phone, ShieldCheck } from "lucide-react"

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2" aria-label={`${site.name} home`}>
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShieldCheck className="size-5" aria-hidden="true" />
          </span>
          <span className="flex flex-col text-base font-semibold leading-tight text-foreground">
            <span>Home Rescue Texas</span>
            <span className="text-xs font-normal text-muted-foreground">
              Foreclosure options &amp; guidance
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 text-sm font-medium text-foreground md:flex"
          >
            <Phone className="size-4 text-primary" aria-hidden="true" />
            {site.phone}
          </a>
          <Button
            render={<Link href="/options" />}
            nativeButton={false}
            size="sm"
            className="hidden sm:inline-flex"
          >
            Find my options
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-sm"
                  className="lg:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-5" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-6">
              <SheetTitle className="mb-4">Menu</SheetTitle>
              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
                <Button
                  render={<Link href="/options" onClick={() => setOpen(false)} />}
                  nativeButton={false}
                  className="w-full"
                >
                  Find my options
                </Button>
                <a
                  href={site.phoneHref}
                  className="flex items-center justify-center gap-2 text-sm font-medium text-foreground"
                >
                  <Phone className="size-4 text-primary" aria-hidden="true" />
                  {site.phone}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
