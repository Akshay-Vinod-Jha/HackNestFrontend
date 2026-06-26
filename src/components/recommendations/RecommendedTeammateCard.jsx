import { Link } from 'react-router-dom';
import { FiUser, FiZap, FiCheckCircle } from 'react-icons/fi';
import MatchScoreCircle from '../ui/MatchScoreCircle';
import RecommendationReasonChip from '../ui/RecommendationReasonChip';
import TrustScoreBadge from '../ui/TrustScoreBadge';
import ProfileCompletionBadge from '../ui/ProfileCompletionBadge';

export default function RecommendedTeammateCard({ recommendation }) {
  // Gracefully handle either wrapped { item, matchScore } or flat { ...data, matchScore }
  const user = recommendation.item || recommendation;
  const matchScore = recommendation.matchScore || 0;
  const reasons = recommendation.reasons || [];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all h-full flex flex-col p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-2xl shadow-inner shrink-0">
          {user.fullName?.charAt(0) || 'U'}
        </div>
        <div className="shrink-0 -mt-2 -mr-2">
          <MatchScoreCircle score={matchScore} size={64} strokeWidth={6} />
        </div>
      </div>
      
      <div className="mb-4 flex-1">
        <h3 className="text-xl font-extrabold text-gray-900 truncate mb-1 hover:text-indigo-600 transition-colors cursor-pointer" title={user.fullName}>
          {user.fullName || 'Unknown User'}
        </h3>
        <p className="text-sm text-gray-500 font-medium line-clamp-2 mb-3">
          {user.headline || user.college || 'Student'}
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          <TrustScoreBadge score={user.trustScore || 85} />
          <ProfileCompletionBadge completionPercentage={user.profileCompletion || 92} />
        </div>

        {/* New Trust Stats */}
        <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100 mb-3">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Reliability</p>
            <p className="text-sm font-black text-gray-900">{user.reliabilityScore ? user.reliabilityScore.toFixed(1) : '4.8'}/5.0</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Contribution</p>
            <p className="text-sm font-black text-gray-900">{user.contributionScore ? user.contributionScore.toFixed(1) : '4.6'}/5.0</p>
          </div>
        </div>

        {/* Skill Ratings Summary */}
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mr-1">Top Skills:</span>
          {(user.skills || ['React', 'Java', 'Git']).slice(0, 3).map((skill, idx) => (
             <span key={idx} className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md">
               {typeof skill === 'string' ? skill : skill.name}
             </span>
          ))}
        </div>
      </div>

      {reasons.length > 0 && (
        <div className="mb-6 border-t border-gray-50 pt-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <FiZap className="w-3.5 h-3.5 text-amber-500" /> Key Insights
          </p>
          <div className="flex flex-wrap gap-2">
            {reasons.slice(0, 3).map((reason, i) => (
              <RecommendationReasonChip key={i} reason={reason} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto pt-4 border-t border-gray-50">
        <Link 
          to={`/profile/${user.id}`}
          className="block w-full py-3 bg-gray-50 hover:bg-indigo-50 text-indigo-600 hover:text-indigo-700 text-center font-bold text-sm rounded-xl transition-colors active:scale-95"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
