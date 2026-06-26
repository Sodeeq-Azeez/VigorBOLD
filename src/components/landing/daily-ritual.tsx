import Image from "next/image"
import { Section } from "../layout/section"
import { Container } from "../layout/container"
import { SectionHeading } from "../shared/section-heading"

export function DailyRitual() {
  return (
    <Section variant="default">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col items-start text-left">
            <SectionHeading 
              title="A Different Kind of Daily Ritual"
              align="left"
              className="mb-8"
            />
            
            <div className="space-y-6 text-neutral-600 text-lg">
              <p>
                There are countless products promising quick fixes.
              </p>
              <p>
                VigorBOLD takes a different approach.
              </p>
              <p>
                Rather than becoming another bottle hidden away in a cupboard, it becomes a simple daily habit.
              </p>
              
              <div className="py-6 space-y-4">
                <p className="font-serif text-2xl font-semibold text-brand-dark flex items-center gap-4">
                  <span className="text-brand-gold">01</span> One cup.
                </p>
                <p className="font-serif text-2xl font-semibold text-brand-dark flex items-center gap-4">
                  <span className="text-brand-gold">02</span> One moment to slow down.
                </p>
                <p className="font-serif text-2xl font-semibold text-brand-dark flex items-center gap-4">
                  <span className="text-brand-gold">03</span> One opportunity to invest in yourself before the demands of the day begin.
                </p>
              </div>
              
              <p className="text-xl text-brand-dark font-medium italic border-l-4 border-brand-gold pl-4">
                Sometimes the most meaningful routines are also the simplest.
              </p>
            </div>
          </div>
          
          <div className="relative aspect-[3/2] w-full rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center text-neutral-400 font-serif z-10">
              [Morning Coffee Lifestyle Image]
            </div>
            {/* <Image 
              src="/images/lifestyle/lifestyle-morning.jpg" 
              alt="Morning coffee ritual" 
              fill 
              className="object-cover relative z-20"
            /> */}
          </div>
        </div>
      </Container>
    </Section>
  )
}
