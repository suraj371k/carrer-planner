"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  signupUser,
  loginUser,
  fetchProfile,
  SignupData,
  LoginData,
  logout,
} from "@/services/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useSignup() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (data: SignupData) => signupUser(data),
    onSuccess: () => {
      // refetch profile after signup
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Signup Successfully")
      router.push("/login");
    },
    onError: (error: Error) => {
        toast.error(error.message || "Login failed check your credentials")
    }
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (data: LoginData) => loginUser(data),
    onSuccess: () => {
      // refetch profile after login
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Login Successfully")
      router.push("/");
    },
     onError: (error: Error) => {
        toast.error(error.message || "Signup Failed")
    }
  });
}

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetchProfile();
      return res.user;
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      // Clear profile data from cache
      queryClient.removeQueries({ queryKey: ["profile"] });
    },
     onError: (error: Error) => {
        toast.error(error.message || "Logout failed")
    }
  });
}
