import { useSearchParams } from 'react-router-dom';

export default function HackathonFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Helper to update a specific filter
  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const currentMode = searchParams.get('mode') || '';
  const currentStatus = searchParams.get('status') || '';
  
  // Custom wrapper to clean URL
  const handleClear = () => {
    setSearchParams({});
  };

  return (
    <div className="space-y-6">
      {/* Mode Filter */}
      <div>
        <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Mode</h4>
        <div className="space-y-2.5">
           {['ONLINE', 'OFFLINE', 'HYBRID'].map(mode => (
             <label key={mode} className="flex items-center gap-3 cursor-pointer group">
               <input 
                 type="radio" 
                 name="mode" 
                 checked={currentMode === mode}
                 onChange={() => updateFilter('mode', mode)}
                 className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
               />
               <span className="text-gray-600 group-hover:text-gray-900 font-medium text-sm transition-colors">{mode}</span>
             </label>
           ))}
        </div>
      </div>

      {/* Status Filter */}
      <div>
        <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Status</h4>
        <div className="space-y-2.5">
           {['UPCOMING', 'ONGOING', 'COMPLETED'].map(status => (
             <label key={status} className="flex items-center gap-3 cursor-pointer group">
               <input 
                 type="radio" 
                 name="status" 
                 checked={currentStatus === status}
                 onChange={() => updateFilter('status', status)}
                 className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
               />
               <span className="text-gray-600 group-hover:text-gray-900 font-medium text-sm transition-colors">{status}</span>
             </label>
           ))}
        </div>
      </div>
      
      {/* Country Filter */}
      <div>
        <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">Country</h4>
        <input 
          type="text" 
          placeholder="e.g. United States" 
          value={searchParams.get('country') || ''}
          onChange={(e) => updateFilter('country', e.target.value)}
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-sm font-medium"
        />
      </div>

      {/* Domain Filter */}
      <div>
        <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">Domain</h4>
        <input 
          type="text" 
          placeholder="e.g. Web3, AI" 
          value={searchParams.get('domain') || ''}
          onChange={(e) => updateFilter('domain', e.target.value)}
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-sm font-medium"
        />
      </div>
      
      {/* Technology Filter */}
      <div>
        <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">Technology Stack</h4>
        <input 
          type="text" 
          placeholder="e.g. React, Python" 
          value={searchParams.get('techStack') || ''}
          onChange={(e) => updateFilter('techStack', e.target.value)}
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-sm font-medium"
        />
      </div>

      {/* Tags Filter */}
      <div>
        <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">Tags</h4>
        <input 
          type="text" 
          placeholder="e.g. beginner-friendly" 
          value={searchParams.get('tag') || ''}
          onChange={(e) => updateFilter('tag', e.target.value)}
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-sm font-medium"
        />
      </div>

      <div className="pt-4 border-t border-gray-100">
        <button 
          onClick={handleClear}
          className="w-full py-2.5 text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-700 rounded-xl transition-colors active:scale-[0.98]"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}
