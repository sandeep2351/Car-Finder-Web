import Image from "next/image"
import Link from "next/link"

export default function PopularBrands() {
  const brands = [
    { name: "Toyota", logo: "/images/brands/toyota.png" },
    { name: "Honda", logo: "/images/brands/honda.png" },
    { name: "BMW", logo: "/images/brands/bmw.png" },
    { name: "Mercedes", logo: "/images/brands/mercedes.png" },
    { name: "Audi", logo: "/images/brands/audi.png" },
    { name: "Tesla", logo: "/images/brands/tesla.png" },
  ]

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Popular Brands</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover cars from the world's leading automotive manufacturers
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {brands.map((brand) => (
          <Link
            key={brand.name}
            href={`/cars?brand=${brand.name.toLowerCase()}`}
            className="bg-card rounded-xl p-6 flex items-center justify-center h-32 border hover:border-primary transition-colors"
          >
            <div className="relative h-12 w-32 brand-logo">
              <Image src={"/placeholder.svg?height=48&width=128"} alt={brand.name} fill className="object-contain" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
