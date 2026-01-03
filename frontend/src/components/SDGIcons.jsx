import { useState } from 'react'

const SDG_INFO = {
  1: { name: 'No Poverty', icon: '🌍', color: 'bg-red-500', description: 'End poverty in all forms everywhere' },
  2: { name: 'Zero Hunger', icon: '🌾', color: 'bg-yellow-500', description: 'End hunger, achieve food security' },
  3: { name: 'Good Health', icon: '❤️', color: 'bg-green-500', description: 'Ensure healthy lives for all' },
  4: { name: 'Quality Education', icon: '📚', color: 'bg-red-600', description: 'Ensure inclusive education' },
  5: { name: 'Gender Equality', icon: '👥', color: 'bg-orange-500', description: 'Achieve gender equality' },
  6: { name: 'Clean Water', icon: '💧', color: 'bg-cyan-500', description: 'Ensure water and sanitation for all' },
  7: { name: 'Affordable Energy', icon: '⚡', color: 'bg-yellow-400', description: 'Ensure access to affordable energy' },
  8: { name: 'Decent Work', icon: '💼', color: 'bg-red-700', description: 'Promote inclusive economic growth' },
  9: { name: 'Industry Innovation', icon: '🏭', color: 'bg-orange-600', description: 'Build resilient infrastructure' },
  10: { name: 'Reduced Inequalities', icon: '⚖️', color: 'bg-pink-500', description: 'Reduce inequality within countries' },
  11: { name: 'Sustainable Cities', icon: '🏙️', color: 'bg-yellow-600', description: 'Make cities inclusive and sustainable' },
  12: { name: 'Responsible Consumption', icon: '♻️', color: 'bg-amber-500', description: 'Ensure sustainable consumption' },
  13: { name: 'Climate Action', icon: '🌡️', color: 'bg-green-600', description: 'Take urgent action on climate change' },
  14: { name: 'Life Below Water', icon: '🌊', color: 'bg-blue-500', description: 'Conserve oceans and marine resources' },
  15: { name: 'Life on Land', icon: '🌱', color: 'bg-green-700', description: 'Protect and restore terrestrial ecosystems' },
  16: { name: 'Peace & Justice', icon: '🕊️', color: 'bg-blue-600', description: 'Promote peaceful and inclusive societies' },
  17: { name: 'Partnerships', icon: '🤝', color: 'bg-blue-700', description: 'Strengthen means of implementation' },
}

const SDGIcon = ({ goal, size = 'md', showTooltip = true }) => {
  const [showTooltipState, setShowTooltipState] = useState(false)
  const info = SDG_INFO[goal]
  
  if (!info) return null

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  }

  return (
    <div className="relative inline-block">
      <div
        className={`${sizeClasses[size]} ${info.color} rounded-full text-white flex items-center justify-center font-bold cursor-help transition-transform hover:scale-110 shadow-md`}
        onMouseEnter={() => setShowTooltipState(true)}
        onMouseLeave={() => setShowTooltipState(false)}
        title={showTooltip ? `${info.name}: ${info.description}` : ''}
      >
        <span className="text-lg">{info.icon}</span>
      </div>
      {showTooltip && showTooltipState && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-50 shadow-lg">
          <div className="font-semibold">SDG {goal}: {info.name}</div>
          <div className="text-gray-300 mt-1">{info.description}</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}
    </div>
  )
}

export const SDGGrid = ({ goals, size = 'md', maxDisplay = 6 }) => {
  if (!goals || goals.length === 0) return null

  const displayGoals = goals.slice(0, maxDisplay)
  const remaining = goals.length - maxDisplay

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {displayGoals.map((goal) => (
        <SDGIcon key={goal} goal={goal} size={size} />
      ))}
      {remaining > 0 && (
        <div className={`w-10 h-10 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center font-bold text-sm`}>
          +{remaining}
        </div>
      )}
    </div>
  )
}

export default SDGIcon

