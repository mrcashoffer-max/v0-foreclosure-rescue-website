import { ClipboardList, MessagesSquare, Home } from "lucide-react"

const steps = [
  {
    icon: ClipboardList,
    step: "Step 1",
    title: "Find your options",
    body: "Answer a few quick questions in our free finder. In two minutes you'll see the paths that actually fit your situation — no jargon, no pressure.",
  },
  {
    icon: MessagesSquare,
    step: "Step 2",
    title: "Talk it through",
    body: "A specialist reviews your answers and reaches out for a free, confidential conversation. We explain each option in plain English and answer your questions.",
  },
  {
    icon: Home,
    step: "Step 3",
    title: "Take the right step",
    body: "Whether you keep your home or move on with your equity intact, you leave with a clear plan — and someone in your corner to help you follow it.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-wide text-primary">
            How it works
          </span>
          <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Clarity in three simple steps
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            You don&apos;t need to figure this out alone. Here&apos;s exactly what working with us
            looks like.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.title}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {s.step}
                  </span>
                  <h3 className="text-lg font-semibold text-card-foreground">{s.title}</h3>
                </div>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
