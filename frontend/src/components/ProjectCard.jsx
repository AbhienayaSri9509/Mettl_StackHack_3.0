import { Link } from 'react-router-dom'
import { SDGGrid } from './SDGIcons'
import { calculateImpactScore, calculateTrustScore } from '../utils/impactScore'
import { MapPin, TrendingUp, ShieldCheck } from 'lucide-react'

const ProjectCard = ({ project, onCompare, isComparing = false }) => {
  const categoryColors = {
    'Forestry': 'bg-green-100 text-green-800 border-green-200',
    'Renewable Energy': 'bg-blue-100 text-blue-800 border-blue-200',
    'Blue Carbon': 'bg-cyan-100 text-cyan-800 border-cyan-200',
    'Technology': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'Community': 'bg-rose-100 text-rose-800 border-rose-200',
    'Infrastructure': 'bg-purple-100 text-purple-800 border-purple-200',
    'Agriculture': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Waste Management': 'bg-orange-100 text-orange-800 border-orange-200',
    'Water Management': 'bg-teal-100 text-teal-800 border-teal-200',
    'Other': 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const impactScore = calculateImpactScore(project)
  const trustScore = calculateTrustScore(project)
  const availabilityRatio = project.availableCredits / project.totalCredits
  const isLimited = availabilityRatio < 0.3

  // Default image if none provided
  const bgImage = project.images && project.images.length > 0
    ? project.images[0]
    : 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b0?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
      {/* Image Header */}
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        <img
          src={bgImage}
          alt={project.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md bg-white/90 border shadow-sm ${categoryColors[project.category] || categoryColors['Other']}`}>
            {project.category}
          </span>
          {project.verraCertified && (
            <span className="px-3 py-1 bg-green-500/90 backdrop-blur-md text-white rounded-full text-xs font-bold flex items-center shadow-sm">
              <ShieldCheck className="w-3 h-3 mr-1" />
              VERRA
            </span>
          )}
        </div>

        {/* Impact Score Overlay */}
        <div className="absolute bottom-4 right-4">
          <div className="relative w-14 h-14 bg-white/90 backdrop-blur rounded-full p-1 shadow-lg flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="24" cy="24" r="20" stroke="#e5e7eb" strokeWidth="4" fill="none" className="w-full h-full" />
              <circle
                cx="24" cy="24" r="20"
                stroke={impactScore > 80 ? '#22c55e' : impactScore > 60 ? '#eab308' : '#3b82f6'}
                strokeWidth="4" fill="none"
                strokeDasharray={`${(impactScore / 100) * 125.6} 125.6`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
              <span className="text-sm font-bold text-gray-800">{impactScore}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        {/* Location */}
        <div className="flex items-center text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
          <MapPin className="w-3 h-3 mr-1" />
          {project.location.region}, {project.location.country}
        </div>

        {/* Title */}
        <Link to={`/project/${project._id}`} className="block mb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {project.name}
          </h3>
        </Link>

        {/* Description Snippet */}
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4 flex-1">
          {project.description}
        </p>

        {/* SDG Grid */}
        <div className="mb-5 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">SDG Contribution</div>
          <SDGGrid goals={project.sdgGoals} size="sm" maxDisplay={5} />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Price per Credit</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white flex items-baseline">
              ${project.pricePerCredit.toFixed(2)}
            </div>
          </div>

          <div className="flex gap-2">
            {onCompare && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onCompare(project);
                }}
                className={`p-2.5 rounded-lg transition-colors ${isComparing
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                title="Compare Project"
              >
                <TrendingUp className="w-5 h-5" />
              </button>
            )}
            <Link
              to={`/project/${project._id}`}
              className="px-5 py-2.5 bg-gray-900 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors text-sm shadow-md hover:shadow-lg dark:bg-primary-600 dark:hover:bg-primary-700"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
