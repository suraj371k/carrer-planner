"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useTopics,
  useStartInterview,
  useSubmitAnswer,
  type Question,
} from "@/hooks/usePractice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { TopicSelector } from "@/components/practice/topic-selector";
import { QuestionCard } from "@/components/practice/question-card";
import { CompletionCard } from "@/components/practice/completion-card";
import { LoadingSpinner } from "@/components/practice/loading-spinner";

export default function PracticePage() {
  const { data: topics, isLoading, isError, error } = useTopics();
  const startInterview = useStartInterview();
  const submitAnswer = useSubmitAnswer();

  const [sessionId, setSessionId] = useState<string>("");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [loadingTopic, setLoadingTopic] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleStartInterview = async (topic: string) => {
    setLoadingTopic(topic);
    try {
      await startInterview.mutateAsync(
        { track: topic as any },
        {
          onSuccess: (data) => {
            setSessionId(data.sessionId);
            setCurrentQuestion(data.currentQuestion);
            setCurrentIndex(data.currentIndex ?? 0);
            setScore(0);
            setCompleted(false);
          },
        }
      );
    } finally {
      setLoadingTopic(null);
    }
  };

  // Handle answer click → submit answer
  const handleSubmitAnswer = (answerIndex: number) => {
    if (!sessionId) return;

    submitAnswer.mutate(
      { sessionId, answerIndex },
      {
        onSuccess: (data) => {
          setScore(data.currentScore);
          if (data.completed) {
            setCompleted(true);
          } else {
            setCurrentQuestion(data.nextQuestion ?? null);
            setCurrentIndex(data.currentIndex ?? 0);
          }
        },
      }
    );
  };


  const handleRestart = () => {
    setSessionId("");
    setCurrentQuestion(null);
    setScore(0);
    setCompleted(false);
    setCurrentIndex(0);
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{error.message}</p>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="relative container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <Brain className="h-12 w-12 text-primary mr-3" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Interview Practice
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Master your technical interviews with AI-powered practice
              sessions. Choose your track and start building confidence today.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!sessionId ? (
              <TopicSelector
                topics={topics || []}
                onStartInterview={handleStartInterview}
                loadingTopic={loadingTopic}
                // isLoading={startInterview.isPending}
              />
            ) : completed ? (
              <CompletionCard score={score} onRestart={handleRestart} />
            ) : currentQuestion ? (
              <QuestionCard
                question={currentQuestion}
                currentIndex={currentIndex}
                score={score}
                onSubmitAnswer={handleSubmitAnswer}
                isSubmitting={submitAnswer.isPending}
              />
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
