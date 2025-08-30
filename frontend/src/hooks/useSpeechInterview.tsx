import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface StartInterviewPayload {
  userId: string;
  category: string; // e.g. "frontend" | "backend" | "system-design" etc
}

interface StartInterviewResponse {
  interviewId: string;
  questions: string[];
}

interface FinishInterviewPayload {
  interviewId: string;
}

interface FinishInterviewResponse {
  score: number;
  transcripts: {
    question: string;
    answer: string;
    evaluation: string;
  }[];
}

export function useStartInterview() {
  return useMutation<StartInterviewResponse, Error, StartInterviewPayload>({
    mutationFn: async (payload: StartInterviewPayload) => {
      const res = await axios.post("/api/interview/start-voice", payload);
      return res.data;
    },
  });
}

export function useFinishInterview() {
  const queryClient = useQueryClient();

  return useMutation<FinishInterviewResponse, Error, FinishInterviewPayload>({
    mutationFn: async ({ interviewId }) => {
      const res = await axios.post(`/api/interview/finish/${interviewId}`);
      return res.data;
    },
    onSuccess: () => {
      // Invalidate interview-related queries if needed
      queryClient.invalidateQueries({ queryKey: ["interviews"] });
    },
  });
}
