import { backendUrl } from "@/lib/backendUrl";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type Session = {
  userId: string;
  count: number;
  track: string;
  score: number;
  createdAt: Date;
  correctCount: number;
  incorrectCount: number
};

export function useSessions() {
  return useQuery<Session[]>({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await axios.get(`${backendUrl}/api/interview/user-sessions`, {
        withCredentials: true,
      });
      return res.data.data;
    },
    staleTime: 1000 * 60, // optional: keep cached for 1 min
  });
}
