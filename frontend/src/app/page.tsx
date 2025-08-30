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
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
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
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
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
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
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

      {/* Footer */}
      <footer className="bg-background border-t border-border/40">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-primary/10 rounded-xl mr-3">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  CareerBoost
                </span>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Your all-in-one career acceleration platform. Practice interviews, plan your career path, and discover
                opportunities that match your goals.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="p-2 hover:bg-primary/10">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </Button>
                <Button variant="ghost" size="sm" className="p-2 hover:bg-primary/10">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Button>
                <Button variant="ghost" size="sm" className="p-2 hover:bg-primary/10">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.012.001z" />
                  </svg>
                </Button>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-lg mb-4 text-foreground">Features</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/practice/topics"
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                  >
                    <Code className="h-4 w-4 mr-2 group-hover:text-primary" />
                    Interview Practice
                  </Link>
                </li>
                <li>
                  <Link
                    href="/career-plan"
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                  >
                    <Target className="h-4 w-4 mr-2 group-hover:text-blue-500" />
                    Career Planner
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jobs"
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                  >
                    <Briefcase className="h-4 w-4 mr-2 group-hover:text-primary" />
                    Job Matching
                  </Link>
                </li>
                <li>
                  <Link
                    href="/roadmaps"
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                  >
                    <MapPin className="h-4 w-4 mr-2 group-hover:text-blue-600" />
                    Learning Roadmaps
                  </Link>
                </li>
                <li>
                  <Link
                    href="/analytics"
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                  >
                    <TrendingUp className="h-4 w-4 mr-2 group-hover:text-primary" />
                    Progress Analytics
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-lg mb-4 text-foreground">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                    Career Blog
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="text-muted-foreground hover:text-primary transition-colors">
                    Interview Guides
                  </Link>
                </li>
                <li>
                  <Link href="/templates" className="text-muted-foreground hover:text-primary transition-colors">
                    Resume Templates
                  </Link>
                </li>
                <li>
                  <Link href="/salary-guide" className="text-muted-foreground hover:text-primary transition-colors">
                    Salary Guide
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="text-muted-foreground hover:text-primary transition-colors">
                    Community Forum
                  </Link>
                </li>
                <li>
                  <Link href="/api-docs" className="text-muted-foreground hover:text-primary transition-colors">
                    API Documentation
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-lg mb-4 text-foreground">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-muted-foreground hover:text-primary transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">
                    Support Center
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="border-t border-border/40 pt-8 mb-8"
          >
            <div className="max-w-md mx-auto text-center">
              <h3 className="font-semibold text-lg mb-2">Stay Updated</h3>
              <p className="text-muted-foreground mb-4">
                Get the latest career tips and job opportunities delivered to your inbox.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-muted/50 border border-border/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                />
                <Button className="px-6">Subscribe</Button>
              </div>
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div className="text-muted-foreground text-sm">
              © 2024 CareerBoost. All rights reserved. Built with ❤️ for developers worldwide.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/status"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                All Systems Operational
              </Link>
              <div className="text-muted-foreground">
                Made with <span className="text-primary">Next.js</span> & <span className="text-secondary">AI</span>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
