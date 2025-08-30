"use client"

import { motion } from "framer-motion"
import { Briefcase, Star, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StatsCardsProps {
  statsData: {
    total: number
    highMatch: number
    avgMatch: number
  }
}

const StatsCards = ({ statsData }: StatsCardsProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="grid grid-cols-1 md:grid-cols-3 gap-4"
  >
    <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-blue-100/50">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">Total Opportunities</p>
            <p className="text-2xl font-bold text-blue-900">{statsData.total}</p>
          </div>
          <Briefcase className="h-8 w-8 text-blue-500" />
        </div>
      </CardContent>
    </Card>

    <Card className="border-0 shadow-sm bg-gradient-to-r from-emerald-50 to-emerald-100/50">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-600">High Matches</p>
            <p className="text-2xl font-bold text-emerald-900">{statsData.highMatch}</p>
          </div>
          <Star className="h-8 w-8 text-emerald-500" />
        </div>
      </CardContent>
    </Card>

    <Card className="border-0 shadow-sm bg-gradient-to-r from-amber-50 to-amber-100/50">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-amber-600">Avg. Match Score</p>
            <p className="text-2xl font-bold text-amber-900">{statsData.avgMatch}%</p>
          </div>
          <TrendingUp className="h-8 w-8 text-amber-500" />
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

export default StatsCards