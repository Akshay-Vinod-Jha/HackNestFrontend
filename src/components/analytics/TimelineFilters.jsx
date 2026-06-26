import { FiFilter, FiChevronDown } from 'react-icons/fi';

export default function TimelineFilters({ filterType, setFilterType }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm mb-8 flex justify-end">
      
      <div className="flex w-full md:w-auto items-center gap-3">
        {/* Type Filter */}
        <div className="relative flex-1 md:flex-none md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiFilter className="w-4 h-4 text-gray-400" />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full pl-9 pr-8 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all cursor-pointer"
          >
            <option value="ALL">All Activity</option>
            <option value="HACKATHONS">Hackathon Participation</option>
            <option value="TEAMS">Team Activity</option>
            <option value="ACHIEVEMENTS">Achievements</option>
            <option value="SYSTEM">System Events</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
             <FiChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

    </div>
  );
}
