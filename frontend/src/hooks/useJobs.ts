// src/hooks/useJobs.ts
import { backendUrl } from '@/lib/backendUrl';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Job {
  title: string;
  company: string;
  location: string;
  link: string;
  postedWhen: string;
  matchScore: number;
}

export const useJobs = () => {
  return useQuery<Job[]>({
    queryKey: ['jobs'],
    queryFn: async () => {
      const { data } = await axios.get(`${backendUrl}/api/jobs` , {withCredentials: true});
      return data.jobs;
    },
    staleTime: 1000 * 60 * 5, 
  });
};