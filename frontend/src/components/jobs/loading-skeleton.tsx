import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const LoadingSkeleton = () => (
  <div className="grid gap-6  mt-20 max-w-6xl mx-auto grid-cols-1">
    {[...Array(6)].map((_, i) => (
      <Card key={i} className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <Skeleton className="h-6 w-4/5 mb-3" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-8 w-full mt-4" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
)
export default LoadingSkeleton