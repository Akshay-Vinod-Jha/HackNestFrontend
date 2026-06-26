import { Link } from 'react-router-dom';
import { FiAward, FiStar, FiChevronRight } from 'react-icons/fi';

export default function AchievementsSummaryCard({ analytics }) {
  const count = analytics?.achievementsCount || 0;
  
  return (
    <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-6 md:p-8 text-white shadow-sm relative overflow-hidden h-full flex flex-col justify-between group">
      
      {/* Background Graphic */}
      <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
        <FiAward className="w-48 h-48" />
      </div>

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
          <FiStar className="w-3.5 h-3.5" /> Achievements
        </div>
        
        <h3 className="text-4xl font-black mb-1">{count}</h3>
        <p className="text-amber-100 font-medium mb-6">Trophies & Badges Earned</p>
      </div>

      <Link to="/achievements" className="relative z-10 inline-flex items-center gap-2 text-sm font-bold bg-white text-orange-600 px-4 py-2.5 rounded-xl hover:bg-orange-50 transition-colors self-start shadow-sm active:scale-95">
        View Trophy Room <FiChevronRight />
      </Link>
    </div>
  );
}
