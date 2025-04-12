import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="bg-primary rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to Find Your Perfect Car?</h2>
        <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-8">
          Browse thousands of cars from trusted dealers and private sellers. Start your search today!
        </p>
        <Link href="/cars">
          <Button size="lg" variant="secondary">
            Browse Cars Now
          </Button>
        </Link>
      </div>
    </section>
  )
}
