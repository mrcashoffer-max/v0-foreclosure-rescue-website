export type GuideSection = {
  heading: string
  body: string[]
  list?: string[]
}

export type Guide = {
  slug: string
  title: string
  excerpt: string
  category: string
  readingTime: string
  sections: GuideSection[]
  relatedGuides: string[]
  relatedOptions: string[]
}

export const guides: Guide[] = [
  {
    slug: "texas-foreclosure-timeline",
    title: "The Texas Foreclosure Timeline: What Happens and When",
    excerpt:
      "Texas is one of the fastest foreclosure states in the country. Understanding each step — and the deadlines that come with it — is the first step to protecting your home.",
    category: "Getting Started",
    readingTime: "6 min read",
    sections: [
      {
        heading: "Texas moves fast — but you have more time than you think",
        body: [
          "Texas is a non-judicial foreclosure state, which means most foreclosures happen without going to court. That makes the process faster than in many other states, but it also means the timeline is predictable. Once you understand the milestones, you can see exactly how much time you have to act.",
          "The single most important thing to know: the earlier you take action, the more options you have. Nearly every path to keeping your home or protecting your equity depends on acting before the foreclosure sale date.",
        ],
      },
      {
        heading: "The 120-day rule",
        body: [
          "Under federal law, your mortgage servicer generally cannot start the formal foreclosure process until you are more than 120 days behind on payments. This window exists specifically to give you time to apply for help — a loan modification, forbearance, or another loss-mitigation option.",
          "Use these 120 days. This is the best time to review your options, gather your documents, and reach out for help before formal notices begin.",
        ],
      },
      {
        heading: "Notice of Default and the right to cure",
        body: [
          "If you fall behind, your servicer must send a Notice of Default and Intent to Accelerate. In Texas, this gives you at least 20 days to 'cure' the default — meaning bring the loan current — before the loan can be accelerated.",
          "This notice is not the end. It is a formal warning, and it starts a clock that you can still stop.",
        ],
      },
      {
        heading: "Notice of Sale and the first Tuesday",
        body: [
          "If the default isn't cured, the servicer can send a Notice of Sale at least 21 days before the auction. In Texas, foreclosure sales happen on the first Tuesday of the month, between 10 a.m. and 4 p.m., at the county courthouse.",
          "That 21-day window before the sale is critical. Many solutions — reinstatement, a cash sale, or filing for Chapter 13 — can still stop the auction right up until the sale, but they take time to arrange. Do not wait until the final days.",
        ],
      },
    ],
    relatedGuides: ["your-rights-in-pre-foreclosure", "how-to-stop-the-sale"],
    relatedOptions: ["reinstatement", "loan-modification", "chapter-13"],
  },
  {
    slug: "your-rights-in-pre-foreclosure",
    title: "Your Rights as a Texas Homeowner in Pre-Foreclosure",
    excerpt:
      "Being behind on your mortgage does not mean you've lost control. You have real, legally protected rights — here's what they are and how to use them.",
    category: "Know Your Rights",
    readingTime: "5 min read",
    sections: [
      {
        heading: "You still own your home",
        body: [
          "Until a foreclosure sale is completed, you remain the legal owner of your home. You have the right to live there, to sell it, and to pursue every available option to keep it. Missing payments does not transfer ownership to the lender.",
        ],
      },
      {
        heading: "The right to accurate information",
        body: [
          "You have the right to request a full accounting of what you owe, including the exact amount needed to reinstate your loan. Your servicer must provide this. Never rely on a rough estimate when planning how to cure the default — get the exact reinstatement figure in writing.",
        ],
      },
      {
        heading: "The right to apply for loss mitigation",
        body: [
          "Federal rules require servicers to review complete applications for loss-mitigation options — like modifications and forbearance — if you apply in time. If you submit a complete application more than 37 days before a scheduled sale, the servicer generally cannot proceed with the sale until they've reviewed it.",
        ],
      },
      {
        heading: "Protection from foreclosure rescue scams",
        body: [
          "Texas law protects homeowners from predatory 'foreclosure rescue' schemes. Be extremely cautious of anyone who asks you to sign over your deed, pay large upfront fees, or make your mortgage payments to them instead of your lender. Legitimate help does not require you to give up ownership or pay large fees in advance.",
        ],
      },
    ],
    relatedGuides: ["texas-foreclosure-timeline", "avoiding-foreclosure-scams"],
    relatedOptions: ["loan-modification", "forbearance", "reinstatement"],
  },
  {
    slug: "how-to-stop-the-sale",
    title: "How to Stop a Foreclosure Sale in Texas",
    excerpt:
      "Even with a sale date on the calendar, you likely still have ways to stop it. Here are the most effective options and how quickly each one works.",
    category: "Taking Action",
    readingTime: "7 min read",
    sections: [
      {
        heading: "Reinstate the loan",
        body: [
          "If you can pay the total past-due amount — including missed payments, fees, and costs — you can reinstate the loan and cancel the sale. Request the exact reinstatement quote from your servicer, as it changes over time as fees accrue.",
        ],
      },
      {
        heading: "Negotiate a workout with your servicer",
        body: [
          "A loan modification, repayment plan, or forbearance agreement can stop the sale by resolving the default in a way you can afford. These take time to process, so start as early as possible before the sale date.",
        ],
      },
      {
        heading: "Sell before the sale date",
        body: [
          "If keeping the home isn't realistic, selling before the auction protects your equity and your credit. A cash sale can close quickly when time is short; a traditional sale can capture more value when you have more time. Either way, paying off the mortgage cancels the foreclosure.",
        ],
      },
      {
        heading: "File Chapter 13 bankruptcy",
        body: [
          "Filing for Chapter 13 triggers an automatic stay that immediately halts the foreclosure, even the day before the sale. It then lets you repay the arrears over a court-approved plan. This is a serious legal step best discussed with an attorney, but it is a powerful last-resort tool.",
        ],
      },
    ],
    relatedGuides: ["texas-foreclosure-timeline", "selling-during-foreclosure"],
    relatedOptions: ["reinstatement", "cash-sale", "chapter-13", "short-sale"],
  },
  {
    slug: "keep-your-home",
    title: "Options to Keep Your Home",
    excerpt:
      "If staying in your home is the goal, there are several proven paths to get current and stay current. Here's how each one works.",
    category: "Keeping Your Home",
    readingTime: "6 min read",
    sections: [
      {
        heading: "Start with your servicer",
        body: [
          "Your mortgage servicer has a dedicated loss-mitigation department whose job is to find alternatives to foreclosure. Contact them early, keep records of every call, and submit any requested documents promptly and completely.",
        ],
      },
      {
        heading: "Match the solution to your situation",
        body: [
          "The right option depends on whether your hardship was temporary or permanent, and whether you can pay a lump sum or need to spread payments out over time.",
        ],
        list: [
          "Temporary hardship, now resolved: reinstatement or a repayment plan",
          "Ongoing lower income: a loan modification to lower the payment",
          "Short-term crisis still in progress: forbearance to pause payments",
          "FHA loan with arrears you can't cover: an FHA partial claim",
        ],
      },
      {
        heading: "Be realistic about affordability",
        body: [
          "Keeping the home only works if the new payment truly fits your budget. If the numbers don't work even after a modification, it may be healthier — financially and emotionally — to sell and protect your equity rather than risk defaulting again.",
        ],
      },
    ],
    relatedGuides: ["selling-during-foreclosure", "texas-foreclosure-timeline"],
    relatedOptions: [
      "reinstatement",
      "loan-modification",
      "forbearance",
      "repayment-plan",
      "partial-claim",
    ],
  },
  {
    slug: "selling-during-foreclosure",
    title: "Selling Your Home During Foreclosure",
    excerpt:
      "Selling isn't giving up — for many families it's the smartest way to protect equity, avoid a foreclosure on their record, and move forward with dignity.",
    category: "Selling",
    readingTime: "6 min read",
    sections: [
      {
        heading: "Why selling can be the best choice",
        body: [
          "If catching up isn't realistic, selling before the auction lets you pay off the mortgage, keep whatever equity remains, and avoid the long-term credit damage of a completed foreclosure. You stay in control of the timeline and the outcome.",
        ],
      },
      {
        heading: "Choosing how to sell",
        body: [
          "The right approach depends on how much time you have before the sale date and how much equity is at stake.",
        ],
        list: [
          "Plenty of time and equity: a traditional market sale for maximum price",
          "Limited time: a cash sale that can close quickly and reliably",
          "Owe more than it's worth: a short sale with lender approval",
          "Want to stay in the home: a sale-leaseback arrangement",
        ],
      },
      {
        heading: "Protect your equity",
        body: [
          "Equity is the money that belongs to you after the mortgage is paid off. A foreclosure auction can wipe it out; a well-timed sale preserves it. Before accepting any offer, understand roughly how much equity you have so you can make an informed decision.",
        ],
      },
    ],
    relatedGuides: ["how-to-stop-the-sale", "keep-your-home"],
    relatedOptions: ["cash-sale", "traditional-sale", "short-sale", "sale-leaseback"],
  },
  {
    slug: "avoiding-foreclosure-scams",
    title: "How to Avoid Foreclosure Rescue Scams",
    excerpt:
      "Homeowners in distress are targets for predators. Learn the warning signs so you can find real help and steer clear of the schemes.",
    category: "Staying Safe",
    readingTime: "4 min read",
    sections: [
      {
        heading: "Red flags to watch for",
        body: [
          "Scammers prey on fear and urgency. Legitimate professionals will never pressure you to act instantly or ask you to hide anything from your lender.",
        ],
        list: [
          "Large upfront fees before any help is provided",
          "Requests to sign over your deed or transfer ownership",
          "Instructions to make mortgage payments to someone other than your servicer",
          "Guarantees to 'save your home' that sound too good to be true",
          "Pressure to sign documents you haven't read or don't understand",
        ],
      },
      {
        heading: "Where to find trustworthy help",
        body: [
          "HUD-approved housing counselors provide free, unbiased guidance. You can also work with reputable local specialists who are transparent about their process and never ask you to give up ownership or pay large upfront fees.",
        ],
      },
      {
        heading: "When in doubt, slow down",
        body: [
          "A real solution can withstand a few questions and a night to think it over. If someone won't let you review the paperwork or consult a trusted advisor, walk away.",
        ],
      },
    ],
    relatedGuides: ["your-rights-in-pre-foreclosure", "how-to-stop-the-sale"],
    relatedOptions: ["loan-modification", "cash-sale"],
  },
  {
    slug: "understanding-subject-to",
    title: "Understanding 'Subject-To': Letting a Buyer Take Over Your Mortgage",
    excerpt:
      "A subject-to arrangement can stop the bleeding quickly when you have little equity — but it stays in your name, so it's essential to understand the trade-offs first.",
    category: "Your Options",
    readingTime: "6 min read",
    sections: [
      {
        heading: "What 'subject-to' actually means",
        body: [
          "In a subject-to transaction, a buyer takes over responsibility for your existing mortgage payments while the loan itself stays in your name. You transfer the property, and the buyer agrees to keep making the payments on the loan you originally signed for.",
          "It's a way to hand off a home you can no longer afford — often quickly and without the costs of a traditional sale — while stopping the missed payments that are driving the foreclosure.",
        ],
      },
      {
        heading: "When it can make sense",
        body: [
          "Subject-to is most useful when you have little or no equity, need to move on fast, and simply want the payments made and the default stopped. Because there's no new loan to originate, it can close much faster than a conventional sale.",
        ],
        list: [
          "You're behind and a sale date is approaching",
          "You have little equity, so a traditional sale wouldn't net much",
          "You need to relocate and can't keep up the payments",
          "You want to avoid a completed foreclosure on your record",
        ],
      },
      {
        heading: "The risks you must understand",
        body: [
          "Because the loan stays in your name, your credit is still tied to it. If the buyer stops paying, the default falls back on you. There is also a 'due-on-sale' clause in most mortgages that technically lets the lender call the loan if the property transfers.",
          "This is not a reason to rule it out — many families use subject-to successfully — but it is a reason to insist on a written agreement, a trustworthy buyer, and a review by a real estate attorney before you sign anything.",
        ],
      },
      {
        heading: "How to protect yourself",
        body: [
          "Never enter a subject-to arrangement on a handshake. Have a real estate attorney review the contract, confirm how and where payments will be made, and ask for proof that payments are current on an ongoing basis.",
          "If someone pressures you to sign quickly, won't put terms in writing, or asks for money upfront, treat it as a warning sign and walk away.",
        ],
      },
    ],
    relatedGuides: ["selling-during-foreclosure", "avoiding-foreclosure-scams"],
    relatedOptions: ["subject-to", "cash-sale", "short-sale"],
  },
]

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug)
}
