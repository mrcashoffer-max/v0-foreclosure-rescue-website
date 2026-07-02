import type { Metadata } from "next"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "@/lib/faqs"
import { CtaBanner } from "@/components/cta-banner"

export const metadata: Metadata = {
  title: "Foreclosure FAQ for Texas Homeowners",
  description:
    "Straight answers to the most common questions Texas homeowners ask about foreclosure — timelines, stopping a sale, protecting equity, and getting free help.",
}

export default function FaqPage() {
  return (
    <>
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20">
          <p className="text-sm font-medium text-primary">Questions &amp; answers</p>
          <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            You have questions. Here are honest answers.
          </h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            If you don&apos;t see your question here, reach out any time. Every conversation is free
            and confidential.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-pretty leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <CtaBanner />
    </>
  )
}
