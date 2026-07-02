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
}

export const wizardQuestions: WizardQuestion[] = [
  {
    id: "goal",
    question: "What matters most to you right now?",
    helper: "There are no wrong answers — this just helps us point you in the right direction.",
    options: [
      { value: "keep", label: "I want to keep my home", hint: "Stay in the home you love" },
      { value: "unsure", label: "I'm not sure yet", hint: "Show me all my options" },
      { value: "move", label: "I'm ready to move on", hint: "Protect my equity and credit" },
    ],
  },
  {
    id: "stage",
    question: "Where are you in the process?",
    helper: "Texas moves quickly — where you are changes what's possible.",
    options: [
      { value: "early", label: "Behind, but no formal notices yet", hint: "You likely have the most options" },
      { value: "notice", label: "I've received a notice from my lender", hint: "Still plenty you can do" },
      { value: "sale", label: "A sale date has been scheduled", hint: "Time-sensitive — act now" },
    ],
  },
  {
    id: "hardship",
    question: "How would you describe your financial situation?",
    helper: "This helps us match you to a solution you can actually sustain.",
    options: [
      { value: "recovered", label: "A temporary setback that's now behind me", hint: "Income has recovered" },
      { value: "lower", label: "My income dropped but is now steady", hint: "At a new, lower level" },
      { value: "ongoing", label: "I'm still in the middle of a hardship", hint: "Things are still uncertain" },
    ],
  },
  {
    id: "equity",
    question: "Do you have equity in your home?",
    helper: "Equity is what you'd keep after paying off the mortgage. It's okay if you're not sure.",
    options: [
      { value: "yes", label: "Yes, a good amount", hint: "Worth more than I owe" },
      { value: "little", label: "A little, or I'm not sure", hint: "Roughly break even" },
      { value: "underwater", label: "I owe more than it's worth", hint: "Underwater on the loan" },
    ],
  },
  {
    id: "loan",
    question: "What type of loan do you have?",
    helper: "Some options, like an FHA partial claim, are loan-specific.",
    options: [
      { value: "fha", label: "FHA loan", hint: "Government-insured" },
      { value: "conventional", label: "Conventional loan", hint: "Standard mortgage" },
      { value: "unknown", label: "I'm not sure", hint: "That's completely fine" },
    ],
  },
]

/**
 * Deterministic recommendation engine. Scores each option based on the
 * visitor's answers and returns the top matches (option slugs).
 */
export function recommendOptions(answers: Record<string, string>): ForeclosureOption[] {
  const scores: Record<string, number> = {}
  const add = (slug: string, points: number) => {
    scores[slug] = (scores[slug] ?? 0) + points
  }

  const { goal, stage, hardship, equity, loan } = answers

  // Goal weighting
  if (goal === "keep") {
    add("loan-modification", 3)
    add("reinstatement", 2)
    add("forbearance", 2)
    add("repayment-plan", 2)
    add("partial-claim", 2)
  }
  if (goal === "move") {
    add("cash-sale", 3)
    add("traditional-sale", 2)
    add("short-sale", 2)
    add("sale-leaseback", 2)
  }
  if (goal === "unsure") {
    add("loan-modification", 1)
    add("cash-sale", 1)
    add("reinstatement", 1)
    add("sale-leaseback", 1)
  }

  // Stage weighting
  if (stage === "early") {
    add("loan-modification", 2)
    add("repayment-plan", 2)
    add("traditional-sale", 2)
  }
  if (stage === "notice") {
    add("reinstatement", 2)
    add("loan-modification", 1)
    add("cash-sale", 1)
  }
  if (stage === "sale") {
    add("reinstatement", 2)
    add("cash-sale", 3)
    add("chapter-13", 3)
  }

  // Hardship weighting
  if (hardship === "recovered") {
    add("reinstatement", 2)
    add("repayment-plan", 2)
  }
  if (hardship === "lower") {
    add("loan-modification", 3)
    add("partial-claim", 1)
  }
  if (hardship === "ongoing") {
    add("forbearance", 2)
    add("cash-sale", 2)
    add("sale-leaseback", 2)
    add("short-sale", 1)
  }

  // Equity weighting
  if (equity === "yes") {
    add("cash-sale", 2)
    add("traditional-sale", 2)
    add("hard-money-refinance", 2)
    add("sale-leaseback", 1)
  }
  if (equity === "little") {
    add("loan-modification", 1)
    add("reinstatement", 1)
  }
  if (equity === "underwater") {
    add("short-sale", 4)
    add("loan-modification", 1)
  }

  // Loan type weighting
  if (loan === "fha") {
    add("partial-claim", 4)
  }

  const ranked = options
    .map((o) => ({ option: o, score: scores[o.slug] ?? 0 }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)

  const top = ranked.slice(0, 3).map((r) => r.option)

  // Sensible fallback if nothing scored
  if (top.length === 0) {
    return options.filter((o) =>
      ["loan-modification", "cash-sale", "reinstatement"].includes(o.slug),
    )
  }
  return top
}
