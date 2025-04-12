"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { brands, fuelTypes } from "@/lib/data"
import { X } from "lucide-react"

interface CarFiltersProps {
  selectedBrand?: string
  selectedMinPrice?: number
  selectedMaxPrice?: number
  selectedFuelType?: string
  selectedSeatingCapacity?: number
  selectedSortBy?: string
}

export default function CarFilters({
  selectedBrand,
  selectedMinPrice,
  selectedMaxPrice,
  selectedFuelType,
  selectedSeatingCapacity,
  selectedSortBy,
}: CarFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [brand, setBrand] = useState(selectedBrand || "")
  const [minPrice, setMinPrice] = useState(selectedMinPrice?.toString() || "")
  const [maxPrice, setMaxPrice] = useState(selectedMaxPrice?.toString() || "")
  const [fuelType, setFuelType] = useState(selectedFuelType || "")
  const [seatingCapacity, setSeatingCapacity] = useState(selectedSeatingCapacity?.toString() || "")
  const [sortBy, setSortBy] = useState(selectedSortBy || "")
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000])

  // Initialize price range slider based on min/max price
  useEffect(() => {
    const min = selectedMinPrice || 0
    const max = selectedMaxPrice || 100000
    setPriceRange([min, max])
  }, [selectedMinPrice, selectedMaxPrice])

  // Create a query string from the current filters
  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (brand && brand !== "all") params.set("brand", brand)
    else params.delete("brand")

    if (minPrice) params.set("minPrice", minPrice)
    else params.delete("minPrice")

    if (maxPrice) params.set("maxPrice", maxPrice)
    else params.delete("maxPrice")

    if (fuelType && fuelType !== "all") params.set("fuelType", fuelType)
    else params.delete("fuelType")

    if (seatingCapacity && seatingCapacity !== "all") params.set("seatingCapacity", seatingCapacity)
    else params.delete("seatingCapacity")

    if (sortBy) params.set("sortBy", sortBy)
    else params.delete("sortBy")

    params.set("page", "1") // Reset to first page when filters change

    return params.toString()
  }, [brand, minPrice, maxPrice, fuelType, seatingCapacity, sortBy, searchParams])

  // Apply filters with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.push(`${pathname}?${createQueryString()}`)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [brand, minPrice, maxPrice, fuelType, seatingCapacity, sortBy, router, pathname, createQueryString])

  // Handle price range slider change
  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values)
    setMinPrice(values[0].toString())
    setMaxPrice(values[1].toString())
  }

  // Reset all filters
  const resetFilters = () => {
    setBrand("")
    setMinPrice("")
    setMaxPrice("")
    setFuelType("")
    setSeatingCapacity("")
    setSortBy("")
    setPriceRange([0, 100000])
  }

  return (
    <div className="bg-card rounded-xl border p-6 sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg">Filters</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 text-sm">
          <X className="h-4 w-4 mr-1" /> Clear
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="sortBy" className="block mb-2">
            Sort By
          </Label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger id="sortBy">
              <SelectValue placeholder="Recommended" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="year-desc">Newest First</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="brand" className="block mb-2">
            Brand
          </Label>
          <Select value={brand} onValueChange={setBrand}>
            <SelectTrigger id="brand">
              <SelectValue placeholder="All brands" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All brands</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand.toLowerCase()}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="block mb-4">Price Range</Label>
          <Slider
            value={priceRange}
            min={0}
            max={100000}
            step={1000}
            onValueChange={handlePriceRangeChange}
            className="mb-6"
          />
          <div className="flex items-center justify-between gap-4">
            <div className="w-full">
              <Label htmlFor="minPrice" className="sr-only">
                Min Price
              </Label>
              <Input
                id="minPrice"
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full"
              />
            </div>
            <span className="text-muted-foreground">to</span>
            <div className="w-full">
              <Label htmlFor="maxPrice" className="sr-only">
                Max Price
              </Label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="fuelType" className="block mb-2">
            Fuel Type
          </Label>
          <Select value={fuelType} onValueChange={setFuelType}>
            <SelectTrigger id="fuelType">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              {fuelTypes.map((type) => (
                <SelectItem key={type} value={type.toLowerCase()}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="seatingCapacity" className="block mb-2">
            Seating Capacity
          </Label>
          <Select value={seatingCapacity} onValueChange={setSeatingCapacity}>
            <SelectTrigger id="seatingCapacity">
              <SelectValue placeholder="Any seats" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any seats</SelectItem>
              {[2, 4, 5, 6, 7, 8].map((seats) => (
                <SelectItem key={seats} value={seats.toString()}>
                  {seats} seats
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
