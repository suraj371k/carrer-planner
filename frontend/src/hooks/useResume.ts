import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { backendUrl } from '../lib/backendUrl';


export interface ResumeAnalysis {
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  keywordAnalysis: {
    present: string[];
    missing: string[];
  };
  sections: {
    contactInfo: { score: number; feedback: string };
    summary: { score: number; feedback: string };
    experience: { score: number; feedback: string };
    education: { score: number; feedback: string };
    skills: { score: number; feedback: string };
  };
  formatting: { score: number; feedback: string };
  recommendations: string[];
}

export interface Resume {
  _id: string;
  userId: string;
  filename: string;
  originalText: string;
  analysis: ResumeAnalysis;
  sections: ResumeAnalysis['sections'];
  formatting: ResumeAnalysis['formatting'];
  recommendations: string[];
  analyzeAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResumeAnalytics {
  totalAnalyses: number;
  averageScore: number;
  topStrengths: Array<{ strength: string; count: number }>;
  commonWeaknesses: Array<{ weakness: string; count: number }>;
  improvementTrend: Array<{ date: string; score: number }>;
  sectionAverages: {
    contactInfo: number;
    summary: number;
    experience: number;
    education: number;
    skills: number;
    formatting: number;
  };
}

export interface UploadResumeResponse {
  success: boolean;
  message: string;
  resumeId: string;
  fileUrl: string;
  analysis: ResumeAnalysis;
}

export interface GetResumesResponse {
  success: boolean;
  resumes: Resume[];
}

export interface GetResumeResponse {
  success: boolean;
  resume: Resume;
}

export interface AnalyticsResponse {
  success: boolean;
  data: ResumeAnalytics;
}

const uploadResume = async (file: File): Promise<UploadResumeResponse> => {
  const formData = new FormData();
  formData.append('resume', file);

  try {
    const response = await axios.post<UploadResumeResponse>(
      `${backendUrl}/api/resume/upload`,
      formData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to upload resume');
  }
};

const getResumes = async (): Promise<GetResumesResponse> => {
  try {
    const response = await axios.get<GetResumesResponse>(`${backendUrl}/api/resume`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch resumes');
  }
};

const getResumeById = async (id: string): Promise<GetResumeResponse> => {
  try {
    const response = await axios.get<GetResumeResponse>(`${backendUrl}/api/resume/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch resume');
  }
};

const deleteResume = async (id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios.delete<{ success: boolean; message: string }>(
      `${backendUrl}/api/resume/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete resume');
  }
};

const getResumeAnalytics = async (): Promise<AnalyticsResponse> => {
  try {
    const response = await axios.get<AnalyticsResponse>(`${backendUrl}/api/resume/analytics/stats`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch analytics');
  }
};

// Custom hook
export const useResume = () => {
  const queryClient = useQueryClient();

  // Query keys
  const resumeKeys = {
    all: ['resumes'] as const,
    lists: () => [...resumeKeys.all, 'list'] as const,
    list: (filters: string) => [...resumeKeys.lists(), { filters }] as const,
    details: () => [...resumeKeys.all, 'detail'] as const,
    detail: (id: string) => [...resumeKeys.details(), id] as const,
    analytics: () => [...resumeKeys.all, 'analytics'] as const,
  };

  // Get all resumes
  const {
    data: resumes,
    isLoading: isLoadingResumes,
    error: resumesError,
    refetch: refetchResumes,
  } = useQuery({
    queryKey: resumeKeys.lists(),
    queryFn: getResumes,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Get specific resume
  const getResume = (id: string) => {
    return useQuery({
      queryKey: resumeKeys.detail(id),
      queryFn: () => getResumeById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    });
  };

  // Get analytics
  const {
    data: analytics,
    isLoading: isLoadingAnalytics,
    error: analyticsError,
    refetch: refetchAnalytics,
  } = useQuery({
    queryKey: resumeKeys.analytics(),
    queryFn: getResumeAnalytics,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });

  // Upload resume mutation
  const uploadResumeMutation = useMutation({
    mutationFn: uploadResume,
    onSuccess: (data) => {
      // Invalidate and refetch resumes list
      queryClient.invalidateQueries({ queryKey: resumeKeys.lists() });
      // Invalidate analytics
      queryClient.invalidateQueries({ queryKey: resumeKeys.analytics() });
      
      // Add the new resume to the cache
      queryClient.setQueryData(resumeKeys.lists(), (old: GetResumesResponse | undefined) => {
        if (!old) return old;
        return {
          ...old,
          resumes: [data, ...old.resumes],
        };
      });
    },
    onError: (error) => {
      console.error('Upload resume error:', error);
    },
  });

  // Delete resume mutation
  const deleteResumeMutation = useMutation({
    mutationFn: deleteResume,
    onSuccess: (data, deletedId) => {
      // Invalidate and refetch resumes list
      queryClient.invalidateQueries({ queryKey: resumeKeys.lists() });
      // Invalidate analytics
      queryClient.invalidateQueries({ queryKey: resumeKeys.analytics() });
      
      // Remove the deleted resume from cache
      queryClient.setQueryData(resumeKeys.lists(), (old: GetResumesResponse | undefined) => {
        if (!old) return old;
        return {
          ...old,
          resumes: old.resumes.filter(resume => resume._id !== deletedId),
        };
      });
      
      // Remove the specific resume from cache
      queryClient.removeQueries({ queryKey: resumeKeys.detail(deletedId) });
    },
    onError: (error) => {
      console.error('Delete resume error:', error);
    },
  });

  // Helper functions
  const uploadResumeFile = (file: File) => {
    return uploadResumeMutation.mutateAsync(file);
  };

  const deleteResumeById = (id: string) => {
    return deleteResumeMutation.mutateAsync(id);
  };

  return {
    // Data
    resumes: resumes?.resumes || [],
    analytics: analytics?.data,
    
    // Loading states
    isLoadingResumes,
    isLoadingAnalytics,
    isUploading: uploadResumeMutation.isPending,
    isDeleting: deleteResumeMutation.isPending,
    
    // Error states
    resumesError,
    analyticsError,
    uploadError: uploadResumeMutation.error,
    deleteError: deleteResumeMutation.error,
    
    // Actions
    uploadResumeFile,
    deleteResumeById,
    getResume,
    refetchResumes,
    refetchAnalytics,
    
    // Mutations (for advanced usage)
    uploadResumeMutation,
    deleteResumeMutation,
  };
};

// Individual hooks for specific use cases
export const useResumeList = () => {
  const { resumes, isLoadingResumes, resumesError, refetchResumes } = useResume();
  return { resumes, isLoadingResumes, resumesError, refetchResumes };
};

export const useResumeAnalytics = () => {
  const { analytics, isLoadingAnalytics, analyticsError, refetchAnalytics } = useResume();
  return { analytics, isLoadingAnalytics, analyticsError, refetchAnalytics };
};

export const useResumeUpload = () => {
  const { uploadResumeFile, isUploading, uploadError } = useResume();
  return { uploadResumeFile, isUploading, uploadError };
};

export const useResumeDelete = () => {
  const { deleteResumeById, isDeleting, deleteError } = useResume();
  return { deleteResumeById, isDeleting, deleteError };
};
