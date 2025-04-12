import { getCar } from "@/lib/api"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { ArrowLeft, Calendar, Fuel, Users, Gauge, Shield, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import CarDetailsSkeleton from "@/components/car-details-skeleton"
import AddToWishlistButton from "@/components/add-to-wishlist-button"
import SimilarCars from "@/components/similar-cars"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const car = await getCar(params.id)

  if (!car) {
    return {
      title: "Car Not Found | RideHub",
    }
  }

  return {
    title: `${car.name} | RideHub`,
    description: car.description,
  }
}

export default async function CarDetailsPage({ params }: { params: { id: string } }) {
  const car = await getCar(params.id)

  if (!car) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/cars" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to search results
      </Link>

      <Suspense fallback={<CarDetailsSkeleton />}>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="relative rounded-xl overflow-hidden h-[300px] md:h-[500px]">
            <Image src={car.image || "/placeholder.svg"} alt={car.name} fill className="object-cover" priority />
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{car.name}</h1>
                <p className="text-muted-foreground mt-1">{car.brand}</p>
              </div>
              <AddToWishlistButton car={car} variant="default" />
            </div>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-5 h-5 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
              <span className="text-sm font-medium ml-2">4.0 (24 reviews)</span>
            </div>

            <div className="text-3xl font-bold">${car.price.toLocaleString()}</div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-medium">{car.year}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Fuel className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Fuel Type</p>
                  <p className="font-medium">{car.fuelType}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Seating</p>
                  <p className="font-medium">{car.seatingCapacity} seats</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Mileage</p>
                  <p className="font-medium">25 mpg</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-bold mb-2">Description</h2>
              <p className="text-muted-foreground">{car.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="flex-1">
                Schedule Test Drive
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                Contact Dealer
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-muted rounded-xl p-6 flex flex-col items-center text-center">
              <Shield className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">Vehicle Protection</h3>
              <p className="text-muted-foreground">
                All cars come with a 30-day warranty and 7-day money back guarantee
              </p>
            </div>
            <div className="bg-muted rounded-xl p-6 flex flex-col items-center text-center">
              <Car className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">Certified Vehicles</h3>
              <p className="text-muted-foreground">All vehicles undergo a 150-point inspection before listing</p>
            </div>
            <div className="bg-muted rounded-xl p-6 flex flex-col items-center text-center">
              <Gauge className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">Free Maintenance</h3>
              <p className="text-muted-foreground">Get free maintenance for the first 3 months after purchase</p>
            </div>
          </div>

          <SimilarCars currentCarId={car.id} brand={car.brand} />
        </div>
      </Suspense>
    </div>
  )
}
