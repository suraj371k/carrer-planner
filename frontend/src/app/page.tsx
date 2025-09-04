"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Brain,
  Code,
  ArrowRight,
  Sparkles,
  MapPin,
  Briefcase,
  Target,
  Zap,
  TrendingUp,
  CheckCircle,
  ChevronRight,
  Play,
  BookOpen,
  Search,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              rotate: [360, 0],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
          />
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center mb-8"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="p-4 bg-primary/10 rounded-2xl backdrop-blur-sm border border-primary/20"
                >
                  <Brain className="h-12 w-12 text-primary" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="h-6 w-6 text-primary" />
                </motion.div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Accelerate Your
              </span>
              <br />
              <span className=" bg-clip-text">
                Tech Career
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed"
            >
              Your all-in-one career platform: Practice interviews with AI, get personalized career roadmaps, and
              discover real job opportunities from LinkedIn - all tailored to your profile.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-3 mb-12"
            >
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                <Code className="h-4 w-4 mr-2" />
                AI Interview Practice
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                <Target className="h-4 w-4 mr-2" />
                Career Roadmaps
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                <Briefcase className="h-4 w-4 mr-2" />
                Real Job Matching
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            >
              <Button size="lg" className="px-8 py-3 text-lg group" asChild>
                <Link href="/practice/topics">
                  Start Interview Practice
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg bg-transparent group" asChild>
                <Link href="/career-plan">
                  Explore Career Paths
                  <MapPin className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Land Your Dream Job
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From interview preparation to career planning and job discovery - we've got you covered at every step
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Interview Practice Feature */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm h-full group hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16" />

                <CardContent className="relative p-8">
                  <div className="mb-6 flex justify-between items-start">
                    <div className="p-4 bg-primary/10 rounded-2xl">
                      <Code className="h-10 w-10 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      <Play className="h-3 w-3 mr-1" />
                      Try Now
                    </Badge>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">AI Interview Practice</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Master technical interviews with AI-powered mock sessions. Practice coding problems, system design,
                    and behavioral questions from top tech companies.
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-primary mr-3" />
                      500+ Real Interview Questions
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-primary mr-3" />
                      AI-Powered Feedback & Scoring
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-primary mr-3" />
                      Multiple Programming Languages
                    </div>
                  </div>

                  <Button className="w-full group" asChild>
                    <Link href="/practice/topics">
                      Start Practicing
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Career Planner Feature */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden border-secondary/20 bg-card/50 backdrop-blur-sm h-full group hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -translate-y-16 translate-x-16" />

                <CardContent className="relative p-8">
                  <div className="mb-6 flex justify-between items-start">
                    <div className="p-4 bg-secondary/10 rounded-2xl">
                      <Target className="h-10 w-10 text-secondary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      <BookOpen className="h-3 w-3 mr-1" />
                      Plan Now
                    </Badge>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">AI Career Planner</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Get personalized career roadmaps powered by AI. Discover skills to learn, projects to build, and
                    steps to take for your dream role.
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-secondary mr-3" />
                      Personalized Learning Paths
                    </div>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-secondary mr-3" />
                      Skill Gap Analysis
                    </div>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-secondary mr-3" />
                      Industry Insights & Trends
                    </div>
                  </div>

                  <Button variant="secondary" className="w-full group" asChild>
                    <Link href="/career-plan">
                      Create My Roadmap
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Job Matching Feature */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm h-full group hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16" />

                <CardContent className="relative p-8">
                  <div className="mb-6 flex justify-between items-start">
                    <div className="p-4 bg-primary/10 rounded-2xl">
                      <Briefcase className="h-10 w-10 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      <Search className="h-3 w-3 mr-1" />
                      Explore
                    </Badge>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">Smart Job Matching</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Discover opportunities that match your skills and goals. We scrape real jobs from LinkedIn and match
                    them to your profile automatically.
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-sm">
                      <Zap className="h-4 w-4 text-primary mr-3" />
                      Real-time Job Updates
                    </div>
                    <div className="flex items-center text-sm">
                      <Zap className="h-4 w-4 text-primary mr-3" />
                      AI-Powered Matching
                    </div>
                    <div className="flex items-center text-sm">
                      <Zap className="h-4 w-4 text-primary mr-3" />
                      Application Tracking
                    </div>
                  </div>

                  <Button className="w-full group" asChild>
                    <Link href="/jobs">
                      Find Jobs
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Developers Worldwide</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of developers who have accelerated their careers with our platform
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10k+</div>
              <div className="text-sm text-muted-foreground">Developers Trained</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Practice Questions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">1000+</div>
              <div className="text-sm text-muted-foreground">Career Roadmaps</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50k+</div>
              <div className="text-sm text-muted-foreground">Job Opportunities</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to{" "}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Transform Your Career?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start your journey today with our comprehensive career acceleration platform
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="px-8 py-3 text-lg group" asChild>
                <Link href="/practice/topics">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg bg-transparent" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

     
    </div>
  )
}
