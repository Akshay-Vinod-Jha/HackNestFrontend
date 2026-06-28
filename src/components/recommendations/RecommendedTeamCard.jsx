import { Link } from 'react-router-dom';
import { FiBriefcase, FiZap } from 'react-icons/fi';
import MatchScoreCircle from '../ui/MatchScoreCircle';
import RecommendationReasonChip from '../ui/RecommendationReasonChip';
import SkillBadge from '../ui/SkillBadge';

export default function RecommendedTeamCard({ recommendation }) {
  const team = recommendation.team || recommendation.item || recommendation;
  const matchScore = recommendation.matchScore || 0;
  const reasons = recommendation.reasons || [];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden hover:-translate-y-[1px]">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-5 gap-3">
          <div>
            <h3 className="text-xl font-extrabold text-gray-900 leading-tight mb-1.5 line-clamp-2" title={team.name}>
              {team.name || 'Unknown Team'}
            </h3>
            <p className="text-sm font-bold text-gray-500 truncate">
              {team.hackathonName || 'Independent Project'}
            </p>
          </div>
          <div className="shrink-0">
             <MatchScoreCircle score={matchScore} size={42} strokeWidth={4} />
          </div>
        </div>

        <div className="space-y-3 mt-auto pt-2">
          <div className="flex items-center gap-4 text-sm font-medium">
             <div className="flex items-center gap-1.5">
               <FiBriefcase className="w-4 h-4 text-blue-500" />
               <span className="text-gray-600">Avg Trust:</span>
               <span className="font-bold text-gray-900">{team.averageTrustScore || 85}</span>
             </div>
             <div className="flex items-center gap-1.5">
               <FiZap className="w-4 h-4 text-amber-500" />
               <span className="text-gray-600">Contrib:</span>
               <span className="font-bold text-gray-900">{team.averageContributionScore ? team.averageContributionScore.toFixed(1) : '4.5'}</span>
             </div>
          </div>

          {team.requiredSkills && team.requiredSkills.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {team.requiredSkills.slice(0, 3).map((skill, i) => (
                <SkillBadge key={i} skill={skill} />
              ))}
            </div>
          )}

          {reasons.length > 0 && (
            <div className="pt-3 border-t border-gray-50 mt-3">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FiZap className="w-3.5 h-3.5 text-amber-500" /> Key Insights
              </p>
              <div className="flex flex-wrap gap-1.5">
                {reasons.slice(0, 2).map((reason, i) => (
                  <RecommendationReasonChip key={i} reason={reason} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-gray-50 bg-gray-50/50 flex gap-2">
        <Link 
          to={`/teams/${team.id}`}
          className="flex-1 flex items-center justify-center py-2.5 px-4 text-sm font-bold text-gray-700 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl transition-all active:scale-[0.98]"
        >
          View Team
        </Link>
      </div>
    </div>
  );
}
