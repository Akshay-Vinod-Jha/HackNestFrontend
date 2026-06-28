import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import useHackathons from '../../hooks/useHackathons';
import HackathonGrid from '../../components/hackathons/HackathonGrid';
import HackathonSkeleton from '../../components/hackathons/HackathonSkeleton';
import EmptyHackathonState from '../../components/hackathons/EmptyHackathonState';
import HackathonSearchBar from '../../components/hackathons/HackathonSearchBar';
import HackathonFilters from '../../components/hackathons/HackathonFilters';
import FilterDrawer from '../../components/hackathons/FilterDrawer';
import HackathonSorting from '../../components/hackathons/HackathonSorting';
import HackathonPagination from '../../components/hackathons/HackathonPagination';
import { FiPlus, FiFilter } from 'react-icons/fi';
import { fadeUp, buttonHover } from '../../utils/animations';

export default function HackathonsPage() {
  const [searchParams] = useSearchParams();
  const { 
    hackathons, 
    searchResults, 
    pagination, 
    isLoading, 
    error, 
    fetchHackathons, 
    searchHackathons, 
    clearError 
  } = useHackathons();
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams.entries());
    
    // Always use searchHackathons when we have query params (like page, size, sorting, or filters)
    if (Object.keys(currentParams).length > 0) {
      searchHackathons(currentParams).catch(() => {});
    } else {
      fetchHackathons().catch(() => {});
    }
  }, [searchParams, fetchHackathons, searchHackathons]);

  const hasParams = Object.keys(Object.fromEntries(searchParams.entries())).length > 0;
  const displayedHackathons = hasParams ? searchResults : hackathons;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <motion.div {...fadeUp} className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="clay-page-title">Hackathons</h1>
          <p className="clay-page-subtitle mt-2">Discover and join top-tier hackathons around the globe.</p>
        </div>
        <motion.div {...buttonHover}>
          <Link 
            to="/hackathons/create"
            className="clay-button clay-button-primary inline-flex items-center justify-center px-6 py-3 whitespace-nowrap gap-2"
          >
            <FiPlus className="w-5 h-5" />
            Create Hackathon
          </Link>
        </motion.div>
      </motion.div>

      {/* Main  */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block w-72 shrink-0 sticky top-24">
          <div className="clay-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <FiFilter className="w-5 h-5" style={{ color: 'var(--clay-text-primary)' }} />
              <h2 className="text-xl font-extrabold" style={{ color: 'var(--clay-text-primary)' }}>Filters</h2>
            </div>
            <HackathonFilters />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full min-w-0">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <HackathonSearchBar />
            </div>
            <div className="flex gap-4">
              <HackathonSorting />
              <button 
                onClick={() => setIsFilterDrawerOpen(true)}
                className="clay-button clay-button-secondary lg:hidden px-4 py-3 flex items-center justify-center gap-2 shrink-0"
              >
                <FiFilter className="w-5 h-5" style={{ color: 'var(--clay-primary)' }} />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>

          {isLoading && !displayedHackathons?.length ? (
            <HackathonSkeleton />
          ) : error && !displayedHackathons?.length ? (
            <div className="clay-card p-12 text-center max-w-2xl mx-auto mt-8" style={{ borderColor: 'color-mix(in srgb, var(--clay-danger) 20%, transparent)' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'color-mix(in srgb, var(--clay-danger) 10%, transparent)' }}>
                <svg className="w-8 h-8" style={{ color: 'var(--clay-danger)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <h2 className="text-2xl font-extrabold mb-3" style={{ color: 'var(--clay-text-primary)' }}>Failed to load hackathons</h2>
              <p className="font-medium mb-8 max-w-md mx-auto" style={{ color: 'var(--clay-text-muted)' }}>{typeof error === 'string' ? error : 'An unexpected error occurred while fetching hackathons.'}</p>
              <button 
                onClick={() => { clearError(); hasParams ? searchHackathons(Object.fromEntries(searchParams.entries())) : fetchHackathons(); }}
                className="clay-button clay-button-primary px-8 py-3"
              >
                Try Again
              </button>
            </div>
          ) : displayedHackathons && displayedHackathons.length > 0 ? (
            <>
              <HackathonGrid hackathons={displayedHackathons} />
              <HackathonPagination pagination={pagination} isLoading={isLoading} />
            </>
          ) : (
            <EmptyHackathonState />
          )}
        </div>
      </div>

      <FilterDrawer isOpen={isFilterDrawerOpen} onClose={() => setIsFilterDrawerOpen(false)} />
    </div>
  );
}
