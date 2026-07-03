export type OptionCategory = "keep" | "creative" | "sell"

export type ForeclosureOption = {
  slug: string
  title: string
  category: OptionCategory
  tagline: string
  /** What it is */
  summary: string
  /** Why it may fit */
  bestFor: string[]
  /** Advantages */
  advantages: string[]
  /** Trade-offs */
  considerations: string[]
  /** Suggested next step */
  nextStep: string
  /** Common misconceptions (optional, used for nuanced options like Subject-To) */
  misconceptions?: string[]
}

export const categoryMeta: Record<
  OptionCategory,
  { label: string; description: string }
> = {
  keep: {
    label: "Keep Your Home",
    description:
      "Work directly with your lender to cure the default and stay in the home you love.",
  },
  creative: {
    label: "Creative & Legal Tools",
    description:
      "Less common tools that can buy time, restructure the debt, or transfer the loan when standard options fall short.",
  },
  sell: {
    label: "Sell & Move Forward",
    description:
      "Protect your equity and your credit by selling on your terms before the auction.",
  },
}

export const options: ForeclosureOption[] = [
  {
    slug: "reinstatement",
    title: "Reinstatement",
    category: "keep",
    tagline: "Pay the past-due balance in one lump sum",
    summary:
      "Bring the loan fully current by paying all missed payments, late fees, and legal costs in a single payment before the sale date. This stops the foreclosure and restores your original loan terms.",
    bestFor: [
      "You had a temporary hardship that has now passed",
      "You have access to a lump sum (savings, tax refund, family help)",
      "You want to keep your exact current loan terms",
    ],
    advantages: [
      "Instantly stops the foreclosure and cancels the sale",
      "Keeps your original interest rate and loan terms",
      "No long application or approval process",
    ],
    considerations: [
      "Requires the full past-due amount at once",
      "You must request an exact reinstatement quote from your servicer",
      "Fees and attorney costs are added to the balance",
    ],
    nextStep:
      "Call your servicer and request a written reinstatement quote good through a specific date, then confirm how to deliver certified funds.",
  },
  {
    slug: "loan-modification",
    title: "Loan Modification",
    category: "keep",
    tagline: "Permanently change your loan terms",
    summary:
      "Your lender permanently changes the terms of your mortgage — lowering the interest rate, extending the term, or rolling the past-due amount into the balance — to make payments affordable again.",
    bestFor: [
      "Your income dropped but has stabilized at a lower level",
      "You can afford a reduced monthly payment going forward",
      "You want to stay in the home long term",
    ],
    advantages: [
      "Can lower your monthly payment for the long term",
      "Rolls past-due amounts into the loan instead of a lump sum",
      "Lets you keep the home without selling",
    ],
    considerations: [
      "Requires a full financial package and documentation",
      "Approval and processing can take time",
      "May extend how long you pay on the loan",
    ],
    nextStep:
      "Ask your servicer for a loss-mitigation application and begin gathering income and hardship documents right away.",
  },
  {
    slug: "forbearance",
    title: "Forbearance",
    category: "keep",
    tagline: "Temporarily pause or reduce payments",
    summary:
      "Your lender agrees to temporarily reduce or suspend your payments for a set period while you recover from a short-term hardship. Missed amounts are repaid later through a plan.",
    bestFor: [
      "You're facing a short, temporary hardship (job loss, medical event)",
      "You expect your income to recover soon",
      "You need breathing room right now",
    ],
    advantages: [
      "Gives you immediate short-term relief",
      "Pauses collection pressure while you regroup",
      "Can bridge you to a modification or repayment plan",
    ],
    considerations: [
      "Payments are paused, not forgiven — they come due later",
      "You'll need a repayment plan afterward",
      "Best combined with a longer-term plan",
    ],
    nextStep:
      "Contact your servicer's hardship department, explain your situation, and ask what forbearance terms you qualify for and what happens when it ends.",
  },
  {
    slug: "repayment-plan",
    title: "Repayment Plan",
    category: "keep",
    tagline: "Spread the past-due amount over time",
    summary:
      "Instead of one lump sum, you spread the missed payments over several months by adding a portion to each regular payment until the loan is current again.",
    bestFor: [
      "You've resumed your normal income",
      "You can pay a bit more than your normal payment for a while",
      "Your past-due balance is a few months, not years",
    ],
    advantages: [
      "No lump sum required",
      "Keeps your current loan terms intact",
      "A clear, finite path back to current",
    ],
    considerations: [
      "Monthly payments are higher during the plan",
      "Requires consistent on-time payments",
      "Servicer must agree to the schedule",
    ],
    nextStep:
      "Ask your servicer to put a written repayment plan in place, and confirm the exact monthly amount and duration before you agree.",
  },
  {
    slug: "partial-claim",
    title: "FHA Partial Claim",
    category: "creative",
    tagline: "A zero-interest second loan to catch up",
    summary:
      "For FHA-insured loans, HUD advances the funds to bring your mortgage current as a separate, interest-free subordinate loan that you repay when you sell, refinance, or pay off the mortgage.",
    bestFor: [
      "You have an FHA-insured mortgage",
      "You can now make your regular payment but can't cover the arrears",
      "You want to keep the home without changing your first loan",
    ],
    advantages: [
      "Interest-free — no added interest on the amount advanced",
      "No immediate repayment; it's due only when you sell or refinance",
      "Leaves your first mortgage terms unchanged",
    ],
    considerations: [
      "Only available on FHA loans",
      "Creates a second lien repaid later",
      "Must meet HUD eligibility requirements",
    ],
    nextStep:
      "Confirm your loan is FHA-insured, then ask your servicer whether you qualify for a partial claim to cover the past-due balance.",
  },
  {
    slug: "subject-to",
    title: "Mortgage Takeover (Subject-To)",
    category: "creative",
    tagline: "A buyer takes over your existing mortgage payments",
    summary:
      "In a 'subject-to' arrangement, a qualified buyer takes over responsibility for your existing mortgage payments while the loan stays in your name. It can stop the default quickly when you have little or no equity and no time to sell traditionally.",
    bestFor: [
      "You have little or no equity to sell traditionally",
      "You need the payments handled quickly to stop the default",
      "You're ready to move on but can't cover the arrears",
    ],
    advantages: [
      "Can resolve the delinquency without a lump sum from you",
      "Often faster than a traditional sale or modification",
      "May help you avoid a completed foreclosure on your record",
    ],
    considerations: [
      "The loan stays in your name until it's paid off or refinanced",
      "You must deeply trust the buyer to make every payment on time",
      "Requires clear, written agreements and professional guidance",
    ],
    misconceptions: [
      "\"It transfers the loan out of my name\" — it does not; the loan remains yours until refinanced or paid off.",
      "\"It's illegal\" — it is a legal, well-established structure when documented properly and transparently.",
      "\"I lose all control\" — a well-written agreement defines exactly what the buyer must do and protects you.",
    ],
    nextStep:
      "Only consider this with a reputable buyer and independent legal review. Ask exactly how payments will be verified and what happens if a payment is missed.",
  },
  {
    slug: "chapter-13",
    title: "Chapter 13 Bankruptcy",
    category: "creative",
    tagline: "Reorganize debt and stop the sale",
    summary:
      "Filing Chapter 13 triggers an automatic stay that immediately halts the foreclosure and lets you repay the past-due balance over a 3–5 year court-approved plan while keeping the home.",
    bestFor: [
      "You have steady income to fund a repayment plan",
      "The auction is imminent and you need to stop it now",
      "You have other debts to reorganize as well",
    ],
    advantages: [
      "The automatic stay halts the sale immediately",
      "Spreads the arrears over a 3–5 year plan",
      "Can address other debts at the same time",
    ],
    considerations: [
      "A serious legal step with credit impact",
      "Requires an attorney and court oversight",
      "You must keep up with the plan and new payments",
    ],
    nextStep:
      "Speak with a licensed bankruptcy attorney about whether Chapter 13 fits your income and goals before a sale date arrives.",
  },
  {
    slug: "hard-money-refinance",
    title: "Hard-Money / Bridge Refinance",
    category: "creative",
    tagline: "Short-term equity-based financing",
    summary:
      "If you have significant equity but can't qualify for a traditional refinance, a short-term equity-based loan can pay off the arrears and buy time to sell or secure permanent financing.",
    bestFor: [
      "You have strong equity in the home",
      "You need fast funding to stop the sale",
      "You have a clear exit plan (sale or refinance)",
    ],
    advantages: [
      "Funds quickly when time is short",
      "Based on equity, not just credit score",
      "Buys time to sell or refinance on better terms",
    ],
    considerations: [
      "Higher interest and fees than conventional loans",
      "Short repayment window",
      "Needs a solid exit strategy to avoid another default",
    ],
    nextStep:
      "Estimate your equity, then talk to a reputable lender about short-term options — and map out exactly how you'll repay or refinance.",
  },
  {
    slug: "cash-sale",
    title: "Sell to a Cash Buyer",
    category: "sell",
    tagline: "Fast, certain sale before the auction",
    summary:
      "Sell the home quickly for cash on a timeline you control. This lets you pay off the mortgage, walk away with your remaining equity, and avoid a foreclosure on your record.",
    bestFor: [
      "You have equity but not enough time or money to catch up",
      "You want certainty and speed before the sale date",
      "You're ready to move on from the home",
    ],
    advantages: [
      "Fast, reliable closing on your timeline",
      "No repairs, showings, or financing contingencies",
      "Preserves remaining equity and avoids foreclosure",
    ],
    considerations: [
      "Sale price may be below full retail market value",
      "Best when the auction is close and time is short",
      "Confirm the buyer can truly close on time",
    ],
    nextStep:
      "Get your reinstatement and payoff figures, then compare any cash offer against your equity so you know exactly what you'd keep.",
  },
  {
    slug: "traditional-sale",
    title: "Traditional Market Sale",
    category: "sell",
    tagline: "List and sell for maximum equity",
    summary:
      "If you have enough time before the sale date, listing on the open market can capture the highest price and let you preserve the most equity while avoiding foreclosure.",
    bestFor: [
      "You have several weeks or more before the auction",
      "The home shows well or needs only minor work",
      "Maximizing equity is your top priority",
    ],
    advantages: [
      "Typically captures the highest sale price",
      "Preserves the most equity for your family",
      "Avoids a foreclosure on your credit record",
    ],
    considerations: [
      "Takes longer than a cash sale",
      "May involve showings and minor repairs",
      "Timing must beat the foreclosure sale date",
    ],
    nextStep:
      "Confirm your sale date, then talk with an experienced agent about a realistic timeline and pricing that closes before the auction.",
  },
  {
    slug: "short-sale",
    title: "Short Sale",
    category: "sell",
    tagline: "Sell for less than you owe, with lender approval",
    summary:
      "If you owe more than the home is worth, your lender may approve a sale for less than the balance. It avoids foreclosure and is generally less damaging to your credit.",
    bestFor: [
      "You owe more than the home is currently worth",
      "You can't afford the payments long term",
      "You want a less damaging alternative to foreclosure",
    ],
    advantages: [
      "Lets you exit even when you're underwater",
      "Generally less damaging to credit than foreclosure",
      "Lender often covers most selling costs",
    ],
    considerations: [
      "Requires lender approval and documentation",
      "Takes longer to negotiate",
      "Possible tax implications on forgiven debt",
    ],
    nextStep:
      "Ask your servicer about their short-sale process and work with an agent experienced in negotiating lender approvals.",
  },
  {
    slug: "sale-leaseback",
    title: "Sale-Leaseback",
    category: "sell",
    tagline: "Sell but stay as a renter",
    summary:
      "Sell the home to an investor to clear the mortgage and access your equity, then lease it back so your family can stay in place while you regroup — sometimes with an option to buy it back later.",
    bestFor: [
      "You want to stop the foreclosure but not move right now",
      "Keeping your children in the same school matters",
      "You need equity now but want to stay in the home",
    ],
    advantages: [
      "Access your equity while staying in the home",
      "Avoids the disruption of moving right away",
      "May include an option to repurchase later",
    ],
    considerations: [
      "You become a tenant with a lease obligation",
      "Buy-back terms must be clearly documented",
      "Work only with reputable, transparent buyers",
    ],
    nextStep:
      "If staying put matters most, ask for the lease terms and any buy-back option in writing, and have them reviewed before you sign.",
  },
]

export function getOption(slug: string) {
  return options.find((o) => o.slug === slug)
}

export function optionsByCategory(category: OptionCategory) {
  return options.filter((o) => o.category === category)
}
