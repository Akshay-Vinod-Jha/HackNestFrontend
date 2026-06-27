import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { viewportFadeUp } from '../../utils/animations';

export default function RecentActivityCard({ timeline, isLoading }) {
  const sortedTimeline = useMemo(() => {
    if (!Array.isArray(timeline)) return [];
    return [...timeline].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [timeline]);

  if (isLoading && !timeline) {
    return (
      <div className="clay-card p-6 md:p-8 h-full flex flex-col animate-pulse">
        <div className="clay-skeleton h-6 rounded w-1/3 mb-8" style={{ background: 'var(--clay-surface-2)' }}></div>
        <div className="space-y-8 flex-1">
          {[1,2,3].map(i => (
            <div key={i} className="flex gap-4">
               <div className="clay-skeleton w-4 h-4 rounded-full shrink-0" style={{ background: 'var(--clay-surface-2)' }}></div>
               <div className="clay-skeleton h-12 rounded-xl w-full" style={{ background: 'var(--clay-surface-2)' }}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getEventStyle = (type) => {
    switch(type) {
      case 'Joined Platform': return { color: 'var(--clay-primary)', bg: 'var(--clay-primary-light)' };
      case 'Joined Team': return { color: 'var(--clay-primary)', bg: 'var(--clay-primary-light)' };
      case 'Participated in Hackathon': return { color: 'var(--clay-success)', bg: 'color-mix(in srgb, var(--clay-success) 12%, transparent)' };
      case 'Won Achievement': return { color: '#eab308', bg: 'color-mix(in srgb, #eab308 12%, transparent)' };
      case 'Became Team Leader': return { color: '#a855f7', bg: 'color-mix(in srgb, #a855f7 12%, transparent)' };
      default: return { color: 'var(--clay-text-muted)', bg: 'var(--clay-surface-2)' };
    }
  };

  const count = sortedTimeline.length;

  return (
    <div className="clay-card p-6 md:p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-extrabold flex items-center gap-2" style={{ color: 'var(--clay-text-primary)' }}>
          <svg className="w-5 h-5" style={{ color: 'var(--clay-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Recent Activity
        </h2>
      </div>

      <div className="flex-1 flex flex-col">
        {count > 0 ? (
          <div className="relative ml-2.5 space-y-8 flex-1" style={{ borderLeft: '2px solid var(--clay-border-light)' }}>
            {sortedTimeline.slice(0, 4).map((event, index) => {
              const style = getEventStyle(event.type);
              return (
                <motion.div
                  key={index}
                  className="relative pl-6 group"
                  {...viewportFadeUp}
                  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1], delay: index * 0.08 }}
                >
                  <div
                    className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center shadow-sm transition-transform group-hover:scale-125"
                    style={{ borderColor: 'var(--clay-surface)', background: style.bg, color: style.color }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                  </div>
                  <div
                    className="rounded-xl p-3 -mt-2 transition-all"
                    style={{
                      background: 'var(--clay-surface-2)',
                      border: '1px solid var(--clay-border-light)',
                    }}
                  >
                    <h3 className="font-bold text-sm leading-tight mb-1" style={{ color: 'var(--clay-text-primary)' }}>{event.type || 'Activity'}</h3>
                    <p className="text-xs font-medium mb-1.5 line-clamp-1" style={{ color: 'var(--clay-text-muted)' }}>{event.description || 'Performed an action.'}</p>
                    <time className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--clay-text-muted)' }}>
                      {event.date ? new Date(event.date).toLocaleDateString() : 'Unknown Date'}
                    </time>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-8 rounded-2xl border border-dashed" style={{ background: 'var(--clay-surface-2)', borderColor: 'var(--clay-border)' }}>
             <p className="font-bold text-sm" style={{ color: 'var(--clay-text-muted)' }}>No recent activity found.</p>
          </div>
        )}
      </div>

      {count > 4 && (
        <Link to="/profile" className="mt-6 text-center text-sm font-bold transition-colors py-2 rounded-xl" style={{ color: 'var(--clay-primary)', background: 'var(--clay-primary-light)' }}>
          View full timeline
        </Link>
      )}
    </div>
  );
}
