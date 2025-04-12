import { Suspense } from "react"
import HeroSection from "@/components/hero-section"
import FeaturedCars from "@/components/featured-cars"
import HowItWorks from "@/components/how-it-works"
import PopularBrands from "@/components/popular-brands"
import Testimonials from "@/components/testimonials"
import CallToAction from "@/components/call-to-action"
import Loading from "@/components/loading"

export default function Home() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <HeroSection />
        <FeaturedCars />
        <HowItWorks />
        <PopularBrands />
        <Testimonials />
        <CallToAction />
      </Suspense>
    </main>
  )
}
