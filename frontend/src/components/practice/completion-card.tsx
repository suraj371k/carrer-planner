"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, RotateCcw, TrendingUp } from "lucide-react"

interface CompletionCardProps {
  score: number
  onRestart: () => void
}

export function CompletionCard({ score, onRestart }: CompletionCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "Outstanding! You're interview-ready!"
    if (score >= 80) return "Excellent work! Just a bit more practice."
    if (score >= 70) return "Good job! Keep practicing to improve."
    if (score >= 60) return "Not bad! Focus on your weak areas."
    return "Keep practicing! You'll get there."
  }

  return (
    <motion.div
      key="completion-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="text-center shadow-2xl border-2">
        <CardHeader className="space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto"
          >
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-yellow-400/20"></div>
              <Trophy className="h-16 w-16 text-yellow-500 relative z-10" />
            </div>
          </motion.div>

          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold">Interview Completed!</CardTitle>
            <p className="text-muted-foreground">{getScoreMessage(score)}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-2">
              <Star className="h-6 w-6 text-yellow-500" />
              <span className="text-sm text-muted-foreground">Final Score</span>
            </div>

            <div className={`text-6xl font-bold ${getScoreColor(score)}`}>
              {score}
              <span className="text-2xl text-muted-foreground">/100</span>
            </div>

            <Badge
              variant={score >= 80 ? "default" : score >= 60 ? "secondary" : "destructive"}
              className="text-sm px-4 py-1"
            >
              {score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs Improvement"}
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button onClick={onRestart} size="lg" className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Start New Interview
            </Button>

            <Button variant="outline" size="lg" className="flex items-center gap-2 bg-transparent">
              <TrendingUp className="h-4 w-4" />
              View Progress
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
