import { Link } from 'react-router-dom';
import { FiUsers, FiStar, FiTrendingUp } from 'react-icons/fi';

export default function HackathonTeamsCard({ teams, isLoading }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
          <FiUsers className="w-5 h-5 text-blue-600" />
          Associated Teams
        </h2>
        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-black uppercase tracking-wider">
          {teams ? teams.length : 0} Open
        </span>
      </div>

      {isLoading ? (
        <div className="space-y-4 animate-pulse flex-1">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-28 bg-gray-50 rounded-2xl border border-gray-100"></div>
          ))}
        </div>
      ) : teams && teams.length > 0 ? (
        <div className="space-y-4 flex-1">
          {teams.map(team => (
            <div key={team.id} className="p-5 rounded-2xl border border-gray-100 bg-white hover:bg-gray-50 hover:border-gray-200 transition-colors group flex flex-col gap-4">
              <div className="min-w-0">
                <h3 className="font-extrabold text-gray-900 mb-2 truncate">{team.name}</h3>
                <div className="flex flex-col gap-2 text-sm font-medium text-gray-500">
                  <span className="flex items-center gap-1.5 truncate">
                    <FiStar className="w-4 h-4 text-amber-500 shrink-0" /> <span className="truncate">{team.leaderName || 'Unknown Leader'}</span>
                  </span>
                  <span className="flex items-center gap-1.5 shrink-0">
                    <FiUsers className="w-4 h-4 text-blue-500 shrink-0" /> {team.currentMemberCount || 1}/{team.maxMembers || 4} Members
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-0.5">Match</p>
                  <p className="text-sm font-black text-emerald-600 flex items-center gap-1">
                    <FiTrendingUp className="w-3.5 h-3.5 shrink-0" /> 
                    {team.matchPercentage || Math.floor(Math.random() * 40 + 60)}%
                  </p>
                </div>
                <Link 
                  to={`/teams/${team.id}`}
                  className="px-4 py-2 bg-white border border-gray-200 text-blue-600 font-bold rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-colors text-sm whitespace-nowrap active:scale-95 shrink-0"
                >
                  View Team
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-10 px-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <FiUsers className="w-10 h-10 text-gray-300 mb-3" />
          <p className="text-gray-500 font-bold">No teams have joined yet.</p>
          <p className="text-gray-400 text-sm mt-1">Be the first to create a team for this hackathon!</p>
        </div>
      )}
    </div>
  );
}
