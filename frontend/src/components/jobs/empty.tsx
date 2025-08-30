import { Briefcase } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const EmptyState = () => (
  <Card className="border-gray-200 bg-gray-50/50">
    <CardContent className="pt-12 pb-12 text-center">
      <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="font-semibold text-gray-900 mb-2">No Jobs Found</h3>
      <p className="text-gray-600 mb-4">We couldn't find any jobs matching your current criteria.</p>
      <p className="text-sm text-gray-500">
        Try adjusting your search filters or check back later for new opportunities.
      </p>
    </CardContent>
  </Card>
)
export default EmptyState