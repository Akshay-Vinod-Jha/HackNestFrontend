import { Link } from 'react-router-dom';
import { FiGlobe, FiTrendingUp, FiChevronRight } from 'react-icons/fi';

export default function LeaderboardRankCard({ analytics }) {
  const rank = analytics?.globalRank || '-';
  const isTop100 = typeof rank === 'number' && rank <= 100;

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-sm relative overflow-hidden h-full flex flex-col justify-between group">
      
      {/* Background Graphic */}
      <div className="absolute -right-10 -top-10 opacity-10 group-hover:rotate-12 transition-transform duration-700">
        <FiGlobe className="w-56 h-56" />
      </div>

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-white/10">
          <FiTrendingUp className="w-3.5 h-3.5 text-indigo-400" /> Global Rank
        </div>
        
        <div className="flex items-baseline gap-2 mb-1">
           <span className="text-2xl font-black text-indigo-400">#</span>
           <h3 className="text-5xl font-black">{rank}</h3>
        </div>
        <p className="text-indigo-200 font-medium mb-6">
           {isTop100 ? 'You are in the top 100!' : 'Keep climbing the leaderboard'}
        </p>
      </div>

      <Link to="/leaderboard" className="relative z-10 inline-flex items-center gap-2 text-sm font-bold bg-indigo-500/20 text-white border border-indigo-400/30 px-4 py-2.5 rounded-xl hover:bg-indigo-500/40 transition-colors self-start shadow-sm active:scale-95">
        View Standings <FiChevronRight />
      </Link>
    </div>
  );
}
