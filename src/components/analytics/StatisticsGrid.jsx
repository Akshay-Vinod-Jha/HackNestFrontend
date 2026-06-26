import { 
  FiAward, FiUsers, FiUserCheck, FiFileText, 
  FiCheckCircle, FiMail, FiCheckSquare, FiStar 
} from 'react-icons/fi';
import AnalyticsCard from './AnalyticsCard';

export default function StatisticsGrid({ analytics }) {
  if (!analytics) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <AnalyticsCard 
        title="Total Hackathons" 
        value={analytics.totalHackathons || 0} 
        icon={<FiAward className="w-6 h-6 text-purple-500" />} 
        colorClass="bg-purple-50" 
      />
      <AnalyticsCard 
        title="Teams Joined" 
        value={analytics.teamsJoined || 0} 
        icon={<FiUsers className="w-6 h-6 text-blue-500" />} 
        colorClass="bg-blue-50" 
      />
      <AnalyticsCard 
        title="Teams Led" 
        value={analytics.teamsLed || 0} 
        icon={<FiUserCheck className="w-6 h-6 text-emerald-500" />} 
        colorClass="bg-emerald-50" 
      />
      <AnalyticsCard 
        title="Achievements" 
        value={analytics.achievementsCount || 0} 
        icon={<FiStar className="w-6 h-6 text-amber-500" />} 
        colorClass="bg-amber-50" 
      />
      
      <AnalyticsCard 
        title="Applications" 
        value={analytics.applicationsSent || 0} 
        icon={<FiFileText className="w-6 h-6 text-gray-500" />} 
        colorClass="bg-gray-100" 
      />
      <AnalyticsCard 
        title="Accepted Apps" 
        value={analytics.applicationsAccepted || 0} 
        icon={<FiCheckCircle className="w-6 h-6 text-emerald-500" />} 
        colorClass="bg-emerald-50" 
      />
      <AnalyticsCard 
        title="Invitations" 
        value={analytics.invitationsReceived || 0} 
        icon={<FiMail className="w-6 h-6 text-gray-500" />} 
        colorClass="bg-gray-100" 
      />
      <AnalyticsCard 
        title="Accepted Invites" 
        value={analytics.invitationsAccepted || 0} 
        icon={<FiCheckSquare className="w-6 h-6 text-emerald-500" />} 
        colorClass="bg-emerald-50" 
      />
    </div>
  );
}
