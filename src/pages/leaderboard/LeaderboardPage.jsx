import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import useLeaderboard from '../../hooks/useLeaderboard';
import useAuthStore from '../../store/authStore';
import LeaderboardCard from '../../components/leaderboard/LeaderboardCard';
import { FiAlertCircle, FiSearch, FiChevronDown, FiGlobe, FiBook, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { fadeUp, bounceIn, staggerContainer, staggerItem } from '../../utils/animations';

export default function LeaderboardPage() {
  const { user } = useAuthStore();
  const { 
    globalLeaderboard, 
    collegeLeaderboard, 
    isLoading, 
    error, 
    fetchGlobalLeaderboard, 
    fetchCollegeLeaderboard 
  } = useLeaderboard();

  // Local State
  const [activeTab, setActiveTab] = useState('GLOBAL'); // 'GLOBAL' or 'COLLEGE'
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortBy, setSortBy] = useState('trustScore,desc');

  // Simple Debounce for Search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchActiveLeaderboard = useCallback((currentPage, currentSearch, currentSort) => {
    const params = { page: currentPage, size, search: currentSearch, sortBy: currentSort };
    if (activeTab === 'GLOBAL') {
      fetchGlobalLeaderboard(params).catch(() => {});
    } else {
      params.college = user?.college || '';
      fetchCollegeLeaderboard(params).catch(() => {});
    }
  }, [activeTab, size, fetchGlobalLeaderboard, fetchCollegeLeaderboard, user?.college]);

  // Initial load and dependency changes
  useEffect(() => {
    fetchActiveLeaderboard(page, debouncedSearch, sortBy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, page, sortBy, debouncedSearch, user?.college]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(0); // Reset page on new search typing
  };

  const currentData = activeTab === 'GLOBAL' ? globalLeaderboard : collegeLeaderboard;
  // If backend returns paginated object like { content: [], totalPages: 5 }
  const users = currentData?.content || currentData || [];
  const totalPages = currentData?.totalPages || 1;
  const isLastPage = page >= totalPages - 1;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      
      {/* Header & Tabs */}
      <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="clay-page-title mb-2">Leaderboard</h1>
          <p className="clay-page-subtitle">See how you rank against other participants based on trust and contribution.</p>
        </div>

        <div className="flex p-1 rounded-2xl shrink-0" style={{ background: 'var(--clay-surface-2)' }}>
          <button
            onClick={() => { setActiveTab('GLOBAL'); setPage(0); }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all`}
            style={activeTab === 'GLOBAL' ? {
              background: 'var(--clay-surface)',
              color: 'var(--clay-primary)',
              boxShadow: 'var(--clay-shadow-sm)',
            } : {
              color: 'var(--clay-text-muted)',
            }}
          >
            <FiGlobe className="w-4 h-4" /> Global
          </button>
          <button
            onClick={() => { setActiveTab('COLLEGE'); setPage(0); }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all`}
            style={activeTab === 'COLLEGE' ? {
              background: 'var(--clay-surface)',
              color: 'var(--clay-primary)',
              boxShadow: 'var(--clay-shadow-sm)',
            } : {
              color: 'var(--clay-text-muted)',
            }}
          >
            <FiBook className="w-4 h-4" /> College
          </button>
        </div>
      </motion.div>

      {/* Filters & Search */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="clay-card p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiSearch className="w-5 h-5" style={{ color: 'var(--clay-text-muted)' }} />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={handleSearchChange}
            className="clay-input w-full pl-11 pr-4 py-3"
          />
        </div>

        <div className="relative w-full md:w-64">
          <select
            value={sortBy}
            onChange={(e) => { setSortBy(e.target.value); setPage(0); }}
            className="clay-select w-full pl-4 pr-10 py-3 appearance-none cursor-pointer"
          >
            <option value="trustScore,desc">Highest Trust Score</option>
            <option value="contributionScore,desc">Highest Contribution</option>
            <option value="achievementsCount,desc">Most Achievements</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
             <FiChevronDown className="w-4 h-4" style={{ color: 'var(--clay-text-muted)' }} />
          </div>
        </div>
      </motion.div>

      {/* Content */}
      {error && !isLoading && users.length === 0 ? (
        <div className="px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm max-w-lg mb-8" style={{ background: 'color-mix(in srgb, var(--clay-danger) 8%, transparent)', border: '1px solid color-mix(in srgb, var(--clay-danger) 20%, transparent)', color: 'var(--clay-danger)' }}>
           <FiAlertCircle className="w-5 h-5 shrink-0" />
           <span className="font-bold">{typeof error === 'string' ? error : 'Failed to load leaderboard.'}</span>
        </div>
      ) : (
        <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
          <LeaderboardCard users={users} page={page} size={size} />
        </div>
      )}

      {/* Pagination */}
      {!error && users.length > 0 && (
        <div className="mt-8 flex items-center justify-between pt-6" style={{ borderTop: '1px solid var(--clay-border-light)' }}>
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0 || isLoading}
            className="clay-button clay-button-secondary flex items-center gap-2 px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiChevronLeft className="w-4 h-4" /> Previous
          </button>
          
          <span className="text-sm font-bold" style={{ color: 'var(--clay-text-muted)' }}>
            Page {page + 1} of {totalPages === 0 ? 1 : totalPages}
          </span>
          
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={isLastPage || isLoading}
            className="clay-button clay-button-secondary flex items-center gap-2 px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
