import { Link } from 'react-router-dom';
import { FiUsers, FiCpu, FiBriefcase, FiAward, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

export default function TeamCard({ team }) {
  if (!team) return null;

  const isFull = team.currentMemberCount >= team.maxMembers;
  const isOpen = team.isOpen && !isFull;
  const completionPercentage = Math.round((team.currentMemberCount / team.maxMembers) * 100) || 0;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 overflow-hidden flex flex-col h-full group relative">
      {/* Header Banner */}
      <div className={`h-2 relative ${isOpen ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
      
      <div className="p-6 md:p-8 flex-1 flex flex-col relative">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4 absolute top-6 right-6">
           <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${isOpen ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
              {isOpen ? 'Recruiting' : 'Closed'}
           </span>
        </div>

        {/* Core Info */}
        <div className="mb-6 pr-24">
          <h2 className="text-xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors mb-1 truncate" title={team.name}>
            {team.name}
          </h2>
          <div className="flex items-center gap-1.5 text-sm font-medium text-gray-500">
             <FiAward className="w-4 h-4" /> 
             <span className="truncate">{team.hackathonName || 'Independent Team'}</span>
          </div>
        </div>

        {/* Member Progress */}
        <div className="mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
            <span className="flex items-center gap-1.5"><FiUsers className="w-4 h-4" /> Team Size</span>
            <span>{team.currentMemberCount} / {team.maxMembers}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-2 rounded-full ${completionPercentage === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Roles & Skills */}
        <div className="space-y-4 mb-6 flex-1">
          {team.requiredRoles && team.requiredRoles.length > 0 && (
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FiBriefcase className="w-3.5 h-3.5" /> Needed Roles
              </p>
              <div className="flex flex-wrap gap-1.5">
                {team.requiredRoles.map((role, i) => (
                  <span key={i} className="px-2.5 py-1 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs font-bold">
                    {typeof role === 'string' ? role : role.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {team.requiredSkills && team.requiredSkills.length > 0 && (
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FiCpu className="w-3.5 h-3.5" /> Core Skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {team.requiredSkills.map((skill, i) => (
                  <span key={i} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg text-xs font-bold">
                    {typeof skill === 'string' ? skill : skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-gray-100 mt-auto flex items-center gap-3">
          <Link 
            to={`/teams/${team.id}`}
            className="flex-1 px-4 py-2.5 bg-gray-50 text-gray-700 hover:bg-gray-100 font-bold rounded-xl text-center transition-colors text-sm"
          >
            View Details
          </Link>
          
          {isOpen && (
            <button className="flex-1 px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 font-bold rounded-xl text-center transition-colors text-sm active:scale-95 flex items-center justify-center gap-2">
              Apply <FiArrowRight className="w-4 h-4" />
            </button>
          )}
          {!isOpen && (
             <button disabled className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-400 font-bold rounded-xl text-center text-sm cursor-not-allowed flex items-center justify-center gap-2">
              <FiCheckCircle className="w-4 h-4" /> Filled
             </button>
          )}
        </div>
      </div>
    </div>
  );
}
