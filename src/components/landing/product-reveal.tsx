import Image from "next/image"
import { Section } from "../layout/section"
import { Container } from "../layout/container"
import { SectionHeading } from "../shared/section-heading"

export function ProductReveal() {
  return (
    <Section variant="default" id="product">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative aspect-square max-w-md mx-auto w-full lg:max-w-none">
            {/* Using a placeholder since image is coming later */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/20 to-transparent rounded-2xl -z-10 blur-3xl transform -rotate-6" />
            <div className="relative aspect-square w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-brand-gold/10 rounded-full blur-3xl opacity-50 animate-pulse" />
              <Image src="/images/product/vigorbold-2.jpg" alt="VigorBOLD Herbal Coffee" fill className="object-contain p-8 rounded-3xl" />
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex flex-col items-start text-left">
            <SectionHeading 
              overline="Introducing VigorBOLD"
              title="Not Just Another Cup of Coffee. A Daily Ritual to Reclaim Your Prime."
              align="left"
              className="mb-8"
            />
            
            <div className="space-y-6 text-neutral-600 text-lg">
              <p>
                VigorBOLD isn&apos;t just about waking up—it&apos;s about stepping into your day with the raw energy and absolute confidence of your youth.
              </p>
              <p>
                We&apos;ve combined rich, premium Arabian coffee with a potent blend of ancient botanical ingredients renowned for their ability to ignite male vitality: <strong>Tongkat Ali, Maca Root, Cordyceps, and Reishi Mushroom.</strong>
              </p>
              <p>
                No handfuls of pills. No complicated supplement routines. Just one delicious cup every morning that quietly works to restore your natural drive, endurance, and strength from the inside out.
              </p>
              
              <ul className="pt-4 space-y-3 font-serif text-xl font-semibold text-brand-dark">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-gold" />
                  Your morning coffee.
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-gold" />
                  Simple.
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-gold" />
                  Familiar.
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-gold" />
                  Intentional.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
