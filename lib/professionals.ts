export type Professional = {
  slug: string
  title: string
  whenYouNeedThem: string
  whatTheyDo: string
  howToFind: string
  /** Optional external, reputable resource */
  resourceLabel?: string
  resourceHref?: string
}

export const professionals: Professional[] = [
  {
    slug: "hud-housing-counselor",
    title: "HUD-Approved Housing Counselor",
    whenYouNeedThem:
      "Almost always. This is the best free first call for any homeowner facing foreclosure.",
    whatTheyDo:
      "HUD-approved counselors are trained, non-profit experts in foreclosure prevention. They review your finances, explain your options, and can help you communicate and negotiate with your servicer — at no cost.",
    howToFind:
      "Call the free HOPE hotline or use HUD's official directory to find a certified counselor near you.",
    resourceLabel: "Find a HUD counselor",
    resourceHref: "https://www.hud.gov/findacounselor",
  },
  {
    slug: "bankruptcy-attorney",
    title: "Bankruptcy Attorney",
    whenYouNeedThem:
      "When a sale date is close and you have steady income, or when you're weighing Chapter 13 to reorganize debt.",
    whatTheyDo:
      "A licensed bankruptcy attorney can advise whether filing is right for you and, if so, file to trigger an automatic stay that halts the sale while you repay arrears over a court-approved plan.",
    howToFind:
      "Look for a licensed Texas attorney who focuses on consumer bankruptcy. Your state bar association's referral service is a reliable starting point.",
    resourceLabel: "State Bar of Texas lawyer referral",
    resourceHref: "https://www.texasbar.com/",
  },
  {
    slug: "real-estate-attorney",
    title: "Real Estate Attorney",
    whenYouNeedThem:
      "When reviewing a creative arrangement like a subject-to, sale-leaseback, or any contract you don't fully understand.",
    whatTheyDo:
      "A real estate attorney reviews contracts, explains the fine print, and protects your interests before you sign — essential for any non-traditional transaction.",
    howToFind:
      "Choose a Texas-licensed attorney experienced in residential real estate transactions. Never rely solely on the other party's paperwork.",
    resourceLabel: "State Bar of Texas lawyer referral",
    resourceHref: "https://www.texasbar.com/",
  },
  {
    slug: "estate-attorney",
    title: "Estate / Probate Attorney",
    whenYouNeedThem:
      "When the home was inherited, is in probate, or ownership passed after a death in the family.",
    whatTheyDo:
      "An estate attorney clarifies who has legal authority to act, guides you through probate, and helps the family make decisions about an inherited property with a mortgage.",
    howToFind:
      "Seek a Texas attorney who handles probate and estate administration, especially if multiple heirs are involved.",
    resourceLabel: "State Bar of Texas lawyer referral",
    resourceHref: "https://www.texasbar.com/",
  },
  {
    slug: "title-company",
    title: "Title Company",
    whenYouNeedThem:
      "Whenever you sell — whether a traditional sale, cash sale, or any transfer of ownership.",
    whatTheyDo:
      "A title company confirms clear ownership, handles the closing, manages the payoff of your mortgage, and ensures funds and documents are handled properly and neutrally.",
    howToFind:
      "Use a reputable, licensed Texas title company. In a cash sale, you can often choose your own for peace of mind.",
  },
  {
    slug: "financial-counselor",
    title: "Nonprofit Financial Counselor",
    whenYouNeedThem:
      "When you want to rebuild a budget, tackle other debts, or plan your finances after the crisis passes.",
    whatTheyDo:
      "Accredited nonprofit financial counselors help you build a realistic budget and a plan to stay stable long after the foreclosure risk is behind you.",
    howToFind:
      "Look for accredited nonprofit credit counseling agencies. Confirm they're a legitimate nonprofit before sharing details.",
    resourceLabel: "Consumer Financial Protection Bureau",
    resourceHref: "https://www.consumerfinance.gov/",
  },
]

export function getProfessional(slug: string) {
  return professionals.find((p) => p.slug === slug)
}
