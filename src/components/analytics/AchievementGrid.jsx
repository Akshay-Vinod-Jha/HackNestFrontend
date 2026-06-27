import { FiAward, FiStar, FiFlag, FiUsers, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import AchievementCard from './AchievementCard';

export default function AchievementGrid({ analytics }) {
  if (!analytics) return null;

  // Derive counts from analytics payload or default to 0
  const participationCount = analytics.participationCount || analytics.totalHackathons || 0;
  const winnerCount = analytics.winnerCount || 0;
  const runnerUpCount = analytics.runnerUpCount || 0;
  const top10Count = analytics.top10Count || 0;
  const teamLeaderCount = analytics.teamLeaderCount || analytics.teamsLed || 0;
  const specialMentionCount = analytics.specialMentionCount || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AchievementCard 
        title="Hackathon Participant" 
        count={participationCount} 
        icon={<FiCheckCircle className="w-6 h-6" />} 
        colorClass="bg-blue-500" 
        borderClass="border-blue-100"
      />
      <AchievementCard 
        title="Hackathon Winner" 
        count={winnerCount} 
        icon={<FiAward className="w-6 h-6" />} 
        colorClass="bg-amber-500" 
        borderClass="border-amber-200"
      />
      <AchievementCard 
        title="Runner Up (2nd/3rd)" 
        count={runnerUpCount} 
        icon={<FiTrendingUp className="w-6 h-6" />} 
        colorClass="bg-indigo-500" 
        borderClass="border-indigo-100"
      />
      <AchievementCard 
        title="Top 10 Finish" 
        count={top10Count} 
        icon={<FiFlag className="w-6 h-6" />} 
        colorClass="bg-emerald-500" 
        borderClass="border-emerald-100"
      />
      <AchievementCard 
        title="Team Leader" 
        count={teamLeaderCount} 
        icon={<FiUsers className="w-6 h-6" />} 
        colorClass="bg-rose-500" 
        borderClass="border-rose-100"
      />
      <AchievementCard 
        title="Special Mention" 
        count={specialMentionCount} 
        icon={<FiStar className="w-6 h-6" />} 
        colorClass="bg-purple-500" 
        borderClass="border-purple-100"
      />
    </div>
  );
}
