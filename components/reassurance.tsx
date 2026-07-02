import { HeartHandshake, Eye, Scale } from "lucide-react"

const cards = [
  {
    icon: HeartHandshake,
    title: "You are not alone",
    body: "Thousands of good, hardworking Texas families fall behind every year — after a job loss, an illness, a divorce, or a death in the family. It is not a moral failing. It is a hard season, and there is a way through it.",
  },
  {
    icon: Eye,
    title: "No judgment, ever",
    body: "You won't be lectured or pressured. We meet you exactly where you are, listen to your story, and focus only on what will help you most — even if that means pointing you to a free resource instead of us.",
  },
  {
    icon: Scale,
    title: "Honest guidance",
    body: "Our goal is your best outcome, not a quick deal. We'll tell you the truth about your options, including the ones that don't involve us, so you can make a decision you feel good about.",
  },
]

export function Reassurance() {
  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Falling behind doesn&apos;t define you
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Before we talk about paperwork and deadlines, we want you to know this: your situation is
            more common — and more solvable — than it feels right now.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((c) => {
            const Icon = c.icon
            return (
              <div
                key={c.title}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold text-card-foreground">{c.title}</h3>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
