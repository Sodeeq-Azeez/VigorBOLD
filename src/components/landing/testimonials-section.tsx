import Image from "next/image"
import { Section } from "../layout/section"
import { Container } from "../layout/container"
import { SectionHeading } from "../shared/section-heading"
import { Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Makes me feel like a 25-year-old again.",
      imagePlaceholder: "[WhatsApp Screenshot 1]"
    },
    {
      quote: "For over twenty years, I've not been able to act like a man. But with VigorBOLD, I'm like a 25-year-old man.",
      imagePlaceholder: "[WhatsApp Screenshot 2]"
    },
    {
      quote: "Energy, strength and long-lasting vitality.",
      imagePlaceholder: "[WhatsApp Screenshot 3]"
    },
    {
      quote: "It rejuvenated me. I feel stronger and more energetic than before.",
      imagePlaceholder: "[WhatsApp Screenshot 4]"
    }
  ]

  return (
    <Section variant="default" id="testimonials">
      <Container>
        <SectionHeading 
          title="What Customers Are Saying"
          subtitle="Real messages from men who made VigorBOLD part of their daily routine."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="flex flex-col bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
              <div className="flex-1">
                <Quote className="h-8 w-8 text-brand-gold/30 mb-4" />
                <p className="text-lg md:text-xl text-brand-dark font-serif font-medium leading-relaxed italic mb-6">
                  &quot;{testimonial.quote}&quot;
                </p>
              </div>
              
              <div className="mt-4 pt-6 border-t border-neutral-100">
                <div className="relative aspect-[4/1] w-full max-w-[280px] bg-neutral-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
                  <span className="relative z-10 text-neutral-500 font-sans text-xs font-medium">
                    {testimonial.imagePlaceholder}
                  </span>
                  <Image 
                    src={`/images/testimonials/testimonial-${i + 1}.jpg`} 
                    alt="Customer testimonial" 
                    fill 
                    className="object-contain relative z-20"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
