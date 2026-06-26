import Image from "next/image"
import { Section } from "../layout/section"
import { Container } from "../layout/container"
import { SectionHeading } from "../shared/section-heading"
import { Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Makes me feel like a 25-year-old again.",
      imagePlaceholder: "Testimonial 1"
    },
    {
      quote: "For over twenty years, I've not been able to act like a man. But with VigorBOLD, I'm like a 25-year-old man.",
      imagePlaceholder: "Testimonial 2"
    },
    {
      quote: "Energy, strength and long-lasting vitality.",
      imagePlaceholder: "Testimonial 3"
    },
    {
      quote: "It rejuvenated me. I feel stronger and more energetic than before.",
      imagePlaceholder: "Testimonial 4"
    },
    {
      quote: "My confidence is completely restored. This is a game changer.",
      imagePlaceholder: "Testimonial 5"
    },
    {
      quote: "I highly recommend it to any man looking for that extra spark.",
      imagePlaceholder: "Testimonial 6"
    }
  ]

  return (
    <Section variant="default" id="testimonials">
      <Container>
        <SectionHeading 
          title="What Customers Are Saying"
          subtitle="Real messages from men who made VigorBOLD part of their daily routine."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="flex flex-col bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
              <div className="flex-1">
                <Quote className="h-8 w-8 text-brand-gold/30 mb-4" />
                <p className="text-lg md:text-xl text-brand-dark font-serif font-medium leading-relaxed italic mb-6">
                  &quot;{testimonial.quote}&quot;
                </p>
              </div>
              
              <div className="mt-auto pt-6 border-t border-neutral-100">
                <div className="relative w-full h-[400px] bg-neutral-100 rounded-lg overflow-hidden">
                  <Image 
                    src={`/images/testimonials/testimonial-${i + 1}.jpg`} 
                    alt="Customer testimonial" 
                    fill 
                    className="object-contain bg-black/5 p-2"
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
