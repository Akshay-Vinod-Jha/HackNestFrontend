import { useEffect, useState } from 'react';
import useDashboard from '../../hooks/useDashboard';
import useAuthStore from '../../store/authStore';
import useProfile from '../../hooks/useProfile';

import WelcomeCard from '../../components/cards/WelcomeCard';
import AnalyticsCard from '../../components/cards/AnalyticsCard';
import ProfileCompletionCard from '../../components/cards/ProfileCompletionCard';
import TrustScoreCard from '../../components/cards/TrustScoreCard';

import RecommendedTeamCard from '../../components/cards/RecommendedTeamCard';
import RecommendedHackathonCard from '../../components/cards/RecommendedHackathonCard';
import RecommendedTeammateCard from '../../components/cards/RecommendedTeammateCard';
import PendingInvitationsCard from '../../components/cards/PendingInvitationsCard';
import PendingApplicationsCard from '../../components/cards/PendingApplicationsCard';
import RecentActivityCard from '../../components/cards/RecentActivityCard';
import { Link } from 'react-router-dom';

function RecommendationSection({ title, data, isLoading, CardComponent, viewMoreLink, emptyMessage }) {
  if (isLoading && !data) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm">
        <h2 className="text-xl font-extrabold text-gray-900 mb-6">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
           {[1,2,3].map(i => <div key={i} className="h-64 bg-gray-100 rounded-2xl w-full"></div>)}
        </div>
      </div>
    );
  }

  const items = Array.isArray(data) ? data : [];
  const displayItems = items.slice(0, 3);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-extrabold text-gray-900">{title}</h2>
        {items.length > 3 && (
          <Link to={viewMoreLink} className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg">
            View All
          </Link>
        )}
      </div>
      
      {displayItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayItems.map((item, index) => (
            <div key={index} className="h-full">
               <CardComponent data={item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-6 bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
           <svg className="w-10 h-10 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
           <p className="text-gray-500 font-bold">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { timeline, isLoading: isProfileLoading, fetchTimeline } = useProfile();
  
  const { 
    dashboard, analytics, 
    recommendedTeams, recommendedHackathons, recommendedTeammates, pendingInvitations,
    isLoading, error, 
    fetchDashboard, fetchAnalytics, 
    fetchRecommendedTeams, fetchRecommendedHackathons, fetchRecommendedTeammates, fetchInvitations,
    clearError 
  } = useDashboard();
  
  // Track if we've initiated the fetch to prevent infinite loops
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!hasFetched) {
      setHasFetched(true);
      fetchDashboard().catch(() => {});
      fetchAnalytics().catch(() => {});
      fetchRecommendedTeams().catch(() => {});
      fetchRecommendedHackathons().catch(() => {});
      fetchRecommendedTeammates().catch(() => {});
      fetchInvitations().catch(() => {});
      fetchTimeline().catch(() => {});
    }
  }, [
    fetchDashboard, fetchAnalytics, 
    fetchRecommendedTeams, fetchRecommendedHackathons, fetchRecommendedTeammates, fetchInvitations,
    fetchTimeline, hasFetched
  ]);

  // Overall page loading skeleton logic (waits for core dashboard data)
  const isDataLoading = isLoading && !dashboard && !analytics && !hasFetched;

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
              setHasFetched(false); 
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
      
      {/* Analytics Grid */}
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

      {/* Dynamic Actions & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <PendingInvitationsCard invitations={pendingInvitations} isLoading={isLoading} />
        <PendingApplicationsCard dashboard={dashboard} isLoading={isLoading} />
        <RecentActivityCard timeline={timeline} isLoading={isProfileLoading} />
      </div>

      {/* Recommendations Sections */}
      <div className="space-y-6 md:space-y-8">
        <RecommendationSection 
          title="Top Team Matches"
          data={recommendedTeams}
          isLoading={isLoading}
          CardComponent={RecommendedTeamCard}
          viewMoreLink="/recommendations"
          emptyMessage="No team recommendations right now. Try updating your profile skills."
        />
        
        <RecommendationSection 
          title="Recommended Hackathons"
          data={recommendedHackathons}
          isLoading={isLoading}
          CardComponent={RecommendedHackathonCard}
          viewMoreLink="/recommendations"
          emptyMessage="No hackathons match your profile currently."
        />
        
        <RecommendationSection 
          title="Suggested Teammates"
          data={recommendedTeammates}
          isLoading={isLoading}
          CardComponent={RecommendedTeammateCard}
          viewMoreLink="/recommendations"
          emptyMessage="No teammates found. Join more hackathons to expand your network."
        />
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-gray-100 h-80 w-full"></div>
        <div className="bg-white rounded-3xl border border-gray-100 h-80 w-full"></div>
        <div className="bg-white rounded-3xl border border-gray-100 h-80 w-full"></div>
      </div>

      <div className="space-y-8">
         <div className="bg-white rounded-3xl border border-gray-100 p-8 h-80"></div>
      </div>
    </div>
  );
}
