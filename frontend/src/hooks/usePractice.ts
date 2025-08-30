import { backendUrl } from "@/lib/backendUrl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";


export type TrackType = "frontend" | "backend" | "fullstack" | "devops";

export interface Question {
  questionId?: string;
  questionText?: string;
  options: string[];
  correctAnswer: string;
  userAnswer?: string;
  isCorrect?: boolean;
}

export interface SubscriptionResponse {
  success: boolean;
  plan: "free" | "basic" | "pro" | "premium";
  testTakenToday: number;
  endDate?: Date;
}


export interface StartInterviewResponse {
  success: boolean;
  sessionId: string;
  track: TrackType;
  currentQuestion: Question;
  startTime: Date;
  duration: number;
  currentIndex: number;
  totalQuestions: number;
  message: string;
}

export interface SubmitAnswerResponse {
  success: boolean;
  isCorrect: boolean;
  scoreChange: number;
  currentScore: number;
  nextQuestion?: Question;
  currentIndex?: number;
  completed: boolean;
  finalScore?: number;
  timeRemaining?: number;
  totalQuestions?: number;
}

interface StartInterviewPayload {
  track: TrackType;
}

interface SubmitAnswerPayload {
  sessionId: string;
  answerIndex: number;
}


export type TopicResponse = {
  success: boolean;
  data: string[]; 
};

// ===== API calls =====
const startInterviewFn = async (payload: StartInterviewPayload) => {
  const res = await axios.post<StartInterviewResponse>(
    `${backendUrl}/api/interview/start`,
    payload , {withCredentials: true}
  );
  return res.data;
};

const submitAnswerFn = async (payload: SubmitAnswerPayload) => {
  const res = await axios.post<SubmitAnswerResponse>(
    `${backendUrl}/api/interview/answer`,
    payload , {withCredentials: true}
  );
  return res.data;
};


//hooks
export function useStartInterview() {
  return useMutation({
    mutationFn: startInterviewFn,
  });
}

export function useSubmitAnswer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitAnswerFn,
    onSuccess: (data) => {
      // Optional: update interview state in cache if stored
      if (!data.completed) {
        queryClient.setQueryData<Question>(
          ["currentQuestion", data.currentIndex],
          data.nextQuestion
        );
      }
    },
  });
}

export const useSubscription = () => {
  return useQuery<SubscriptionResponse, AxiosError>({
    queryKey: ["subscription"],
    queryFn: async () => {
      const res = await axios.get<SubscriptionResponse>(
        `${backendUrl}/api/user/subscription`,
        { withCredentials: true }
      );
      return res.data;
    },
  });
};





export const useTopics = () => {
  return useQuery<string[], AxiosError>({
    queryKey: ["topics"],
    queryFn: async () => {
      const res = await axios.get<TopicResponse>(
        "http://localhost:5000/api/interview/tracks",
        { withCredentials: true }
      );
      return res.data.data; // returns string[]
    },
  });
};
