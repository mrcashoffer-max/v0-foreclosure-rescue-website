export type SuccessStory = {
  slug: string
  /** Short headline describing the outcome */
  title: string
  /** The homeowner's first name (anonymized) and location */
  homeowner: string
  location: string
  /** Category label, e.g. "Loan Modification" */
  pathLabel: string
  excerpt: string
  situation: string
  challenge: string
  solution: string
  outcome: string
  lesson: string
  relatedOptions: string[]
  relatedGuides: string[]
}

/**
 * Educational homeowner success stories. Names and details are
 * representative composites used for education, not identifiable clients.
 */
export const stories: SuccessStory[] = [
  {
    slug: "loan-modification-after-job-loss",
    title: "A lower payment let a family keep the home after a layoff",
    homeowner: "The Ramirez family",
    location: "Tarrant County",
    pathLabel: "Loan Modification",
    excerpt:
      "After a layoff and three missed payments, a modified loan brought the payment within reach — and the family stayed put.",
    situation:
      "After 11 years in their Fort Worth home, Miguel was laid off during a company restructuring. It took four months to find a new role, and by then the family was three payments behind and had received a notice from their servicer.",
    challenge:
      "Miguel's new job paid less than his old one. A lump-sum reinstatement wasn't realistic, and the family was terrified they'd have to uproot their kids mid-school-year.",
    solution:
      "We helped them understand the loss-mitigation process and gather a complete financial package. Their servicer approved a loan modification that rolled the arrears into the balance and lowered the interest rate, bringing the payment within their new budget.",
    outcome:
      "The family kept their home with a payment they could sustain. The foreclosure process was stopped before a sale date was ever set.",
    lesson:
      "Applying early — with a complete, well-documented package — gives a modification the best chance of approval. Keeping the home is often the right answer.",
    relatedOptions: ["loan-modification", "repayment-plan"],
    relatedGuides: ["keep-your-home", "your-rights-in-pre-foreclosure"],
  },
  {
    slug: "cash-sale-before-auction",
    title: "A fast sale protected $70k in equity days before the auction",
    homeowner: "Denise",
    location: "Dallas County",
    pathLabel: "Cash Sale",
    excerpt:
      "With a sale date two weeks away and real equity on the line, a fast, certain sale preserved what the family had built.",
    situation:
      "Denise inherited her mother's mortgage payments along with her own after a difficult year. She fell behind, and a foreclosure sale date landed on the calendar just 14 days out.",
    challenge:
      "There wasn't enough time for a traditional listing, and reinstatement wasn't affordable. But the home had roughly $70,000 of equity that a foreclosure auction would likely wipe out.",
    solution:
      "After walking through every option, Denise chose a cash sale that could close before the sale date. We made sure she compared the offer against her payoff so she knew exactly what she'd keep.",
    outcome:
      "The sale closed with days to spare. The mortgage was paid off, the foreclosure was canceled, and Denise walked away with her equity intact and her credit protected.",
    lesson:
      "When time is short but equity is real, a certain sale can protect far more than waiting for the auction. Always compare any offer to your payoff figure.",
    relatedOptions: ["cash-sale", "traditional-sale"],
    relatedGuides: ["selling-during-foreclosure", "how-to-stop-the-sale"],
  },
  {
    slug: "subject-to-no-equity",
    title: "A mortgage takeover ended the default when there was no equity",
    homeowner: "James",
    location: "Denton County",
    pathLabel: "Mortgage Takeover (Subject-To)",
    excerpt:
      "With almost no equity and no lump sum available, a carefully documented subject-to arrangement stopped the bleeding.",
    situation:
      "James had a job transfer out of state and could no longer afford two housing payments. His home had almost no equity, so a traditional sale would have cost him money he didn't have.",
    challenge:
      "He couldn't cover the arrears, didn't qualify for a modification he could afford, and a short sale would have taken longer than he had.",
    solution:
      "We explained a mortgage takeover (subject-to) in plain terms, including the real trade-offs — that the loan would stay in his name until refinanced or paid off. With independent legal review, a qualified buyer took over the payments under a clear written agreement.",
    outcome:
      "The default was resolved, James avoided a completed foreclosure, and he was able to relocate for his new job without two payments hanging over him.",
    lesson:
      "Subject-to isn't for everyone, but for a low-equity, time-sensitive situation it can be a legitimate tool — when it's transparent, documented, and reviewed by your own attorney.",
    relatedOptions: ["subject-to", "short-sale"],
    relatedGuides: ["selling-during-foreclosure", "avoiding-foreclosure-scams"],
  },
  {
    slug: "inherited-home-probate",
    title: "Siblings sold an inherited home and split the equity fairly",
    homeowner: "The Coleman siblings",
    location: "Collin County",
    pathLabel: "Traditional Sale",
    excerpt:
      "An inherited home with a delinquent mortgage became a clean, fair outcome once the probate picture was clear.",
    situation:
      "After their father passed, three siblings inherited his home — along with a mortgage that had fallen behind during his illness. None of them lived nearby.",
    challenge:
      "They weren't sure who had authority to act, the loan was heading toward foreclosure, and emotions were running high about what to do with their childhood home.",
    solution:
      "We helped them understand the probate steps and connected them with an estate attorney. With enough runway before any sale date, a traditional market sale made the most sense to maximize the estate's value.",
    outcome:
      "The home sold on the open market for full value. The mortgage was paid off and the remaining equity was divided evenly among the siblings.",
    lesson:
      "Inherited property with a delinquent mortgage is solvable — but get the probate and authority questions answered early, ideally with an estate attorney.",
    relatedOptions: ["traditional-sale", "cash-sale"],
    relatedGuides: ["selling-during-foreclosure", "texas-foreclosure-timeline"],
  },
  {
    slug: "divorce-sale-leaseback",
    title: "A sale-leaseback kept the kids in the same school through a divorce",
    homeowner: "Angela",
    location: "Dallas County",
    pathLabel: "Sale-Leaseback",
    excerpt:
      "During a divorce, staying in place mattered most — so the family sold, accessed equity, and leased the home back.",
    situation:
      "As Angela's divorce progressed, neither spouse could carry the mortgage alone and payments slipped. Moving her two kids mid-year felt like one loss too many.",
    challenge:
      "She needed to resolve the mortgage and access equity, but she wasn't ready to move and wanted to keep her children in their school district.",
    solution:
      "We walked through every option, including keeping the home, before she chose a sale-leaseback with a reputable buyer. The buy-back and lease terms were spelled out clearly and reviewed before signing.",
    outcome:
      "The mortgage was resolved, Angela accessed her share of the equity, and the family stayed in the home as renters while she got back on her feet.",
    lesson:
      "Selling doesn't always mean moving. When stability matters most, a well-documented sale-leaseback can buy breathing room — but the terms must be crystal clear.",
    relatedOptions: ["sale-leaseback", "traditional-sale"],
    relatedGuides: ["selling-during-foreclosure", "avoiding-foreclosure-scams"],
  },
  {
    slug: "medical-hardship-forbearance",
    title: "Forbearance bridged a medical crisis until income recovered",
    homeowner: "The Nguyen family",
    location: "Tarrant County",
    pathLabel: "Forbearance",
    excerpt:
      "A serious illness paused one income. A short forbearance, then a repayment plan, carried the family through.",
    situation:
      "When Lan was diagnosed with a serious illness, the household dropped to one income overnight while medical bills piled up. Two mortgage payments were missed.",
    challenge:
      "The hardship was temporary but the timing was brutal. The family needed immediate breathing room without giving up the home they expected to afford again soon.",
    solution:
      "We helped them contact their servicer's hardship department and understand their rights. They secured a short forbearance to pause payments, followed by a repayment plan once Lan returned to work.",
    outcome:
      "The family kept their home, caught up over several months, and avoided foreclosure entirely — without a lump-sum payment.",
    lesson:
      "For a temporary, well-documented hardship, forbearance paired with a repayment plan can be enough. Ask your servicer exactly what happens when the pause ends.",
    relatedOptions: ["forbearance", "repayment-plan"],
    relatedGuides: ["keep-your-home", "your-rights-in-pre-foreclosure"],
  },
]

export function getStory(slug: string) {
  return stories.find((s) => s.slug === slug)
}
