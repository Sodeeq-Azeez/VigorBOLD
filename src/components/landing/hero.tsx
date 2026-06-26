import Link from "next/link"
import { Container } from "../layout/container"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center bg-brand-dark overflow-hidden">
      {/* Background Image / Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay"
        style={{ backgroundImage: "url('/images/hero/hero-lifestyle.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/50 via-brand-dark/80 to-brand-dark" />
      
      <Container className="relative z-10 py-20 mt-16 text-center flex flex-col items-center">
        <h2 className="text-brand-gold font-semibold tracking-widest uppercase text-sm md:text-base mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          Because the man you&apos;ve become...
        </h2>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white max-w-4xl tracking-tight leading-[1.1] mb-8 text-balance animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150">
          Deserves to feel like the man you know you are.
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mb-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
          A premium herbal coffee crafted for men who want to make their daily routine work harder for them.
        </p>
        
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500">
          <Link href="/order">
            <Button size="lg" className="bg-brand-gold hover:bg-brand-gold-light text-brand-dark text-lg font-semibold px-8 h-14 rounded-md shadow-[0_0_20px_rgba(201,168,76,0.3)]">
              Order VigorBOLD Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="mt-4 text-sm text-neutral-400">Payment on Delivery available in Lagos, Abuja & Ilorin</p>
        </div>
      </Container>
    </div>
  )
}
