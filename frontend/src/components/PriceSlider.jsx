import { useState, useEffect } from 'react'

const PriceSlider = ({ minPrice = 0, maxPrice = 50, value, onChange, label }) => {
  const [localMin, setLocalMin] = useState(value?.min || minPrice)
  const [localMax, setLocalMax] = useState(value?.max || maxPrice)

  useEffect(() => {
    if (value) {
      setLocalMin(value.min || minPrice)
      setLocalMax(value.max || maxPrice)
    }
  }, [value, minPrice, maxPrice])

  const handleMinChange = (e) => {
    const newMin = Math.min(parseFloat(e.target.value), localMax - 1)
    setLocalMin(newMin)
    onChange({ min: newMin, max: localMax })
  }

  const handleMaxChange = (e) => {
    const newMax = Math.max(parseFloat(e.target.value), localMin + 1)
    setLocalMax(newMax)
    onChange({ min: localMin, max: newMax })
  }

  const minPercent = ((localMin - minPrice) / (maxPrice - minPrice)) * 100
  const maxPercent = ((localMax - minPrice) / (maxPrice - minPrice)) * 100

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          {label}
        </label>
      )}
      <div className="relative">
        <div className="h-2 bg-gray-200 rounded-lg relative">
          <div
            className="absolute h-2 bg-primary-500 rounded-lg"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`
            }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={localMin}
            onChange={handleMinChange}
            className="absolute w-full h-2 opacity-0 cursor-pointer z-10"
            style={{ top: 0 }}
          />
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={localMax}
            onChange={handleMaxChange}
            className="absolute w-full h-2 opacity-0 cursor-pointer z-10"
            style={{ top: 0 }}
          />
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">Min:</span>
            <input
              type="number"
              value={localMin.toFixed(0)}
              onChange={(e) => {
                const val = Math.min(Math.max(parseFloat(e.target.value) || minPrice, minPrice), localMax - 1)
                setLocalMin(val)
                onChange({ min: val, max: localMax })
              }}
              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">Max:</span>
            <input
              type="number"
              value={localMax.toFixed(0)}
              onChange={(e) => {
                const val = Math.max(Math.min(parseFloat(e.target.value) || maxPrice, maxPrice), localMin + 1)
                setLocalMax(val)
                onChange({ min: localMin, max: val })
              }}
              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        <div className="text-center mt-2 text-sm text-gray-600">
          ${localMin.toFixed(2)} — ${localMax.toFixed(2)}
        </div>
      </div>
    </div>
  )
}

export default PriceSlider

