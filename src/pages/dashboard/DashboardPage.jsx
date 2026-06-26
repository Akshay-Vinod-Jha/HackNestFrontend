import { useEffect, useState, lazy, Suspense } from 'react';
import useDashboard from '../../hooks/useDashboard';
import useAuthStore from '../../store/authStore';
import useAnalytics from '../../hooks/useAnalytics';

import WelcomeCard from '../../components/cards/WelcomeCard';
import AnalyticsCard from '../../components/cards/AnalyticsCard';
import ProfileCompletionCard from '../../components/cards/ProfileCompletionCard';
import TrustScoreCard from '../../components/cards/TrustScoreCard';

import PendingInvitationsCard from '../../components/cards/PendingInvitationsCard';
import PendingApplicationsCard from '../../components/cards/PendingApplicationsCard';
import RecentActivityCard from '../../components/cards/RecentActivityCard';
import DashboardHackathons from '../../components/dashboard/DashboardHackathons';

import AchievementsSummaryCard from '../../components/dashboard/AchievementsSummaryCard';
import LeaderboardRankCard from '../../components/dashboard/LeaderboardRankCard';

const RecommendationsContainer = lazy(() => import('../../components/dashboard/RecommendationsContainer'));

export default function DashboardPage() {
  const { user } = useAuthStore();
  
  // Use specialized analytics store for core data to avoid duplicate logic
  const { 
    dashboard, 
    analytics, 
    timeline,
    isLoading: isAnalyticsLoading,
    error: analyticsError,
    fetchDashboard,
    fetchProfileAnalytics,
    fetchProfileTimeline,
    clearError: clearAnalyticsError
  } = useAnalytics();

  // Use dashboard store just for pending invitations (legacy/unmigrated logic)
  const { 
    pendingInvitations,
    isLoading: isDashboardLoading, 
    fetchInvitations 
  } = useDashboard();
  
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!hasFetched) {
      setHasFetched(true);
      fetchDashboard().catch(() => {});
      fetchProfileAnalytics().catch(() => {});
      fetchProfileTimeline().catch(() => {});
      fetchInvitations().catch(() => {});
    }
  }, [
    fetchDashboard, fetchProfileAnalytics, fetchProfileTimeline, fetchInvitations, hasFetched
  ]);

  const isLoading = isAnalyticsLoading || isDashboardLoading;
  const isDataLoading = isLoading && !dashboard && !analytics && !hasFetched;

  if (isDataLoading) {
    return <DashboardSkeleton />;
  }

  if (analyticsError && !dashboard && !analytics) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4 text-center">
        <div className="bg-white rounded-3xl shadow-sm border border-red-100 p-10 inline-flex flex-col items-center max-w-lg">
          <svg className="w-12 h-12 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Failed to load dashboard</h2>
          <p className="text-gray-500 mb-8">{typeof analyticsError === 'string' ? analyticsError : 'Something went wrong.'}</p>
          <button 
            onClick={() => { 
              clearAnalyticsError(); 
              setHasFetched(false); 
            }}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-sm active:scale-95"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
      {/* 1. Welcome Section */}
      <WelcomeCard userName={user?.fullName || dashboard?.user?.fullName || 'Developer'} />
      
      {/* 2. Top Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-2 lg:col-span-6">
          <AnalyticsCard analytics={analytics} />
        </div>
        <div className="md:col-span-1 lg:col-span-3">
          <LeaderboardRankCard analytics={analytics} />
        </div>
        <div className="md:col-span-1 lg:col-span-3">
          <AchievementsSummaryCard analytics={analytics} />
        </div>
      </div>

      {/* 3. Secondary Analytics Row (Trust & Profile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <TrustScoreCard analytics={analytics} />
        <ProfileCompletionCard dashboard={dashboard} />
      </div>

      {/* 4. Pending Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <PendingInvitationsCard invitations={pendingInvitations} isLoading={isLoading} />
        <PendingApplicationsCard dashboard={dashboard} isLoading={isLoading} />
      </div>

      {/* 5. Hackathons Hub */}
      <DashboardHackathons />

      {/* 6. Recommendations Sections (Lazy Loaded) */}
      <Suspense fallback={<RecommendationsSkeleton />}>
        <RecommendationsContainer />
      </Suspense>

      {/* 7. Recent Activity */}
      <div className="w-full">
         <RecentActivityCard timeline={timeline} isLoading={isLoading} />
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-gray-100 h-80 w-full"></div>
        <div className="bg-white rounded-3xl border border-gray-100 h-80 w-full"></div>
      </div>
    </div>
  );
}

function RecommendationsSkeleton() {
  return (
    <div className="space-y-6 md:space-y-8 animate-pulse">
      {[1, 2, 3].map(section => (
        <div key={section} className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-64 bg-gray-100 rounded-2xl w-full"></div>
            <div className="h-64 bg-gray-100 rounded-2xl w-full"></div>
            <div className="h-64 bg-gray-100 rounded-2xl w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
