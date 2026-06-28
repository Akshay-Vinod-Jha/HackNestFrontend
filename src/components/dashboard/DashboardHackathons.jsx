import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import useHackathons from '../../hooks/useHackathons';
import useDashboard from '../../hooks/useDashboard';
import HackathonCard from '../hackathons/HackathonCard';

function HackathonRow({ title, hackathons, isLoading, emptyMessage }) {
  return (
    <div className="mb-10 last:mb-0">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-extrabold text-gray-900">{title}</h3>
        <Link 
          to="/hackathons"
          className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
        >
          View All <FiArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-3xl border border-gray-100 h-80 w-full"></div>
          ))}
        </div>
      ) : hackathons && hackathons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {hackathons.map(hackathon => (
            <HackathonCard key={hackathon.id} hackathon={hackathon} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-3xl border border-dashed border-gray-200 p-8 text-center">
          <p className="text-gray-500 font-bold">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
}

export default function DashboardHackathons() {
  const { upcomingHackathons, recentHackathons, isLoading: isHackathonsLoading, fetchDashboardHackathons } = useHackathons();
  const { dashboard, isLoading: isDashboardLoading } = useDashboard();
  
  const recommendedHackathons = dashboard?.recommendedHackathons || [];

  useEffect(() => {
    fetchDashboardHackathons().catch(() => {});
  }, [fetchDashboardHackathons]);

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 sm:p-8 md:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Hackathon Hub</h2>
          <p className="text-gray-500 font-medium mt-1">Discover, join, or host new hackathons.</p>
        </div>
        <Link 
          to="/hackathons/create"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-sm hover:bg-blue-700 hover:shadow transition-all active:scale-[0.98] whitespace-nowrap shrink-0"
        >
          <FiPlus className="w-5 h-5" />
          Create Hackathon
        </Link>
      </div>

      <HackathonRow 
        title="Upcoming Hackathons"
        hackathons={upcomingHackathons}
        isLoading={isHackathonsLoading}
        emptyMessage="No upcoming hackathons scheduled."
      />

      <HackathonRow 
        title="Recommended For You"
        hackathons={recommendedHackathons}
        isLoading={isDashboardLoading}
        emptyMessage="Update your profile to get personalized recommendations."
      />

      <HackathonRow 
        title="Recently Added"
        hackathons={recentHackathons}
        isLoading={isHackathonsLoading}
        emptyMessage="No new hackathons have been added recently."
      />
    </div>
  );
}
