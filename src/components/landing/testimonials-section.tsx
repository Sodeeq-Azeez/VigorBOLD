import Image from "next/image"
import { Section } from "../layout/section"
import { Container } from "../layout/container"
import { SectionHeading } from "../shared/section-heading"
import { Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Makes me feel like a 25-year-old again.",
      image: "/images/testimonials/testimonial-2.jpg"
    },
    {
      quote: "For over twenty years, I've not been able to act like a man. But with VigorBOLD, I'm like a 25-year-old man.",
      image: "/images/testimonials/testimonial-1.jpg"
    },
    {
      quote: "at 65, my wife will soon put to bed; it makes me very strong",
      image: "/images/testimonials/testimonial-3.jpg"
    },
    {
      quote: "Vigor bold cleared every sign of prostrate I have.",
      image: "/images/testimonials/testimonial-5.jpg"
    },
    {
      quote: "Not to talk of the energy, strength and long-lasting libido. It is expectionally brilliant.",
      image: "/images/testimonials/testimonial-6.jpg"
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
                    src={testimonial.image} 
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
