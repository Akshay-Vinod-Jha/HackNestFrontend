import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import ProfilePage from '../pages/profile/ProfilePage';
import Hackathons from '../pages/hackathons/Hackathons';
import Teams from '../pages/teams/Teams';
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
          <Route path="/hackathons" element={<Hackathons />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/invitations" element={<Invitations />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>
      </Route>
    </Routes>
  );
}
