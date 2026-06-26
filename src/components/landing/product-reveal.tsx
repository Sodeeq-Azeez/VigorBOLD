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
            <div className="relative h-full w-full bg-neutral-100 rounded-2xl flex items-center justify-center border border-neutral-200 overflow-hidden shadow-xl">
              <span className="text-neutral-400 font-serif text-lg">[Product Packaging Render]</span>
              {/* <Image src="/images/product/product-render.png" alt="VigorBOLD Herbal Coffee" fill className="object-contain p-8" /> */}
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex flex-col items-start text-left">
            <SectionHeading 
              overline="Introducing VigorBOLD"
              title="More Than a Cup of Coffee. A Daily Commitment to Your Wellbeing."
              align="left"
              className="mb-8"
            />
            
            <div className="space-y-6 text-neutral-600 text-lg">
              <p>
                VigorBOLD is a premium herbal coffee crafted for men who want to make their daily routine work harder for them.
              </p>
              <p>
                Every sachet combines premium Arabian coffee with carefully selected botanical ingredients traditionally associated with men&apos;s vitality and overall wellness, including <strong>Tongkat Ali, Maca Root, Cordyceps, and Reishi Mushroom.</strong>
              </p>
              <p>
                Instead of adding another complicated supplement routine to your day, VigorBOLD fits naturally into something you already enjoy.
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
