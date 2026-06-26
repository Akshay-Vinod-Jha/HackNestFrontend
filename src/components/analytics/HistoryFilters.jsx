import { FiSearch, FiFilter, FiChevronDown } from 'react-icons/fi';

export default function HistoryFilters({ searchQuery, setSearchQuery, sortOrder, setSortOrder, filterResult, setFilterResult }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
      
      {/* Search Bar */}
      <div className="relative w-full md:w-96">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FiSearch className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search hackathons or teams..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
        />
      </div>

      <div className="flex w-full md:w-auto items-center gap-3">
        {/* Result Filter */}
        <div className="relative flex-1 md:flex-none">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiFilter className="w-4 h-4 text-gray-400" />
          </div>
          <select
            value={filterResult}
            onChange={(e) => setFilterResult(e.target.value)}
            className="w-full pl-9 pr-8 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all cursor-pointer"
          >
            <option value="ALL">All Results</option>
            <option value="WINNER">Winners</option>
            <option value="FINALIST">Finalists</option>
            <option value="COMPLETED">Completed</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
             <FiChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Sort Order */}
        <div className="relative flex-1 md:flex-none">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full pl-4 pr-8 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all cursor-pointer"
          >
            <option value="NEWEST">Newest First</option>
            <option value="OLDEST">Oldest First</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
             <FiChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

    </div>
  );
}
