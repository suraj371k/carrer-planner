"use client";
import { useCareerRoadmap, useGenerateCareerRoadmap } from "@/hooks/useCareer";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Rocket,
  Target,
  BookOpen,
  BarChart3,
  Calendar,
  GraduationCap,
  ExternalLink,
  Briefcase,
  Lightbulb,
  Plus,
} from "lucide-react";

const CareerPage = () => {
  const { data, isLoading, isError, error, refetch } = useCareerRoadmap();

  const { mutate: generateRoadmap, isPending: isGenerating } =
    useGenerateCareerRoadmap();

  const handleGenerateRoadmap = () => {
    generateRoadmap();
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600" />
          <p className="text-lg text-slate-600">
            Crafting your professional development plan...
          </p>
        </div>
      </div>
    );

  // Check if we have an error OR if we have no data
  const hasNoData =
    isError ||
    !data ||
    ((!data.milestones || data.milestones.length === 0) &&
      (!data.skills || data.skills.length === 0));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section - Always show this */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Professional Career Development Roadmap
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
            Your strategic pathway to career advancement. This personalized
            roadmap outlines key milestones, essential skills, and recommended
            courses to progress through each stage of your professional journey.
          </p>

          <Button
            onClick={handleGenerateRoadmap}
            disabled={isGenerating}
            className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Roadmap...
              </>
            ) : (
              <>
                <Rocket className="mr-2 h-5 w-5" />
                Generate Career Roadmap
              </>
            )}
          </Button>
        </motion.div>

        {/* Show empty state if no data */}
        {hasNoData && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
              <Plus className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              No Career Roadmap Yet
            </h2>
            <p className="text-slate-600 max-w-md mx-auto mb-6">
              Click the "Generate Career Roadmap" button above to create your
              personalized career development plan.
            </p>
          </motion.div>
        )}

        {/* Show content if we have data */}
        {!hasNoData && (
          <>
            {/* Milestones Section */}
            {data?.milestones && data.milestones.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-16"
              >
                <div className="flex items-center mb-8">
                  <Target className="h-6 w-6 text-blue-600 mr-2" />
                  <h2 className="text-2xl font-semibold text-slate-800">
                    Career Milestones
                  </h2>
                </div>

                <div className="space-y-8">
                  {data.milestones.map((m, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      <Card className="overflow-hidden border-slate-200 hover:shadow-md transition-shadow">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                            <CardTitle className="text-xl text-slate-800">
                              {m.stage}
                            </CardTitle>
                            <Badge
                              variant="outline"
                              className="bg-white text-slate-700 flex items-center self-start sm:self-auto"
                            >
                              <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                              <span className="truncate">
                                {m.estimated_time}
                              </span>
                            </Badge>
                          </div>
                          {m.dependencies && (
                            <CardDescription className="pt-2">
                              <span className="font-medium">
                                Dependencies:{" "}
                              </span>
                              {m.dependencies}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent className="pt-6">
                          <p className="text-slate-600">{m.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Skills Section */}
            {data?.skills && data.skills.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-16"
              >
                <div className="flex items-center mb-8">
                  <BookOpen className="h-6 w-6 text-blue-600 mr-2" />
                  <h2 className="text-2xl font-semibold text-slate-800">
                    Required Skills
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.skills.map((s, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                    >
                      <Card className="h-full border-slate-200 hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                            <CardTitle className="text-lg text-slate-800">
                              {s.name}
                            </CardTitle>
                            <Badge
                              className={`whitespace-nowrap ${
                                s.importance === "Critical"
                                  ? "bg-red-100 text-red-800"
                                  : s.importance === "High"
                                  ? "bg-orange-100 text-orange-800"
                                  : s.importance === "Medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {s.importance}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center">
                            <BarChart3 className="h-4 w-4 text-slate-500 mr-2 flex-shrink-0" />
                            <span className="text-sm text-slate-600">
                              Proficiency:{" "}
                            </span>
                            <div className="ml-2 flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <div
                                  key={star}
                                  className={`h-2 w-2 rounded-full mx-0.5 ${
                                    star <=
                                    (s.level === "Foundational"
                                      ? 2
                                      : s.level === "Intermediate"
                                      ? 3
                                      : 5)
                                      ? "bg-blue-600"
                                      : "bg-slate-200"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium text-slate-700 ml-2">
                              {s.level}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Courses Section */}
            {data?.courses && data.courses.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mb-16"
              >
                <div className="flex items-center mb-8">
                  <GraduationCap className="h-6 w-6 text-blue-600 mr-2" />
                  <h2 className="text-2xl font-semibold text-slate-800">
                    Recommended Courses
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.courses.map((course, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                    >
                      <Card className="h-full border-slate-200 hover:shadow-md transition-shadow flex flex-col">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg text-slate-800">
                            {course.name}
                          </CardTitle>
                          <CardDescription className="flex items-center">
                            <span>{course.provider}</span>
                            <Badge className="ml-2" variant="secondary">
                              {course.cost}
                            </Badge>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-sm text-slate-600">
                            Enhance your skills with this recommended course.
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button asChild variant="outline" className="w-full">
                            <a
                              href={course.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Course
                              <ExternalLink className="h-4 w-4 ml-2" />
                            </a>
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Additional Sections for Jobs and Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Job Opportunities */}
              {data?.jobs && data.jobs.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div className="flex items-center mb-6">
                    <Briefcase className="h-5 w-5 text-blue-600 mr-2" />
                    <h2 className="text-xl font-semibold text-slate-800">
                      Job Opportunities
                    </h2>
                  </div>

                  <Card className="border-slate-200">
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        {data.jobs.map((job, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 mr-3"></div>
                            <span className="text-slate-700">{job}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.section>
              )}

              {/* Career Tips */}
              {data?.tips && data.tips.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <div className="flex items-center mb-6">
                    <Lightbulb className="h-5 w-5 text-blue-600 mr-2" />
                    <h2 className="text-xl font-semibold text-slate-800">
                      Career Tips
                    </h2>
                  </div>

                  <Card className="border-slate-200">
                    <CardContent className="pt-6">
                      <ul className="space-y-3">
                        {data.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 mr-3"></div>
                            <span className="text-slate-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.section>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CareerPage;
