"use client"
import type { Job } from "@/hooks/useJobs"
import { motion } from "framer-motion"
import { ExternalLink, Star, Building2, MapPin, Clock } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface JobCardProps {
  job: Job
  index: number
}

const JobCard = ({ job, index }: JobCardProps) => {
  const getMatchScoreColor = (score: number) => {
    if (score >= 20) return "bg-emerald-100 text-emerald-800 border-emerald-200"
    if (score >= 15) return "bg-blue-100 text-blue-800 border-blue-200"
    if (score >= 10) return "bg-amber-100 text-amber-800 border-amber-200"
    return "bg-gray-100 text-gray-800 border-gray-200"
  }

  const getMatchScoreLabel = (score: number) => {
    if (score >= 20) return "Excellent Match"
    if (score >= 15) return "Great Match"
    if (score >= 10) return "Good Match"
    return "Fair Match"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-sm bg-gradient-to-br from-white to-gray-50/30">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg font-semibold leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                {job.title}
              </CardTitle>
              <CardDescription className="flex items-center text-gray-600 font-medium">
                <Building2 className="h-4 w-4 mr-2 text-gray-500" />
                {job.company}
              </CardDescription>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge className={`${getMatchScoreColor(job.matchScore)} font-medium px-3 py-1 text-xs`}>
                <Star className="h-3 w-3 mr-1" />
                {job.matchScore}%
              </Badge>
              <span className="text-xs text-gray-500 font-medium">{getMatchScoreLabel(job.matchScore)}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              <span className="font-medium">{job.location || "Location not specified"}</span>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2 text-gray-400" />
              <span>Posted {job.postedWhen || "recently"}</span>
            </div>

            <div className="pt-2">
              <Button
                variant="default"
                size="sm"
                className="w-full group-hover:bg-blue-600 transition-colors font-medium"
                asChild
              >
                <a
                  href={
                    job.link === "#"
                      ? `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(job.title)}`
                      : job.link
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Position
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default JobCard