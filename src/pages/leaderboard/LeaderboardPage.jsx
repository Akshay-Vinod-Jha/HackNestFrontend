import { useEffect, useState, useCallback, useMemo } from 'react';
import useLeaderboard from '../../hooks/useLeaderboard';
import useAuthStore from '../../store/authStore';
import LeaderboardCard from '../../components/leaderboard/LeaderboardCard';
import { FiAlertCircle, FiSearch, FiChevronDown, FiGlobe, FiBook, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Leaderboard</h1>
          <p className="text-lg text-gray-500 font-medium">See how you rank against other participants based on trust and contribution.</p>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-2xl shrink-0">
          <button
            onClick={() => { setActiveTab('GLOBAL'); setPage(0); }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all ${
              activeTab === 'GLOBAL' 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FiGlobe className="w-4 h-4" /> Global
          </button>
          <button
            onClick={() => { setActiveTab('COLLEGE'); setPage(0); }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all ${
              activeTab === 'COLLEGE' 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FiBook className="w-4 h-4" /> College
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-3xl border border-gray-100 p-4 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiSearch className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={handleSearchChange}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
        </div>

        <div className="relative w-full md:w-64">
          <select
            value={sortBy}
            onChange={(e) => { setSortBy(e.target.value); setPage(0); }}
            className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all cursor-pointer"
          >
            <option value="trustScore,desc">Highest Trust Score</option>
            <option value="contributionScore,desc">Highest Contribution</option>
            <option value="achievementsCount,desc">Most Achievements</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
             <FiChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Content */}
      {error && !isLoading && users.length === 0 ? (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm max-w-lg mb-8">
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
        <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0 || isLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <FiChevronLeft className="w-4 h-4" /> Previous
          </button>
          
          <span className="text-sm font-bold text-gray-400">
            Page {page + 1} of {totalPages === 0 ? 1 : totalPages}
          </span>
          
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={isLastPage || isLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
