"use client"
import { useJobs } from "@/hooks/useJobs"
import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"
import { useState, useMemo } from "react"
import ProtectedLayout from "@/components/ProtectedRoute"
import EmptyState from "@/components/jobs/empty"
import LoadingSkeleton from "@/components/jobs/loading-skeleton"
import ErrorState from "@/components/jobs/error"
import StatsCards from "@/components/jobs/stats"
import SearchAndFilter from "@/components/jobs/search"
import JobCard from "@/components/jobs/job-card"
import Pagination from "@/components/jobs/pagination"

const JobsDashboard = () => {
  const { data: jobs, isLoading, error, refetch } = useJobs()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("match")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredAndSortedJobs = useMemo(() => {
    if (!jobs) return []

    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    switch (sortBy) {
      case "match":
        return filtered.sort((a, b) => b.matchScore - a.matchScore)
      case "date":
        return filtered.sort((a, b) => {
          if (a.postedWhen.includes("hour") || a.postedWhen.includes("minute")) return -1
          if (b.postedWhen.includes("hour") || b.postedWhen.includes("minute")) return 1
          return 0
        })
      case "company":
        return filtered.sort((a, b) => a.company.localeCompare(b.company))
      default:
        return filtered
    }
  }, [jobs, searchTerm, sortBy])

  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredAndSortedJobs.slice(startIndex, endIndex)
  }, [filteredAndSortedJobs, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredAndSortedJobs.length / itemsPerPage)

  useMemo(() => {
    setCurrentPage(1)
  }, [searchTerm, sortBy])

  const statsData = useMemo(() => {
    if (!jobs) return { total: 0, highMatch: 0, avgMatch: 0 }

    const total = jobs.length
    const highMatch = jobs.filter((job) => job.matchScore >= 15).length
    const avgMatch = jobs.reduce((sum, job) => sum + job.matchScore, 0) / total

    return { total, highMatch, avgMatch: Math.round(avgMatch) }
  }, [jobs])

  if (isLoading) return <LoadingSkeleton />

  if (error) return <ErrorState error={error} onRetry={refetch} />

  return (
    <ProtectedLayout>
      <div className="space-y-8 mt-8 mb-8 max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Job Recommendations</h1>
              <p className="text-gray-600 text-lg">Curated opportunities tailored to your expertise and career goals</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        {jobs && jobs.length > 0 && <StatsCards statsData={statsData} />}

        {/* Search and Filter Controls */}
        {jobs && jobs.length > 0 && (
          <SearchAndFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        )}

        {/* Jobs Grid */}
        {paginatedJobs.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid gap-6 grid-cols-1"
            >
              {paginatedJobs.map((job, index) => (
                <JobCard key={`${job.company}-${job.title}-${index}`} job={job} index={index} />
              ))}
            </motion.div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredAndSortedJobs.length}
              itemsPerPage={itemsPerPage}
            />
          </>
        ) : jobs && jobs.length > 0 ? (
          <EmptyState />
        ) : (
          <EmptyState />
        )}
      </div>
    </ProtectedLayout>
  )
}

export default JobsDashboard
