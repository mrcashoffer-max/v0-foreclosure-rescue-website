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
  /** When true, the homeowner may pick more than one answer. */
  multi?: boolean
  /** Selecting any of these values reveals an inline date picker before advancing. */
  datePickerFor?: string[]
}

/**
 * Normalized answers for the recommendation engine. Single-select questions are
 * strings; the "challenge" question is an array. `saleDate` is optional.
 */
export type FinderAnswers = {
  stage?: string
  goal?: string
  property?: string
  mortgage?: string
  equity?: string
  timeframe?: string
  challenges: string[]
  saleDate?: string
}

const NOT_SURE: WizardOption = { value: "unsure", label: "Not sure", hint: "That's completely okay" }

/**
 * The consultation. Seven focused questions, homeowner-friendly language, one
 * multi-select, and a conditional date picker when a sale is scheduled.
 */
export const finderQuestions: WizardQuestion[] = [
  {
    id: "stage",
    question: "Where are you in the process right now?",
    helper: "Texas moves quickly, so knowing where you stand helps us focus. There's no wrong answer.",
    datePickerFor: ["sale"],
    options: [
      { value: "current", label: "I'm current but worried", hint: "Caught up, but things are tight" },
      { value: "behind", label: "Behind on payments", hint: "Missed one or more payments" },
      { value: "notice", label: "Received a Notice of Default", hint: "Formal notice arrived" },
      { value: "sale", label: "A foreclosure sale is scheduled", hint: "A date has been set" },
      NOT_SURE,
    ],
  },
  {
    id: "goal",
    question: "What matters most to you right now?",
    helper: "This is the most important question — we'll build your recommendations around it.",
    options: [
      { value: "keep", label: "Keep my home", hint: "Stay if there's a way" },
      { value: "sell", label: "Sell before foreclosure", hint: "Move on, on my terms" },
      { value: "credit", label: "Protect my credit", hint: "Avoid a foreclosure on my record" },
      { value: "equity", label: "Access my equity", hint: "Get the value I've built" },
      { value: "learn", label: "Just learn my options", hint: "Not ready to decide" },
      { value: "unsure", label: "Not sure yet", hint: "Help me think it through" },
    ],
  },
  {
    id: "property",
    question: "What best describes the property?",
    helper: "Different property types open up different paths.",
    options: [
      { value: "owner", label: "My primary home", hint: "Where I live" },
      { value: "vacant", label: "Vacant", hint: "No one is living there" },
      { value: "rental", label: "A rental or investment property", hint: "Tenant-occupied or held for income" },
      { value: "inherited", label: "A home I inherited", hint: "Passed down to me" },
      { value: "other", label: "Something else", hint: "None of these quite fit" },
    ],
  },
  {
    id: "mortgage",
    question: "How far behind are you on the mortgage?",
    helper: "A rough sense is all we need — no exact figures.",
    options: [
      { value: "current", label: "Not behind yet", hint: "Current, but concerned" },
      { value: "onemiss", label: "About one payment behind", hint: "Just started slipping" },
      { value: "few", label: "A few months behind", hint: "Roughly 2–4 payments" },
      { value: "many", label: "Many months behind", hint: "Fallen well behind" },
      NOT_SURE,
    ],
  },
  {
    id: "equity",
    question: "Roughly how much equity do you have?",
    helper: "Your best estimate is fine — this is just what the home's worth versus what you owe.",
    options: [
      { value: "alot", label: "A lot", hint: "Worth much more than I owe" },
      { value: "some", label: "Some", hint: "A comfortable cushion" },
      { value: "little", label: "Very little", hint: "Owe close to its value" },
      { value: "none", label: "None", hint: "Owe as much or more than it's worth" },
      NOT_SURE,
    ],
  },
  {
    id: "challenge",
    question: "What's driving the situation?",
    helper: "Choose any that apply — this helps us understand the story, not just the numbers.",
    multi: true,
    options: [
      { value: "job", label: "Job loss or reduced income" },
      { value: "divorce", label: "Divorce or separation" },
      { value: "medical", label: "Medical expenses or illness" },
      { value: "probate", label: "A death in the family or probate" },
      { value: "repairs", label: "The home needs major repairs" },
      { value: "taxes", label: "Behind on property taxes" },
      { value: "mortgage", label: "Mortgage payments became unaffordable" },
      { value: "tenant", label: "Problem tenants" },
      { value: "other", label: "Something else" },
    ],
  },
  {
    id: "timeframe",
    question: "How soon do you need a solution?",
    helper: "This helps us prioritize options that can actually move at your pace.",
    options: [
      { value: "now", label: "Immediately", hint: "Time is very short" },
      { value: "twoweeks", label: "Within two weeks", hint: "Soon, but some room" },
      { value: "month", label: "Within a month", hint: "A little breathing room" },
      { value: "exploring", label: "Just exploring", hint: "Planning ahead" },
    ],
  },
]

