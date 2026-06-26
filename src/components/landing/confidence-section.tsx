import { Section } from "../layout/section"
import { Container } from "../layout/container"
import { ShieldCheck } from "lucide-react"

export function ConfidenceSection() {
  const benefits = [
    "You wake up ready to conquer the day, instead of dragging yourself out of bed.",
    "You attack your work with laser focus, instead of coasting on fumes.",
    "You step into the bedroom with absolute certainty, knowing you have the stamina to back it up.",
    "You carry yourself with the quiet, magnetic assurance of a man in his prime."
  ]

  return (
    <Section variant="alternate">
      <Container className="max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-brand-dark mb-6 text-balance leading-tight">
              True Confidence Isn&apos;t Faked. It&apos;s Fueled.
            </h2>
            <p className="text-xl md:text-2xl text-brand-gold-dark font-serif italic border-l-4 border-brand-gold pl-6 py-2 mb-8">
              When your body is fully charged, you dominate every area of your life.
            </p>
            <p className="text-lg text-neutral-600 mb-8">
              You can&apos;t fake raw energy. You can&apos;t pretend to have stamina when your tank is empty. But when you finally restore your natural vitality, the effects bleed into everything you do.
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
              When you fix the foundation, the rest automatically follows:
            </p>
            <ul className="space-y-4 font-serif text-xl font-semibold text-brand-dark mb-8">
              <li className="flex items-center gap-3">
                <div className="w-12 h-px bg-brand-gold/50" /> Unbreakable Focus.
              </li>
              <li className="flex items-center gap-3">
                <div className="w-12 h-px bg-brand-gold/50" /> Relentless Energy.
              </li>
              <li className="flex items-center gap-3">
                <div className="w-12 h-px bg-brand-gold/50" /> Intimate Dominance.
              </li>
              <li className="flex items-center gap-3">
                <div className="w-12 h-px bg-brand-gold/50" /> Magnetic Confidence.
              </li>
            </ul>
            <p className="text-lg text-neutral-600 italic">
              VigorBOLD is the biological foundation you&apos;ve been missing.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
