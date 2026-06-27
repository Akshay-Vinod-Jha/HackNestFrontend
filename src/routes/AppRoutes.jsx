import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

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
import ScrollToTop from '../components/common/ScrollToTop';
import PageTransition from '../components/common/PageTransition';

import NotFoundPage from '../pages/error/NotFoundPage';
import ForbiddenPage from '../pages/error/ForbiddenPage';

const DiscoverPage = lazy(() => import('../pages/discover/DiscoverPage'));
const RecommendationsPage = lazy(() => import('../pages/recommendations/RecommendationsPage'));
const RatingsPage = lazy(() => import('../pages/ratings/RatingsPage'));
const AnalyticsPage = lazy(() => import('../pages/analytics/AnalyticsPage'));
const AchievementsPage = lazy(() => import('../pages/analytics/AchievementsPage'));
const HistoryPage = lazy(() => import('../pages/analytics/HistoryPage'));
const TimelinePage = lazy(() => import('../pages/analytics/TimelinePage'));
const LeaderboardPage = lazy(() => import('../pages/leaderboard/LeaderboardPage'));
const NotificationsPage = lazy(() => import('../pages/notifications/NotificationsPage'));

export default function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
            <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />
          </Route>
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<PageTransition><DashboardPage /></PageTransition>} />
              <Route path="/profile" element={<PageTransition><ProfilePage /></PageTransition>} />
              <Route path="/hackathons" element={<PageTransition><HackathonsPage /></PageTransition>} />
              <Route path="/hackathons/create" element={<PageTransition><CreateHackathonPage /></PageTransition>} />
              <Route path="/hackathons/:id" element={<PageTransition><HackathonDetailsPage /></PageTransition>} />
              <Route path="/teams" element={<PageTransition><Teams /></PageTransition>} />
              <Route path="/teams/create" element={<PageTransition><CreateTeamPage /></PageTransition>} />
              <Route path="/teams/:id" element={<PageTransition><TeamDetailsPage /></PageTransition>} />
              <Route path="/teams/:id/analysis" element={<PageTransition><TeamAnalysisPage /></PageTransition>} />
              <Route path="/applications" element={<PageTransition><MyApplicationsPage /></PageTransition>} />
              <Route path="/applications/team/:id" element={<PageTransition><TeamApplicationsPage /></PageTransition>} />
              <Route path="/invitations" element={<PageTransition><MyInvitationsPage /></PageTransition>} />
              
              <Route path="/discover" element={
                <Suspense fallback={<FullScreenLoader />}>
                  <PageTransition><DiscoverPage /></PageTransition>
                </Suspense>
              } />
              <Route path="/recommendations" element={
                <Suspense fallback={<FullScreenLoader />}>
                  <PageTransition><RecommendationsPage /></PageTransition>
                </Suspense>
              } />
              <Route path="/ratings" element={
                <Suspense fallback={<FullScreenLoader />}>
                  <PageTransition><RatingsPage /></PageTransition>
                </Suspense>
              } />
              <Route path="/analytics" element={
                <Suspense fallback={<FullScreenLoader />}>
                  <PageTransition><AnalyticsPage /></PageTransition>
                </Suspense>
              } />
              <Route path="/achievements" element={
                <Suspense fallback={<FullScreenLoader />}>
                  <PageTransition><AchievementsPage /></PageTransition>
                </Suspense>
              } />
              <Route path="/history" element={
                <Suspense fallback={<FullScreenLoader />}>
                  <PageTransition><HistoryPage /></PageTransition>
                </Suspense>
              } />
              <Route path="/timeline" element={
                <Suspense fallback={<FullScreenLoader />}>
                  <PageTransition><TimelinePage /></PageTransition>
                </Suspense>
              } />
              <Route path="/leaderboard" element={
                <Suspense fallback={<FullScreenLoader />}>
                  <PageTransition><LeaderboardPage /></PageTransition>
                </Suspense>
              } />
              <Route path="/notifications" element={
                <Suspense fallback={<FullScreenLoader />}>
                  <PageTransition><NotificationsPage /></PageTransition>
                </Suspense>
              } />
              
              {/* Error Pages mapped under Dashboard Layout so navbar persists if logged in */}
              <Route path="/403" element={<PageTransition><ForbiddenPage /></PageTransition>} />
              <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
            </Route>
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}
