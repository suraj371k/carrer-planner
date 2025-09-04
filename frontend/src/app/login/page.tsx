"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/useAuth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Suspense } from "react";


const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const login = useLogin();

  const searchParams = useSearchParams();

  useEffect(() => {
    const message = searchParams.get("message");
    if (message === "login-required") {
      toast.error("Please login to view this page");
    }
  }, [searchParams]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login.mutateAsync(form);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              required
              placeholder="you@example.com"
              className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
              required
              placeholder="••••••••"
              className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            disabled={login.isPending}
          >
            {login.isPending ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-1 text-sm text-gray-600">
          <p>Don't have an account?</p>
          <Link
            href="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
    </Suspense>
  );
};

export default LoginPage;