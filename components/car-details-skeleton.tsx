import { Skeleton } from "@/components/ui/skeleton"

export default function CarDetailsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      <Skeleton className="h-[500px] rounded-xl" />

      <div className="space-y-6">
        <div>
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-5 w-1/3" />
        </div>

        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-5 w-5 rounded-full" />
          ))}
          <Skeleton className="h-5 w-24 ml-2" />
        </div>

        <Skeleton className="h-10 w-1/3" />

        <Skeleton className="h-1 w-full" />

        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <div>
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          ))}
        </div>

        <Skeleton className="h-1 w-full" />

        <div>
          <Skeleton className="h-7 w-40 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 flex-1" />
        </div>
      </div>
    </div>
  )
}
