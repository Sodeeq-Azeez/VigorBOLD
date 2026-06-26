"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Container } from "@/components/layout/container"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CheckCircle2, ShieldCheck, Truck, CreditCard, Wallet } from "lucide-react"
import { nigerianStates, isPodAvailable } from "@/lib/states"

const packages = [
  { id: "starter", name: "Starter Pack (20 Sachets)", price: 35000 },
  { id: "popular", name: "Most Popular (40 Sachets)", price: 65000 },
  { id: "value", name: "Best Value (60 Sachets)", price: 90000 },
  { id: "long-term", name: "Long-Term Supply (140 Sachets)", price: 199000 }
]

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  state: z.string().min(1, "State is required"),
  address: z.string().min(10, "Please provide a detailed delivery address")
})

function OrderForm() {
  const searchParams = useSearchParams()
  const initialPackage = searchParams.get("package") || "popular"
  
  const [selectedPackage, setSelectedPackage] = useState(initialPackage)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      state: "",
      address: ""
    }
  })
  
  const selectedState = form.watch("state")
  const selectedPkg = packages.find(p => p.id === selectedPackage) || packages[1]
  const podAvailable = selectedState ? isPodAvailable(selectedState) : false

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageDetails: selectedPkg,
          values
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit order")
      }

      if (data.paymentMethod === "flutterwave") {
        // TODO: Phase 7 - Redirect to Flutterwave
        alert("Proceeding to Flutterwave payment... (Implementation pending)")
      } else {
        setSubmitSuccess(true)
        window.scrollTo(0, 0)
      }
    } catch (error) {
      console.error(error)
      alert("There was an error submitting your order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="py-24 text-center max-w-2xl mx-auto px-4">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-brand-dark mb-4">Order Received Successfully!</h2>
        <p className="text-lg text-neutral-600 mb-8">
          Thank you, {form.getValues().firstName}. Your order for {selectedPkg.name} has been confirmed. 
          Our dispatch team will contact you shortly on WhatsApp to coordinate your delivery.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 mb-24">
      {/* Form Section */}
      <div className="lg:col-span-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            <Card className="border-neutral-200 shadow-sm">
              <CardHeader className="bg-neutral-50/50 border-b border-neutral-100 pb-4">
                <CardTitle className="text-xl font-serif text-brand-dark flex items-center gap-2">
                  <span className="bg-brand-gold text-brand-dark w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                  Select Your Package
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {packages.map((pkg) => (
                    <label 
                      key={pkg.id} 
                      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedPackage === pkg.id 
                          ? "border-brand-gold bg-brand-gold/5" 
                          : "border-neutral-100 hover:border-neutral-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          selectedPackage === pkg.id ? "border-brand-gold" : "border-neutral-300"
                        }`}>
                          {selectedPackage === pkg.id && <div className="w-2.5 h-2.5 bg-brand-gold rounded-full" />}
                        </div>
                        <span className="font-medium text-brand-dark">{pkg.name}</span>
                      </div>
                      <span className="font-bold text-brand-dark">₦{pkg.price.toLocaleString()}</span>
                      <input 
                        type="radio" 
                        name="package" 
                        value={pkg.id} 
                        checked={selectedPackage === pkg.id}
                        onChange={() => setSelectedPackage(pkg.id)}
                        className="hidden" 
                      />
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 shadow-sm">
              <CardHeader className="bg-neutral-50/50 border-b border-neutral-100 pb-4">
                <CardTitle className="text-xl font-serif text-brand-dark flex items-center gap-2">
                  <span className="bg-brand-gold text-brand-dark w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                  Shipping Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number (WhatsApp)</FormLabel>
                        <FormControl><Input type="tel" placeholder="e.g. 08012345678" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address (Optional)</FormLabel>
                        <FormControl><Input type="email" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {nigerianStates.map((state) => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Delivery Address</FormLabel>
                      <FormControl><Input placeholder="Street address, local govt area, etc." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            {/* Payment Method / Summary Box before CTA */}
            {selectedState && (
              <Card className="border-brand-gold bg-brand-gold/5 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center shrink-0">
                      {podAvailable ? <Wallet className="h-5 w-5 text-brand-dark" /> : <CreditCard className="h-5 w-5 text-brand-dark" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-dark text-lg">
                        {podAvailable ? "Payment on Delivery Selected" : "Secure Online Payment Required"}
                      </h4>
                      <p className="text-neutral-600 mt-1">
                        {podAvailable 
                          ? `Good news! Payment on Delivery is available in ${selectedState}. You will only pay when your order arrives.`
                          : `Because you are ordering to ${selectedState}, secure online payment is required before dispatch. Your payment is protected by Flutterwave.`
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Button 
              type="submit" 
              size="lg" 
              disabled={isSubmitting}
              className="w-full h-14 text-lg bg-brand-gold hover:bg-brand-gold-light text-brand-dark font-bold shadow-[0_0_15px_rgba(201,168,76,0.3)]"
            >
              {isSubmitting ? "Processing..." : (podAvailable || !selectedState ? "Complete Order" : "Proceed to Payment")}
            </Button>

            <div className="flex items-center justify-center gap-6 pt-4 text-sm text-neutral-500">
              <div className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4" /> Secure Checkout</div>
              <div className="flex items-center gap-1.5"><Truck className="h-4 w-4" /> Free Delivery</div>
            </div>
          </form>
        </Form>
      </div>
      
      {/* Order Summary Sidebar */}
      <div className="lg:col-span-5">
        <div className="sticky top-24">
          <Card className="border-neutral-200 shadow-sm bg-neutral-50/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-serif text-brand-dark">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-start pb-4 border-b border-neutral-200">
                  <div>
                    <p className="font-semibold text-brand-dark">{selectedPkg.name}</p>
                    <p className="text-sm text-neutral-500">VigorBOLD Premium Herbal Coffee</p>
                  </div>
                  <p className="font-bold text-brand-dark">₦{selectedPkg.price.toLocaleString()}</p>
                </div>
                
                <div className="flex justify-between items-center pb-4 border-b border-neutral-200">
                  <p className="text-neutral-600">Delivery Fee</p>
                  <p className="font-semibold text-brand-dark">Free</p>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <p className="text-lg font-bold text-brand-dark">Total</p>
                  <p className="text-2xl font-bold text-brand-dark">₦{selectedPkg.price.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="mt-8 bg-white p-4 rounded-lg border border-neutral-100 flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                <p className="text-sm text-neutral-600 leading-relaxed">
                  <strong>Risk-Free Guarantee:</strong> We ensure 100% privacy and secure handling for every order.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function OrderPage() {
  return (
    <>
      <Header />
      <main className="min-h-[80vh] bg-neutral-50">
        <Container>
          <div className="pt-12 pb-6">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark tracking-tight">Secure Checkout</h1>
            <p className="text-neutral-600 mt-2">Complete your order below. Your information is secure and encrypted.</p>
          </div>
          
          <Suspense fallback={<div className="h-[60vh] flex items-center justify-center text-neutral-500">Loading order form...</div>}>
            <OrderForm />
          </Suspense>
        </Container>
      </main>
      <Footer />
    </>
  )
}
