import { ComponentShowcase } from "../components/templates/component-showcase"

export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-2 text-foreground">Component Showcase</h1>
          <p className="text-muted-foreground text-center mb-8">
            Exploring our atomic design system with shadcn components
          </p>
        </div>
      </div>
      <ComponentShowcase />
    </main>
  )
} 