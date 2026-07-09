import { Mail, Phone, ShieldCheck } from "lucide-react"
import { site } from "@/lib/site"

export function DidYouGetALetter() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-secondary/50 p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Mail className="size-5" aria-hidden="true" />
          </span>
          <h2 className="text-balance text-xl font-semibold text-foreground sm:text-2xl">
            Did you get a letter, text, or call from us?
          </h2>
        </div>
        <p className="text-pretty leading-relaxed text-muted-foreground">
          Then you&apos;re in the right place — this is really us. We reach out to Texas homeowners
          who may be facing foreclosure because most people don&apos;t realize how many options they
          still have. There&apos;s no obligation and nothing to sign. Look around, or reach out when
          you&apos;re ready. You&apos;re always in control of the conversation.
        </p>
        <div className="flex flex-col gap-2 border-t border-border pt-4 text-sm sm:flex-row sm:items-center sm:gap-6">
          <span className="font-medium text-foreground">Reach Chris directly:</span>
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <Phone className="size-4 text-primary" aria-hidden="true" />
            {site.phone}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <Mail className="size-4 text-primary" aria-hidden="true" />
            {site.email}
          </a>
        </div>
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5 shrink-0" aria-hidden="true" />
          Private and confidential. You set the pace.
        </p>
      </div>
    </section>
  )
}
