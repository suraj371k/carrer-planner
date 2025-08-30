"use client";

import { useProfile } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import ProtectedLayout from "@/components/ProtectedRoute";

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
      <div className="flex justify-center mt-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-lg border border-gray-200 dark:border-gray-700">
            <CardHeader className="text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl font-bold mx-auto">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <CardTitle className="mt-4 text-xl">{user.name}</CardTitle>
              <p className="text-sm text-gray-500">{user.email}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">Skills</p>
                <p className="text-sm font-medium">{user.skills || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Career Goal</p>
                <p className="text-sm font-medium">
                  {user.careerGoal || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Experience</p>
                <p className="text-sm font-medium">
                  {user.experience || "N/A"}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </ProtectedLayout>
  );
}
