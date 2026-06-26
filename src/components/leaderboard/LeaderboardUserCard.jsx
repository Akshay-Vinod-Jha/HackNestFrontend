import { FiAward, FiShield } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function LeaderboardUserCard({ user, rank }) {
  const getRankStyle = (r) => {
    if (r === 1) return 'bg-amber-100 text-amber-600 border-amber-200 shadow-sm';
    if (r === 2) return 'bg-slate-100 text-slate-600 border-slate-200 shadow-sm';
    if (r === 3) return 'bg-orange-100 text-orange-600 border-orange-200 shadow-sm';
    return 'bg-gray-50 text-gray-500 border-gray-100';
  };

  const getRankIcon = (r) => {
    if (r <= 3) return <FiAward className="w-4 h-4" />;
    return <span className="font-black text-sm">#{r}</span>;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all flex flex-col gap-4 group">
      
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center border ${getRankStyle(rank)}`}>
          {getRankIcon(rank)}
        </div>
        
        <div className="flex-1 min-w-0">
          <Link to={`/profile/${user.id}`} className="text-base font-extrabold text-gray-900 truncate hover:text-indigo-600 transition-colors block">
            {user.fullName || 'Unknown User'}
          </Link>
          <p className="text-xs font-bold text-gray-500 truncate">{user.college || 'Independent'}</p>
        </div>
        
        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 font-black text-xl flex items-center justify-center shrink-0">
           {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-50">
        <div className="text-center bg-gray-50 rounded-xl py-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Trust</p>
          <p className="text-sm font-black text-gray-900 flex items-center justify-center gap-1">
            <FiShield className="w-3 h-3 text-indigo-500" />
            {user.trustScore || 0}
          </p>
        </div>
        <div className="text-center bg-gray-50 rounded-xl py-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Contrib</p>
          <p className="text-sm font-black text-gray-900">
            {user.contributionScore ? user.contributionScore.toFixed(1) : '0.0'}
          </p>
        </div>
        <div className="text-center bg-gray-50 rounded-xl py-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Trophies</p>
          <p className="text-sm font-black text-gray-900">
            {user.achievementsCount || 0}
          </p>
        </div>
      </div>
      
    </div>
  );
}
