"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSignup } from "@/hooks/useAuth";
import { SignupData, CareerGoal } from "@/services/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Link from "next/link";

export default function SignupPage() {
  const [form, setForm] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
    skills: "",
    careerGoal: undefined, // Use empty string for Select
    experience: "",
  });

  const signup = useSignup();

  const handleChange = (field: keyof SignupData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Cast careerGoal to CareerGoal type or undefined if empty
    signup.mutate({
      ...form,
      careerGoal: form.careerGoal ? (form.careerGoal as CareerGoal) : undefined,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Your Account 🚀
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>

          {/* Skills */}
          <div>
            <Label htmlFor="skills">Skills</Label>
            <Input
              id="skills"
              type="text"
              placeholder="React, Node.js, Tailwind"
              value={form.skills}
              onChange={(e) => handleChange("skills", e.target.value)}
            />
          </div>

          {/* Career Goal */}
          <div>
            <Label htmlFor="careerGoal">Career Goal</Label>
            <Select
              onValueChange={(value) => handleChange("careerGoal", value)}
              value={form.careerGoal}
            >
              <SelectTrigger id="careerGoal" className="w-full">
                <SelectValue placeholder="Select your career goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                <SelectItem value="Backend Developer">Backend Developer</SelectItem>
                <SelectItem value="Full Stack Developer">Full Stack Developer</SelectItem>
                <SelectItem value="UI/UX Designer">UI/UX Designer</SelectItem>
                <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                <SelectItem value="AI Engineer">AI Engineer</SelectItem>
                <SelectItem value="Cybersecurity Engineer">Cybersecurity Engineer</SelectItem>
                <SelectItem value="DevOps Engineer">DevOps Engineer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Experience */}
          <div>
            <Label htmlFor="experience">Experience</Label>
            <Textarea
              id="experience"
              placeholder="Describe your work experience..."
              value={form.experience}
              onChange={(e) => handleChange("experience", e.target.value)}
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            disabled={signup.isPending}
          >
            {signup.isPending ? "Signing up..." : "Sign Up"}
          </Button>

          {signup.isError && (
            <p className="text-red-500 mt-2">
              {(signup.error as any)?.message || "Signup failed"}
            </p>
          )}
          {signup.isSuccess && (
            <p className="text-green-500 mt-2">Signup successful!</p>
          )}
        </form>
     
        <div className="mt-6 flex items-center justify-center gap-1 text-sm text-gray-600">
          <p>Don't have an account?</p>
          <Link
            href="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}