import { useState } from 'react'
import { SDGGrid } from './SDGIcons'
import { calculateImpactScore, calculateTrustScore } from '../utils/impactScore'

const CompareProjects = ({ projects, onRemove, onClose }) => {
  if (!projects || projects.length === 0) return null

  const getComparisonValue = (project, field) => {
    switch (field) {
      case 'price':
        return `$${project.pricePerCredit.toFixed(2)}`
      case 'sdgs':
        return project.sdgGoals?.length || 0
      case 'verra':
        return project.verraCertified ? 'Yes' : 'No'
      case 'impact':
        const score = calculateImpactScore(project)
        if (score >= 80) return 'High'
        if (score >= 60) return 'Medium'
        return 'Low'
      case 'trust':
        return calculateTrustScore(project).toFixed(1)
      case 'location':
        return `${project.location.region}, ${project.location.country}`
      case 'category':
        return project.category
      case 'available':
        return `${project.availableCredits.toLocaleString()} / ${project.totalCredits.toLocaleString()}`
      default:
        return '-'
    }
  }

  const getBestValue = (field) => {
    if (projects.length < 2) return null
    const values = projects.map(p => {
      const val = getComparisonValue(p, field)
      if (field === 'price') return parseFloat(val.replace('$', ''))
      if (field === 'sdgs' || field === 'trust') return parseFloat(val)
      return val
    })

    if (field === 'price') {
      const min = Math.min(...values)
      return values.indexOf(min)
    } else if (field === 'sdgs' || field === 'impact' || field === 'trust') {
      const max = Math.max(...values)
      return values.indexOf(max)
    }
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-slide-up border border-gray-100 dark:border-gray-700">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-6 py-4 flex items-center justify-between z-10 shrink-0">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Compare Projects</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-auto custom-scrollbar">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left py-4 px-4 font-bold text-gray-500 dark:text-gray-400 border-b-2 border-gray-100 dark:border-gray-700 sticky left-0 bg-white dark:bg-gray-800 z-10 w-48">Feature</th>
                {projects.map((project, idx) => (
                  <th key={project._id} className="text-center py-4 px-4 min-w-[220px] border-b-2 border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                    <div className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-1" title={project.name}>{project.name}</div>
                    <button
                      onClick={() => onRemove(project._id)}
                      className="text-xs text-red-500 hover:text-red-600 font-medium px-2 py-1 bg-red-50 dark:bg-red-900/20 rounded-md transition-colors"
                    >
                      Remove
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="py-4 px-4 font-semibold text-gray-700 dark:text-gray-300 sticky left-0 bg-inherit z-10">Price per Credit</td>
                {projects.map((project, idx) => {
                  const isBest = getBestValue('price') === idx
                  return (
                    <td key={project._id} className={`py-4 px-4 text-center ${isBest ? 'bg-green-50/50 dark:bg-green-900/10' : ''}`}>
                      <div className={`inline-flex items-center justify-center ${isBest ? 'text-green-700 dark:text-green-400 font-bold' : 'text-gray-600 dark:text-gray-300'}`}>
                        {getComparisonValue(project, 'price')}
                        {isBest && <span className="ml-1.5 text-lg">🏆</span>}
                      </div>
                    </td>
                  )
                })}
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="py-4 px-4 font-semibold text-gray-700 dark:text-gray-300 sticky left-0 bg-inherit z-10">SDG Goals</td>
                {projects.map((project, idx) => {
                  const isBest = getBestValue('sdgs') === idx
                  return (
                    <td key={project._id} className={`py-4 px-4 text-center ${isBest ? 'bg-green-50/50 dark:bg-green-900/10' : ''}`}>
                      <div className="flex flex-col items-center">
                        <span className={`text-sm mb-2 ${isBest ? 'font-bold text-green-700 dark:text-green-400' : 'text-gray-600 dark:text-gray-300'}`}>
                          {getComparisonValue(project, 'sdgs')} Goals
                        </span>
                        <SDGGrid goals={project.sdgGoals} size="sm" maxDisplay={4} />
                      </div>
                    </td>
                  )
                })}
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="py-4 px-4 font-semibold text-gray-700 dark:text-gray-300 sticky left-0 bg-inherit z-10">VERRA Certified</td>
                {projects.map((project) => (
                  <td key={project._id} className="py-4 px-4 text-center">
                    {project.verraCertified ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        ✓ Verified
                      </span>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500 text-sm">—</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="py-4 px-4 font-semibold text-gray-700 dark:text-gray-300 sticky left-0 bg-inherit z-10">Impact Score</td>
                {projects.map((project, idx) => {
                  const isBest = getBestValue('impact') === idx
                  return (
                    <td key={project._id} className={`py-4 px-4 text-center ${isBest ? 'bg-green-50/50 dark:bg-green-900/10' : ''}`}>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${calculateImpactScore(project) >= 80
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                        {getComparisonValue(project, 'impact')} ({calculateImpactScore(project)})
                      </span>
                      {isBest && <span className="ml-1 text-xs">🏆</span>}
                    </td>
                  )
                })}
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="py-4 px-4 font-semibold text-gray-700 dark:text-gray-300 sticky left-0 bg-inherit z-10">Trust Score</td>
                {projects.map((project, idx) => {
                  const isBest = getBestValue('trust') === idx
                  return (
                    <td key={project._id} className={`py-4 px-4 text-center ${isBest ? 'bg-green-50/50 dark:bg-green-900/10' : ''}`}>
                      <div className="flex items-center justify-center">
                        <span className={`font-bold mr-1 ${isBest ? 'text-amber-600 dark:text-amber-400' : 'text-gray-700 dark:text-gray-300'}`}>
                          {getComparisonValue(project, 'trust')}
                        </span>
                        <span className="text-amber-400">⭐</span>
                      </div>
                    </td>
                  )
                })}
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="py-4 px-4 font-semibold text-gray-700 dark:text-gray-300 sticky left-0 bg-inherit z-10">Location</td>
                {projects.map((project) => (
                  <td key={project._id} className="py-4 px-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    {getComparisonValue(project, 'location')}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="py-4 px-4 font-semibold text-gray-700 dark:text-gray-300 sticky left-0 bg-inherit z-10">Category</td>
                {projects.map((project) => (
                  <td key={project._id} className="py-4 px-4 text-center">
                    <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-semibold whitespace-nowrap">
                      {getComparisonValue(project, 'category')}
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="py-4 px-4 font-semibold text-gray-700 dark:text-gray-300 sticky left-0 bg-inherit z-10">Availability</td>
                {projects.map((project) => (
                  <td key={project._id} className="py-4 px-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    {getComparisonValue(project, 'available')}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CompareProjects

