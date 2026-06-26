import Image from "next/image"
import { Section } from "../layout/section"
import { Container } from "../layout/container"
import { SectionHeading } from "../shared/section-heading"
import { Card, CardContent } from "../ui/card"

export function IngredientsSection() {
  const ingredients = [
    {
      name: "Tongkat Ali",
      description: "Traditionally associated with male vitality and overall wellbeing.",
      imagePlaceholder: "[Tongkat Ali Image]"
    },
    {
      name: "Maca Root",
      description: "Traditionally used to support energy and active living.",
      imagePlaceholder: "[Maca Root Image]"
    },
    {
      name: "Cordyceps",
      description: "Valued for its association with endurance and vitality.",
      imagePlaceholder: "[Cordyceps Image]"
    },
    {
      name: "Ganoderma Lucidum (Reishi)",
      description: "Known for its antioxidant properties and role in supporting overall wellness.",
      imagePlaceholder: "[Reishi Image]"
    },
    {
      name: "Premium Arabian Coffee",
      description: "Delivers a rich, enjoyable coffee experience while serving as the foundation of every cup.",
      imagePlaceholder: "[Coffee Beans Image]"
    }
  ]

  return (
    <Section variant="alternate" id="ingredients">
      <Container>
        <SectionHeading 
          title="Crafted With Ingredients Inspired by Nature"
          subtitle="Every serving contains a blend of carefully selected ingredients traditionally used in wellness practices."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
          {ingredients.map((ingredient, i) => (
            <Card key={i} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-square relative bg-neutral-100 flex items-center justify-center p-6">
                <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
                <span className="relative z-10 text-neutral-500 font-serif text-sm text-center">
                  {ingredient.imagePlaceholder}
                </span>
                {/* <Image 
                  src={`/images/ingredients/ingredient-${i + 1}.jpg`} 
                  alt={ingredient.name} 
                  fill 
                  className="object-cover relative z-20"
                /> */}
              </div>
              <CardContent className="p-6">
                <h4 className="text-xl font-serif font-semibold text-brand-dark mb-3">
                  {ingredient.name}
                </h4>
                <p className="text-neutral-600 leading-relaxed">
                  {ingredient.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
