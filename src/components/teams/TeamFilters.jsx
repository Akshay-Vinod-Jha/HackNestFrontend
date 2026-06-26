import { useSearchParams } from 'react-router-dom';

export default function TeamFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.delete('page');
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="space-y-6">
      {/* Required Role */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-2">Required Role</label>
        <input 
          type="text"
          placeholder="e.g. Frontend Developer"
          value={searchParams.get('role') || ''}
          onChange={(e) => updateFilter('role', e.target.value)}
          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900 text-sm"
        />
      </div>

      {/* Required Skill */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-2">Required Skill</label>
        <input 
          type="text"
          placeholder="e.g. React, Python"
          value={searchParams.get('skill') || ''}
          onChange={(e) => updateFilter('skill', e.target.value)}
          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900 text-sm"
        />
      </div>

      {/* Hackathon ID/Name */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-2">Hackathon</label>
        <input 
          type="text"
          placeholder="Hackathon ID or Name"
          value={searchParams.get('hackathon') || ''}
          onChange={(e) => updateFilter('hackathon', e.target.value)}
          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900 text-sm"
        />
      </div>

      {/* Open Status */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-3">Recruiting Status</label>
        <div className="space-y-2">
          {['ALL', 'OPEN', 'CLOSED'].map((status) => {
            const currentStatus = searchParams.get('status') || 'ALL';
            return (
              <label key={status} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${currentStatus === status ? 'border-blue-600 bg-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                  {currentStatus === status && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
                <span className={`text-sm font-medium ${currentStatus === status ? 'text-gray-900 font-bold' : 'text-gray-600 group-hover:text-gray-900'}`}>
                  {status === 'ALL' ? 'Any Status' : status === 'OPEN' ? 'Currently Recruiting' : 'Filled / Closed'}
                </span>
                <input 
                  type="radio" 
                  name="status"
                  value={status}
                  className="hidden"
                  checked={currentStatus === status}
                  onChange={(e) => updateFilter('status', e.target.value === 'ALL' ? '' : e.target.value)}
                />
              </label>
            );
          })}
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100">
        <button 
          onClick={clearFilters}
          className="w-full py-2.5 bg-gray-50 hover:bg-red-50 text-gray-700 hover:text-red-600 font-bold rounded-xl transition-colors text-sm"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}
