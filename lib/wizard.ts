import { options, type ForeclosureOption } from "@/lib/options"

export type WizardOption = {
  value: string
  label: string
  hint?: string
}

export type WizardQuestion = {
  id: string
  question: string
  helper?: string
  options: WizardOption[]
  /** Selecting any of these values reveals an inline date picker before advancing. */
  datePickerFor?: string[]
}

const NOT_SURE: WizardOption = {
  value: "unsure",
  label: "Not sure",
  hint: "That's completely okay",
}

/**
 * The finder adapts to earlier answers. Q2 (stage) is worded differently for a
 * property-tax situation than a mortgage situation. Pass the current answers to
 * get the resolved, in-order question list. The length is always the same.
 */
export function resolveQuestions(answers: Record<string, string>): WizardQuestion[] {
  const isTaxOnly = answers.risk === "taxes"

  const stageQuestion: WizardQuestion = isTaxOnly
    ? {
        id: "stage",
        question: "Where are you in the process?",
        helper: "Texas tax timelines move steadily — knowing where you are helps us focus.",
        datePickerFor: ["taxsale"],
        options: [
          {
            value: "delinquent",
            label: "Recently became delinquent",
            hint: "Taxes are past due",
          },
          {
            value: "taxsale",
            label: "A tax sale has been scheduled",
            hint: "Time-sensitive — let's act",
          },
          NOT_SURE,
        ],
      }
    : {
        id: "stage",
        question: "Where are you in the process?",
        helper: "Texas moves quickly — where you are changes what's possible.",
        datePickerFor: ["sale"],
        options: [
          { value: "early", label: "Just fell behind", hint: "No formal notices yet" },
          {
            value: "notice",
            label: "Received a Notice of Default",
            hint: "Still plenty you can do",
          },
          { value: "sale", label: "An auction date is set", hint: "Time-sensitive — let's act" },
          NOT_SURE,
        ],
      }

  return [
    {
      id: "risk",
      question: "What's putting your home at risk?",
      helper: "This helps us point you to the right kind of solution — they're different.",
      options: [
        {
          value: "mortgage",
          label: "Falling behind on my mortgage",
          hint: "Payments are behind",
        },
        { value: "taxes", label: "Behind on property taxes", hint: "County taxes are past due" },
        { value: "both", label: "Both", hint: "Mortgage and taxes" },
        NOT_SURE,
      ],
    },
    stageQuestion,
    {
      id: "goal",
      question: "What matters most to you right now?",
      helper: "There are no wrong answers — this just points us in the right direction.",
      options: [
        { value: "stay", label: "Stay in my home", hint: "Keep the home if I can" },
        { value: "sell", label: "Sell and keep as much as I can", hint: "Protect my equity" },
        { value: "exit", label: "Just get out from under it", hint: "Move on cleanly" },
        { value: "unsure", label: "Not sure yet", hint: "Show me the options" },
      ],
    },
    {
      id: "hardship",
      question: "Is the hardship behind you, or still ongoing?",
      helper: "This helps us match you to something you can actually sustain.",
      options: [
        { value: "stabilizing", label: "Things are stabilizing", hint: "Getting back on track" },
        { value: "ongoing", label: "Still going through it", hint: "Things are still uncertain" },
        NOT_SURE,
      ],
    },
    {
      id: "equity",
      question: "Roughly, how does what you owe compare to what the home is worth?",
      helper: "A rough sense is fine — it's okay if you're not sure.",
      options: [
        { value: "equity", label: "I owe a lot less than it's worth", hint: "Strong equity" },
        { value: "even", label: "About the same", hint: "Roughly break even" },
        { value: "underwater", label: "I owe more than it's worth", hint: "Underwater on it" },
        NOT_SURE,
      ],
    },
    {
      id: "property",
      question: "Is this your primary home, a rental, or a property you inherited?",
      helper: "Different property types open up different options.",
      options: [
        { value: "primary", label: "My primary home", hint: "Where I live" },
        { value: "rental", label: "A rental or investment property", hint: "Not owner-occupied" },
        { value: "inherited", label: "A property I inherited", hint: "Passed down to me" },
        NOT_SURE,
      ],
    },
  ]
}

/** Static base list, used for the intro count. */
export const baseQuestions = resolveQuestions({})

/** True when a scheduled sale/tax-sale means the recommendations are time-sensitive. */
export function isTimeSensitive(answers: Record<string, string>): boolean {
  return answers.stage === "sale" || answers.stage === "taxsale"
}

/** True when the visitor answered "not sure" to most questions. */
export function isMostlyUnsure(answers: Record<string, string>): boolean {
  const keys = ["risk", "stage", "goal", "hardship", "equity", "property"]
  const unsure = keys.filter((k) => answers[k] === "unsure").length
  return unsure >= 3
}

/**
 * Deterministic recommendation engine. Scores each option against the visitor's
 * answers, applies hard lane filters (tax vs. mortgage, owner-occupancy, probate),
 * and returns the top 2–4 matches ordered by fit — never by business benefit.
 */
export function recommendOptions(answers: Record<string, string>): ForeclosureOption[] {
  const { risk, stage, goal, hardship, equity, property } = answers

  const taxContext = risk === "taxes"
  const bothContext = risk === "both"
  const mortgageContext = !taxContext // mortgage, both, or unsure can use mortgage-cure lane

  const scores: Record<string, number> = {}
  const add = (slug: string, points: number) => {
    scores[slug] = (scores[slug] ?? 0) + points
  }

  // ---------- SELL lane (selling resolves either a mortgage or tax default) ----------
  if (goal === "sell") {
    add("traditional-sale", 3)
    add("cash-sale", 3)
  }
  if (goal === "exit") {
    add("cash-sale", 3)
    add("subject-to", 3)
    add("deed-in-lieu", 3)
  }
  if (equity === "equity") {
    add("traditional-sale", 2)
    add("cash-sale", 1)
    add("hard-money-refinance", 1)
    add("sale-leaseback", 1)
  }
  if (equity === "underwater") {
    add("short-sale", 3)
    add("deed-in-lieu", 2)
    add("subject-to", 1)
  }

  // ---------- MORTGAGE-CURE lane (not for tax-only situations) ----------
  if (mortgageContext) {
    if (goal === "stay") {
      add("loan-modification", 3)
      add("reinstatement", 2)
      add("forbearance", 2)
      add("repayment-plan", 2)
      add("partial-claim", 2)
      add("hud-counseling", 2)
    }
    if (goal === "unsure") {
      add("hud-counseling", 2)
      add("loan-modification", 1)
      add("reinstatement", 1)
    }
    if (stage === "early") {
      add("loan-modification", 2)
      add("repayment-plan", 2)
    }
    if (stage === "notice") {
      add("reinstatement", 2)
      add("loan-modification", 1)
    }
    if (stage === "sale") {
      add("reinstatement", 2)
      add("chapter-13", 3)
      add("cash-sale", 2)
    }
    if (hardship === "stabilizing") {
      add("reinstatement", 2)
      add("repayment-plan", 2)
      add("loan-modification", 1)
    }
    if (hardship === "ongoing") {
      add("forbearance", 1)
      add("sale-leaseback", 1)
      add("cash-sale", 1)
    }
    if (equity === "even") {
      add("loan-modification", 1)
      add("reinstatement", 1)
      add("subject-to", 1)
    }
  }

  // ---------- TAX lane ----------
  if (taxContext || bothContext) {
    add("tax-payment-plan", 4)
    add("property-tax-loan", 4)
    if (stage === "taxsale") add("property-tax-loan", 2)
    if (goal === "stay") add("tax-payment-plan", 2)
    add("hud-counseling", 1)
  }

  // ---------- Property-type adjustments ----------
  if (property === "inherited") {
    // Route into the probate/heir lane first, then keep/sell by goal.
    add("probate-heir", 6)
    add("cash-sale", 1)
    add("traditional-sale", 1)
  }
  if (property === "rental") {
    // Remove owner-occupancy-gated options.
    delete scores["loan-modification"]
    delete scores["partial-claim"]
    delete scores["hud-counseling"]
    add("cash-sale", 2)
    add("traditional-sale", 1)
    add("subject-to", 2)
    if (equity === "underwater") add("short-sale", 3)
  }

  // ---------- Mostly-unsure: surface free HUD counseling prominently ----------
  if (isMostlyUnsure(answers) && property !== "rental") {
    add("hud-counseling", 5)
  }

  const ranked = options
    .map((o) => ({ option: o, score: scores[o.slug] ?? 0 }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)

  const top = ranked.slice(0, 4).map((r) => r.option)

  // Sensible fallbacks if nothing scored.
  if (top.length === 0) {
    if (taxContext) {
      return options.filter((o) => ["tax-payment-plan", "property-tax-loan", "hud-counseling"].includes(o.slug))
    }
    return options.filter((o) =>
      ["hud-counseling", "loan-modification", "cash-sale"].includes(o.slug),
    )
  }

  // Guarantee at least two options to feel like a real shortlist.
  if (top.length === 1) {
    const filler = options.find(
      (o) => o.slug === "hud-counseling" && o.slug !== top[0].slug,
    )
    if (filler) top.push(filler)
  }

  return top
}

/**
 * Builds a short, plain-language reason an option may fit, tied to the
 * visitor's actual answers. Falls back to the option's own "why it may fit" note.
 */
export function fitReason(option: ForeclosureOption, answers: Record<string, string>): string {
  const { goal, stage, equity, property } = answers

  if (option.category === "tax") {
    return "You told us property taxes are the issue — this tackles the tax debt directly and can stop a tax sale."
  }
  if (option.category === "estate") {
    return "Because this home was inherited, clearing title and probate usually comes first — and you likely have more time than you'd expect."
  }
  if (property === "inherited" && option.category === "sell") {
    return "Once the title and probate questions are sorted out, this is a common next move for an inherited home."
  }
  if (goal === "stay" && option.category === "keep") {
    return "You told us staying in your home matters most — this is one of the paths that works toward keeping it."
  }
  if (goal === "sell" && option.category === "sell") {
    return "Since you want to sell and keep what you can, this helps you exit on your terms before the sale date."
  }
  if (goal === "exit" && option.category === "sell") {
    return "You said you're ready to be out from under it — this is one of the cleaner ways to move on."
  }
  if ((stage === "sale" || stage === "taxsale") && option.category !== "keep") {
    return "With a sale date set, this is one of the faster-acting options to consider right away."
  }
  if (equity === "underwater" && option.slug === "short-sale") {
    return "Because you may owe more than the home is worth, this is designed for exactly that situation."
  }
  if (equity === "equity" && option.category === "sell") {
    return "You indicated you have equity — acting before the sale is what preserves it for your family."
  }

  return option.bestFor[0]
}
