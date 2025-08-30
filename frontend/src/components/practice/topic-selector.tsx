"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code, Database, Globe, Smartphone, Brain, Zap } from "lucide-react";

interface TopicSelectorProps {
  topics: string[];
  onStartInterview: (topic: string) => Promise<void> | void;
  loadingTopic: string | null;
}

const topicIcons: Record<string, any> = {
  Frontend: Globe,
  Backend: Database,
  Mobile: Smartphone,
  "Data Science": Brain,
  DevOps: Zap,
  "Full Stack": Code,
};

const topicDescriptions: Record<string, string> = {
  Frontend: "React, Vue, Angular, CSS, JavaScript fundamentals",
  Backend: "Node.js, Python, Java, APIs, system design",
  Mobile: "React Native, Flutter, iOS, Android development",
  "Data Science": "Python, ML algorithms, statistics, data analysis",
  DevOps: "Docker, Kubernetes, CI/CD, cloud platforms",
  "Full Stack": "End-to-end development, architecture, best practices",
};

export function TopicSelector({
  topics,
  onStartInterview,
}: TopicSelectorProps) {
  const [loadingTopic, setLoadingTopic] = useState<string | null>(null);

  const handleClick = async (topic: string) => {
    setLoadingTopic(topic);
    try {
      await onStartInterview(topic);
    } finally {
      setLoadingTopic(null);
    }
  };

  return (
    <motion.div
      key="topic-selector"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics?.map((topic, index) => {
          const Icon = topicIcons[topic] || Code;
          return (
            <motion.div
              key={topic}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="h-full cursor-pointer group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    {topic}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {topicDescriptions[topic] ||
                      "Technical interview questions and challenges"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button
                    onClick={() => handleClick(topic)}
                    disabled={loadingTopic === topic}
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    variant="outline"
                  >
                    {loadingTopic === topic ? "Starting..." : "Start Practice"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
