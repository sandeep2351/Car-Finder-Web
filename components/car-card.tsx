"use client"

import type { Car } from "@/lib/types"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Fuel, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import AddToWishlistButton from "./add-to-wishlist-button"
import { motion } from "framer-motion"

export default function CarCard({ car }: { car: Car }) {
  return (
    <motion.div
      className="bg-card rounded-xl overflow-hidden border car-card-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.3 },
      }}
    >
      <div className="relative">
        <Link href={`/cars/${car.id}`} className="block">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={car.image || "/placeholder.svg"}
              alt={car.name}
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        </Link>
        <div className="absolute top-3 left-3">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Badge variant="secondary" className="bg-black/70 text-white hover:bg-black/70">
              {car.fuelType}
            </Badge>
          </motion.div>
        </div>
        <div className="absolute top-3 right-3">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 500, delay: 0.3 }}
          >
            <AddToWishlistButton car={car} />
          </motion.div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/cars/${car.id}`} className="block">
            <h3 className="font-bold text-lg hover:text-primary transition-colors line-clamp-1">{car.name}</h3>
          </Link>
        </div>

        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {car.year}
          </span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <Fuel className="h-4 w-4 mr-1" />
            {car.fuelType}
          </span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {car.seatingCapacity}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <motion.div
            className="text-xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            ${car.price.toLocaleString()}
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, x: -5 }} whileTap={{ scale: 0.95 }}>
            <Link href={`/cars/${car.id}`} className="text-primary text-sm font-medium hover:underline">
              View Details
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
