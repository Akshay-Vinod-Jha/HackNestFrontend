import { useEffect, useState, useMemo } from 'react';
import useAnalytics from '../../hooks/useAnalytics';
import TimelineCard from '../../components/analytics/TimelineCard';
import TimelineFilters from '../../components/analytics/TimelineFilters';
import { FiAlertCircle } from 'react-icons/fi';

export default function TimelinePage() {
  const { timeline, isLoading, error, fetchProfileTimeline } = useAnalytics();
  const [filterType, setFilterType] = useState('ALL');

  useEffect(() => {
    fetchProfileTimeline().catch(() => {});
  }, [fetchProfileTimeline]);

  const filteredTimeline = useMemo(() => {
    if (!timeline) return [];
    
    let processed = [...timeline];

    if (filterType !== 'ALL') {
      processed = processed.filter(event => {
        const t = (event.type || '').toUpperCase();
        if (filterType === 'HACKATHONS') return t.includes('PARTICIPATED') || t.includes('HACKATHON');
        if (filterType === 'TEAMS') return t.includes('TEAM') || t.includes('LEADER');
        if (filterType === 'ACHIEVEMENTS') return t.includes('ACHIEVEMENT');
        if (filterType === 'SYSTEM') return t.includes('PLATFORM') || t.includes('PROFILE');
        return true;
      });
    }

    // Sort descending by date
    processed.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.timestamp || 0).getTime();
      const dateB = new Date(b.createdAt || b.timestamp || 0).getTime();
      return dateB - dateA; // Newest first
    });

    return processed;
  }, [timeline, filterType]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-screen animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-64 mb-10"></div>
        <div className="h-16 bg-gray-200 rounded-2xl w-full mb-8 flex justify-end">
          <div className="w-48 bg-gray-300 rounded-xl h-10 mt-3 mr-3"></div>
        </div>
        <div className="space-y-6 md:pl-16 relative">
           <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block"></div>
           {[1, 2, 3].map(i => (
             <div key={i} className="flex gap-6">
                <div className="w-12 h-12 bg-gray-200 rounded-2xl shrink-0 hidden md:block z-10"></div>
                <div className="h-32 bg-gray-100 rounded-3xl w-full"></div>
             </div>
           ))}
        </div>
      </div>
    );
  }

  if (error && !timeline) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 min-h-screen">
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm max-w-lg">
           <FiAlertCircle className="w-5 h-5 shrink-0" />
           <span className="font-bold">{typeof error === 'string' ? error : 'Failed to load timeline.'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Your Activity Feed</h1>
        <p className="text-lg text-gray-500 font-medium">
          A LinkedIn-style timeline of your engagements, achievements, and milestones.
        </p>
      </div>

      <TimelineFilters filterType={filterType} setFilterType={setFilterType} />
      
      <TimelineCard events={filteredTimeline} />
    </div>
  );
}
