"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/context/wishlist-context"
import { ModeToggle } from "./mode-toggle"

export default function Header() {
  const pathname = usePathname()
  const { wishlist } = useWishlist()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Car Finder
        </Link>

        <div className="flex items-center gap-4">
          <ModeToggle />

          <Link href="/wishlist">
            <Button variant="outline" className="flex items-center gap-2">
              <Heart className={wishlist.length > 0 ? "fill-red-500 stroke-red-500" : ""} size={18} />
              <span>Wishlist</span>
              {wishlist.length > 0 && (
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {wishlist.length}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
