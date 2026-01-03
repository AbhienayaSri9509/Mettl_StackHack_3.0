import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProject } from '../services/api'
import { SDGGrid } from '../components/SDGIcons'
import PurchaseSimulator from '../components/PurchaseSimulator'
import MapComponent from '../components/MapComponent'
import PriceChart from '../components/PriceChart'
import { calculateImpactScore, calculateTrustScore } from '../utils/impactScore'
import { ChevronLeft, ShieldCheck, ShoppingCart, Leaf, Globe, Activity } from 'lucide-react'

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
  const [activeTab, setActiveTab] = useState('overview')

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Project not found</h2>
        <Link to="/" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">Back to Projects</Link>
      </div>
    )
  }

  const categoryColors = {
    'Forestry': 'bg-green-100 text-green-800 border-green-200',
    'Renewable Energy': 'bg-blue-100 text-blue-800 border-blue-200',
    'Blue Carbon': 'bg-cyan-100 text-cyan-800 border-cyan-200',
    'Technology': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'Community': 'bg-rose-100 text-rose-800 border-rose-200',
    'Infrastructure': 'bg-purple-100 text-purple-800 border-purple-200',
    'Other': 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const impactScore = calculateImpactScore(project)
  const trustScore = calculateTrustScore(project)
  const annualReduction = Math.round(project.totalCredits / 10)
  const yearsActive = Math.ceil((new Date(project.projectEndDate || new Date()) - new Date(project.projectStartDate)) / (1000 * 60 * 60 * 24 * 365))

  // Simulated price history
  const priceHistory = [
    { month: 'Jan', price: project.pricePerCredit * 0.95 },
    { month: 'Feb', price: project.pricePerCredit * 0.97 },
    { month: 'Mar', price: project.pricePerCredit * 0.99 },
    { month: 'Apr', price: project.pricePerCredit },
    { month: 'May', price: project.pricePerCredit * 1.01 },
    { month: 'Jun', price: project.pricePerCredit * 1.02 },
  ]

  // Use image from project or fallback
  const bgImage = project.images && project.images.length > 0
    ? project.images[0]
    : 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b0?auto=format&fit=crop&w=1600&q=80';

  return (
    <div className="pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img src={bgImage} alt={project.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>

        <div className="absolute top-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center text-white/80 hover:text-white transition-colors backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Projects
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-md border shadow-lg ${categoryColors[project.category] || categoryColors['Other']}`}>
                {project.category}
              </span>
              {project.verraCertified && (
                <span className="px-4 py-1.5 bg-green-500/90 backdrop-blur-md text-white rounded-full text-sm font-bold flex items-center shadow-lg border border-green-400/30">
                  <ShieldCheck className="w-4 h-4 mr-1.5" />
                  VERRA Certified
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg leading-tight">
              {project.name}
            </h1>
            <p className="text-lg text-gray-200 max-w-3xl line-clamp-2 drop-shadow-md">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Stats Overview Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">{impactScore}</div>
                  <div className="text-xs font-medium text-gray-500 uppercase mt-1">Impact Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-500">{trustScore.toFixed(1)}</div>
                  <div className="text-xs font-medium text-gray-500 uppercase mt-1">Trust Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{annualReduction.toLocaleString()}</div>
                  <div className="text-xs font-medium text-gray-500 uppercase mt-1">Tons CO₂/Yr</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{yearsActive}</div>
                  <div className="text-xs font-medium text-gray-500 uppercase mt-1">Years Active</div>
                </div>
              </div>
            </div>

            {/* Tabs & Content */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex">
                  {['overview', 'impact', 'verification'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-8 py-4 text-sm font-bold tracking-wide transition-colors ${activeTab === tab
                          ? 'border-b-2 border-primary-500 text-primary-600 bg-primary-50 dark:bg-primary-900/20'
                          : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
                        }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-8">
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                        <Globe className="w-5 h-5 mr-2 text-primary-500" />
                        Project Location
                      </h3>
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden h-[400px]">
                        <MapComponent
                          coordinates={project.location.coordinates}
                          name={project.name}
                          location={`${project.location.region}, ${project.location.country}`}
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                        <Activity className="w-5 h-5 mr-2 text-primary-500" />
                        Price Trend (Latest)
                      </h3>
                      <PriceChart data={priceHistory} />
                    </div>
                  </div>
                )}

                {activeTab === 'impact' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Leaf className="w-5 h-5 mr-2 text-green-500" />
                      Sustainable Development Goals
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.sdgGoals.map((goal) => (
                        <div key={goal} className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600">
                          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-xl font-bold text-primary-700 mr-4">
                            {goal}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 dark:text-white">SDG {goal}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-300">{SDG_NAMES[goal]}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'verification' && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
                    <div className="flex items-start">
                      <ShieldCheck className="w-12 h-12 text-green-600 mr-4 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-2">
                          {project.verraCertified ? 'Verified Carbon Standard (VCS)' : 'Industry Standard Verification'}
                        </h3>
                        <p className="text-green-700 dark:text-green-400 text-sm leading-relaxed">
                          This project has undergone rigorous third-party verification to ensure that every carbon credit represents a real, measurable, and permanent reduction in greenhouse gas emissions.
                        </p>
                        {project.verraProjectId && (
                          <div className="mt-4 px-3 py-1 bg-white dark:bg-gray-800 inline-block rounded text-xs font-mono text-gray-500 border border-gray-200">
                            ID: {project.verraProjectId}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Buy Credits</h3>

              <div className="mb-8">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Current Price</div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white">
                  ${project.pricePerCredit.toFixed(2)}
                  <span className="text-lg text-gray-400 font-normal ml-1">/ ton</span>
                </div>
              </div>

              <PurchaseSimulator
                pricePerCredit={project.pricePerCredit}
                availableCredits={project.availableCredits}
              />

              <Link
                to="/cart"
                className="w-full mt-4 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center transform active:scale-95"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Link>

              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 text-center">
                <p className="text-xs text-gray-500">
                  100% Secure Transaction • Instant Certificate
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
