"use client";

import Link from "next/link";
import { Container } from "./container";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function StickyBar() {
  const scrollPosition = useScrollPosition();
  const [isVisible, setIsVisible] = useState(false);

  // Show sticky bar after scrolling down 800px (past the hero)
  useEffect(() => {
    if (scrollPosition > 800) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [scrollPosition]);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full z-40 bg-brand-dark/95 backdrop-blur border-b border-brand-gold/20 shadow-lg transform transition-transform duration-500",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <Container>
        <div className="flex h-16 sm:h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <span className="font-serif text-lg font-bold text-white tracking-tight">VigorBOLD</span>
              <p className="text-xs text-neutral-400">Herbal Coffee for Men</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-baseline gap-1">
              <span className="text-white font-semibold line-through text-xs sm:text-sm text-neutral-400">₦70,000</span>
              <span className="text-brand-gold font-bold text-lg sm:text-xl">₦65,000</span>
            </div>
            
            <Link 
              href="/order" 
              className="bg-brand-gold hover:bg-brand-gold-light text-brand-dark px-6 py-2.5 rounded-md transition-colors font-bold whitespace-nowrap shadow-[0_0_15px_rgba(201,168,76,0.3)]"
            >
              Order Now
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
