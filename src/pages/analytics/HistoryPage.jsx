import { useEffect, useState, useMemo } from 'react';
import useAnalytics from '../../hooks/useAnalytics';
import HistoryTimeline from '../../components/analytics/HistoryTimeline';
import HistoryFilters from '../../components/analytics/HistoryFilters';
import { FiAlertCircle, FiActivity } from 'react-icons/fi';

export default function HistoryPage() {
  const { history, isLoading, error, fetchProfileHistory } = useAnalytics();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('NEWEST');
  const [filterResult, setFilterResult] = useState('ALL');

  useEffect(() => {
    fetchProfileHistory().catch(() => {});
  }, [fetchProfileHistory]);

  const filteredData = useMemo(() => {
    if (!history) return [];
    
    let processed = [...history];

    // 1. Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      processed = processed.filter(item => 
        (item.hackathonName || '').toLowerCase().includes(q) ||
        (item.teamName || '').toLowerCase().includes(q)
      );
    }

    // 2. Result Filter
    if (filterResult !== 'ALL') {
      processed = processed.filter(item => {
        const res = (item.result || '').toUpperCase();
        if (filterResult === 'WINNER') return res.includes('WINNER') || res.includes('1ST');
        if (filterResult === 'FINALIST') return res.includes('FINALIST') || res.includes('2ND') || res.includes('3RD');
        if (filterResult === 'COMPLETED') return res.includes('COMPLETED') || res.includes('PARTICIPATED');
        return true;
      });
    }

    // 3. Sorting
    processed.sort((a, b) => {
      const dateA = new Date(a.participationDate || a.createdAt || 0).getTime();
      const dateB = new Date(b.participationDate || b.createdAt || 0).getTime();
      return sortOrder === 'NEWEST' ? dateB - dateA : dateA - dateB;
    });

    return processed;
  }, [history, searchQuery, sortOrder, filterResult]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-screen animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-64 mb-10"></div>
        <div className="h-20 bg-gray-200 rounded-2xl w-full mb-8"></div>
        <div className="space-y-6 md:pl-16 relative">
           <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block"></div>
           {[1, 2, 3].map(i => <div key={i} className="h-32 bg-gray-100 rounded-2xl w-full"></div>)}
        </div>
      </div>
    );
  }

  if (error && !history) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 min-h-screen">
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm max-w-lg">
           <FiAlertCircle className="w-5 h-5 shrink-0" />
           <span className="font-bold">{typeof error === 'string' ? error : 'Failed to load history.'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Competition History</h1>
        <p className="text-lg text-gray-500 font-medium">
          A timeline of your hackathon participations, team roles, and final results.
        </p>
      </div>

      {!history || history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50 rounded-3xl border border-gray-100 border-dashed">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-sm">
            <FiActivity className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900 mb-2">No History Yet</h3>
          <p className="text-gray-500 font-medium max-w-md">
            Join a hackathon to start building your competition timeline.
          </p>
        </div>
      ) : (
        <>
          <HistoryFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            filterResult={filterResult}
            setFilterResult={setFilterResult}
          />
          <HistoryTimeline historyData={filteredData} />
        </>
      )}
    </div>
  );
}
