import { Section } from "../layout/section"
import { Container } from "../layout/container"
import { SectionHeading } from "../shared/section-heading"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "How long does it take to see results?",
      answer: "While some men report feeling a difference in energy within the first few days, VigorBOLD is designed for cumulative benefits. We recommend a consistent daily routine for at least 2–4 weeks to experience the full potential of the herbal blend."
    },
    {
      question: "How should I drink VigorBOLD?",
      answer: "Simply dissolve one sachet in a cup of hot water. It can be enjoyed on its own or with your preferred milk. We recommend one sachet per day, ideally in the morning or early afternoon to avoid interfering with sleep."
    },
    {
      question: "Are there any side effects?",
      answer: "VigorBOLD is crafted from traditional, well-regarded botanicals and premium coffee. However, because it contains caffeine, those sensitive to caffeine should consume it earlier in the day. If you have specific health conditions or are on medication, we recommend consulting your healthcare provider."
    },
    {
      question: "Is it approved by NAFDAC?",
      answer: "Yes, VigorBOLD is proudly NAFDAC approved, ensuring our formulation meets strict safety and quality standards."
    },
    {
      question: "How does the Payment on Delivery work?",
      answer: "If you are located in Lagos, Abuja, or Ilorin, you can select 'Payment on Delivery' at checkout. Our dispatch rider will bring your order to your provided address, and you can pay via transfer or cash upon receiving your package."
    }
  ]

  return (
    <Section variant="default" id="faq">
      <Container className="max-w-3xl">
        <SectionHeading 
          title="Frequently Asked Questions"
        />
        
        <div className="mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-serif text-lg md:text-xl font-semibold text-brand-dark hover:text-brand-gold hover:no-underline transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-neutral-600 text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </Section>
  )
}
