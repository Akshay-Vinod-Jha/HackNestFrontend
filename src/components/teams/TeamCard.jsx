import { Link } from 'react-router-dom';
import { FiUsers, FiCpu, FiBriefcase, FiAward, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

export default function TeamCard({ team }) {
  if (!team) return null;

  const isFull = team.currentMemberCount >= team.maxMembers;
  const isOpen = team.isOpen && !isFull;
  const completionPercentage = Math.round((team.currentMemberCount / team.maxMembers) * 100) || 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden hover:-translate-y-[1px]">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-5 gap-3">
          <div>
            <h3 className="text-xl font-extrabold text-gray-900 leading-tight mb-1.5 line-clamp-2" title={team.name}>{team.name}</h3>
            <p className="text-sm font-bold text-gray-500 truncate">{team.hackathonName || 'Independent Team'}</p>
          </div>
          <span className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg shrink-0 ${isOpen ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
            {isOpen ? 'Recruiting' : 'Closed'}
          </span>
        </div>

        <div className="space-y-3 mt-auto pt-2">
          <div className="flex items-center text-sm text-gray-600 font-medium">
            <FiUsers className="w-4 h-4 mr-2.5 text-blue-500 shrink-0" />
            <span className="flex-1">Team Size</span>
            <span className="font-bold text-gray-900">{team.currentMemberCount} / {team.maxMembers}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div 
              className={`h-1.5 rounded-full ${completionPercentage === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>

          {team.requiredRoles && team.requiredRoles.length > 0 && (
            <div className="flex items-start text-sm text-gray-600 font-medium pt-1">
              <FiBriefcase className="w-4 h-4 mr-2.5 text-indigo-500 shrink-0 mt-0.5" />
              <div className="flex flex-wrap gap-1.5">
                 {team.requiredRoles.slice(0, 3).map((role, i) => (
                    <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 border border-gray-200 rounded md text-[10px] font-bold uppercase tracking-wide">
                      {typeof role === 'string' ? role : role.name}
                    </span>
                 ))}
                 {team.requiredRoles.length > 3 && (
                    <span className="px-2 py-0.5 text-gray-400 text-[10px] font-bold">+{team.requiredRoles.length - 3}</span>
                 )}
              </div>
            </div>
          )}

          {team.requiredSkills && team.requiredSkills.length > 0 && (
            <div className="flex items-start text-sm text-gray-600 font-medium pt-1">
              <FiCpu className="w-4 h-4 mr-2.5 text-rose-500 shrink-0 mt-0.5" />
              <div className="flex flex-wrap gap-1.5">
                 {team.requiredSkills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="px-2 py-0.5 bg-rose-50 text-rose-600 border border-rose-100 rounded md text-[10px] font-bold uppercase tracking-wide">
                      {typeof skill === 'string' ? skill : skill.name}
                    </span>
                 ))}
                 {team.requiredSkills.length > 3 && (
                    <span className="px-2 py-0.5 text-gray-400 text-[10px] font-bold">+{team.requiredSkills.length - 3}</span>
                 )}
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
          View Details
        </Link>
        
        {isOpen && (
          <button className="flex-1 flex items-center justify-center py-2.5 px-4 text-sm font-bold text-white bg-blue-600 border border-transparent hover:bg-blue-700 rounded-xl transition-all active:scale-[0.98]">
            Apply <FiArrowRight className="w-4 h-4 ml-1.5" />
          </button>
        )}
        {!isOpen && (
          <button disabled className="flex-1 flex items-center justify-center py-2.5 px-4 text-sm font-bold text-gray-400 bg-gray-100 border border-transparent rounded-xl cursor-not-allowed">
            Filled <FiCheckCircle className="w-4 h-4 ml-1.5" />
          </button>
        )}
      </div>
    </div>
  );
}
