import { cn } from "@/lib/utils"

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: React.ReactNode
  overline?: string
  align?: "left" | "center"
}

export function SectionHeading({ 
  title, 
  subtitle, 
  overline,
  align = "center",
  className,
  ...props 
}: SectionHeadingProps) {
  return (
    <div 
      className={cn(
        "flex flex-col gap-4 mb-12",
        align === "center" ? "text-center items-center" : "text-left items-start",
        className
      )}
      {...props}
    >
      {overline && (
        <span className="text-brand-gold font-semibold tracking-widest uppercase text-sm">
          {overline}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold tracking-tight text-balance">
        {title}
      </h2>
      {subtitle && (
        <div className="text-neutral-600 md:text-lg max-w-2xl text-balance">
          {subtitle}
        </div>
      )}
    </div>
  )
}
