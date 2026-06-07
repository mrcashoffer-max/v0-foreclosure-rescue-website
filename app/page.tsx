import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Timeline } from "@/components/timeline"
import { Options } from "@/components/options"
import { FreeHelp } from "@/components/free-help"
import { Advisor } from "@/components/advisor"
import { Faq } from "@/components/faq"
import { FinalCta } from "@/components/final-cta"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Timeline />
        <Options />
        <FreeHelp />
        <Advisor />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  )
}
