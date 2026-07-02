import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    q: "Is it too late if I've already received a notice from my lender?",
    a: "Usually not. Federal rules generally prevent foreclosure from starting until you're more than 120 days delinquent, and even after that, options like loan modifications, short sales, and subject-to transactions can stop the process. The key is to act quickly.",
  },
  {
    q: "Will talking to a specialist cost me anything?",
    a: "No. Your initial consultation is completely free and confidential. Our first priority is helping you understand your options, even if the best path is working directly with your bank or a free HUD counselor.",
  },
  {
    q: "Can I keep my home, or do I have to sell?",
    a: "Many homeowners keep their homes through loan modifications, forbearance, reinstatement, FHA partial claims, or Chapter 13 bankruptcy. Selling is only one path, and even then there are creative options that let you stay in the home or walk away with cash.",
  },
  {
    q: "How fast can a sale close if I need to move quickly?",
    a: "A subject-to transaction can close in as little as 7-10 days, immediately stopping the foreclosure. Short sales take longer because they involve lender negotiation, but they protect your credit far more than a foreclosure would.",
  },
  {
    q: "Will this hurt my credit?",
    a: "A foreclosure can severely damage your credit for years. Almost every alternative on this page, from loan modification to a short sale, protects your credit far better than letting the foreclosure proceed.",
  },
  {
    q: "Is my information kept private?",
    a: "Yes. Everything you share is confidential. We never sell your information, and there's no obligation when you request a consultation.",
  },
]

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-16">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mb-10 text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Common questions
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Straight answers to what homeowners ask us most.
          </p>
        </div>
        <Accordion className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-pretty leading-relaxed text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
