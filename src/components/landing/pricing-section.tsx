import Link from "next/link"
import { Section } from "../layout/section"
import { Container } from "../layout/container"
import { SectionHeading } from "../shared/section-heading"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

export function PricingSection() {
  const packages = [
    {
      id: "starter",
      name: "Starter Pack",
      sachets: 20,
      price: "35,000",
      description: "A great place to begin.",
      popular: false
    },
    {
      id: "popular",
      name: "Most Popular",
      sachets: 40,
      price: "65,000",
      originalPrice: "70,000",
      description: "More value for those building a daily routine.",
      popular: true,
      badge: "Most Popular"
    },
    {
      id: "value",
      name: "Best Value",
      sachets: 60,
      price: "90,000",
      originalPrice: "105,000",
      description: "Ideal for consistent use.",
      popular: false,
      badge: "Best Value"
    },
    {
      id: "long-term",
      name: "Long-Term Supply",
      sachets: 140,
      price: "199,000",
      originalPrice: "245,000",
      description: "The best value for long-term users.",
      popular: false,
      badge: "Buy 6 Packs, Get 1 Free"
    }
  ]

  return (
    <Section variant="default" id="pricing">
      <Container>
        <SectionHeading 
          overline="Your Investment In Peak Performance"
          title="What Is It Worth To Feel Like Yourself Again?"
        />
        
        <div className="max-w-3xl mx-auto text-center text-lg md:text-xl text-neutral-600 mb-12 font-serif leading-relaxed">
          <p>
            A single prescription for those &quot;temporary fixes&quot; or endless visits to specialists can easily cost you over ₦150,000 a month—and that&apos;s just for a band-aid that often comes with nasty side effects.
          </p>
          <p className="mt-4 font-semibold text-brand-dark">
            VigorBOLD offers a natural, lasting return to your prime for a fraction of that cost. Choose your supply below.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mt-12">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={cn(
                "relative flex flex-col h-full overflow-hidden transition-all duration-300",
                pkg.popular 
                  ? "border-brand-gold shadow-[0_0_20px_rgba(201,168,76,0.15)] md:-translate-y-4 md:z-10 bg-white" 
                  : "border-neutral-200 shadow-sm hover:shadow-md bg-neutral-50/50"
              )}
            >
              {pkg.badge && (
                <div className={cn(
                  "absolute top-0 left-0 w-full py-1.5 text-center text-xs font-bold uppercase tracking-wider",
                  pkg.popular ? "bg-brand-gold text-brand-dark" : "bg-brand-dark text-white"
                )}>
                  {pkg.badge}
                </div>
              )}
              
              <CardContent className={cn("p-6 sm:p-8 flex-1 flex flex-col", pkg.badge ? "pt-10 sm:pt-12" : "")}>
                <div className="mb-6 flex-1">
                  <h3 className="font-serif text-2xl font-semibold text-brand-dark mb-2">{pkg.name}</h3>
                  <div className="inline-flex items-center justify-center px-3 py-1 bg-neutral-100 rounded-full text-sm font-medium text-neutral-600 mb-6">
                    {pkg.sachets} Sachets
                  </div>
                  
                  <div className="mb-4">
                    {pkg.originalPrice && (
                      <span className="text-neutral-400 line-through text-sm font-semibold block mb-1">
                        ₦{pkg.originalPrice}
                      </span>
                    )}
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-neutral-500">₦</span>
                      <span className="text-4xl font-bold tracking-tight text-brand-dark">{pkg.price}</span>
                    </div>
                  </div>
                  
                  <p className="text-neutral-600 text-sm">
                    {pkg.description}
                  </p>
                </div>
                
                <div className="pt-6 mt-auto">
                  <Link href={`/order?package=${pkg.id}`} className="w-full block">
                    <Button 
                      className={cn(
                        "w-full h-12 text-base font-semibold",
                        pkg.popular 
                          ? "bg-brand-gold hover:bg-brand-gold-light text-brand-dark" 
                          : "bg-brand-dark hover:bg-brand-dark/90 text-white"
                      )}
                    >
                      Order Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
