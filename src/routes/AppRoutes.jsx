import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/dashboard/Dashboard';
import Profile from '../pages/profile/Profile';
import Hackathons from '../pages/hackathons/Hackathons';
import Teams from '../pages/teams/Teams';
import Invitations from '../pages/invitations/Invitations';
import Leaderboard from '../pages/leaderboard/Leaderboard';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/hackathons" element={<Hackathons />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/invitations" element={<Invitations />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  );
}
