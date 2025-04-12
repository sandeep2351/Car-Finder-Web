import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"

export default function CarListingHeader() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Browse Cars</h1>
      <p className="text-muted-foreground mb-4">Find your perfect match from our extensive collection</p>

      <Button variant="outline" className="lg:hidden flex items-center gap-2 mb-4" asChild>
        <label htmlFor="filter-drawer" className="cursor-pointer">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </label>
      </Button>
    </div>
  )
}
