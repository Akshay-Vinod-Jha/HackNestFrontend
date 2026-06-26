import { Link } from 'react-router-dom';
import { FiBriefcase, FiZap } from 'react-icons/fi';
import MatchScoreCircle from '../ui/MatchScoreCircle';
import RecommendationReasonChip from '../ui/RecommendationReasonChip';
import SkillBadge from '../ui/SkillBadge';

export default function RecommendedTeamCard({ recommendation }) {
  const team = recommendation.item || recommendation;
  const matchScore = recommendation.matchScore || 0;
  const reasons = recommendation.reasons || [];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all h-full flex flex-col p-6 relative overflow-hidden group">
      <div className={`absolute top-0 left-0 w-full h-1.5 ${matchScore >= 90 ? 'bg-emerald-400' : matchScore >= 70 ? 'bg-amber-400' : 'bg-gray-300'}`}></div>
      
      <div className="flex justify-between items-start mb-4 mt-2">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
          <FiBriefcase className="w-8 h-8 text-blue-500" />
        </div>
        <div className="shrink-0 -mt-2 -mr-2">
           <MatchScoreCircle score={matchScore} size={64} strokeWidth={6} />
        </div>
      </div>
      
      <div className="mb-4 flex-1">
        <h3 className="text-xl font-extrabold text-gray-900 truncate mb-1 group-hover:text-blue-600 transition-colors" title={team.name}>
          {team.name || 'Unknown Team'}
        </h3>
        <p className="text-sm text-gray-500 font-medium line-clamp-2 mb-3">
          {team.hackathonName || 'Independent Project'}
        </p>
        
        {team.requiredSkills && team.requiredSkills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {team.requiredSkills.slice(0, 3).map((skill, i) => (
              <SkillBadge key={i} skill={skill} />
            ))}
          </div>
        )}
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

      <div className="mt-auto pt-4 border-t border-gray-50 flex gap-2">
        <Link 
          to={`/teams/${team.id}`}
          className="flex-1 py-3 bg-gray-50 hover:bg-blue-50 text-blue-600 hover:text-blue-700 text-center font-bold text-sm rounded-xl transition-colors active:scale-95"
        >
          View Team
        </Link>
      </div>
    </div>
  );
}
