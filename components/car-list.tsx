"use client"

import { getCars } from "@/lib/api"
import CarCard from "./car-card"
import Pagination from "./pagination"
import { useSearchParams } from "next/navigation"

export default async function CarList() {
  const searchParams = useSearchParams()
  const page = searchParams.get("page") ? Number.parseInt(searchParams.get("page")!) : 1
  const brand = searchParams.get("brand") || undefined
  const minPrice = searchParams.get("minPrice") || undefined
  const maxPrice = searchParams.get("maxPrice") || undefined
  const fuelType = searchParams.get("fuelType") || undefined
  const seatingCapacity = searchParams.get("seatingCapacity") || undefined

  const { cars, pagination } = await getCars({
    page,
    brand,
    minPrice: minPrice ? Number.parseInt(minPrice) : undefined,
    maxPrice: maxPrice ? Number.parseInt(maxPrice) : undefined,
    fuelType,
    seatingCapacity: seatingCapacity ? Number.parseInt(seatingCapacity) : undefined,
  })

  if (cars.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium">No cars found</h2>
        <p className="text-muted-foreground mt-2">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      <Pagination currentPage={pagination.page} totalPages={pagination.totalPages} />
    </div>
  )
}
