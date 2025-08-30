"use client"

import { motion } from "framer-motion"
import { Brain } from "lucide-react"

export function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="mx-auto"
        >
          <Brain className="h-12 w-12 text-primary" />
        </motion.div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Loading Practice Topics</h3>
          <p className="text-muted-foreground">Preparing your interview experience...</p>
        </div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="h-1 bg-primary rounded-full max-w-xs mx-auto"
        />
      </motion.div>
    </div>
  )
}
