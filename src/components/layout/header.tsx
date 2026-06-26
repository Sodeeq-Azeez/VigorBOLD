"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "./container";

export function Header({ hideNav = false }: { hideNav?: boolean }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-brand-dark/95 backdrop-blur supports-[backdrop-filter]:bg-brand-dark/80 text-white">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="VigorBOLD Logo" width={32} height={32} className="rounded-sm" />
            <span className="font-serif text-xl font-bold tracking-tight">VigorBOLD</span>
          </Link>
          
          {!hideNav && (
            <nav className="flex items-center gap-6 text-sm font-medium">
            <Link 
              href="/#how-it-works" 
              className="hidden sm:block text-neutral-300 hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <Link 
              href="/#faq" 
              className="hidden sm:block text-neutral-300 hover:text-white transition-colors"
            >
              FAQ
            </Link>
            <Link 
              href="/order" 
              className="bg-brand-gold hover:bg-brand-gold-light text-brand-dark px-4 py-2 rounded-md transition-colors font-semibold"
            >
              Order Now
            </Link>
          </nav>
          )}
        </div>
      </Container>
    </header>
  );
}
