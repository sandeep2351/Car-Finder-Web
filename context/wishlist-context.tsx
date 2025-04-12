"use client"

import type React from "react"

import type { Car } from "@/lib/types"
import { createContext, useContext, useEffect, useState } from "react"

interface WishlistContextType {
  wishlist: Car[]
  addToWishlist: (car: Car) => void
  removeFromWishlist: (id: string) => void
}

const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
})

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Car[]>([])
  const [mounted, setMounted] = useState(false)

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist")
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist))
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage", error)
      }
    }
    setMounted(true)
  }, [])

  // Save wishlist to localStorage when it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("wishlist", JSON.stringify(wishlist))
    }
  }, [wishlist, mounted])

  const addToWishlist = (car: Car) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.id === car.id)) {
        return prev
      }
      return [...prev, car]
    })
  }

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((car) => car.id !== id))
  }

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
