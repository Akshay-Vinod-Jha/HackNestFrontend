import { useMemo } from 'react';
import { Link } from 'react-router-dom';

export default function RecentActivityCard({ timeline, isLoading }) {
  const sortedTimeline = useMemo(() => {
    if (!Array.isArray(timeline)) return [];
    return [...timeline].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [timeline]);

  if (isLoading && !timeline) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm h-full flex flex-col animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-8"></div>
        <div className="space-y-8 flex-1">
          {[1,2,3].map(i => (
            <div key={i} className="flex gap-4">
               <div className="w-4 h-4 rounded-full bg-gray-200 shrink-0"></div>
               <div className="h-12 bg-gray-100 rounded-xl w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getEventStyle = (type) => {
    switch(type) {
      case 'Joined Platform': return { color: 'text-indigo-600', bg: 'bg-indigo-100' };
      case 'Joined Team': return { color: 'text-blue-600', bg: 'bg-blue-100' };
      case 'Participated in Hackathon': return { color: 'text-emerald-600', bg: 'bg-emerald-100' };
      case 'Won Achievement': return { color: 'text-yellow-600', bg: 'bg-yellow-100' };
      case 'Became Team Leader': return { color: 'text-purple-600', bg: 'bg-purple-100' };
      default: return { color: 'text-gray-600', bg: 'bg-gray-100' };
    }
  };

  const count = sortedTimeline.length;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Recent Activity
        </h2>
      </div>

      <div className="flex-1 flex flex-col">
        {count > 0 ? (
          <div className="relative border-l-2 border-gray-100 ml-2.5 space-y-8 flex-1">
            {sortedTimeline.slice(0, 4).map((event, index) => {
              const style = getEventStyle(event.type);
              return (
                <div key={index} className="relative pl-6 group">
                  <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white ${style.bg} ${style.color} flex items-center justify-center shadow-sm transition-transform group-hover:scale-125`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 hover:bg-white hover:border-indigo-100 hover:shadow-sm transition-all -mt-2">
                    <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1">{event.type || 'Activity'}</h3>
                    <p className="text-xs text-gray-500 font-medium mb-1.5 line-clamp-1">{event.description || 'Performed an action.'}</p>
                    <time className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      {event.date ? new Date(event.date).toLocaleDateString() : 'Unknown Date'}
                    </time>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-8 bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
             <p className="text-gray-500 font-bold text-sm">No recent activity found.</p>
          </div>
        )}
      </div>

      {count > 4 && (
        <Link to="/profile" className="mt-6 text-center text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 hover:bg-indigo-100 py-2 rounded-xl">
          View full timeline
        </Link>
      )}
    </div>
  );
}
