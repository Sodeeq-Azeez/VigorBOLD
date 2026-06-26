import { Section } from "../layout/section"
import { Container } from "../layout/container"
import { SectionHeading } from "../shared/section-heading"

export function ProblemSection() {
  return (
    <Section variant="alternate">
      <Container className="max-w-3xl">
        <SectionHeading 
          title="There Are Some Things Men Rarely Talk About."
          align="left"
        />
        
        <div className="space-y-6 text-lg md:text-xl text-neutral-700 leading-relaxed font-serif">
          <p>
            Not because they aren&apos;t important.
          </p>
          <p>
            But because they&apos;re deeply personal.
          </p>
          <p>
            You don&apos;t casually bring up the silent frustration of wanting to be fully present, but feeling like your body won&apos;t cooperate.
          </p>
          <p>
            You don&apos;t admit that the spark—the natural, undeniable drive you used to take for granted—sometimes feels like a distant memory.
          </p>
          <p>
            Especially in those quiet, intimate moments that are supposed to bring you closest to the person you love. Instead of passion, there is pressure. Instead of deep connection, there is unspoken disappointment.
          </p>
          <p>
            It can make you feel distant. Less confident. Less like the man you know you truly are.
          </p>
          <p>
            It happens subtly. The weight of daily life, the endless responsibilities, and the passing years slowly drain your stamina and dull your edge.
          </p>
          <p>
            But deep down, you still remember what it felt like to be unstoppable. To have energy to spare. To share moments of intense closeness with absolute certainty, vitality, and strength.
          </p>
          <p className="font-semibold text-brand-dark text-xl md:text-2xl pt-4 border-b-2 border-brand-gold/30 pb-2 inline-block">
            To simply feel like yourself again.
          </p>
          <p className="pt-4">
            Growing older is a fact of life. Losing your edge and your intimate connection doesn&apos;t have to be.
          </p>
        </div>
      </Container>
    </Section>
  )
}
