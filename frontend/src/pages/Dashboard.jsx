import { useState } from 'react'

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview')

    const user = {
        name: "Alex Johnson",
        totalImpact: 1250, // tons CO2
        creditsOwned: 45,
        projectsSupported: 8,
        transactions: [
            { id: 1, date: '2024-03-15', project: 'Amazon Rainforest Conservation', amount: 5, cost: 142.50, status: 'Completed' },
            { id: 2, date: '2024-02-28', project: 'Solar Power Initiative', amount: 10, cost: 187.50, status: 'Completed' },
            { id: 3, date: '2024-01-10', project: 'Blue Carbon Mangroves', amount: 3, cost: 105.00, status: 'Completed' },
        ]
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">My Dashboard</h1>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="text-sm opacity-80 mb-1">Total Impact</div>
                    <div className="text-4xl font-bold mb-2">{user.totalImpact}</div>
                    <div className="text-sm">Tons of CO₂ Offset</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                    <div className="text-sm text-gray-500 mb-1">Portfolio Value</div>
                    <div className="text-4xl font-bold text-gray-800 mb-2">${(user.creditsOwned * 25).toFixed(2)}</div>
                    <div className="text-sm text-green-600">Based on avg. market price</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                    <div className="text-sm text-gray-500 mb-1">Projects Supported</div>
                    <div className="text-4xl font-bold text-primary-600 mb-2">{user.projectsSupported}</div>
                    <div className="text-sm text-gray-500">Across 4 different categories</div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200">
                    <nav className="flex">
                        {['overview', 'transactions', 'certificates'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-4 text-sm font-medium transition-colors ${activeTab === tab
                                        ? 'border-b-2 border-primary-500 text-primary-600 bg-primary-50'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-8">
                    {activeTab === 'overview' && (
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
                            <div className="space-y-4">
                                {user.transactions.map((tx) => (
                                    <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                                ✓
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-800">{tx.project}</div>
                                                <div className="text-sm text-gray-500">{tx.date}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-gray-800">{tx.amount} Credits</div>
                                            <div className="text-sm text-gray-600">${tx.cost.toFixed(2)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'transactions' && (
                        <div className="text-center py-12 text-gray-500">
                            Full transaction history would populate here.
                        </div>
                    )}

                    {activeTab === 'certificates' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-500 transition-colors cursor-pointer group">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-50 text-gray-400 group-hover:text-primary-500">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                </div>
                                <h4 className="font-semibold text-gray-800">Download All Certificates</h4>
                                <p className="text-sm text-gray-500 mt-2">PDF Bundle (12.4 MB)</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
