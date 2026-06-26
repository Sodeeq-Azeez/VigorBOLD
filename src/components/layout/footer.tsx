import Link from "next/link";
import { Container } from "./container";

export function Footer() {
  return (
    <footer className="bg-brand-dark text-neutral-400 py-12 md:py-16 border-t border-white/10 text-center text-sm">
      <Container className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        
        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 font-medium text-neutral-300">
          <Link href="/privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-brand-gold transition-colors">Terms & Conditions</Link>
          <Link href="/policies" className="hover:text-brand-gold transition-colors">Refund & Delivery Policy</Link>
        </div>

        {/* Medical / General Disclaimer */}
        <div className="space-y-4 text-xs leading-relaxed opacity-80">
          <p>
            *DISCLAIMER: The statements made on this website have not been evaluated by the FDA or NAFDAC. 
            This product is not intended to diagnose, treat, cure, or prevent any disease. The information provided by this website 
            or this company is not a substitute for a face-to-face consultation with your physician, and should not be construed 
            as individual medical advice.
          </p>
          <p>
            Individual results will vary. The testimonials and examples used are exceptional results and are not intended to 
            guarantee, promise, represent and/or assure that anyone will achieve the same or similar results.
          </p>
        </div>

        {/* Facebook Disclaimer */}
        <div className="text-xs leading-relaxed opacity-60 border-t border-white/10 pt-8 w-full">
          <p>
            This site is not a part of the Facebook website or Facebook Inc. 
            Additionally, This site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.
          </p>
        </div>

        {/* Copyright */}
        <div className="text-neutral-500 text-xs">
          © {new Date().getFullYear()} VigorBOLD. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
