import { Suspense } from "react"
import CarListingHeader from "@/components/car-listing-header"
import CarFilters from "@/components/car-filters"
import CarGrid from "@/components/car-grid"
import Loading from "@/components/loading"

export const metadata = {
  title: "Browse Cars | RideHub",
  description: "Find and compare the best cars with our advanced search filters",
}

export default function CarsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = typeof searchParams.page === "string" ? Number.parseInt(searchParams.page) : 1
  const brand = typeof searchParams.brand === "string" ? searchParams.brand : undefined
  const minPrice = typeof searchParams.minPrice === "string" ? Number.parseInt(searchParams.minPrice) : undefined
  const maxPrice = typeof searchParams.maxPrice === "string" ? Number.parseInt(searchParams.maxPrice) : undefined
  const fuelType = typeof searchParams.fuelType === "string" ? searchParams.fuelType : undefined
  const seatingCapacity =
    typeof searchParams.seatingCapacity === "string" ? Number.parseInt(searchParams.seatingCapacity) : undefined
  const sortBy = typeof searchParams.sortBy === "string" ? searchParams.sortBy : undefined

  return (
    <div className="container mx-auto px-4 py-8">
      <CarListingHeader />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
        <div className="lg:col-span-1">
          <CarFilters
            selectedBrand={brand}
            selectedMinPrice={minPrice}
            selectedMaxPrice={maxPrice}
            selectedFuelType={fuelType}
            selectedSeatingCapacity={seatingCapacity}
            selectedSortBy={sortBy}
          />
        </div>
        <div className="lg:col-span-3">
          <Suspense fallback={<Loading />}>
            <CarGrid
              page={page}
              brand={brand}
              minPrice={minPrice}
              maxPrice={maxPrice}
              fuelType={fuelType}
              seatingCapacity={seatingCapacity}
              sortBy={sortBy}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
