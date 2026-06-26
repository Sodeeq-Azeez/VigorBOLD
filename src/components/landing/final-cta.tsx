import Link from "next/link"
import { Section } from "../layout/section"
import { Container } from "../layout/container"
import { Button } from "../ui/button"

export function FinalCTA() {
  return (
    <Section variant="dark" className="relative overflow-hidden py-24 md:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold via-brand-dark to-brand-dark" />
      
      <Container className="relative z-10 max-w-3xl text-center">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight text-balance">
          It's More Than Coffee.<br/>
          It's A Commitment.
        </h2>
        
        <p className="text-lg md:text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
          Start your morning with intention. Experience the confidence that comes from prioritizing your daily wellbeing.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/order" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-brand-gold hover:bg-brand-gold-light text-brand-dark text-lg font-semibold px-10 h-14 rounded-md shadow-[0_0_25px_rgba(201,168,76,0.25)]">
              Order VigorBOLD Now
            </Button>
          </Link>
        </div>
        
        <p className="mt-6 text-sm text-neutral-400">
          Payment on Delivery available in Lagos, Abuja & Ilorin
        </p>
      </Container>
    </Section>
  )
}
