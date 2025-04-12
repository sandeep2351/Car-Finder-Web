"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { brands, fuelTypes } from "@/lib/data"

export default function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [brand, setBrand] = useState(searchParams.get("brand") || "")
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "")
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "")
  const [fuelType, setFuelType] = useState(searchParams.get("fuelType") || "")
  const [seatingCapacity, setSeatingCapacity] = useState(searchParams.get("seatingCapacity") || "")

  // Create a query string from the current filters
  const createQueryString = useCallback(() => {
    const params = new URLSearchParams()

    if (brand) params.set("brand", brand)
    if (minPrice) params.set("minPrice", minPrice)
    if (maxPrice) params.set("maxPrice", maxPrice)
    if (fuelType) params.set("fuelType", fuelType)
    if (seatingCapacity) params.set("seatingCapacity", seatingCapacity)
    params.set("page", "1") // Reset to first page when filters change

    return params.toString()
  }, [brand, minPrice, maxPrice, fuelType, seatingCapacity])

  // Apply filters with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.push(`/?${createQueryString()}`)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [brand, minPrice, maxPrice, fuelType, seatingCapacity, router, createQueryString])

  // Reset all filters
  const resetFilters = () => {
    setBrand("")
    setMinPrice("")
    setMaxPrice("")
    setFuelType("")
    setSeatingCapacity("")
  }

  return (
    <div className="bg-muted p-4 rounded-lg mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <Label htmlFor="brand">Brand</Label>
          <Select value={brand} onValueChange={setBrand}>
            <SelectTrigger id="brand">
              <SelectValue placeholder="All brands" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All brands</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="minPrice">Min Price</Label>
          <Input
            id="minPrice"
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="maxPrice">Max Price</Label>
          <Input
            id="maxPrice"
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="fuelType">Fuel Type</Label>
          <Select value={fuelType} onValueChange={setFuelType}>
            <SelectTrigger id="fuelType">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              {fuelTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="seatingCapacity">Seats</Label>
          <Select value={seatingCapacity} onValueChange={setSeatingCapacity}>
            <SelectTrigger id="seatingCapacity">
              <SelectValue placeholder="Any seats" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any seats</SelectItem>
              {[2, 4, 5, 6, 7, 8].map((seats) => (
                <SelectItem key={seats} value={seats.toString()}>
                  {seats}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button variant="outline" className="mt-4" onClick={resetFilters}>
        Reset Filters
      </Button>
    </div>
  )
}
