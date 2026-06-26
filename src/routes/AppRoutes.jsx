import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import ProfilePage from '../pages/profile/ProfilePage';
import HackathonsPage from '../pages/hackathons/HackathonsPage';
import HackathonDetailsPage from '../pages/hackathons/HackathonDetailsPage';
import CreateHackathonPage from '../pages/hackathons/CreateHackathonPage';
import Teams from '../pages/teams/TeamsPage';
import TeamDetailsPage from '../pages/teams/TeamDetailsPage';
import CreateTeamPage from '../pages/teams/CreateTeamPage';
import TeamAnalysisPage from '../pages/teams/TeamAnalysisPage';
import MyApplicationsPage from '../pages/applications/MyApplicationsPage';
import TeamApplicationsPage from '../pages/applications/TeamApplicationsPage';
import MyInvitationsPage from '../pages/invitations/MyInvitationsPage';

import PublicLayout from '../layouts/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';
import FullScreenLoader from '../components/ui/FullScreenLoader';

// Lazy loaded heavy modules
const DiscoverPage = lazy(() => import('../pages/discover/DiscoverPage'));
const RecommendationsPage = lazy(() => import('../pages/recommendations/RecommendationsPage'));
const RatingsPage = lazy(() => import('../pages/ratings/RatingsPage'));
const AnalyticsPage = lazy(() => import('../pages/analytics/AnalyticsPage'));
const AchievementsPage = lazy(() => import('../pages/analytics/AchievementsPage'));
const TimelinePage = lazy(() => import('../pages/analytics/TimelinePage'));
const LeaderboardPage = lazy(() => import('../pages/leaderboard/LeaderboardPage'));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/hackathons" element={<HackathonsPage />} />
          <Route path="/hackathons/create" element={<CreateHackathonPage />} />
          <Route path="/hackathons/:id" element={<HackathonDetailsPage />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/create" element={<CreateTeamPage />} />
          <Route path="/teams/:id" element={<TeamDetailsPage />} />
          <Route path="/teams/:id/analysis" element={<TeamAnalysisPage />} />
          <Route path="/applications" element={<MyApplicationsPage />} />
          <Route path="/applications/team/:id" element={<TeamApplicationsPage />} />
          <Route path="/invitations" element={<MyInvitationsPage />} />
          
          <Route path="/discover" element={
            <Suspense fallback={<FullScreenLoader />}>
              <DiscoverPage />
            </Suspense>
          } />
          <Route path="/recommendations" element={
            <Suspense fallback={<FullScreenLoader />}>
              <RecommendationsPage />
            </Suspense>
          } />
          <Route path="/ratings" element={
            <Suspense fallback={<FullScreenLoader />}>
              <RatingsPage />
            </Suspense>
          } />
          <Route path="/analytics" element={
            <Suspense fallback={<FullScreenLoader />}>
              <AnalyticsPage />
            </Suspense>
          } />
          <Route path="/achievements" element={
            <Suspense fallback={<FullScreenLoader />}>
              <AchievementsPage />
            </Suspense>
          } />
          <Route path="/timeline" element={
            <Suspense fallback={<FullScreenLoader />}>
              <TimelinePage />
            </Suspense>
          } />
          <Route path="/leaderboard" element={
            <Suspense fallback={<FullScreenLoader />}>
              <LeaderboardPage />
            </Suspense>
          } />
        </Route>
      </Route>
    </Routes>
  );
}
