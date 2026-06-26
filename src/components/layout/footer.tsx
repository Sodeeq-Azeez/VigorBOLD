import Link from "next/link";
import { Container } from "./container";
import { Coffee, ShieldCheck, Truck, RefreshCcw } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-dark text-neutral-300 py-12 md:py-16 border-t border-white/10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 text-white">
              <Coffee className="h-6 w-6 text-brand-gold" />
              <span className="font-serif text-xl font-bold tracking-tight">VigorBOLD</span>
            </Link>
            <p className="text-sm text-neutral-400 max-w-xs text-balance">
              More than a cup of coffee. A daily commitment to your wellbeing.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold mb-2">Explore</h4>
            <Link href="/#ingredients" className="text-sm hover:text-brand-gold transition-colors">Ingredients</Link>
            <Link href="/#how-it-works" className="text-sm hover:text-brand-gold transition-colors">How It Works</Link>
            <Link href="/#testimonials" className="text-sm hover:text-brand-gold transition-colors">Testimonials</Link>
            <Link href="/#faq" className="text-sm hover:text-brand-gold transition-colors">FAQ</Link>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold mb-2">Legal</h4>
            <Link href="/privacy" className="text-sm hover:text-brand-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm hover:text-brand-gold transition-colors">Terms & Conditions</Link>
            <Link href="/policies" className="text-sm hover:text-brand-gold transition-colors">Refund & Delivery Policy</Link>
          </div>

          {/* Contact & Trust */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold mb-2">Contact</h4>
            <a href="mailto:zeenuenterprise@gmail.com" className="text-sm hover:text-brand-gold transition-colors">
              zeenuenterprise@gmail.com
            </a>
            <a href="https://wa.me/2348141181083" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-brand-gold transition-colors">
              +234 814 118 1083
            </a>
          </div>

        </div>

        {/* Bottom Trust Strip */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} VigorBOLD. All rights reserved.
          </p>
          
          <div className="flex gap-6 text-neutral-400">
            <div className="flex items-center gap-2 text-xs">
              <ShieldCheck className="h-4 w-4" />
              <span>NAFDAC Approved</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Truck className="h-4 w-4" />
              <span>Nationwide Delivery</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
