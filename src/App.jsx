import { BrowserRouter, Link } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <nav className="p-4 bg-white shadow flex gap-4 flex-wrap justify-center border-b">
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">Home</Link>
          <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">Login</Link>
          <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">Register</Link>
          <Link to="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium">Dashboard</Link>
          <Link to="/profile" className="text-blue-600 hover:text-blue-800 font-medium">Profile</Link>
          <Link to="/hackathons" className="text-blue-600 hover:text-blue-800 font-medium">Hackathons</Link>
          <Link to="/teams" className="text-blue-600 hover:text-blue-800 font-medium">Teams</Link>
          <Link to="/invitations" className="text-blue-600 hover:text-blue-800 font-medium">Invitations</Link>
          <Link to="/leaderboard" className="text-blue-600 hover:text-blue-800 font-medium">Leaderboard</Link>
        </nav>
        <main className="flex-1 p-8 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow w-full max-w-4xl text-center">
            <AppRoutes />
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
