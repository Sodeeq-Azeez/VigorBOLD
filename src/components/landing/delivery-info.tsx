import { Section } from "../layout/section"
import { Container } from "../layout/container"
import { Truck, MapPin, PackageCheck } from "lucide-react"

export function DeliveryInfo() {
  return (
    <Section variant="alternate">
      <Container className="max-w-4xl">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-brand-gold/20 relative overflow-hidden">
          {/* Background accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center justify-between">
            <div className="flex-1">
              <h3 className="font-serif text-3xl font-bold text-brand-dark mb-4">
                Delivery You Can Trust
              </h3>
              <p className="text-neutral-600 mb-8 text-lg">
                We've made getting VigorBOLD as simple and secure as possible.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-brand-gold-dark" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-dark">Payment on Delivery</h4>
                    <p className="text-neutral-600 text-sm mt-1">Available in Lagos, Abuja, and Ilorin.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center shrink-0">
                    <Truck className="h-5 w-5 text-brand-gold-dark" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-dark">Free Nationwide Delivery</h4>
                    <p className="text-neutral-600 text-sm mt-1">Free delivery anywhere else in Nigeria (Payment before delivery required outside designated PoD areas).</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center shrink-0">
                    <PackageCheck className="h-5 w-5 text-brand-gold-dark" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-dark">Discreet Packaging</h4>
                    <p className="text-neutral-600 text-sm mt-1">Your privacy matters. All orders arrive in plain, unmarked packaging.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/3">
              <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-100 text-center">
                <Truck className="h-12 w-12 text-brand-gold mx-auto mb-4" />
                <h4 className="font-bold text-brand-dark mb-2">Ready to ship</h4>
                <p className="text-sm text-neutral-600">
                  Most orders are processed and dispatched within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
