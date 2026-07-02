import { Hero } from "@/components/hero"
import { Timeline } from "@/components/timeline"
import { Options } from "@/components/options"
import { FreeHelp } from "@/components/free-help"
import { Advisor } from "@/components/advisor"
import { Faq } from "@/components/faq"
import { FinalCta } from "@/components/final-cta"

export default function Page() {
  return (
    <>
      <Hero />
      <Timeline />
      <Options />
      <FreeHelp />
      <Advisor />
      <Faq />
      <FinalCta />
    </>
  )
}
