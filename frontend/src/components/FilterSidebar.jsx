import { useState } from 'react'
import { PriceSlider } from './PriceSlider'
import { SDGGrid } from './SDGIcons'
import { X } from 'lucide-react'

const CATEGORIES = [
  'Infrastructure',
  'Forestry',
  'Renewable Energy',
  'Agriculture',
  'Waste Management',
  'Water Management',
  'Other'
]

const COUNTRIES = [
  'Argentina', 'Australia', 'Bangladesh', 'Brazil', 'Canada', 'Chile', 'China', 
  'Colombia', 'Costa Rica', 'Ethiopia', 'France', 'Germany', 'India', 'Indonesia', 
  'Israel', 'Italy', 'Japan', 'Kenya', 'Maldives', 'Mexico', 'Morocco', 'Nepal', 
  'Netherlands', 'Norway', 'Peru', 'Philippines', 'Saudi Arabia', 'Singapore', 
  'South Africa', 'South Korea', 'Spain', 'Sweden', 'Thailand', 'United Arab Emirates',
  'United Kingdom', 'United States', 'Vietnam'
].sort()

const SDG_GOALS = Array.from({ length: 17 }, (_, i) => i + 1)

const FilterSidebar = ({ filters, onFilterChange, onReset }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white dark:bg-gray-800 dark:text-white px-4 py-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between transition-colors"
        >
          <span className="font-bold flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Filters
          </span>
          <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Filter sidebar */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6 lg:mb-0 transition-colors duration-300`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white contents-center">
            Filters
          </h2>
          <button
            onClick={onReset}
            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-bold transition-colors"
          >
            Reset All
          </button>
        </div>

        <div className="space-y-8">
          {/* Search */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters.search || ''}
                onChange={(e) => onFilterChange('search', e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all dark:text-white dark:placeholder-gray-400"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={filters.category || ''}
              onChange={(e) => onFilterChange('category', e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all dark:text-white cursor-pointer"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              Country
            </label>
            <select
              value={filters.country || ''}
              onChange={(e) => onFilterChange('country', e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all dark:text-white cursor-pointer"
            >
              <option value="">All Countries</option>
              {COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* VERRA Certification */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              Certification
            </label>
            <div className="flex bg-gray-50 dark:bg-gray-700 p-1 rounded-xl">
              <button
                onClick={() => onFilterChange('verraCertified', '')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${filters.verraCertified === '' ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
              >
                All
              </button>
              <button
                onClick={() => onFilterChange('verraCertified', 'true')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${filters.verraCertified === 'true' ? 'bg-white dark:bg-gray-600 shadow-sm text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
              >
                Verra
              </button>
            </div>
          </div>

          {/* Price Range Slider */}
          {/* Note: PriceSlider component needs internal update or props to support dark mode styles passed down, assume basic support for now or simple styling */}
          <div className="pt-2">
            {/* Simplified display for now as PriceSlider might be custom */}
            <div className="flex justify-between text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              <span>Price Filter</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => onFilterChange('minPrice', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dark:text-white"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange('maxPrice', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm dark:text-white"
              />
            </div>
          </div>

          {/* SDG Goal - Icon Grid */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
              SDG Goals
            </label>
            <div className="grid grid-cols-6 gap-2 mb-3">
              {SDG_GOALS.map((goal) => {
                const isSelected = filters.sdgGoal === goal.toString()
                const sdgColors = {
                  1: 'bg-red-500', 2: 'bg-yellow-500', 3: 'bg-green-500', 4: 'bg-red-600',
                  5: 'bg-orange-500', 6: 'bg-cyan-500', 7: 'bg-yellow-400', 8: 'bg-red-700',
                  9: 'bg-orange-600', 10: 'bg-pink-500', 11: 'bg-yellow-600', 12: 'bg-amber-500',
                  13: 'bg-green-600', 14: 'bg-blue-500', 15: 'bg-green-700', 16: 'bg-blue-600',
                  17: 'bg-blue-700'
                }
                return (
                  <button
                    key={goal}
                    onClick={() => onFilterChange('sdgGoal', isSelected ? '' : goal.toString())}
                    className={`w-9 h-9 rounded-full text-white text-[10px] font-bold flex items-center justify-center transition-all ${sdgColors[goal] || 'bg-gray-400'
                      } ${isSelected
                        ? 'ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-gray-800 scale-110 shadow-lg'
                        : 'opacity-70 hover:opacity-100 hover:scale-105'
                      }`}
                    title={`SDG Goal ${goal}`}
                  >
                    {goal}
                  </button>
                )
              })}
            </div>
            {filters.sdgGoal && (
              <button
                onClick={() => onFilterChange('sdgGoal', '')}
                className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-bold flex items-center"
              >
                <X className="w-3 h-3 mr-1" />
                Clear SDG filter
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default FilterSidebar

