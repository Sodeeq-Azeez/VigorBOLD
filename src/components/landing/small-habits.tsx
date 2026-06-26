import { Section } from "../layout/section"
import { Container } from "../layout/container"
import { SectionHeading } from "../shared/section-heading"

export function SmallHabits() {
  return (
    <Section variant="dark" className="relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <Container className="max-w-4xl relative z-10">
        <SectionHeading 
          title="Reclaiming Your Edge Starts With One Simple Habit."
          align="center"
          className="mb-12"
        />
        
        <div className="text-center space-y-8 text-lg md:text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto">
          <p>
            Let&apos;s be real. No single cup of coffee is going to magically erase years of stress, fatigue, and declining stamina overnight.
          </p>
          
          <p>
            But men who perform at their peak don&apos;t rely on magic. They rely on consistency.
          </p>
          
          <p className="text-white text-xl md:text-2xl font-semibold">
            When you make VigorBOLD part of your daily routine, you&apos;re not just having a morning brew. You&apos;re actively fueling your body with exactly what it needs to rebuild its natural reserves.
          </p>
          
          <div className="pt-4 space-y-3 font-sans text-brand-gold-light text-lg md:text-xl font-medium tracking-wide">
            <p>Day by day, the heavy fog lifts.</p>
            <p>Week by week, your stamina and energy return.</p>
            <p>And before long, you&apos;re stepping into those intimate moments with the undeniable fire and confidence you thought you had lost.</p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
