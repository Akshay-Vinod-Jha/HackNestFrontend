import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useTeams from '../../hooks/useTeams';
import TeamGrid from '../../components/teams/TeamGrid';
import TeamSkeleton from '../../components/teams/TeamSkeleton';
import EmptyTeamState from '../../components/teams/EmptyTeamState';
import TeamSearchBar from '../../components/teams/TeamSearchBar';
import TeamFilters from '../../components/teams/TeamFilters';
import TeamFilterDrawer from '../../components/teams/TeamFilterDrawer';
import { FiPlus, FiFilter } from 'react-icons/fi';

export default function TeamsPage() {
  const [searchParams] = useSearchParams();
  const { teams, isLoading, error, searchTeams, clearError } = useTeams();
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams.entries());
    
    // Always call searchTeams because backend usually treats an empty search query as "fetch all" 
    // when hitting /api/teams/search, or if there is no specific getAll method in teams endpoint.
    searchTeams(currentParams).catch(() => {});
  }, [searchParams, searchTeams]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Teams</h1>
          <p className="text-gray-500 font-medium mt-2 text-lg">Find the perfect team or recruit members for your next project.</p>
        </div>
        <Link 
          to="/teams/create"
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-sm hover:bg-blue-700 hover:shadow transition-all active:scale-95 whitespace-nowrap gap-2"
        >
          <FiPlus className="w-5 h-5" />
          Create Team
        </Link>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block w-72 shrink-0 sticky top-24">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <FiFilter className="w-5 h-5 text-gray-900" />
              <h2 className="text-xl font-extrabold text-gray-900">Filters</h2>
            </div>
            <TeamFilters />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full min-w-0">
          <div className="flex gap-4 mb-8">
            <div className="flex-1">
              <TeamSearchBar />
            </div>
            <button 
              onClick={() => setIsFilterDrawerOpen(true)}
              className="lg:hidden px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-2xl shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2 font-bold shrink-0"
            >
              <FiFilter className="w-5 h-5 text-blue-600" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {isLoading && !teams?.length ? (
            <TeamSkeleton />
          ) : error && !teams?.length ? (
            <div className="bg-white rounded-3xl border border-red-100 shadow-sm p-12 text-center max-w-2xl mx-auto mt-8">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Failed to load teams</h2>
              <p className="text-gray-500 font-medium mb-8 max-w-md mx-auto">{typeof error === 'string' ? error : 'An unexpected error occurred while fetching teams.'}</p>
              <button 
                onClick={() => { clearError(); searchTeams(Object.fromEntries(searchParams.entries())); }}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold transition-all shadow-sm hover:bg-blue-700 active:scale-95"
              >
                Try Again
              </button>
            </div>
          ) : teams && teams.length > 0 ? (
            <TeamGrid teams={teams} />
          ) : (
            <EmptyTeamState />
          )}
        </div>
      </div>

      <TeamFilterDrawer isOpen={isFilterDrawerOpen} onClose={() => setIsFilterDrawerOpen(false)} />
    </div>
  );
}
