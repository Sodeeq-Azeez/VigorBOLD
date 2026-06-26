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
            But because they&apos;re personal.
          </p>
          <p>
            You don&apos;t usually tell your friends that you&apos;ve been feeling more tired than you used to.
            You don&apos;t casually bring up that your confidence isn&apos;t quite the same.
            You don&apos;t admit that, after a long day, you sometimes feel like you&apos;ve got nothing left to give.
          </p>
          <p>
            Not at work.<br/>
            Not at home.<br/>
            Not even in the quiet moments that should bring you closer to the person you love.
          </p>
          <p>
            Life has a way of demanding more from us every year.
            More responsibilities. More pressure. More expectations.
          </p>
          <p>
            And somewhere along the journey, many men begin to feel like they&apos;re operating with less energy, less drive, and less confidence than they once had.
          </p>
          <p>
            It&apos;s subtle at first. Then one day you find yourself remembering what it felt like to wake up refreshed. To tackle the day with enthusiasm. To enjoy moments of closeness without overthinking them. 
          </p>
          <p className="font-semibold text-brand-dark text-xl md:text-2xl pt-4 border-b-2 border-brand-gold/30 pb-2 inline-block">
            To simply feel like yourself.
          </p>
          <p className="pt-4">
            Growing older is inevitable. Feeling disconnected from the man you know yourself to be doesn&apos;t have to be.
          </p>
        </div>
      </Container>
    </Section>
  )
}