export const totalFinderQuestions = finderQuestions.length

/** Normalizes the raw component state into a typed FinderAnswers object. */
export function toFinderAnswers(
  single: Record<string, string>,
  challenges: string[],
): FinderAnswers {
  return {
    stage: single.stage,
    goal: single.goal,
    property: single.property,
    mortgage: single.mortgage,
    equity: single.equity,
    timeframe: single.timeframe,
    saleDate: single.saleDate,
    challenges,
  }
}

/** A scheduled sale or an "immediately" timeframe makes the plan time-sensitive. */
export function isTimeSensitive(a: FinderAnswers): boolean {
  return a.stage === "sale" || a.timeframe === "now"
}

/** True when the homeowner mostly answered "not sure." */
export function isMostlyUnsure(a: FinderAnswers): boolean {
  const vals = [a.stage, a.goal, a.property, a.mortgage, a.equity]
  const unsure = vals.filter((v) => v === "unsure").length
  return unsure >= 3
}

export type Confidence = "High" | "Moderate" | "Preliminary"

export type Analysis = {
  ranked: ForeclosureOption[]
  confidence: Confidence
  /** 0–100, for a subtle match meter. */
  confidenceScore: number
  /** Confidence for the second-best option ("another option worth considering"). */
  secondaryConfidence: Confidence
  secondaryScore: number
}

/**
 * Deterministic recommendation engine. Scores each option against the whole
 * situation, applies hard lane filters (tax, probate, owner-occupancy), and
 * ranks by genuine fit — never by business benefit.
 */
