"use client";

import { useProfile } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import ProtectedLayout from "@/components/ProtectedRoute";
import { Badge } from "@/components/ui/badge";
import { Mail, Briefcase, Target, Award } from "lucide-react";

export default function ProfilePage() {
  const { data: user, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <Card className="w-full max-w-md p-6 space-y-4">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-36" />
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center mt-10 text-gray-500">
        No profile data found.
      </div>
    );
  }

  return (
    <ProtectedLayout>
      <div className="mx-auto mt-6 px-4 w-full max-w-5xl">
        {/* Banner */}
        <div className="relative h-36 md:h-44 w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_35%),radial-gradient(circle_at_80%_30%,white,transparent_35%)]" />
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="-mt-10 md:-mt-12"
        >
          <Card className="shadow-lg border border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full ring-4 ring-white dark:ring-gray-900 bg-gradient-to-br from-blue-500 to-purple-500 text-white text-3xl font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="absolute -bottom-1 -right-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs ring-2 ring-white dark:ring-gray-900">✓</span>
                  </div>
                  <div>
                    <CardTitle className="text-2xl md:text-3xl leading-tight">{user.name}</CardTitle>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {user.careerGoal ? (
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 border border-blue-200">
                      <Target className="mr-1 h-3.5 w-3.5" />
                      {user.careerGoal}
                    </Badge>
                  ) : null}
                  {user.experience ? (
                    <Badge variant="outline" className="border-purple-300 text-purple-700">
                      <Briefcase className="mr-1 h-3.5 w-3.5" />
                      {user.experience}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Skills */}
                <div className="md:col-span-2">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Skills</h3>
                  {user.skills ? (
                    <div className="flex flex-wrap gap-2">
                      {user.skills
                        .split(",")
                        .map((s: string) => s.trim())
                        .filter(Boolean)
                        .map((skill: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                            {skill}
                          </Badge>
                        ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No skills provided.</p>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-700">Highlights</h3>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
                    <Award className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-blue-700">Career Goal</p>
                      <p className="text-sm font-medium text-blue-800">{user.careerGoal || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 border border-purple-100">
                    <Briefcase className="h-5 w-5 text-purple-700" />
                    <div>
                      <p className="text-xs text-purple-800">Experience</p>
                      <p className="text-sm font-medium text-purple-900">{user.experience || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </ProtectedLayout>
  );
}
