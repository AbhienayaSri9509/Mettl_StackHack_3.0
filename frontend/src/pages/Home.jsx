import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProjects, getStats } from '../services/api'
import ProjectCard from '../components/ProjectCard'
import FilterSidebar from '../components/FilterSidebar'
import CompareProjects from '../components/CompareProjects'
import EmptyState from '../components/EmptyState'
import CountrySelector from '../components/CountrySelector'

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    country: searchParams.get('country') || '',
    verraCertified: searchParams.get('verraCertified') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sdgGoal: searchParams.get('sdgGoal') || '',
    search: searchParams.get('search') || '',
    page: parseInt(searchParams.get('page')) || 1
  })
  const [pagination, setPagination] = useState({})
  const [stats, setStats] = useState(null)
  const [compareProjects, setCompareProjects] = useState([])
  const [showCompare, setShowCompare] = useState(false)
  const [projectCounts, setProjectCounts] = useState({})

  useEffect(() => {
    loadProjects()
    loadStats()
    loadProjectCounts()
  }, [filters])

  useEffect(() => {
    // Update URL when filters change (but not on initial load)
    const params = new URLSearchParams()
    Object.keys(filters).forEach(key => {
      if (filters[key] && filters[key] !== '' && key !== 'page') {
        params.set(key, filters[key])
      }
    })
    if (filters.page > 1) {
      params.set('page', filters.page)
    }
    setSearchParams(params, { replace: true })
  }, [filters, setSearchParams])

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

  const loadProjectCounts = async () => {
    try {
      const allProjects = await getProjects({ limit: 1000 })
      const counts = {}
      allProjects.projects.forEach(project => {
        const country = project.location.country
        counts[country] = (counts[country] || 0) + 1
      })
      setProjectCounts(counts)
    } catch (error) {
      console.error('Error loading project counts:', error)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1
    }))
  }

  const handleCountrySelect = (country) => {
    handleFilterChange('country', country)
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

  const handleCompare = (project) => {
    setCompareProjects(prev => {
      const exists = prev.find(p => p._id === project._id)
      if (exists) {
        return prev.filter(p => p._id !== project._id)
      }
      if (prev.length >= 3) {
        return prev.slice(1).concat(project)
      }
      return [...prev, project]
    })
  }

  const handleRemoveCompare = (projectId) => {
    setCompareProjects(prev => prev.filter(p => p._id !== projectId))
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
      {/* Stats Banner */}
      {stats && (
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 md:mb-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
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

      {/* Country Selector - Mobile Friendly */}
      <CountrySelector
        selectedCountry={filters.country}
        onCountrySelect={handleCountrySelect}
        projectCounts={projectCounts}
      />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters */}
        <div className="lg:w-1/4 w-full">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />
        </div>

        {/* Projects Grid */}
        <div className="lg:w-3/4 w-full">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
          ) : projects.length === 0 ? (
            <EmptyState onReset={handleReset} />
          ) : (
            <>
              <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                  {filters.country ? `Projects in ${filters.country}` : 'Projects'} ({pagination.totalProjects || 0})
                </h2>
                {compareProjects.length > 0 && (
                  <button
                    onClick={() => setShowCompare(true)}
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <span>Compare ({compareProjects.length})</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {projects.map((project) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    onCompare={handleCompare}
                    isComparing={compareProjects.some(p => p._id === project._id)}
                    onCountryClick={handleCountrySelect}
                  />
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

      {showCompare && compareProjects.length > 0 && (
        <CompareProjects
          projects={compareProjects}
          onRemove={handleRemoveCompare}
          onClose={() => setShowCompare(false)}
        />
      )}
    </div>
  )
}

export default Home

