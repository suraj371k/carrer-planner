"use client"

import { motion } from "framer-motion"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SearchAndFilterProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
}

const SearchAndFilter = ({ searchTerm, setSearchTerm, sortBy, setSortBy }: SearchAndFilterProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="flex flex-col sm:flex-row gap-4"
  >
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Search jobs, companies, or locations..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
      />
    </div>

    <Select value={sortBy} onValueChange={setSortBy}>
      <SelectTrigger className="w-full sm:w-48 border-gray-200">
        <Filter className="h-4 w-4 mr-2" />
        <SelectValue placeholder="Sort by..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="match">Best Match</SelectItem>
        <SelectItem value="date">Most Recent</SelectItem>
        <SelectItem value="company">Company Name</SelectItem>
      </SelectContent>
    </Select>
  </motion.div>
)

export default SearchAndFilter