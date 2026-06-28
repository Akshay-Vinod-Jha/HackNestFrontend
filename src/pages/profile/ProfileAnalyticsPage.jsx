import { useEffect } from 'react';
import useProfile from '../../hooks/useProfile';

export default function ProfileAnalyticsPage() {
  const { analytics, isLoading, error, fetchAnalytics, clearError } = useProfile();

  useEffect(() => {
    fetchAnalytics().catch(() => {});
  }, [fetchAnalytics]);

  if (isLoading && !analytics) return <AnalyticsSkeleton />;

  if (error && !analytics) {
    return (
      <div className="max-w-5xl mx-auto py-16 px-4 text-center">
        <div className="bg-white rounded-3xl shadow-sm border border-red-100 p-10 flex flex-col items-center">
          <svg className="w-12 h-12 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Failed to load analytics</h2>
          <p className="text-gray-500 mb-6">{typeof error === 'string' ? error : 'An unexpected error occurred.'}</p>
          <button onClick={() => { clearError(); fetchAnalytics(); }} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-sm">Retry Loading</button>
        </div>
      </div>
    );
  }

  const metrics = [
    { label: 'Total Hackathons', value: analytics?.totalHackathons || 0, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    { label: 'Teams Joined', value: analytics?.teamsJoined || 0, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
    { label: 'Teams Led', value: analytics?.teamsLed || 0, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
    { label: 'Applications', value: analytics?.applications || 0, color: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-100' },
    { label: 'Invitations', value: analytics?.invitations || 0, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
    { label: 'Achievements', value: analytics?.achievements || 0, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-100' },
    { label: 'Trust Score', value: analytics?.trustScore || 0, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Performance Analytics</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className={`bg-white p-6 rounded-3xl shadow-sm border ${metric.border} flex flex-col items-center justify-center text-center hover:shadow-md hover:-translate-y-[1px] transition-all group`}>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${metric.bg} mb-4 group-hover:scale-110 transition-transform`}>
               <span className={`text-3xl font-black tracking-tight ${metric.color}`}>{metric.value}</span>
            </div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{metric.label}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsSkeleton() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="h-10 w-64 bg-gray-200 rounded-lg mb-10"></div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {[1,2,3,4,5,6,7].map(i => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 h-44 flex flex-col items-center justify-center">
             <div className="w-16 h-16 bg-gray-200 rounded-2xl mb-4"></div>
             <div className="w-24 h-4 bg-gray-200 rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
