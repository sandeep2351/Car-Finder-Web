import Link from "next/link"
import { getCars } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import CarCard from "./car-card"

export default async function FeaturedCars() {
  const { cars } = await getCars({ page: 1, limit: 6 })

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-2">Featured Cars</h2>
          <p className="text-muted-foreground">Explore our top picks for you</p>
        </div>
        <Link href="/cars">
          <Button variant="outline" className="mt-4 md:mt-0">
            View all cars <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.slice(0, 6).map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  )
}
