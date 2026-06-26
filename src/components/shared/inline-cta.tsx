import Link from "next/link"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"

export function InlineCTA({ text = "Order VigorBOLD Now" }: { text?: string }) {
  return (
    <div className="w-full flex justify-center py-8">
      <Link href="/order">
        <Button size="lg" className="bg-brand-gold hover:bg-brand-gold-light text-brand-dark text-lg md:text-xl font-bold px-10 h-16 rounded-lg shadow-[0_0_20px_rgba(201,168,76,0.3)] animate-in fade-in zoom-in duration-500 hover:scale-105 transition-all">
          {text} <ArrowRight className="ml-2 h-6 w-6" />
        </Button>
      </Link>
    </div>
  )
}
