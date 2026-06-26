import { FiFilter, FiX } from 'react-icons/fi';

export default function SearchFilters({ tab, filters, onChange }) {
  const handleFilterChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onChange({});
  };

  const renderStudentFilters = () => (
    <>
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-500 uppercase">Skills (comma separated)</label>
        <input 
          type="text" 
          placeholder="e.g. React, Node"
          className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
          value={filters.skills || ''}
          onChange={(e) => handleFilterChange('skills', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-500 uppercase">College</label>
        <input 
          type="text" 
          placeholder="e.g. MIT"
          className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
          value={filters.college || ''}
          onChange={(e) => handleFilterChange('college', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-500 uppercase">Graduation Year</label>
        <select 
          className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
          value={filters.graduationYear || ''}
          onChange={(e) => handleFilterChange('graduationYear', e.target.value)}
        >
          <option value="">Any Year</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
        </select>
      </div>
    </>
  );

  const renderTeamFilters = () => (
    <>
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-500 uppercase">Required Skills</label>
        <input 
          type="text" 
          placeholder="e.g. Figma, Python"
          className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
          value={filters.requiredSkills || ''}
          onChange={(e) => handleFilterChange('requiredSkills', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-500 uppercase">Required Roles</label>
        <input 
          type="text" 
          placeholder="e.g. Frontend, Designer"
          className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
          value={filters.requiredRoles || ''}
          onChange={(e) => handleFilterChange('requiredRoles', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-500 uppercase">Status</label>
        <select 
          className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
          value={filters.openStatus || ''}
          onChange={(e) => handleFilterChange('openStatus', e.target.value)}
        >
          <option value="">Any Status</option>
          <option value="true">Recruiting</option>
          <option value="false">Closed</option>
        </select>
      </div>
    </>
  );

  const renderHackathonFilters = () => (
    <>
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-500 uppercase">Mode</label>
        <select 
          className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
          value={filters.mode || ''}
          onChange={(e) => handleFilterChange('mode', e.target.value)}
        >
          <option value="">Any Mode</option>
          <option value="ONLINE">Online</option>
          <option value="OFFLINE">Offline</option>
          <option value="HYBRID">Hybrid</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-500 uppercase">Status</label>
        <select 
          className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
          value={filters.status || ''}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <option value="">Any Status</option>
          <option value="UPCOMING">Upcoming</option>
          <option value="ONGOING">Ongoing</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-500 uppercase">Domain</label>
        <input 
          type="text" 
          placeholder="e.g. Web3, AI"
          className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
          value={filters.domain || ''}
          onChange={(e) => handleFilterChange('domain', e.target.value)}
        />
      </div>
    </>
  );

  const activeFilterCount = Object.keys(filters).filter(k => filters[k] !== '' && k !== 'q' && k !== 'tab' && k !== 'page').length;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm sticky top-24">
      <div className="flex items-center justify-between mb-6 border-b border-gray-50 pb-4">
        <h3 className="font-extrabold text-gray-900 flex items-center gap-2">
          <FiFilter className="w-5 h-5 text-blue-500" />
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full ml-1">
              {activeFilterCount}
            </span>
          )}
        </h3>
        {activeFilterCount > 0 && (
          <button 
            onClick={clearFilters}
            className="text-xs font-bold text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors"
          >
            <FiX className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      <div className="space-y-5">
        {tab === 'students' && renderStudentFilters()}
        {tab === 'teams' && renderTeamFilters()}
        {tab === 'hackathons' && renderHackathonFilters()}
      </div>
    </div>
  );
}
