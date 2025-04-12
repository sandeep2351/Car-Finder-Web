import WishlistClient from "@/components/wishlist-client"
import { Heart } from "lucide-react"

export const metadata = {
  title: "Wishlist | RideHub",
  description: "View your saved cars",
}

export default function WishlistPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Your Wishlist</h1>
      </div>
      <WishlistClient />
    </div>
  )
}
