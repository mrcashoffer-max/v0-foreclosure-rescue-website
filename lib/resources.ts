export type ResourceSection = {
  heading: string
  items: string[]
}

export type Resource = {
  slug: string
  title: string
  type: "Checklist" | "Guide" | "Worksheet"
  description: string
  intro: string
  sections: ResourceSection[]
  relatedGuides: string[]
}

export const resources: Resource[] = [
  {
    slug: "first-week-checklist",
    title: "Your First Week Checklist",
    type: "Checklist",
    description:
      "Behind on payments and not sure where to start? These are the calm, concrete steps to take in your first seven days.",
    intro:
      "Fear thrives on inaction. Working through this list in your first week replaces panic with a plan and preserves the most options.",
    sections: [
      {
        heading: "Get organized",
        items: [
          "Gather your mortgage statements and any letters from your servicer",
          "Write down your loan number and your servicer's phone number",
          "Note any dates or deadlines mentioned in letters you've received",
          "Confirm whether your loan is FHA, VA, USDA, or conventional",
        ],
      },
      {
        heading: "Understand where you stand",
        items: [
          "Request an exact reinstatement quote (the amount to bring the loan current)",
          "Ask your servicer for the total payoff amount",
          "Estimate your home's current value to gauge your equity",
          "Confirm whether a Notice of Default or Notice of Sale has been issued",
        ],
      },
      {
        heading: "Reach out for help",
        items: [
          "Call a HUD-approved housing counselor (free) at 1-888-995-HOPE",
          "Contact your servicer's loss-mitigation department",
          "Take the free options finder to see which paths may fit",
          "Avoid anyone asking for large upfront fees or your deed",
        ],
      },
    ],
    relatedGuides: ["texas-foreclosure-timeline", "your-rights-in-pre-foreclosure"],
  },
  {
    slug: "questions-to-ask-your-lender",
    title: "Questions to Ask Your Lender",
    type: "Checklist",
    description:
      "Make every call with your servicer count. Print this list and take notes as you go.",
    intro:
      "Servicers won't always volunteer every option. These questions help you get clear, written answers so you can compare paths with confidence.",
    sections: [
      {
        heading: "About your account",
        items: [
          "What is the exact amount to reinstate my loan, and through what date?",
          "What is my total payoff amount?",
          "What fees and legal costs have been added, and for what?",
          "Has a foreclosure sale date been scheduled? If so, when?",
        ],
      },
      {
        heading: "About your options",
        items: [
          "What loss-mitigation options do I qualify for?",
          "Am I eligible for a loan modification, repayment plan, or forbearance?",
          "If my loan is FHA, do I qualify for a partial claim?",
          "What documents do you need, and what is the deadline to submit them?",
        ],
      },
      {
        heading: "Protect yourself",
        items: [
          "Can you send me everything in writing?",
          "Who is my single point of contact, and how do I reach them?",
          "If I submit a complete application, will the sale be paused during review?",
          "What happens if I miss a step — what are my next options?",
        ],
      },
    ],
    relatedGuides: ["keep-your-home", "how-to-stop-the-sale"],
  },
  {
    slug: "questions-to-ask-an-attorney",
    title: "Questions to Ask an Attorney",
    type: "Checklist",
    description:
      "Considering legal options like bankruptcy? Come to your consultation prepared.",
    intro:
      "A short consultation goes further when you arrive with the right questions. Use this list when meeting a bankruptcy or real estate attorney.",
    sections: [
      {
        heading: "Your situation",
        items: [
          "Based on my situation, what are my realistic legal options?",
          "Would Chapter 13 bankruptcy stop my sale, and is it right for me?",
          "How would each option affect my credit and my long-term finances?",
          "Are there deadlines I need to act on immediately?",
        ],
      },
      {
        heading: "Working together",
        items: [
          "What are your fees, and what exactly do they cover?",
          "Who will handle my case day to day?",
          "How quickly can you act if my sale date is close?",
          "What will you need from me, and by when?",
        ],
      },
    ],
    relatedGuides: ["how-to-stop-the-sale", "your-rights-in-pre-foreclosure"],
  },
  {
    slug: "document-checklist",
    title: "Loss-Mitigation Document Checklist",
    type: "Checklist",
    description:
      "A complete application is approved faster. Gather these before you apply for a modification or workout.",
    intro:
      "Missing documents are the number-one reason applications stall. Collect these items up front so your package is complete the first time.",
    sections: [
      {
        heading: "Income & employment",
        items: [
          "Two most recent pay stubs (or profit-and-loss statement if self-employed)",
          "Two years of W-2s or tax returns",
          "Documentation of any other income (Social Security, disability, support)",
        ],
      },
      {
        heading: "Financial picture",
        items: [
          "Two most recent bank statements (all pages)",
          "A monthly household budget of income and expenses",
          "A list of your debts and minimum payments",
        ],
      },
      {
        heading: "Hardship & property",
        items: [
          "A hardship letter explaining what happened and your plan going forward",
          "Documentation of the hardship (layoff notice, medical bills, etc.)",
          "Your most recent mortgage statement",
          "Proof of homeowners insurance and property tax status",
        ],
      },
    ],
    relatedGuides: ["keep-your-home", "your-rights-in-pre-foreclosure"],
  },
  {
    slug: "before-the-auction-checklist",
    title: "Before the Auction Checklist",
    type: "Checklist",
    description:
      "A sale date is on the calendar. Here's how to keep every remaining option open.",
    intro:
      "Even with a sale date scheduled, you likely still have moves to make. Work top to bottom — several of these can stop a sale right up until the day.",
    sections: [
      {
        heading: "Confirm the facts",
        items: [
          "Verify the exact date, time, and location of the sale",
          "Get a written reinstatement quote good through the sale date",
          "Get your current payoff amount",
          "Estimate your equity so you know what's at stake",
        ],
      },
      {
        heading: "Act on your options",
        items: [
          "Ask your servicer whether a complete application would pause the sale",
          "If you have equity and little time, evaluate a cash sale that can close first",
          "Speak with a bankruptcy attorney about whether Chapter 13 fits",
          "Keep copies of every document and note every call with dates and names",
        ],
      },
    ],
    relatedGuides: ["how-to-stop-the-sale", "selling-during-foreclosure"],
  },
]

export function getResource(slug: string) {
  return resources.find((r) => r.slug === slug)
}
