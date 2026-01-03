import { useState, useEffect } from 'react'

const COUNTRY_FLAGS = {
  'Argentina': '🇦🇷', 'Australia': '🇦🇺', 'Bangladesh': '🇧🇩', 'Belgium': '🇧🇪',
  'Brazil': '🇧🇷', 'Canada': '🇨🇦', 'Chile': '🇨🇱', 'China': '🇨🇳',
  'Colombia': '🇨🇴', 'Costa Rica': '🇨🇷', 'Denmark': '🇩🇰', 'Egypt': '🇪🇬',
  'Ethiopia': '🇪🇹', 'Finland': '🇫🇮', 'France': '🇫🇷', 'Germany': '🇩🇪',
  'Greece': '🇬🇷', 'Guatemala': '🇬🇹', 'India': '🇮🇳', 'Indonesia': '🇮🇩',
  'Ireland': '🇮🇪', 'Iceland': '🇮🇸', 'Israel': '🇮🇱', 'Italy': '🇮🇹',
  'Japan': '🇯🇵', 'Kenya': '🇰🇪', 'Maldives': '🇲🇻', 'Mexico': '🇲🇽',
  'Morocco': '🇲🇦', 'Myanmar': '🇲🇲', 'Nepal': '🇳🇵', 'Netherlands': '🇳🇱',
  'New Zealand': '🇳🇿', 'Norway': '🇳🇴', 'Pakistan': '🇵🇰', 'Peru': '🇵🇪',
  'Philippines': '🇵🇭', 'Poland': '🇵🇱', 'Portugal': '🇵🇹', 'Qatar': '🇶🇦',
  'Saudi Arabia': '🇸🇦', 'Singapore': '🇸🇬', 'South Africa': '🇿🇦', 'South Korea': '🇰🇷',
  'Spain': '🇪🇸', 'Sweden': '🇸🇪', 'Switzerland': '🇨🇭', 'Tanzania': '🇹🇿',
  'Thailand': '🇹🇭', 'Turkey': '🇹🇷', 'United Arab Emirates': '🇦🇪', 'United Kingdom': '🇬🇧',
  'United States': '🇺🇸', 'Vietnam': '🇻🇳'
}

const COUNTRIES = [
  'Argentina', 'Australia', 'Bangladesh', 'Belgium', 'Brazil', 'Canada', 'Chile', 'China',
  'Colombia', 'Costa Rica', 'Denmark', 'Egypt', 'Ethiopia', 'Finland', 'France', 'Germany',
  'Greece', 'Guatemala', 'India', 'Indonesia', 'Ireland', 'Iceland', 'Israel', 'Italy',
  'Japan', 'Kenya', 'Maldives', 'Mexico', 'Morocco', 'Myanmar', 'Nepal', 'Netherlands',
  'New Zealand', 'Norway', 'Pakistan', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar',
  'Saudi Arabia', 'Singapore', 'South Africa', 'South Korea', 'Spain', 'Sweden', 'Switzerland',
  'Tanzania', 'Thailand', 'Turkey', 'United Arab Emirates', 'United Kingdom', 'United States', 'Vietnam'
].sort()

const CountrySelector = ({ selectedCountry, onCountrySelect, projectCounts = {} }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const filteredCountries = COUNTRIES.filter(country =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCountryClick = (country) => {
    if (selectedCountry === country) {
      onCountrySelect('') // Deselect if clicking same country
    } else {
      onCountrySelect(country)
    }
    setIsExpanded(false)
    setSearchTerm('')
  }

  return (
    <div className="w-full">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Browse by Country
          </h3>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium lg:hidden"
          >
            {isExpanded ? 'Show Less' : 'Show All'}
          </button>
        </div>

        {/* Search */}
        <div className="mb-3 sm:mb-4">
          <input
            type="text"
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none dark:text-white text-sm"
          />
        </div>

        {/* Country Grid */}
        <div className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-2 ${isExpanded ? '' : 'max-h-64 overflow-y-auto'} lg:max-h-none`}>
          {filteredCountries.map((country) => {
            const isSelected = selectedCountry === country
            const count = projectCounts[country] || 0
            
            return (
              <button
                key={country}
                onClick={() => handleCountryClick(country)}
                className={`flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg border-2 transition-all transform active:scale-95 hover:scale-105 touch-manipulation min-h-[80px] sm:min-h-[90px] ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md ring-2 ring-primary-200'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 hover:border-primary-300 dark:hover:border-primary-600'
                }`}
                title={`${country} (${count} projects)`}
              >
                <span className="text-xl sm:text-2xl mb-1">{COUNTRY_FLAGS[country] || '🌍'}</span>
                <span className={`text-[10px] sm:text-xs font-semibold text-center leading-tight px-1 ${
                  isSelected
                    ? 'text-primary-700 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {country.length > 10 ? country.substring(0, 8) + '...' : country}
                </span>
                {count > 0 && (
                  <span className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 font-medium">
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {selectedCountry && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => handleCountryClick(selectedCountry)}
              className="w-full px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-lg font-semibold text-sm hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors flex items-center justify-center"
            >
              <span className="mr-2">Clear filter: {selectedCountry}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CountrySelector

