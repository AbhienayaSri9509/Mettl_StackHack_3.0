import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProject } from '../services/api'

const SDG_COLORS = {
  1: 'bg-red-500', 2: 'bg-yellow-500', 3: 'bg-green-500', 4: 'bg-red-600',
  5: 'bg-orange-500', 6: 'bg-cyan-500', 7: 'bg-yellow-400', 8: 'bg-red-700',
  9: 'bg-orange-600', 10: 'bg-pink-500', 11: 'bg-yellow-600', 12: 'bg-amber-500',
  13: 'bg-green-600', 14: 'bg-blue-500', 15: 'bg-green-700', 16: 'bg-blue-600',
  17: 'bg-blue-700'
}

const SDG_NAMES = {
  1: 'No Poverty', 2: 'Zero Hunger', 3: 'Good Health', 4: 'Quality Education',
  5: 'Gender Equality', 6: 'Clean Water', 7: 'Affordable Energy', 8: 'Decent Work',
  9: 'Industry Innovation', 10: 'Reduced Inequalities', 11: 'Sustainable Cities',
  12: 'Responsible Consumption', 13: 'Climate Action', 14: 'Life Below Water',
  15: 'Life on Land', 16: 'Peace & Justice', 17: 'Partnerships'
}

const ProjectDetail = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProject()
  }, [id])

  const loadProject = async () => {
    setLoading(true)
    try {
      const data = await getProject(id)
      setProject(data)
    } catch (error) {
      console.error('Error loading project:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">Project not found.</p>
          <Link to="/" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  const categoryColors = {
    'Forestry': 'bg-green-100 text-green-800',
    'Renewable Energy': 'bg-blue-100 text-blue-800',
    'Infrastructure': 'bg-purple-100 text-purple-800',
    'Agriculture': 'bg-yellow-100 text-yellow-800',
    'Waste Management': 'bg-gray-100 text-gray-800',
    'Water Management': 'bg-cyan-100 text-cyan-800',
    'Other': 'bg-indigo-100 text-indigo-800'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-8 text-white">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold bg-white ${categoryColors[project.category] || categoryColors['Other']}`}>
                  {project.category}
                </span>
                {project.verraCertified && (
                  <span className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm font-semibold flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    VERRA Certified
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
              <p className="text-lg opacity-90">{project.description}</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Project Details */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Details</h2>
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-primary-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-700">Location</p>
                      <p className="text-gray-600">{project.location.region}, {project.location.country}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-primary-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-700">Project Duration</p>
                      <p className="text-gray-600">
                        {new Date(project.projectStartDate).toLocaleDateString()} - {
                          project.projectEndDate
                            ? new Date(project.projectEndDate).toLocaleDateString()
                            : 'Ongoing'
                        }
                      </p>
                    </div>
                  </div>

                  {project.verraCertified && project.verraProjectId && (
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-primary-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-gray-700">VERRA Project ID</p>
                        <p className="text-gray-600">{project.verraProjectId}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* SDG Goals */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Sustainable Development Goals ({project.sdgGoals.length})
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.sdgGoals.map((goal) => (
                    <div
                      key={goal}
                      className={`${SDG_COLORS[goal] || 'bg-gray-400'} rounded-lg p-4 text-white`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl font-bold">{goal}</span>
                        <div>
                          <p className="font-semibold">SDG {goal}</p>
                          <p className="text-sm opacity-90">{SDG_NAMES[goal]}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-primary-50 rounded-lg p-6 sticky top-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Purchase Information</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Price per Credit</p>
                    <p className="text-3xl font-bold text-primary-600">
                      ${project.pricePerCredit.toFixed(2)}
                    </p>
                  </div>

                  <div className="border-t border-primary-200 pt-4">
                    <p className="text-sm text-gray-600 mb-1">Total Credits</p>
                    <p className="text-xl font-semibold text-gray-800">
                      {project.totalCredits.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Available Credits</p>
                    <p className="text-xl font-semibold text-gray-800">
                      {project.availableCredits.toLocaleString()}
                    </p>
                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-500 h-2 rounded-full"
                        style={{
                          width: `${(project.availableCredits / project.totalCredits) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Purchase Credits
                </button>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  Contact us for bulk purchases or custom pricing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail

