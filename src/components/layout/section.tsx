import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  variant?: "default" | "alternate" | "dark"
}

export function Section({ 
  className, 
  children, 
  variant = "default",
  ...props 
}: SectionProps) {
  
  const variants = {
    default: "bg-background text-foreground",
    alternate: "bg-neutral-100 text-foreground",
    dark: "bg-brand-dark text-neutral-50"
  }
  
  return (
    <section
      className={cn("py-16 md:py-24", variants[variant], className)}
      {...props}
    >
      {children}
    </section>
  )
}
