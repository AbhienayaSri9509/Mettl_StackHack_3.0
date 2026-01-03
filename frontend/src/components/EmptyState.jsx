const EmptyState = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="mb-6 bg-gray-50 dark:bg-gray-700/50 p-6 rounded-full">
        <svg
          className="w-24 h-24 text-gray-300 dark:text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Projects Found</h3>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8">
        We couldn't find any projects matching your filters. Try adjusting your search criteria or reset to see all available projects.
      </p>
      {onReset && (
        <button
          onClick={onReset}
          className="px-8 py-3 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold rounded-xl transition-all shadow-md hover:shadow-lg transform active:scale-95"
        >
          Reset All Filters
        </button>
      )}
    </div>
  )
}

export default EmptyState

