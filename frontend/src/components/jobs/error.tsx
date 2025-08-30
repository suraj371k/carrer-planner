"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ErrorStateProps {
  error: Error
  onRetry?: () => void
}

const ErrorState = ({ error, onRetry }: ErrorStateProps) => (
  <Card className="border-red-200 bg-red-50/50">
    <CardContent className="pt-6">
      <div className="flex items-start gap-4">
        <AlertCircle className="h-6 w-6 text-red-500 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-red-900 mb-2">Unable to Load Job Recommendations</h3>
          <p className="text-red-700 mb-4">{error.message}</p>
          {onRetry && (
            <Button
              variant="outline"
              onClick={onRetry}
              className="border-red-200 text-red-700 hover:bg-red-50 bg-transparent"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
)

export default ErrorState