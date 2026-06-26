import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import ProfilePage from '../pages/profile/ProfilePage';
import HackathonsPage from '../pages/hackathons/HackathonsPage';
import HackathonDetailsPage from '../pages/hackathons/HackathonDetailsPage';
import CreateHackathonPage from '../pages/hackathons/CreateHackathonPage';
import Teams from '../pages/teams/Teams';
import TeamDetailsPage from '../pages/teams/TeamDetailsPage';
import CreateTeamPage from '../pages/teams/CreateTeamPage';
import TeamAnalysisPage from '../pages/teams/TeamAnalysisPage';
import Applications from '../pages/applications/Applications';
import Invitations from '../pages/invitations/Invitations';
import Recommendations from '../pages/recommendations/Recommendations';
import Leaderboard from '../pages/leaderboard/Leaderboard';

import PublicLayout from '../layouts/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';

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
          <Route path="/applications" element={<Applications />} />
          <Route path="/invitations" element={<Invitations />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>
      </Route>
    </Routes>
  );
}
