import { Link } from 'react-router-dom';
import { FiUser, FiZap, FiCheckCircle } from 'react-icons/fi';

export default function RecommendedTeammateCard({ recommendation }) {
  // Gracefully handle either wrapped { item, matchScore } or flat { ...data, matchScore }
  const user = recommendation.item || recommendation;
  const matchScore = recommendation.matchScore || 0;
  const reasons = recommendation.reasons || [];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all h-full flex flex-col p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-xl">
          {user.fullName?.charAt(0) || 'U'}
        </div>
        <div className="flex flex-col items-end">
          <span className={`text-xs font-black px-2 py-1 rounded-lg ${matchScore >= 90 ? 'bg-emerald-100 text-emerald-700' : matchScore >= 70 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'}`}>
            {matchScore}% Match
          </span>
        </div>
      </div>
      
      <div className="mb-4 flex-1">
        <h3 className="text-lg font-extrabold text-gray-900 truncate mb-1" title={user.fullName}>
          {user.fullName || 'Unknown User'}
        </h3>
        <p className="text-sm text-gray-500 font-medium line-clamp-2">
          {user.headline || user.college || 'Student'}
        </p>
      </div>

      {reasons.length > 0 && (
        <div className="mb-6 space-y-1.5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <FiZap className="w-3 h-3 text-amber-500" /> Why this match?
          </p>
          {reasons.slice(0, 3).map((reason, i) => (
            <div key={i} className="flex items-start gap-1.5 text-xs text-gray-600 font-medium">
              <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{reason}</span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto pt-4 border-t border-gray-50">
        <Link 
          to={`/profile/${user.id}`}
          className="block w-full py-2.5 bg-gray-50 hover:bg-indigo-50 text-indigo-600 hover:text-indigo-700 text-center font-bold text-sm rounded-xl transition-colors"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
