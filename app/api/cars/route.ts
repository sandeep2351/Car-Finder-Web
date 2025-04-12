import { NextResponse } from "next/server"
import { cars } from "@/lib/data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const brand = searchParams.get("brand")
  const minPrice = searchParams.get("minPrice") ? Number.parseInt(searchParams.get("minPrice")!) : undefined
  const maxPrice = searchParams.get("maxPrice") ? Number.parseInt(searchParams.get("maxPrice")!) : undefined
  const fuelType = searchParams.get("fuelType")
  const seatingCapacity = searchParams.get("seatingCapacity")
    ? Number.parseInt(searchParams.get("seatingCapacity")!)
    : undefined
  const sortBy = searchParams.get("sortBy")
  const page = searchParams.get("page") ? Number.parseInt(searchParams.get("page")!) : 1
  const limit = 9

  // Apply filters
  let filteredCars = [...cars]

  if (brand && brand !== "all") {
    filteredCars = filteredCars.filter((car) => car.brand.toLowerCase() === brand.toLowerCase())
  }

  if (minPrice !== undefined) {
    filteredCars = filteredCars.filter((car) => car.price >= minPrice)
  }

  if (maxPrice !== undefined) {
    filteredCars = filteredCars.filter((car) => car.price <= maxPrice)
  }

  if (fuelType && fuelType !== "all") {
    filteredCars = filteredCars.filter((car) => car.fuelType.toLowerCase() === fuelType.toLowerCase())
  }

  if (seatingCapacity !== undefined && seatingCapacity !== 0) {
    filteredCars = filteredCars.filter((car) => car.seatingCapacity === seatingCapacity)
  }

  // Apply sorting
  if (sortBy) {
    switch (sortBy) {
      case "price-asc":
        filteredCars.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filteredCars.sort((a, b) => b.price - a.price)
        break
      case "year-desc":
        filteredCars.sort((a, b) => b.year - a.year)
        break
      case "name-asc":
        filteredCars.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }
  }

  // Calculate pagination
  const totalCars = filteredCars.length
  const totalPages = Math.ceil(totalCars / limit)
  const offset = (page - 1) * limit
  const paginatedCars = filteredCars.slice(offset, offset + limit)

  // Add artificial delay to simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json({
    cars: paginatedCars,
    pagination: {
      total: totalCars,
      page,
      limit,
      totalPages,
    },
  })
}
