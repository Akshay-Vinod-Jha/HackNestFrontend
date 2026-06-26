import { useEffect } from 'react';
import useProfile from '../../hooks/useProfile';

export default function ProfileHistoryPage() {
  const { history, isLoading, error, fetchHistory, clearError } = useProfile();

  useEffect(() => {
    fetchHistory().catch(() => {});
  }, [fetchHistory]);

  if (isLoading && !history) return <HistorySkeleton />;

  if (error && !history) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="bg-white rounded-3xl shadow-sm border border-red-100 p-10 flex flex-col items-center">
          <svg className="w-12 h-12 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Failed to load history</h2>
          <p className="text-gray-500 mb-6">{typeof error === 'string' ? error : 'An unexpected error occurred.'}</p>
          <button onClick={() => { clearError(); fetchHistory(); }} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-sm">Retry Loading</button>
        </div>
      </div>
    );
  }

  const data = Array.isArray(history) ? history : [];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Hackathon History</h1>
      
      {data.length > 0 ? (
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-200 before:via-blue-300 before:to-transparent">
          {data.map((item, index) => (
             <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              </div>
              
              <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-4 gap-2">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">{item.hackathon || 'Unknown Hackathon'}</h3>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider w-max ${item.result?.toLowerCase().includes('win') ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'}`}>
                    {item.result || 'Participant'}
                  </span>
                </div>
                
                <div className="space-y-2.5">
                  <p className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    Team: <span className="text-gray-900">{item.team || 'Solo Participant'}</span>
                  </p>
                  <p className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    Role: <span className="text-gray-900">{item.role || 'Member'}</span>
                  </p>
                  <p className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    Date: <span className="text-gray-900">{item.date ? new Date(item.date).toLocaleDateString() : 'Unknown Date'}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-3xl p-12 text-center shadow-sm">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
          <p className="text-gray-500 font-medium">No hackathon history recorded yet.</p>
        </div>
      )}
    </div>
  );
}

function HistorySkeleton() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="h-10 w-64 bg-gray-200 rounded-lg mb-10"></div>
      <div className="space-y-8">
        {[1,2,3].map(i => (
          <div key={i} className="flex gap-4">
             <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0"></div>
             <div className="bg-white p-6 rounded-2xl border border-gray-100 h-40 w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
