import { useEffect, useMemo } from 'react';
import useProfile from '../../hooks/useProfile';

export default function ProfileTimelinePage() {
  const { timeline, isLoading, error, fetchTimeline, clearError } = useProfile();

  useEffect(() => {
    fetchTimeline().catch(() => {});
  }, [fetchTimeline]);

  // Sort descending by date
  const sortedTimeline = useMemo(() => {
    if (!Array.isArray(timeline)) return [];
    return [...timeline].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [timeline]);

  if (isLoading && !timeline) return <TimelineSkeleton />;

  if (error && !timeline) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center">
        <div className="bg-white rounded-3xl shadow-sm border border-red-100 p-10 flex flex-col items-center">
          <svg className="w-12 h-12 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Failed to load timeline</h2>
          <button onClick={() => { clearError(); fetchTimeline(); }} className="px-6 py-2.5 mt-4 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-bold rounded-xl shadow-sm">Retry Loading</button>
        </div>
      </div>
    );
  }

  // Map event types to styling
  const getEventStyle = (type) => {
    switch(type) {
      case 'Joined Platform': return { color: 'text-indigo-600', bg: 'bg-indigo-100', border: 'border-indigo-200' };
      case 'Joined Team': return { color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-200' };
      case 'Participated in Hackathon': return { color: 'text-emerald-600', bg: 'bg-emerald-100', border: 'border-emerald-200' };
      case 'Won Achievement': return { color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-200' };
      case 'Became Team Leader': return { color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-200' };
      default: return { color: 'text-gray-600', bg: 'bg-gray-100', border: 'border-gray-200' };
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-10">Activity Timeline</h1>
      
      {sortedTimeline.length > 0 ? (
        <div className="relative border-l-2 border-gray-100 ml-4 md:ml-6 space-y-10">
          {sortedTimeline.map((event, index) => {
            const style = getEventStyle(event.type);
            return (
              <div key={index} className="relative pl-8 md:pl-10 group">
                <div className={`absolute -left-[11px] top-1.5 w-5 h-5 rounded-full border-4 border-white ${style.bg} ${style.color} flex items-center justify-center shadow-sm group-hover:scale-125 transition-transform`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                    <h3 className="font-bold text-gray-900 text-lg">{event.type || 'Activity'}</h3>
                    <time className="text-xs font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                      {event.date ? new Date(event.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'Unknown'}
                    </time>
                  </div>
                  <p className="text-sm font-medium text-gray-600 leading-relaxed">{event.description || 'Performed an action on the platform.'}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-3xl p-12 text-center shadow-sm">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <p className="text-gray-500 font-medium">No timeline events found.</p>
        </div>
      )}
    </div>
  );
}

function TimelineSkeleton() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="h-10 w-64 bg-gray-200 rounded-lg mb-10"></div>
      <div className="space-y-8 ml-6 border-l-2 border-gray-100 pl-10">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 h-32 relative">
             <div className="absolute -left-[49px] top-4 w-5 h-5 rounded-full bg-gray-200 border-4 border-white"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
