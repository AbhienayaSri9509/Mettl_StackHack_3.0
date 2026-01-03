import { useState } from 'react'

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
  'Brazil', 'India', 'Kenya', 'Vietnam', 'Singapore', 'Sweden', 'Indonesia', 'Nepal'
]

const SDG_GOALS = Array.from({ length: 17 }, (_, i) => i + 1)

const FilterSidebar = ({ filters, onFilterChange, onReset }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white px-4 py-2 rounded-lg shadow-md flex items-center justify-between"
        >
          <span className="font-semibold">Filters</span>
          <svg
            className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Filter sidebar */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } lg:block bg-white rounded-lg shadow-md p-6 mb-6 lg:mb-0`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Filters</h2>
          <button
            onClick={onReset}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Reset
          </button>
        </div>

        <div className="space-y-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              value={filters.search || ''}
              onChange={(e) => onFilterChange('search', e.target.value)}
              placeholder="Search projects..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              value={filters.category || ''}
              onChange={(e) => onFilterChange('category', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Country
            </label>
            <select
              value={filters.country || ''}
              onChange={(e) => onFilterChange('country', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              VERRA Certified
            </label>
            <select
              value={filters.verraCertified || ''}
              onChange={(e) => onFilterChange('verraCertified', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Projects</option>
              <option value="true">VERRA Certified Only</option>
              <option value="false">Non-Certified Only</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price Range (per credit)
            </label>
            <div className="space-y-2">
              <input
                type="number"
                value={filters.minPrice || ''}
                onChange={(e) => onFilterChange('minPrice', e.target.value)}
                placeholder="Min price"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <input
                type="number"
                value={filters.maxPrice || ''}
                onChange={(e) => onFilterChange('maxPrice', e.target.value)}
                placeholder="Max price"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* SDG Goal */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              SDG Goal
            </label>
            <select
              value={filters.sdgGoal || ''}
              onChange={(e) => onFilterChange('sdgGoal', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All SDG Goals</option>
              {SDG_GOALS.map((goal) => (
                <option key={goal} value={goal}>
                  SDG Goal {goal}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  )
}

export default FilterSidebar

