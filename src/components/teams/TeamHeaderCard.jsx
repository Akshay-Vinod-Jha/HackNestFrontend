import { useState } from 'react';
import { FiUsers, FiAward, FiArrowRight, FiCheckCircle, FiActivity, FiUserPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ApplyToTeamModal from './ApplyToTeamModal';

export default function TeamHeaderCard({ team }) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const isFull = team.currentMembers >= team.maxMembers;
  const isOpen = team.openForApplications && !isFull;
  const completionPercentage = Math.round((team.currentMembers / team.maxMembers) * 100) || 0;

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden relative">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-10"></div>
      
      <div className="p-8 md:p-10 relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-4 py-1.5 rounded-xl text-sm font-black uppercase tracking-wider ${isOpen ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
              {isOpen ? 'Recruiting' : 'Closed'}
            </span>
            <span className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-bold uppercase tracking-wider">
              {team.visibility}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            {team.name}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-600 font-medium">
            <div className="flex items-center gap-2">
               <FiAward className="w-5 h-5 text-blue-500" /> 
               <span>{team.hackathonName || 'Independent Project'}</span>
            </div>
            <div className="flex items-center gap-2">
               <FiUsers className="w-5 h-5 text-indigo-500" /> 
               <span>Led by <span className="font-bold text-gray-900">{team.leaderName || 'Unknown'}</span></span>
            </div>
          </div>
        </div>

        {/* Action Panel & Progress */}
        <div className="w-full md:w-80 shrink-0 bg-gray-50 rounded-3xl p-6 border border-gray-100">
          <div className="mb-6">
            <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
              <span className="flex items-center gap-1.5"><FiUsers className="w-4 h-4" /> Capacity</span>
              <span>{team.currentMembers} / {team.maxMembers}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-3 rounded-full transition-all duration-1000 ${completionPercentage === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-3">
            {isOpen ? (
              <button 
                onClick={() => setIsApplyModalOpen(true)}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Apply to Team <FiArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button disabled className="w-full py-3.5 bg-gray-200 text-gray-500 font-bold rounded-xl cursor-not-allowed flex items-center justify-center gap-2">
                <FiCheckCircle className="w-5 h-5" /> Team Full
              </button>
            )}
            
            <div className="grid grid-cols-2 gap-3">
              <button className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold rounded-xl transition-all text-sm flex items-center justify-center gap-2">
                <FiUserPlus className="w-4 h-4" /> Invite
              </button>
              <Link 
                to={`/teams/${team.id}/analysis`}
                className="w-full py-2.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold rounded-xl transition-all text-sm flex items-center justify-center gap-2"
              >
                <FiActivity className="w-4 h-4" /> Analysis
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <ApplyToTeamModal 
        isOpen={isApplyModalOpen} 
        onClose={() => setIsApplyModalOpen(false)} 
        team={team} 
      />
    </div>
  );
}
