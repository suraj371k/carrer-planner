"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { Question } from "@/hooks/usePractice";
import { Circle, Trophy, Clock } from "lucide-react";

interface QuestionCardProps {
  question?: Question;
  currentIndex: number;
  totalQuestions?: number;
  score: number;
  onSubmitAnswer: (answerIndex: number) => void;
  isSubmitting: boolean;
}

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions = 20,
  score,
  onSubmitAnswer,
  isSubmitting,
}: QuestionCardProps) {
  const safeIndex = Number.isFinite(currentIndex) ? currentIndex : 0;
  const safeTotal =
    Number.isFinite(totalQuestions) && totalQuestions > 0 ? totalQuestions : 1;
  const progress = ((safeIndex + 1) / safeTotal) * 100;

 

  if (!question) {
    return (
      <p className="text-center text-gray-500 mt-10">Loading question...</p>
    );
  }

  return (
    <motion.div
      key={`question-${currentIndex}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="shadow-xl border-2">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge
              style={{ backgroundColor: "#e5e7eb", color: "#111827" }}
              className="text-sm"
            >
              Question {safeIndex + 1}
            </Badge>

            <div className="flex items-center gap-4">
              {/* Score */}
              <div className="flex items-center gap-1">
                <Trophy className="h-4 w-4" style={{ color: "#facc15" }} />
                <span className="font-semibold">Score: {score}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question */}
          <CardTitle className="text-xl md:text-2xl leading-relaxed">
            {question.questionText || "No question text available"}
          </CardTitle>
        </CardHeader>

        {/* Options */}
        <CardContent className="space-y-3">
          {Array.isArray(question.options) && question.options.length > 0 ? (
            question.options.map((option, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <Button
                  onClick={() => onSubmitAnswer(idx)}
                  disabled={isSubmitting}
                  variant="outline"
                  style={{
                    color: "#111827",
                    borderColor: "#d1d5db",
                  }}
                  className="w-full justify-start text-left h-auto p-4 transition-all duration-200 hover:shadow-md"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#e0f2fe";
                    e.currentTarget.style.borderColor = "#0284c7";
                    e.currentTarget.style.color = "#111827";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.color = "#111827";
                  }}
                >
                  <div className="flex items-start gap-3">
                    <Circle
                      className="h-5 w-5 mt-0.5"
                      style={{ color: "#6b7280" }}
                    />
                    <span className="flex-1 break-words">{option}</span>
                  </div>
                </Button>
              </motion.div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No options available.</p>
          )}

          {/* Loading state after submit */}
          {isSubmitting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-4"
            >
              <div className="inline-flex items-center gap-2 text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                Processing your answer...
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
