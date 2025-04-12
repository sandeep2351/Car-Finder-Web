import type { Car, CarFilters, CarsResponse } from "./types"

export async function getCars(filters: CarFilters = {}): Promise<CarsResponse> {
  const searchParams = new URLSearchParams()

  if (filters.page) searchParams.set("page", filters.page.toString())
  if (filters.limit) searchParams.set("limit", filters.limit.toString())
  if (filters.brand) searchParams.set("brand", filters.brand)
  if (filters.minPrice) searchParams.set("minPrice", filters.minPrice.toString())
  if (filters.maxPrice) searchParams.set("maxPrice", filters.maxPrice.toString())
  if (filters.fuelType) searchParams.set("fuelType", filters.fuelType)
  if (filters.seatingCapacity) searchParams.set("seatingCapacity", filters.seatingCapacity.toString())
  if (filters.sortBy) searchParams.set("sortBy", filters.sortBy)

  const baseUrl = typeof window === "undefined" ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000" : ""

  const res = await fetch(`${baseUrl}/api/cars?${searchParams.toString()}`)

  if (!res.ok) {
    throw new Error("Failed to fetch cars")
  }

  return res.json()
}

export async function getCar(id: string): Promise<Car | null> {

  const baseUrl = typeof window === "undefined" ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000" : ""

  const res = await fetch(`${baseUrl}/api/cars/${id}`)

  if (!res.ok) {
    if (res.status === 404) {
      return null
    }
    throw new Error("Failed to fetch car")
  }

  return res.json()
}
