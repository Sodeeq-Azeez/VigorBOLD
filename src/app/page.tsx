import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { StickyBar } from "@/components/layout/sticky-cta"
import { InlineCTA } from "@/components/shared/inline-cta"
import { Hero } from "@/components/landing/hero"
import { ProblemSection } from "@/components/landing/problem-section"
import { ProductReveal } from "@/components/landing/product-reveal"
import { ConfidenceSection } from "@/components/landing/confidence-section"
import { DailyRitual } from "@/components/landing/daily-ritual"
import { IngredientsSection } from "@/components/landing/ingredients-section"
import { SmallHabits } from "@/components/landing/small-habits"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { HowItWorks } from "@/components/landing/how-it-works"
import { PricingSection } from "@/components/landing/pricing-section"
import { DeliveryInfo } from "@/components/landing/delivery-info"
import { FAQSection } from "@/components/landing/faq-section"
import { FinalCTA } from "@/components/landing/final-cta"

export default function Home() {
  return (
    <>
      <Header />
      <StickyBar />
      
      <main className="flex-1">
        <Hero />
        <ProblemSection />
        <div className="bg-neutral-50"><InlineCTA text="I'm Ready to Reclaim My Prime" /></div>
        <ProductReveal />
        <ConfidenceSection />
        <div className="bg-neutral-50"><InlineCTA text="Get VigorBOLD Today" /></div>
        <DailyRitual />
        <IngredientsSection />
        <div className="bg-neutral-50"><InlineCTA text="Order My Supply Now" /></div>
        <SmallHabits />
        <TestimonialsSection />
        <div className="bg-neutral-50"><InlineCTA text="Join These Men Today" /></div>
        <HowItWorks />
        <PricingSection />
        <DeliveryInfo />
        <FAQSection />
        <FinalCTA />
      </main>

      <Footer />
    </>
  )
}
