export interface Car {
  id: string
  name: string
  brand: string
  price: number
  fuelType: string
  seatingCapacity: number
  year: number
  image: string
  description: string
}

export interface CarsResponse {
  cars: Car[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface CarFilters {
  page?: number
  limit?: number
  brand?: string
  minPrice?: number
  maxPrice?: number
  fuelType?: string
  seatingCapacity?: number
  sortBy?: string
}
