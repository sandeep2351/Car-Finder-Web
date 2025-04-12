import { Search, Car, CheckCircle } from "lucide-react"

export default function HowItWorks() {
  return (
    <section className="bg-muted py-16" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How RideHub Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Finding your perfect car has never been easier. Follow these simple steps to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Search & Filter</h3>
            <p className="text-muted-foreground">
              Use our powerful search tools to find cars that match your exact requirements and preferences.
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Car className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Compare & Choose</h3>
            <p className="text-muted-foreground">
              Compare different models, save your favorites, and choose the car that best fits your needs.
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Contact & Purchase</h3>
            <p className="text-muted-foreground">
              Contact the dealer, schedule a test drive, and complete your purchase with confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
