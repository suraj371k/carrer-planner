"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Home, Rocket, BookOpen, TrendingUp, Star, Target, Brain, Award } from "lucide-react"  
import { useRouter } from "next/navigation"
import { useCareerRoadmap } from "@/hooks/useCareer"
import ProtectedRoute from "@/components/ProtectedRoute"

const CareerPlanner = () => {
  const items = [
    {
      id: 1,
      icon: <Home />,
      heading: "Personalized Roadmaps",
      para: "Receive a tailored career roadmap based on your skills, interest and goals.",
    },
    {
      id: 2,
      icon: <BookOpen />,
      heading: "Expert Guidance",
      para: "Benefit from the expertise of industry professionals and career advisors.",
    },
    {
      id: 3,
      icon: <TrendingUp />,
      heading: "Up-to-Date Insights",
      para: "Stay informed about the latest trends, technologies, and job opportunities in the AI field.",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "ML Engineer at Google",
      content:
        "This platform helped me transition from software development to machine learning. The roadmap was incredibly detailed and practical.",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "AI Research Scientist",
      content:
        "The personalized guidance and industry insights were exactly what I needed to advance my career in AI research.",
      rating: 5,
    },
    {
      name: "Elena Rodriguez",
      role: "Data Scientist at Microsoft",
      content:
        "From beginner to professional in 18 months. The structured approach made all the difference in my learning journey.",
      rating: 5,
    },
  ]

  const steps = [
    {
      step: "01",
      title: "Assessment",
      description: "Complete our comprehensive skills and interests assessment to understand your current position.",
      icon: <Target className="h-8 w-8" />,
    },
    {
      step: "02",
      title: "AI Analysis",
      description: "Our AI analyzes your profile against thousands of career paths and industry requirements.",
      icon: <Brain className="h-8 w-8" />,
    },
    {
      step: "03",
      title: "Roadmap Creation",
      description: "Receive a detailed, step-by-step roadmap with timelines, resources, and milestones.",
      icon: <Award className="h-8 w-8" />,
    },
  ]

  const { isPending, isError, error } = useCareerRoadmap()

  const router = useRouter()
  return (
    <ProtectedRoute>
      <div className="relative w-full overflow-hidden bg-white">
      {/* Hero Section */}
      <div className="relative flex h-screen min-h-[700px] w-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Content Container */}
        <div className="container relative z-10 mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold leading-6 text-blue-700 ring-1 ring-inset ring-blue-200">
                AI Career Development Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Craft Your <span className="text-blue-600">AI Career</span> Path
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl"
            >
              Unlock your potential in the world of Artificial Intelligence with a personalized roadmap. Discover the
              skills, roles, and steps to achieve your career goals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button
               onClick={() => router.push('/roadmap')}
                disabled={isPending}
                size="lg"
                className="group h-14 rounded-xl bg-blue-600 px-8 text-lg font-semibold text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600 shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                Generate Roadmap
              </Button>

              <Button
                onClick={() => router.push("/jobs")}
                variant="outline"
                size="lg"
                className="h-14 rounded-xl border-gray-300 bg-white px-8 text-lg font-semibold text-gray-700 hover:border-gray-400 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Explore Careers
              </Button>
            </motion.div>

            {/* Error message */}
            {isError && (
              <p className="mt-4 text-red-600">
                {error?.message || "Something went wrong while generating your roadmap."}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Our AI Career Planner?
            </h2>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Our AI Career Planner provides a comprehensive and personalized approach to career development in the
              field of Artificial Intelligence. We leverage advanced algorithms and industry insights to help you
              navigate the complex landscape of AI careers.
            </p>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl flex-col gap-8 lg:mx-0 lg:mt-20 lg:max-w-none text-gray-900 lg:flex-row lg:items-end">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="border rounded-xl border-gray-200 bg-white p-6 flex flex-col gap-3 hover:border-blue-300 transition-all hover:shadow-lg hover:bg-blue-50/30"
              >
                <span className="text-blue-600">{item.icon}</span>
                <h3 className="text-xl font-semibold text-gray-900">{item.heading}</h3>
                <p className="text-gray-600">{item.para}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">How It Works</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our AI-powered platform guides you through a simple three-step process to create your personalized career
              roadmap.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {steps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">
                    {step.icon}
                  </div>
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="mb-2 text-sm font-medium text-blue-600">Step {step.step}</div>
                    {step.title}
                  </dt>
                  <dd className="mt-1 text-base leading-7 text-gray-600">{step.description}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Success Stories</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Hear from professionals who transformed their careers with our AI Career Planner.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200"
              >
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 leading-7">{testimonial.content}</p>
                </div>
                <div className="mt-6">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Transform Your Career?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Join thousands of professionals who have successfully navigated their AI career journey with our platform.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                size="lg"
                className="h-14 rounded-xl bg-white px-8 text-lg font-semibold text-blue-600 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-14 rounded-xl border-white bg-transparent px-8 text-lg font-semibold text-white hover:bg-white hover:text-blue-600 transition-all"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

   
      </div>
    </ProtectedRoute>
  )
}

export default CareerPlanner
