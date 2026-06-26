import { FiAward, FiShield } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function LeaderboardTable({ users, page, size }) {
  if (!users || users.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500 font-medium">
        No users found on this leaderboard.
      </div>
    );
  }

  const getRankBadge = (rank) => {
    if (rank === 1) return <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-amber-100 text-amber-600 border border-amber-200"><FiAward className="w-4 h-4" /></span>;
    if (rank === 2) return <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-600 border border-slate-200"><FiAward className="w-4 h-4" /></span>;
    if (rank === 3) return <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100 text-orange-600 border border-orange-200"><FiAward className="w-4 h-4" /></span>;
    return <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 text-gray-500 font-black text-xs">#{rank}</span>;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <th className="py-4 pl-6 pr-4 w-20">Rank</th>
            <th className="py-4 px-4 min-w-[200px]">Participant</th>
            <th className="py-4 px-4 min-w-[150px]">College</th>
            <th className="py-4 px-4 text-center">Trust Score</th>
            <th className="py-4 px-4 text-center">Contribution</th>
            <th className="py-4 px-4 text-center">Achievements</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {users.map((user, index) => {
            const absoluteRank = (page * size) + index + 1;
            
            return (
              <tr key={user.id} className="hover:bg-indigo-50/50 transition-colors group">
                <td className="py-4 pl-6 pr-4 align-middle">
                  {getRankBadge(absoluteRank)}
                </td>
                <td className="py-4 px-4 align-middle">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 font-black flex items-center justify-center shrink-0">
                      {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <Link to={`/profile/${user.id}`} className="font-extrabold text-gray-900 group-hover:text-indigo-600 transition-colors block">
                      {user.fullName || 'Unknown User'}
                    </Link>
                  </div>
                </td>
                <td className="py-4 px-4 align-middle font-medium text-gray-500">
                  {user.college || '-'}
                </td>
                <td className="py-4 px-4 align-middle text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 border border-gray-100 rounded-full font-black text-gray-900 text-sm">
                     <FiShield className="w-3.5 h-3.5 text-indigo-500" />
                     {user.trustScore || 0}
                  </div>
                </td>
                <td className="py-4 px-4 align-middle text-center font-bold text-gray-700">
                  {user.contributionScore ? user.contributionScore.toFixed(1) : '0.0'}
                </td>
                <td className="py-4 px-4 align-middle text-center font-bold text-gray-700">
                  {user.achievementsCount || 0}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
