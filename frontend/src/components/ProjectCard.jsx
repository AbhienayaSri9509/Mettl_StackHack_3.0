import { Link } from 'react-router-dom'

const SDG_COLORS = {
  1: 'bg-red-500', 2: 'bg-yellow-500', 3: 'bg-green-500', 4: 'bg-red-600',
  5: 'bg-orange-500', 6: 'bg-cyan-500', 7: 'bg-yellow-400', 8: 'bg-red-700',
  9: 'bg-orange-600', 10: 'bg-pink-500', 11: 'bg-yellow-600', 12: 'bg-amber-500',
  13: 'bg-green-600', 14: 'bg-blue-500', 15: 'bg-green-700', 16: 'bg-blue-600',
  17: 'bg-blue-700'
}

const ProjectCard = ({ project }) => {
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
    <Link to={`/project/${project._id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
        <div className="p-6 flex-1">
          <div className="flex items-start justify-between mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[project.category] || categoryColors['Other']}`}>
              {project.category}
            </span>
            {project.verraCertified && (
              <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-semibold flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                VERRA
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
            {project.name}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {project.description}
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {project.location.region}, {project.location.country}
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {project.sdgGoals.length} SDG Goal{project.sdgGoals.length !== 1 ? 's' : ''} Fulfilled
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {project.sdgGoals.slice(0, 5).map((goal) => (
              <span
                key={goal}
                className={`w-6 h-6 rounded-full ${SDG_COLORS[goal] || 'bg-gray-400'} text-white text-xs flex items-center justify-center font-bold`}
                title={`SDG Goal ${goal}`}
              >
                {goal}
              </span>
            ))}
            {project.sdgGoals.length > 5 && (
              <span className="w-6 h-6 rounded-full bg-gray-300 text-gray-700 text-xs flex items-center justify-center font-bold">
                +{project.sdgGoals.length - 5}
              </span>
            )}
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Price per Credit</p>
              <p className="text-2xl font-bold text-primary-600">
                ${project.pricePerCredit.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Available</p>
              <p className="text-sm font-semibold text-gray-700">
                {project.availableCredits.toLocaleString()} / {project.totalCredits.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard

