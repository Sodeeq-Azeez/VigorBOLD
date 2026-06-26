import { Section } from "../layout/section"
import { Container } from "../layout/container"
import { SectionHeading } from "../shared/section-heading"
import { Droplet, Coffee, HeartHandshake, GlassWater } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Droplet,
      title: "1. Start with water",
      description: "Start your morning with a glass of water."
    },
    {
      icon: Coffee,
      title: "2. Prepare",
      description: "Prepare one sachet of VigorBOLD with hot water, just as you would prepare your regular coffee."
    },
    {
      icon: HeartHandshake,
      title: "3. Enjoy",
      description: "Enjoy slowly."
    },
    {
      icon: GlassWater,
      title: "4. Hydrate",
      description: "Stay hydrated throughout the day."
    }
  ]

  return (
    <Section variant="alternate" id="how-it-works">
      <Container>
        <SectionHeading 
          title="Adding VigorBOLD to Your Routine Is Simple"
          subtitle="One enjoyable cup. One consistent habit."
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 max-w-5xl mx-auto">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flex flex-col items-center text-center relative group">
                {/* Connecting line for desktop */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-full h-[2px] bg-neutral-200">
                    <div className="h-full bg-brand-gold w-0 group-hover:w-full transition-all duration-1000 ease-out" />
                  </div>
                )}
                
                <div className="w-20 h-20 rounded-full bg-white border border-brand-gold/20 flex items-center justify-center mb-6 relative z-10 shadow-sm group-hover:scale-110 transition-transform duration-300 group-hover:border-brand-gold">
                  <Icon className="h-8 w-8 text-brand-gold" />
                </div>
                
                <h4 className="text-xl font-serif font-semibold text-brand-dark mb-3">
                  {step.title}
                </h4>
                <p className="text-neutral-600">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
