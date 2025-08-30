import { backendUrl } from "@/lib/backendUrl";
import axios, { AxiosError } from "axios";

export type CareerGoal =
  | "Frontend Developer"
  | "Full Stack Developer"
  | "Backend Developer"
  | "Data Scientist"
  | "AI Engineer"
  | "Cybersecurity Engineer"
  | "DevOps Engineer"
  | "UI/UX Designer";

export interface SignupData {
  name: string;
  email: string;
  password: string;
  skills?: string;
  careerGoal?: CareerGoal;
  experience?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string>;
}

// Helper function to handle axios errors
const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;
    const errorMessage =
      axiosError.response?.data?.message ||
      axiosError.message ||
      "An unexpected error occurred";
    const statusCode = axiosError.response?.status;

    throw new Error(`${errorMessage}${statusCode ? ` (${statusCode})` : ""}`);
  }
  throw new Error("An unknown error occurred");
};

export async function signupUser(data: SignupData): Promise<{ user: any }> {
  try {
    const res = await axios.post(`${backendUrl}/api/users/register`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    handleApiError(error);
    // The following line is unreachable, but ensures TypeScript sees a return
    return {} as { user: any };
  }
}

export async function loginUser(data: LoginData): Promise<{ user: any }> {
  try {
    const res = await axios.post(`${backendUrl}/api/users/login`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    handleApiError(error);
    // The following line is unreachable, but ensures TypeScript sees a return
    return {} as { user: any };
  }
}

export async function fetchProfile(): Promise<{ user: any }> {
  try {
    const res = await axios.get(`${backendUrl}/api/users/profile`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    handleApiError(error);
    // The following line is unreachable, but ensures TypeScript sees a return
    return {} as { user: any };
  }
}

export async function logout(): Promise<void> {
  try {
    await axios.post(
      `${backendUrl}/api/users/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    handleApiError(error);
  }
}
