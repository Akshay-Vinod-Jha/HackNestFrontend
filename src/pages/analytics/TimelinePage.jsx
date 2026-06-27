import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import useAnalytics from '../../hooks/useAnalytics';
import TimelineCard from '../../components/analytics/TimelineCard';
import TimelineFilters from '../../components/analytics/TimelineFilters';
import { FiAlertCircle } from 'react-icons/fi';
import { fadeUp } from '../../utils/animations';

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
        <div className="clay-skeleton h-10 rounded w-64 mb-10" style={{ background: 'var(--clay-surface-2)' }}></div>
        <div className="clay-skeleton h-16 rounded-2xl w-full mb-8"></div>
        <div className="space-y-6 md:pl-16 relative">
           <div className="absolute left-6 top-0 bottom-0 w-0.5 hidden md:block" style={{ background: 'var(--clay-border)' }}></div>
           {[1, 2, 3].map(i => (
             <div key={i} className="flex gap-6">
                <div className="clay-skeleton w-12 h-12 rounded-2xl shrink-0 hidden md:block z-10" style={{ background: 'var(--clay-surface-2)' }}></div>
                <div className="clay-skeleton h-32 rounded-3xl w-full" style={{ background: 'var(--clay-surface-2)' }}></div>
             </div>
           ))}
        </div>
      </div>
    );
  }

  if (error && !timeline) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 min-h-screen">
        <div className="px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm max-w-lg" style={{ background: 'color-mix(in srgb, var(--clay-danger) 8%, transparent)', border: '1px solid color-mix(in srgb, var(--clay-danger) 20%, transparent)', color: 'var(--clay-danger)' }}>
           <FiAlertCircle className="w-5 h-5 shrink-0" />
           <span className="font-bold">{typeof error === 'string' ? error : 'Failed to load timeline.'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <motion.div {...fadeUp} className="mb-8">
        <h1 className="clay-page-title mb-2">Your Activity Feed</h1>
        <p className="clay-page-subtitle">
          A LinkedIn-style timeline of your engagements, achievements, and milestones.
        </p>
      </motion.div>

      <TimelineFilters filterType={filterType} setFilterType={setFilterType} />
      
      <TimelineCard events={filteredTimeline} />
    </div>
  );
}
