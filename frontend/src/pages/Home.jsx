import { useState, useEffect } from 'react'
import { getProjects, getStats } from '../services/api'
import ProjectCard from '../components/ProjectCard'
import FilterSidebar from '../components/FilterSidebar'

const Home = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: '',
    country: '',
    verraCertified: '',
    minPrice: '',
    maxPrice: '',
    sdgGoal: '',
    search: '',
    page: 1
  })
  const [pagination, setPagination] = useState({})
  const [stats, setStats] = useState(null)

  useEffect(() => {
    loadProjects()
    loadStats()
  }, [filters])

  const loadProjects = async () => {
    setLoading(true)
    try {
      const data = await getProjects(filters)
      setProjects(data.projects)
      setPagination(data.pagination)
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const data = await getStats()
      setStats(data)
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1
    }))
  }

  const handleReset = () => {
    setFilters({
      category: '',
      country: '',
      verraCertified: '',
      minPrice: '',
      maxPrice: '',
      sdgGoal: '',
      search: '',
      page: 1
    })
  }

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats Banner */}
      {stats && (
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-lg p-6 mb-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm opacity-90">Total Projects</p>
              <p className="text-2xl font-bold">{stats.overall.totalProjects || 0}</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Total Credits</p>
              <p className="text-2xl font-bold">
                {(stats.overall.totalCredits || 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm opacity-90">Available Credits</p>
              <p className="text-2xl font-bold">
                {(stats.overall.availableCredits || 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm opacity-90">Avg. Price</p>
              <p className="text-2xl font-bold">
                ${(stats.overall.averagePrice || 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters */}
        <div className="lg:w-1/4">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />
        </div>

        {/* Projects Grid */}
        <div className="lg:w-3/4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
          ) : projects.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">No projects found matching your filters.</p>
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                  Projects ({pagination.totalProjects || 0})
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-8 flex justify-center items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(filters.page - 1)}
                    disabled={filters.page === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-gray-700">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(filters.page + 1)}
                    disabled={!pagination.hasMore}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home

