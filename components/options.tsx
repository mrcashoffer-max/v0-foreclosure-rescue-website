import { Card } from "@/components/ui/card"
import { Landmark, Lightbulb, KeyRound, type LucideIcon } from "lucide-react"

type Option = {
  title: string
  description: string
}

type OptionGroup = {
  id: string
  icon: LucideIcon
  eyebrow: string
  title: string
  intro: string
  options: Option[]
}

const groups: OptionGroup[] = [
  {
    id: "keep",
    icon: Landmark,
    eyebrow: "Part 1",
    title: "Traditional ways to keep your home",
    intro:
      "Your first step is to talk to your lender. They would rather work with you than absorb the cost of a foreclosure.",
    options: [
      {
        title: "Loan Modification",
        description:
          "A permanent change to your mortgage terms. Lenders may lower your interest rate, extend the term, or reduce principal to make payments affordable.",
      },
      {
        title: "Forbearance Agreement",
        description:
          "A temporary pause or reduction of payments. Ideal for short-term hardships like a job loss or medical emergency while you get back on your feet.",
      },
      {
        title: "Reinstatement or Repayment Plan",
        description:
          "Pay your past-due balance in a lump sum to bring the loan current, or spread the missed amount over time alongside your regular payment.",
      },
    ],
  },
  {
    id: "creative",
    icon: Lightbulb,
    eyebrow: "Part 2",
    title: "Creative solutions to save your home",
    intro:
      "If your bank won't work with you, don't lose hope. These lesser-known options can still keep you in your home.",
    options: [
      {
        title: "FHA Partial Claim",
        description:
          "For FHA-insured loans, the FHA can lend you the funds to bring your loan current as a no-interest loan repaid when you sell or refinance. A new Payment Supplement can reduce payments for up to 36 months.",
      },
      {
        title: "Hard Money / Private Bailout Loan",
        description:
          "If you have significant equity but a short-term crisis, a private lender can pay off your arrearage and stop foreclosure, giving you time to execute a plan.",
      },
      {
        title: "Chapter 13 Bankruptcy",
        description:
          "Often a last resort, but it immediately halts foreclosure and lets you repay missed payments over 3-5 years, often bringing the lender to the negotiating table.",
      },
    ],
  },
  {
    id: "sell",
    icon: KeyRound,
    eyebrow: "Part 3",
    title: "When selling is the smarter move",
    intro:
      "If keeping the home isn't sustainable, a sale almost always beats a foreclosure. These options protect your credit and can put cash in your pocket.",
    options: [
      {
        title: "Sale-Leaseback (Deed for Leaseback)",
        description:
          "Sell to an investor to pay off your mortgage and stop foreclosure, then lease the home back so you can stay. A buy-back option can let you repurchase later.",
      },
      {
        title: "Short Sale",
        description:
          "If you owe more than the home is worth, an investor negotiates with your lender to accept less than the balance, often waiving the deficiency for a clean slate.",
      },
      {
        title: "Subject-To Transaction",
        description:
          "An investor takes over your existing mortgage payments without a new loan, stopping foreclosure in as little as 7-10 days while you walk away with cash.",
      },
    ],
  },
]

export function Options() {
  return (
    <section id="options" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Know every option before you decide
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            There are three broad paths forward. The right one depends on your equity, your income,
            and your goals. Here&apos;s a clear breakdown of each.
          </p>
        </div>

        <div className="flex flex-col gap-16">
          {groups.map((group) => {
            const Icon = group.icon
            return (
              <div key={group.id} id={group.id} className="scroll-mt-20">
                <div className="mb-8 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium uppercase tracking-wide text-primary">
                      {group.eyebrow}
                    </span>
                  </div>
                  <h3 className="text-balance text-2xl font-semibold tracking-tight text-foreground">
                    {group.title}
                  </h3>
                  <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                    {group.intro}
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {group.options.map((option) => (
                    <Card
                      key={option.title}
                      className="flex flex-col gap-2 border-border p-6 transition-shadow hover:shadow-md"
                    >
                      <h4 className="font-semibold text-card-foreground">{option.title}</h4>
                      <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                        {option.description}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
