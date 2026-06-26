import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSearch from '../../hooks/useSearch';
import useDebounce from '../../hooks/useDebounce';

import GlobalSearchBar from '../../components/discovery/GlobalSearchBar';
import SearchTabs from '../../components/discovery/SearchTabs';
import SearchFilters from '../../components/discovery/SearchFilters';
import SearchResults from '../../components/discovery/SearchResults';

export default function DiscoverPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // URL State Extraction
  const currentTab = searchParams.get('tab') || 'students';
  const queryParam = searchParams.get('q') || '';
  
  // Local input state for snappy typing
  const [localQuery, setLocalQuery] = useState(queryParam);
  // Debounced value triggers URL update
  const debouncedQuery = useDebounce(localQuery, 500);

  const { 
    users, teams, hackathons, 
    isLoading, error,
    searchUsers, searchTeams, searchHackathons
  } = useSearch();

  // Sync Debounced Local Query to URL
  useEffect(() => {
    if (debouncedQuery !== queryParam) {
      setSearchParams(prev => {
        if (debouncedQuery) prev.set('q', debouncedQuery);
        else prev.delete('q');
        prev.set('page', '0'); // Reset page on new search
        return prev;
      }, { replace: true });
    }
  }, [debouncedQuery, queryParam, setSearchParams]);

  // Extract Filters from URL
  const activeFilters = useMemo(() => {
    const filters = {};
    for (const [key, value] of searchParams.entries()) {
      if (!['tab', 'q', 'page', 'size'].includes(key)) {
        filters[key] = value;
      }
    }
    return filters;
  }, [searchParams]);

  // Trigger API when URL changes (tab, q, filters)
  useEffect(() => {
    const page = searchParams.get('page') || 0;
    const apiParams = { q: queryParam, page, size: 20, ...activeFilters };

    if (currentTab === 'students') searchUsers(apiParams).catch(() => {});
    if (currentTab === 'teams') searchTeams(apiParams).catch(() => {});
    if (currentTab === 'hackathons') searchHackathons(apiParams).catch(() => {});
    
    // Disable exhaust dependency to strictly fire on URL state lock
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab, queryParam, activeFilters]);

  // Handlers
  const handleTabChange = (newTab) => {
    setSearchParams({ tab: newTab });
    setLocalQuery(''); // Clear search on tab switch
  };

  const handleFilterChange = (newFilters) => {
    setSearchParams(prev => {
      const nextParams = new URLSearchParams();
      nextParams.set('tab', currentTab);
      if (queryParam) nextParams.set('q', queryParam);
      
      // Apply new filters
      Object.entries(newFilters).forEach(([k, v]) => {
        if (v) nextParams.set(k, v);
      });
      
      return nextParams;
    });
  };

  // Determine which dataset to pass to SearchResults
  let results = [];
  if (currentTab === 'students') results = users;
  if (currentTab === 'teams') results = teams;
  if (currentTab === 'hackathons') results = hackathons;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Discover HackNest</h1>
        <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
          Find your next teammate, join an ambitious project, or register for upcoming hackathons globally.
        </p>
      </div>

      <GlobalSearchBar value={localQuery} onChange={setLocalQuery} />
      
      <SearchTabs activeTab={currentTab} onTabChange={handleTabChange} />

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-6 py-4 rounded-2xl mb-8 flex items-center justify-between shadow-sm">
           <span className="font-bold">{typeof error === 'string' ? error : 'Failed to fetch results.'}</span>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-1/4 shrink-0">
          <SearchFilters 
            tab={currentTab} 
            filters={activeFilters} 
            onChange={handleFilterChange} 
          />
        </div>

        {/* Results Grid */}
        <div className="flex-1 w-full">
          <SearchResults 
            tab={currentTab} 
            results={results} 
            isLoading={isLoading} 
            query={queryParam}
          />
        </div>
      </div>
    </div>
  );
}
