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
          title="Small Habits. Meaningful Changes."
          align="center"
          className="mb-12"
        />
        
        <div className="text-center space-y-8 text-lg md:text-xl text-neutral-300 font-serif leading-relaxed max-w-2xl mx-auto">
          <p>
            No one cup changes a life.
            <br />
            No single morning transforms a person.
          </p>
          
          <p>
            But consistent habits often shape how we feel over time.
          </p>
          
          <p className="text-white text-xl md:text-2xl font-semibold">
            Choosing to care for your wellbeing every day is an investment in yourself.
          </p>
          
          <div className="pt-4 space-y-3 font-sans text-brand-gold-light text-lg md:text-xl font-medium tracking-wide">
            <p>In your energy.</p>
            <p>In your confidence.</p>
            <p>In your ability to show up fully for the people and responsibilities that matter most.</p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
