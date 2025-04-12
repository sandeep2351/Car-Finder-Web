import { getCars } from "@/lib/api"
import CarCard from "./car-card"

interface SimilarCarsProps {
  currentCarId: string
  brand: string
}

export default async function SimilarCars({ currentCarId, brand }: SimilarCarsProps) {
  const { cars } = await getCars({ brand, page: 1, limit: 3 })

  // Filter out the current car
  const similarCars = cars.filter((car) => car.id !== currentCarId).slice(0, 3)

  if (similarCars.length === 0) {
    return null
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Similar Cars You Might Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {similarCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  )
}
