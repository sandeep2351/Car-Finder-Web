import { getCars } from "@/lib/api"
import CarCard from "./car-card"
import Pagination from "./pagination"
import { Car } from "lucide-react"

interface CarGridProps {
  page?: number
  brand?: string
  minPrice?: number
  maxPrice?: number
  fuelType?: string
  seatingCapacity?: number
  sortBy?: string
}

export default async function CarGrid({
  page = 1,
  brand,
  minPrice,
  maxPrice,
  fuelType,
  seatingCapacity,
  sortBy,
}: CarGridProps) {
  const { cars, pagination } = await getCars({
    page,
    brand,
    minPrice,
    maxPrice,
    fuelType,
    seatingCapacity,
    sortBy,
  })

  if (cars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-muted rounded-full p-6 mb-4">
          <Car className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-medium mb-2">No cars found</h2>
        <p className="text-muted-foreground">Try adjusting your filters or search criteria to find more results.</p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-muted-foreground mb-6">
        Showing {(pagination.page - 1) * pagination.limit + 1}-
        {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} cars
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      <Pagination currentPage={pagination.page} totalPages={pagination.totalPages} />
    </div>
  )
}
