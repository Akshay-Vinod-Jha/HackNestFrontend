import { useEffect } from 'react';
import useDashboard from '../../hooks/useDashboard';
import useAuthStore from '../../store/authStore';

import WelcomeCard from '../../components/cards/WelcomeCard';
import AnalyticsCard from '../../components/cards/AnalyticsCard';
import ProfileCompletionCard from '../../components/cards/ProfileCompletionCard';
import TrustScoreCard from '../../components/cards/TrustScoreCard';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { 
    dashboard, analytics, isLoading, error, 
    fetchDashboard, fetchAnalytics, clearError 
  } = useDashboard();

  useEffect(() => {
    // We fire both fetches. The component will render the skeleton
    // until both pieces of data are available.
    if (!dashboard && !analytics && !isLoading) {
      fetchDashboard().catch(() => {});
      fetchAnalytics().catch(() => {});
    }
  }, [fetchDashboard, fetchAnalytics, dashboard, analytics, isLoading]);

  // Loading state requires waiting for both resources
  const isDataLoading = isLoading || (!dashboard && !analytics && !error);

  if (isDataLoading) {
    return <DashboardSkeleton />;
  }

  if (error && !dashboard && !analytics) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4 text-center">
        <div className="bg-white rounded-3xl shadow-sm border border-red-100 p-10 inline-flex flex-col items-center max-w-lg">
          <svg className="w-12 h-12 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Failed to load dashboard</h2>
          <p className="text-gray-500 mb-8">{typeof error === 'string' ? error : 'Something went wrong.'}</p>
          <button 
            onClick={() => { 
              clearError(); 
              fetchDashboard(); 
              fetchAnalytics(); 
            }}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-sm active:scale-95"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
      <WelcomeCard userName={user?.fullName || dashboard?.user?.fullName || 'Developer'} />
      
      {/* 
        Responsive Grid:
        Mobile: 1 column
        Tablet: 2 columns
        Desktop: 12-column grid layout (Analytics gets 6, Profile gets 3, Trust gets 3)
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-2 lg:col-span-6">
          <AnalyticsCard analytics={analytics} />
        </div>
        <div className="md:col-span-1 lg:col-span-3">
          <ProfileCompletionCard dashboard={dashboard} />
        </div>
        <div className="md:col-span-1 lg:col-span-3">
          <TrustScoreCard analytics={analytics} />
        </div>
      </div>

      {/* Placeholders for upcoming features (Teams, Hackathons, Invitations) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-3xl border border-gray-200 border-dashed p-8 h-64 flex flex-col items-center justify-center text-center">
          <svg className="w-8 h-8 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          <p className="text-gray-400 font-bold">Recommendations Coming Soon</p>
        </div>
        <div className="bg-gray-50 rounded-3xl border border-gray-200 border-dashed p-8 h-64 flex flex-col items-center justify-center text-center">
          <svg className="w-8 h-8 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          <p className="text-gray-400 font-bold">Invitations Coming Soon</p>
        </div>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 animate-pulse">
      <div className="bg-gray-200 rounded-[2rem] h-64 w-full"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        <div className="md:col-span-2 lg:col-span-6 bg-white rounded-3xl border border-gray-100 h-80"></div>
        <div className="md:col-span-1 lg:col-span-3 bg-white rounded-3xl border border-gray-100 h-80"></div>
        <div className="md:col-span-1 lg:col-span-3 bg-white rounded-3xl border border-gray-100 h-80"></div>
      </div>
    </div>
  );
}
