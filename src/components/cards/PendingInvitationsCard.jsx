import { Link } from 'react-router-dom';

export default function PendingInvitationsCard({ invitations, isLoading }) {
  if (isLoading && !invitations) {
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

  const items = Array.isArray(invitations) ? invitations : [];
  const count = items.length;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          Pending Invitations
        </h2>
        {count > 0 && (
          <span className="bg-orange-100 text-orange-700 text-sm font-bold px-3 py-1 rounded-full border border-orange-200 shadow-sm">
            {count} New
          </span>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        {count > 0 ? (
          <div className="space-y-3 flex-1">
            {items.slice(0, 3).map((invite, index) => (
              <div key={index} className="flex flex-col xl:flex-row xl:justify-between xl:items-center p-4 border border-gray-100 rounded-2xl bg-gray-50 hover:bg-white hover:border-orange-100 hover:shadow-sm transition-all gap-3">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{invite?.teamName || 'Unknown Team'}</h3>
                  <p className="text-xs text-gray-500 font-semibold mt-1">Role: <span className="text-gray-700">{invite?.role || 'Member'}</span></p>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 xl:flex-none px-4 py-1.5 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-xl transition-colors shadow-sm active:scale-95">Accept</button>
                  <button className="flex-1 xl:flex-none px-4 py-1.5 text-xs font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 hover:text-gray-900 rounded-xl transition-colors active:scale-95">Decline</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-8 bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
             <p className="text-gray-500 font-bold text-sm">No pending invitations.</p>
          </div>
        )}
      </div>
      
      {count > 3 && (
        <Link to="/invitations" className="mt-6 text-center text-sm font-bold text-orange-600 hover:text-orange-800 transition-colors bg-orange-50 hover:bg-orange-100 py-2 rounded-xl">
          View all {count} invitations
        </Link>
      )}
    </div>
  );
}
