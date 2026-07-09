import { Hero } from "@/components/hero"
import { DidYouGetALetter } from "@/components/did-you-get-a-letter"
import { Reassurance } from "@/components/reassurance"
import { HowItWorks } from "@/components/how-it-works"
import { OptionsPreview } from "@/components/options-preview"
import { GuidesPreview } from "@/components/guides-preview"
import { StoriesPreview } from "@/components/stories-preview"
import { FreeHelp } from "@/components/free-help"
import { Advisor } from "@/components/advisor"
import { FinalCta } from "@/components/final-cta"

export default function Page() {
  return (
    <>
      <Hero />
      <DidYouGetALetter />
      <Reassurance />
      <HowItWorks />
      <OptionsPreview />
      <StoriesPreview />
      <GuidesPreview />
      <FreeHelp />
      <Advisor />
      <FinalCta />
    </>
  )
}
