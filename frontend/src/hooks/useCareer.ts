"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { backendUrl } from "@/lib/backendUrl";
import axios from "axios";

export interface CareerRoadmap {
  milestones: {
    stage: string;
    description: string;
    estimated_time: string;
    dependencies: string;
  }[];
  skills: {
    name: string;
    importance: string;
    level: "Foundational" | "Intermediate" | "Advanced" | string;
  }[];
  courses: {
    name: string;
    provider: string;
    cost: string;
    link: string;
  }[];
  jobs: string[];
  tips: string[];
}

interface RoadmapApiResponse {
  success: boolean;
  roadmaps: CareerRoadmap[]; 
}

interface GenerateRoadmapResponse {
  success: boolean;
  message: string;
  roadmap?: CareerRoadmap;
  roadmaps?: CareerRoadmap[];
}

const fetchRoadmap = async (): Promise<CareerRoadmap> => {
  const { data } = await axios.get<RoadmapApiResponse>(
    `${backendUrl}/api/career/roadmaps`,
    { withCredentials: true }
  );

  if (!data.roadmaps || data.roadmaps.length === 0) {
    throw new Error("No roadmap data returned from API");
  }

  return data.roadmaps[0]; // ✅ take the first roadmap
};

const generateRoadmap = async (): Promise<CareerRoadmap> => {
  const { data } = await axios.post<GenerateRoadmapResponse>(
    `${backendUrl}/api/career`,
    {},
    { withCredentials: true }
  );

  if (!data.success) {
    throw new Error(data.message || "Failed to generate roadmap");
  }

  // Handle both response formats
  if (data.roadmap) {
    return data.roadmap;
  } else if (data.roadmaps && data.roadmaps.length > 0) {
    return data.roadmaps[0];
  } else {
    throw new Error("No roadmap data returned from generation");
  }
};

export const useGenerateCareerRoadmap = () => {
  const queryClient = useQueryClient();

  return useMutation<CareerRoadmap, Error, void>({
    mutationFn: generateRoadmap,
    onSuccess: (newRoadmap) => {
      // Update the query data with the newly generated roadmap
      queryClient.setQueryData(["career-roadmap"], newRoadmap);
    },
    onError: (error) => {
      console.error("Failed to generate roadmap:", error);
    },
  });
};


export const useCareerRoadmap = () => {
  return useQuery<CareerRoadmap, Error>({
    queryKey: ["career-roadmap"],
    queryFn: fetchRoadmap,
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 1,
  });
};

