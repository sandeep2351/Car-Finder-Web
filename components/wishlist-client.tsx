"use client"

import { useWishlist } from "@/context/wishlist-context"
import CarCard from "./car-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Car } from "lucide-react"

export default function WishlistClient() {
  const { wishlist } = useWishlist()

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-muted rounded-full p-6 mb-4">
          <Car className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
        <p className="text-muted-foreground mb-6">Start adding cars to your wishlist</p>
        <Link href="/cars">
          <Button>Browse Cars</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishlist.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  )
}
