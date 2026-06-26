import { Section } from "../layout/section"
import { Container } from "../layout/container"
import { ShieldCheck } from "lucide-react"

export function ConfidenceSection() {
  const benefits = [
    "When you wake up ready for the day.",
    "When you have the energy to focus on your work.",
    "When you're fully present with your family.",
    "When you carry yourself with quiet assurance.",
    "When you feel engaged, capable, and connected."
  ]

  return (
    <Section variant="alternate">
      <Container className="max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-brand-dark mb-6 text-balance leading-tight">
              Because Confidence Doesn&apos;t Begin in the Bedroom.
            </h2>
            <p className="text-xl md:text-2xl text-brand-gold-dark font-serif italic border-l-4 border-brand-gold pl-6 py-2 mb-8">
              It Begins With How You Feel Every Day.
            </p>
            <p className="text-lg text-neutral-600 mb-8">
              Confidence is built long before life&apos;s most important moments.
            </p>
            
            <ul className="space-y-4">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ShieldCheck className="h-6 w-6 text-brand-gold shrink-0 mt-0.5" />
                  <span className="text-lg text-neutral-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-neutral-100">
            <p className="text-lg text-neutral-700 mb-6">
              Many men discover that taking better care of themselves influences every part of life:
            </p>
            <ul className="space-y-4 font-serif text-xl font-semibold text-brand-dark mb-8">
              <li className="flex items-center gap-3">
                <div className="w-12 h-px bg-brand-gold/50" /> Their outlook.
              </li>
              <li className="flex items-center gap-3">
                <div className="w-12 h-px bg-brand-gold/50" /> Their consistency.
              </li>
              <li className="flex items-center gap-3">
                <div className="w-12 h-px bg-brand-gold/50" /> Their relationships.
              </li>
              <li className="flex items-center gap-3">
                <div className="w-12 h-px bg-brand-gold/50" /> Their sense of purpose.
              </li>
            </ul>
            <p className="text-lg text-neutral-600 italic">
              VigorBOLD was created to become part of that journey.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
