"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { brands, fuelTypes } from "@/lib/data"
import { motion } from "framer-motion"

export default function HeroSection() {
  const router = useRouter()
  const [brand, setBrand] = useState("")
  const [priceRange, setPriceRange] = useState("")
  const [fuelType, setFuelType] = useState("")

  const handleSearch = () => {
    const params = new URLSearchParams()

    if (brand && brand !== "all") params.set("brand", brand)

    if (priceRange) {
      const [min, max] = priceRange.split("-")
      if (min) params.set("minPrice", min)
      if (max) params.set("maxPrice", max)
    }

    if (fuelType && fuelType !== "all") params.set("fuelType", fuelType)

    router.push(`/cars?${params.toString()}`)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="hero-gradient relative">
      <motion.div
        className="container mx-auto px-4 py-20 md:py-32"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-3xl">
          <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" variants={itemVariants}>
            Find Your Perfect Car in Minutes
          </motion.h1>
          <motion.p className="text-xl text-white/80 mb-8" variants={itemVariants}>
            Browse thousands of cars from trusted dealers and private sellers
          </motion.p>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg"
            variants={itemVariants}
            whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Brand</label>
                <Select value={brand} onValueChange={setBrand}>
                  <SelectTrigger>
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
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any price</SelectItem>
                    <SelectItem value="0-20000">Under $20,000</SelectItem>
                    <SelectItem value="20000-40000">$20,000 - $40,000</SelectItem>
                    <SelectItem value="40000-60000">$40,000 - $60,000</SelectItem>
                    <SelectItem value="60000-100000">$60,000 - $100,000</SelectItem>
                    <SelectItem value="100000-">$100,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Fuel Type</label>
                <Select value={fuelType} onValueChange={setFuelType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any type</SelectItem>
                    {fuelTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button onClick={handleSearch} className="w-full">
                <Search className="mr-2 h-4 w-4" /> Search Cars
              </Button>
            </motion.div>
          </motion.div>

          <motion.div className="flex flex-wrap gap-4 mt-8 text-white" variants={itemVariants}>
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05, x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <Search className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium">20,000+</p>
                <p className="text-white/70 text-sm">Cars available</p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05, x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <Search className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium">1,000+</p>
                <p className="text-white/70 text-sm">Verified dealers</p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05, x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <Search className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium">4.8/5</p>
                <p className="text-white/70 text-sm">Customer rating</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
