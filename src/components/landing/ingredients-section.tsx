import Image from "next/image"
import { Section } from "../layout/section"
import { Container } from "../layout/container"
import { SectionHeading } from "../shared/section-heading"
import { Card, CardContent } from "../ui/card"

export function IngredientsSection() {
  const ingredients = [
    {
      name: "Tongkat Ali",
      description: "Traditionally associated with boosting male vitality, stamina, and natural drive.",
      image: "/images/ingredients/tongkat-ali.png"
    },
    {
      name: "Maca Root",
      description: "Revered for centuries for its ability to naturally enhance energy, endurance, and a healthy libido.",
      image: "/images/ingredients/maca-root.png"
    },
    {
      name: "Cordyceps",
      description: "Valued for its association with endurance and vitality.",
      image: "/images/ingredients/cordyceps.png"
    },
    {
      name: "Ganoderma Lucidum (Reishi)",
      description: "Known for its antioxidant properties and role in supporting overall wellness.",
      image: "/images/ingredients/reishi.png"
    },
    {
      name: "Premium Arabian Coffee",
      description: "Delivers a rich, enjoyable coffee experience while serving as the foundation of every cup.",
      image: "/images/ingredients/coffee.png"
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
                <Image 
                  src={ingredient.image} 
                  alt={ingredient.name} 
                  fill 
                  className="object-cover relative z-20"
                />
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
