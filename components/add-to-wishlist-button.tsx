"use client"

import type React from "react"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/context/wishlist-context"
import type { Car } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import type { ButtonProps } from "@/components/ui/button"
import { motion } from "framer-motion"

interface AddToWishlistButtonProps extends ButtonProps {
  car: Car
}

export default function AddToWishlistButton({ car, variant = "ghost", className, ...props }: AddToWishlistButtonProps) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const { toast } = useToast()

  const isInWishlist = wishlist.some((item) => item.id === car.id)

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isInWishlist) {
      removeFromWishlist(car.id)
      toast({
        title: "Removed from wishlist",
        description: `${car.name} has been removed from your wishlist`,
      })
    } else {
      addToWishlist(car)
      toast({
        title: "Added to wishlist",
        description: `${car.name} has been added to your wishlist`,
      })
    }
  }

  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Button
        variant={variant}
        size="icon"
        onClick={toggleWishlist}
        className={cn("rounded-full", className)}
        {...props}
      >
        <motion.div
          animate={
            isInWishlist
              ? {
                  scale: [1, 1.2, 1],
                  transition: { duration: 0.3 },
                }
              : {}
          }
        >
          <Heart
            className={cn("h-5 w-5 transition-colors", isInWishlist ? "fill-red-500 stroke-red-500" : "")}
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          />
        </motion.div>
      </Button>
    </motion.div>
  )
}
