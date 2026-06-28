import { useEffect, useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
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

import { staggerContainer, staggerItem } from '../../utils/animations';

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
        <div className="clay-card p-10 inline-flex flex-col items-center max-w-lg">
          <svg className="w-12 h-12 mb-4" style={{ color: 'var(--clay-danger)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <h2 className="text-2xl font-extrabold mb-2" style={{ color: 'var(--clay-text-primary)' }}>Failed to load dashboard</h2>
          <p className="mb-8" style={{ color: 'var(--clay-text-muted)' }}>{typeof analyticsError === 'string' ? analyticsError : 'Something went wrong.'}</p>
          <button 
            onClick={() => { 
              clearAnalyticsError(); 
              setHasFetched(false); 
            }}
            className="clay-button clay-button-primary px-8 py-3"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-7xl mx-auto space-y-6 md:space-y-8"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {/* 1. Welcome Section */}
      <motion.div variants={staggerItem}>
        <WelcomeCard userName={user?.fullName || dashboard?.user?.fullName || 'Developer'} />
      </motion.div>
      
      {/* 2. Top Analytics Row */}
      <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-2 lg:col-span-6">
          <AnalyticsCard analytics={analytics} />
        </div>
        <div className="md:col-span-1 lg:col-span-3">
          <LeaderboardRankCard analytics={analytics} />
        </div>
        <div className="md:col-span-1 lg:col-span-3">
          <AchievementsSummaryCard analytics={analytics} />
        </div>
      </motion.div>

      {/* 3. Secondary Analytics Row (Trust & Profile) */}
      <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <TrustScoreCard analytics={analytics} />
        <ProfileCompletionCard dashboard={dashboard} />
      </motion.div>

      {/* 4. Pending Actions Grid */}
      <motion.div variants={staggerItem} className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <PendingInvitationsCard invitations={pendingInvitations} isLoading={isLoading} />
        <PendingApplicationsCard dashboard={dashboard} isLoading={isLoading} />
      </motion.div>

      {/* 5. Hackathons Hub */}
      <motion.div variants={staggerItem}>
        <DashboardHackathons />
      </motion.div>

      {/* 6. Recommendations Sections (Lazy Loaded) */}
      <motion.div variants={staggerItem}>
        <Suspense fallback={<RecommendationsSkeleton />}>
          <RecommendationsContainer />
        </Suspense>
      </motion.div>

      {/* 7. Recent Activity */}
      <motion.div variants={staggerItem} className="w-full">
         <RecentActivityCard timeline={timeline} isLoading={isLoading} />
      </motion.div>
    </motion.div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 animate-pulse">
      <div className="bg-white border border-gray-100 shadow-sm rounded-3xl h-64 w-full"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        <div className="md:col-span-2 lg:col-span-6 bg-white border border-gray-100 shadow-sm rounded-3xl h-80"></div>
        <div className="md:col-span-1 lg:col-span-3 bg-white border border-gray-100 shadow-sm rounded-3xl h-80"></div>
        <div className="md:col-span-1 lg:col-span-3 bg-white border border-gray-100 shadow-sm rounded-3xl h-80"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 shadow-sm rounded-3xl h-80 w-full"></div>
        <div className="bg-white border border-gray-100 shadow-sm rounded-3xl h-80 w-full"></div>
      </div>
    </div>
  );
}

function RecommendationsSkeleton() {
  return (
    <div className="space-y-6 md:space-y-8 animate-pulse">
      {[1, 2, 3].map(section => (
        <div key={section} className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 md:p-8">
          <div className="bg-gray-200 h-6 rounded-lg w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-100 h-64 rounded-2xl w-full"></div>
            <div className="bg-gray-100 h-64 rounded-2xl w-full"></div>
            <div className="bg-gray-100 h-64 rounded-2xl w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