export function analyze(a: FinderAnswers): Analysis {
  const { stage, goal, property, mortgage, equity, timeframe, challenges } = a

  const hasTax = challenges.includes("taxes")
  const hasProbate = challenges.includes("probate") || property === "inherited"

  const scores: Record<string, number> = {}
  const add = (slug: string, points: number) => {
    scores[slug] = (scores[slug] ?? 0) + points
  }

  // ---------- Desired outcome (weighted most heavily) ----------
  switch (goal) {
    case "keep":
      add("loan-modification", 3)
      add("reinstatement", 2)
      add("repayment-plan", 2)
      add("forbearance", 2)
      add("partial-claim", 2)
      add("hud-counseling", 2)
      break
    case "sell":
      add("traditional-sale", 3)
      add("cash-sale", 3)
      add("short-sale", 1)
      break
    case "credit":
      add("reinstatement", 2)
      add("loan-modification", 2)
      add("cash-sale", 2)
      add("short-sale", 2)
      add("deed-in-lieu", 1)
      break
    case "equity":
      add("traditional-sale", 3)
      add("cash-sale", 2)
      add("hard-money-refinance", 2)
      add("sale-leaseback", 1)
      break
    case "learn":
    case "unsure":
      add("hud-counseling", 2)
      add("loan-modification", 1)
      add("reinstatement", 1)
      break
  }

  // ---------- Estimated equity ----------
  switch (equity) {
    case "alot":
      add("traditional-sale", 2)
      add("cash-sale", 1)
      add("hard-money-refinance", 1)
      add("sale-leaseback", 1)
      break
    case "some":
      add("traditional-sale", 1)
      add("cash-sale", 1)
      add("loan-modification", 1)
      break
    case "little":
      add("short-sale", 1)
      add("cash-sale", 1)
      add("subject-to", 1)
      break
    case "none":
      add("short-sale", 3)
      add("deed-in-lieu", 2)
      add("subject-to", 1)
      break
  }

  // ---------- How far behind ----------
  switch (mortgage) {
    case "current":
      add("repayment-plan", 1)
      add("loan-modification", 1)
      break
    case "onemiss":
      add("repayment-plan", 2)
      add("reinstatement", 1)
      add("loan-modification", 1)
      break
    case "few":
      add("loan-modification", 2)
      add("repayment-plan", 1)
      add("forbearance", 1)
      add("reinstatement", 1)
      break
    case "many":
      add("chapter-13", 2)
      add("reinstatement", 1)
      add("cash-sale", 1)
      add("deed-in-lieu", 1)
      break
  }

  // ---------- Foreclosure stage ----------
  switch (stage) {
    case "current":
      add("repayment-plan", 1)
      add("hud-counseling", 1)
      break
    case "behind":
      add("loan-modification", 1)
      add("repayment-plan", 1)
      break
    case "notice":
      add("reinstatement", 2)
      add("loan-modification", 1)
      add("chapter-13", 1)
      break
    case "sale":
      add("reinstatement", 2)
      add("chapter-13", 3)
      add("cash-sale", 2)
      break
  }

  // ---------- Timeframe ----------
  switch (timeframe) {
    case "now":
      add("cash-sale", 2)
      add("chapter-13", 2)
      add("reinstatement", 1)
      break
    case "twoweeks":
      add("cash-sale", 1)
      add("reinstatement", 1)
      break
    case "month":
      add("loan-modification", 1)
      add("traditional-sale", 1)
      break
    case "exploring":
      add("hud-counseling", 2)
      break
  }

  // ---------- Primary challenges (multi-select) ----------
  if (hasTax) {
    add("tax-payment-plan", 4)
    add("property-tax-loan", 3)
    add("hud-counseling", 1)
  }
  if (challenges.includes("job")) {
    add("forbearance", 1)
    add("loan-modification", 1)
  }
  if (challenges.includes("divorce")) {
    add("cash-sale", 1)
    add("traditional-sale", 1)
  }
  if (challenges.includes("medical")) {
    add("forbearance", 1)
    add("loan-modification", 1)
  }
  if (challenges.includes("repairs")) {
    add("cash-sale", 2)
    add("subject-to", 1)
  }
  if (challenges.includes("mortgage")) {
    add("loan-modification", 1)
    add("repayment-plan", 1)
  }
  if (challenges.includes("tenant")) {
    add("cash-sale", 1)
    add("traditional-sale", 1)
  }

  // ---------- Property-type lanes (hard filters) ----------
  if (property === "rental") {
    delete scores["loan-modification"]
    delete scores["partial-claim"]
    delete scores["hud-counseling"]
    delete scores["forbearance"]
    add("cash-sale", 2)
    add("traditional-sale", 1)
    add("subject-to", 2)
    if (equity === "none") add("short-sale", 3)
  }
  if (property === "vacant") {
    delete scores["partial-claim"]
    add("cash-sale", 2)
    add("traditional-sale", 1)
    add("subject-to", 1)
  }

  // ---------- Probate / inherited lane ----------
  if (hasProbate) {
    add("probate-heir", 6)
    add("cash-sale", 1)
    add("traditional-sale", 1)
  }

  // ---------- Mostly unsure: surface free HUD counseling ----------
  if (isMostlyUnsure(a) && property !== "rental") {
    add("hud-counseling", 5)
  }

  const ranked = options
    .map((o) => ({ option: o, score: scores[o.slug] ?? 0 }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)

  let list = ranked.slice(0, 3).map((r) => r.option)

  // Fallbacks so there's always a meaningful result.
  if (list.length === 0) {
    if (hasTax) {
      list = options.filter((o) =>
        ["tax-payment-plan", "property-tax-loan", "hud-counseling"].includes(o.slug),
      )
    } else {
      list = options.filter((o) =>
        ["hud-counseling", "loan-modification", "cash-sale"].includes(o.slug),
      )
    }
  }
  if (list.length === 1) {
    const filler = options.find((o) => o.slug === "hud-counseling" && o.slug !== list[0].slug)
    if (filler) list.push(filler)
  }

  // ---------- Confidence ----------
  const topScore = ranked[0]?.score ?? 0
  const secondScore = ranked[1]?.score ?? 0
  const answered = [stage, goal, property, mortgage, equity, timeframe].filter(Boolean).length
  let confidence: Confidence = "Preliminary"
  let confidenceScore = 60
  if (topScore >= 7 && topScore - secondScore >= 2 && answered >= 5 && !isMostlyUnsure(a)) {
    confidence = "High"
    confidenceScore = 90
  } else if (topScore >= 4 && !isMostlyUnsure(a)) {
    confidence = "Moderate"
    confidenceScore = 75
  }

  // Secondary option confidence — always presented as a genuine alternative,
  // but kept a step below the best fit.
  const secondaryScore = ranked[1]
    ? Math.min(
        confidenceScore - 8,
        Math.max(52, Math.round((secondScore / (topScore || 1)) * confidenceScore)),
      )
    : 55
  const secondaryConfidence: Confidence =
    secondaryScore >= 78 ? "High" : secondaryScore >= 64 ? "Moderate" : "Preliminary"

  return { ranked: list, confidence, confidenceScore, secondaryConfidence, secondaryScore }
}

/**
 * A short, natural reflection of the homeowner's situation — the way an
 * experienced advisor would summarize it back to them before giving advice.
 * Intentionally concise (three sentences) and never a raw echo of answers.
 */
export function situationSummary(a: FinderAnswers): string[] {
  const { stage, goal, property, equity, mortgage, challenges } = a
  const lines: string[] = []

  // 1) Where they stand / timeline
  if (stage === "sale") {
    lines.push(
      "A foreclosure sale has already been scheduled, so timing is critical — but the right move now can still change how this ends.",
    )
  } else if (stage === "notice") {
    lines.push(
      "You've received a formal notice, which means the clock has started — yet this stage still leaves several real paths open to you.",
    )
  } else if (stage === "behind" || mortgage === "few" || mortgage === "many") {
    lines.push(
      "You've fallen behind on payments, so time is a factor — but you have more options right now than it probably feels like.",
    )
  } else if (stage === "current") {
    lines.push(
      "You're still current but you can see trouble ahead — reaching out this early gives you the most room to work with.",
    )
  } else {
    lines.push(
      "You're not entirely certain where things stand right now, and that's completely okay — this is exactly what we're here to help sort out.",
    )
  }

  // 2) What matters most
  const goalLine: Record<string, string> = {
    keep: "What matters most to you is finding a way to keep your home.",
    sell: "Your priority is selling before foreclosure and moving forward on your own terms.",
    credit: "Above all, you want to protect your credit from a completed foreclosure.",
    equity: "Your main focus is protecting the equity you've built in the home.",
    learn: "Right now you mostly want to understand your options clearly before deciding anything.",
    unsure: "You're still weighing what you want most, so we've kept every reasonable path on the table.",
  }
  if (goal && goalLine[goal]) lines.push(goalLine[goal])

  // 3) Property / equity synthesis (one line)
  if (property === "inherited" || challenges.includes("probate")) {
    lines.push(
      "Because this home came to you through an inheritance, clearing title comes first — and that usually means you have more time than you'd expect.",
    )
  } else if (property === "rental") {
    lines.push(
      "Since this is an investment property, we've focused only on the paths that genuinely apply to rentals.",
    )
  } else if (equity === "alot" || equity === "some") {
    lines.push(
      "You appear to have meaningful equity in the home, which works in your favor and widens the choices available to you.",
    )
  } else if (equity === "little" || equity === "none") {
    lines.push(
      "There may be little equity to work with, so we've leaned toward options built for exactly that situation.",
    )
  } else if (challenges.includes("taxes")) {
    lines.push(
      "Property taxes are part of the picture here, which shapes which solutions will actually resolve things.",
    )
  }

  return lines.slice(0, 3)
}

/**
 * A short, plain-language reason an option fits, tied to the actual answers.
 * Falls back to the option's own "best for" note.
 */
export function fitReason(option: ForeclosureOption, a: FinderAnswers): string {
  const { goal, stage, equity, property, challenges } = a

  if (option.category === "tax") {
    return "You told us property taxes are part of the picture — this tackles the tax debt directly and can stop a tax sale."
  }
  if (option.category === "estate") {
    return "Because this home was inherited, clearing title and probate usually comes first — and you likely have more time than you'd expect."
  }
  if (property === "inherited" && option.category === "sell") {
    return "Once the probate and title questions are settled, this is a common next move for an inherited home."
  }
  if (goal === "keep" && option.category === "keep") {
    return "Keeping your home matters most to you — this is one of the clearest paths toward staying put."
  }
  if (goal === "credit" && (option.slug === "reinstatement" || option.slug === "loan-modification")) {
    return "You want to protect your credit — curing the default before a completed foreclosure is what does that."
  }
  if (goal === "equity" && option.category === "sell") {
    return "You want to access your equity — selling before the auction is what preserves it for you."
  }
  if (goal === "sell" && option.category === "sell") {
    return "Since you'd like to sell ahead of foreclosure, this lets you move on at your own pace."
  }
  if ((stage === "sale" || a.timeframe === "now") && option.category !== "keep") {
    return "With time running short, this is one of the faster-acting options to consider right away."
  }
  if (equity === "none" && option.slug === "short-sale") {
    return "Because you may owe as much or more than the home is worth, this is designed for exactly that situation."
  }
  if (challenges.includes("repairs") && option.slug === "cash-sale") {
    return "Since the home needs major repairs, an as-is cash sale avoids paying for fixes you can't afford right now."
  }
  return option.bestFor[0]
}

/** Texas-specific guidance for the unlocked action plan, tailored to answers. */
export function texasGuidance(a: FinderAnswers): string[] {
  const tips: string[] = []
  if (a.stage === "sale") {
    tips.push(
      "Texas foreclosure auctions are held on the first Tuesday of the month. Servicers must send a 21-day notice of sale — count your days carefully.",
    )
  } else {
    tips.push(
      "In Texas, lenders send a notice of default with a 20-day chance to cure, then a 21-day notice before any sale. You often have more time than it feels like.",
    )
  }
  if (a.challenges.includes("taxes")) {
    tips.push(
      "Texas counties allow installment plans on delinquent property taxes, and homeowners who are 65+ or disabled can often defer property taxes on a homestead entirely.",
    )
  }
  if (a.property === "inherited" || a.challenges.includes("probate")) {
    tips.push(
      "As an heir, establishing clear title through probate usually comes first. Let the servicer know you're an heir working through the estate — this can buy time.",
    )
  }
  if (a.goal === "keep") {
    tips.push(
      "Texas homeowners have a right to reinstate by paying the past-due amount before the sale. Ask your servicer for a written reinstatement quote.",
    )
  }
  tips.push(
    "A free HUD-approved housing counselor can review everything with you at no cost — reach the HOPE Hotline at 1-888-995-4673 (1-888-995-HOPE).",
  )
  return tips
}
