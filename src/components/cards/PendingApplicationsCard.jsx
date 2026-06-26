import { Link } from 'react-router-dom';

export default function PendingApplicationsCard({ dashboard, isLoading }) {
  // If the component is still waiting for dashboard data to load
  if (isLoading && !dashboard) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm h-full flex flex-col animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="space-y-4 flex-1">
          <div className="h-16 bg-gray-100 rounded-2xl w-full"></div>
          <div className="h-16 bg-gray-100 rounded-2xl w-full"></div>
        </div>
      </div>
    );
  }

  const items = Array.isArray(dashboard?.pendingApplications) ? dashboard.pendingApplications : [];
  const count = items.length;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          Pending Applications
        </h2>
        {count > 0 && (
          <span className="bg-pink-100 text-pink-700 text-sm font-bold px-3 py-1 rounded-full border border-pink-200 shadow-sm">
            {count} Sent
          </span>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        {count > 0 ? (
          <div className="space-y-3 flex-1">
            {items.slice(0, 3).map((app, index) => (
              <div key={index} className="flex justify-between items-center p-4 border border-gray-100 rounded-2xl bg-gray-50 hover:bg-white hover:border-pink-100 hover:shadow-sm transition-all gap-3">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{app?.targetName || 'Unknown Team'}</h3>
                  <p className="text-xs text-gray-500 font-semibold mt-1">
                    Applied: <span className="text-gray-700">{app?.date ? new Date(app.date).toLocaleDateString() : 'Recently'}</span>
                  </p>
                </div>
                <span className="px-3 py-1.5 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-xl shadow-sm whitespace-nowrap shrink-0">Under Review</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-8 bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
             <p className="text-gray-500 font-bold text-sm">No pending applications.</p>
          </div>
        )}
      </div>
      
      {count > 3 && (
        <Link to="/applications" className="mt-6 text-center text-sm font-bold text-pink-600 hover:text-pink-800 transition-colors bg-pink-50 hover:bg-pink-100 py-2 rounded-xl">
          View all {count} applications
        </Link>
      )}
    </div>
  );
}
