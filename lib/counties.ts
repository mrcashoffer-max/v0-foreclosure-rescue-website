export type County = {
  slug: string
  name: string
  courthouseCity: string
  region: string
  blurb: string
}

export const counties: County[] = [
  {
    slug: "dallas",
    name: "Dallas County",
    courthouseCity: "Dallas",
    region: "Dallas–Fort Worth",
    blurb:
      "Foreclosure sales in Dallas County are held on the first Tuesday of each month at the George Allen Courts Building. If you own a home in Dallas, Irving, Garland, Mesquite, or the surrounding area, you still have time to act before the sale.",
  },
  {
    slug: "tarrant",
    name: "Tarrant County",
    courthouseCity: "Fort Worth",
    region: "Dallas–Fort Worth",
    blurb:
      "Tarrant County auctions take place at the Tom Vandergriff Civil Courts Building in Fort Worth. Homeowners in Fort Worth, Arlington, Grapevine, and nearby cities have several options to stop a sale or sell before the auction date.",
  },
  {
    slug: "collin",
    name: "Collin County",
    courthouseCity: "McKinney",
    region: "Dallas–Fort Worth",
    blurb:
      "Collin County foreclosure sales are held at the county courthouse in McKinney. If you're behind on your mortgage in Plano, Frisco, Allen, or McKinney, a specialist can help you understand your options quickly.",
  },
  {
    slug: "denton",
    name: "Denton County",
    courthouseCity: "Denton",
    region: "Dallas–Fort Worth",
    blurb:
      "Denton County sales occur on the first Tuesday of the month at the county courthouse. Homeowners in Denton, Lewisville, Flower Mound, and Little Elm have time-sensitive options to protect their home and equity.",
  },
  {
    slug: "rockwall",
    name: "Rockwall County",
    courthouseCity: "Rockwall",
    region: "Dallas–Fort Worth",
    blurb:
      "Rockwall County foreclosure sales are held on the first Tuesday of each month at the county courthouse in Rockwall. If you're behind on your mortgage in Rockwall, Rowlett, Heath, Fate, or Royse City, acting early gives you the widest range of options.",
  },
  {
    slug: "kaufman",
    name: "Kaufman County",
    courthouseCity: "Kaufman",
    region: "Dallas–Fort Worth",
    blurb:
      "Kaufman County auctions take place on the first Tuesday of the month at the county courthouse in Kaufman. Homeowners in Forney, Terrell, Crandall, and Kaufman still have time to stop a sale or sell before the auction date.",
  },
  {
    slug: "ellis",
    name: "Ellis County",
    courthouseCity: "Waxahachie",
    region: "Dallas–Fort Worth",
    blurb:
      "Ellis County foreclosure sales are held at the county courthouse in Waxahachie on the first Tuesday of each month. If you own a home in Waxahachie, Midlothian, Ennis, or Red Oak, a specialist can help you understand your options before time runs out.",
  },
  {
    slug: "harris",
    name: "Harris County",
    courthouseCity: "Houston",
    region: "Greater Houston",
    blurb:
      "Harris County is the largest county in Texas, with foreclosure sales held in downtown Houston. Whether you're in Houston, Pasadena, or the surrounding suburbs, early action opens up the most options.",
  },
  {
    slug: "travis",
    name: "Travis County",
    courthouseCity: "Austin",
    region: "Central Texas",
    blurb:
      "Travis County foreclosure auctions are held at the county courthouse in Austin. Homeowners in Austin, Pflugerville, and the surrounding area can explore ways to keep their home or sell before the sale date.",
  },
]

export function getCounty(slug: string) {
  return counties.find((c) => c.slug === slug)
}
