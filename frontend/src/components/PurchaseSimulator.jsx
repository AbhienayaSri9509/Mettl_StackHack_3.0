import { useState } from 'react'

const PurchaseSimulator = ({ pricePerCredit, availableCredits }) => {
  const [credits, setCredits] = useState(100)
  const maxCredits = Math.min(availableCredits, 10000) // reasonable max

  const totalPrice = credits * pricePerCredit
  const tonsCO2 = credits * 1 // 1 credit = 1 ton CO2 (standard)
  const carsOffRoad = Math.round(tonsCO2 / 2.4) // Average car emits 2.4 tons/year
  const treesPlanted = Math.round(tonsCO2 * 20) // 1 tree = ~0.05 tons CO2

  return (
    <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-6 border border-primary-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Calculate Your Impact</h3>
      
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Number of Credits
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min="1"
            max={maxCredits}
            value={credits}
            onChange={(e) => setCredits(parseInt(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />
          <input
            type="number"
            min="1"
            max={maxCredits}
            value={credits}
            onChange={(e) => setCredits(Math.min(Math.max(parseInt(e.target.value) || 1, 1), maxCredits))}
            className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-center font-semibold focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Max: {maxCredits.toLocaleString()} credits available
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-600">Total Price</span>
          <span className="text-3xl font-bold text-primary-600">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          ${pricePerCredit.toFixed(2)} × {credits.toLocaleString()} credits
        </div>
      </div>

      <div className="space-y-3">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-3">🌍</span>
            <div>
              <div className="font-semibold text-gray-800">
                You offset: {tonsCO2.toLocaleString()} tons CO₂
              </div>
              <div className="text-sm text-gray-600">Equivalent to:</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
            <div className="text-2xl mb-1">🚗</div>
            <div className="text-lg font-bold text-gray-800">{carsOffRoad}</div>
            <div className="text-xs text-gray-600">cars off road for 1 year</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
            <div className="text-2xl mb-1">🌳</div>
            <div className="text-lg font-bold text-gray-800">{treesPlanted.toLocaleString()}</div>
            <div className="text-xs text-gray-600">trees planted</div>
          </div>
        </div>
      </div>

      <button className="w-full mt-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg">
        Purchase {credits.toLocaleString()} Credits
      </button>
    </div>
  )
}

export default PurchaseSimulator

