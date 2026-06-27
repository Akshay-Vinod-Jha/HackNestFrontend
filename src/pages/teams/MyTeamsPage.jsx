import { useEffect, useState } from 'react';
import { FiBriefcase, FiUsers, FiPlus, FiChevronRight, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import useTeams from '../../hooks/useTeams';
import TeamApplicationsCard from '../../components/teams/TeamApplicationsCard';

export default function MyTeamsPage() {
  const user = useAuthStore(state => state.user);
  const { myTeams, fetchUserTeams, isLoading } = useTeams();
  const [activeTab, setActiveTab] = useState('created'); // 'created' or 'joined'
  const [expandedTeamId, setExpandedTeamId] = useState(null);

  useEffect(() => {
    if (user?.id) {
      fetchUserTeams(user.id);
    }
  }, [user?.id, fetchUserTeams]);

  const createdTeams = myTeams?.filter(t => t.leaderId === user?.id) || [];
  const joinedTeams = myTeams?.filter(t => t.leaderId !== user?.id) || [];

  const handleExpand = (teamId) => {
    setExpandedTeamId(expandedTeamId === teamId ? null : teamId);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">
            My Teams
          </h1>
          <p className="text-lg text-gray-500 font-medium max-w-2xl">
            Manage your own teams and view teams you are a member of.
          </p>
        </div>
        <Link 
          to="/teams/create"
          className="inline-flex items-center justify-center px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all hover:shadow-lg hover:shadow-blue-600/20 active:scale-95 gap-2"
        >
          <FiPlus className="w-5 h-5" />
          Create New Team
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 bg-gray-100/50 backdrop-blur-md rounded-2xl w-full md:w-auto border border-gray-200/50">
        <button
          onClick={() => { setActiveTab('created'); setExpandedTeamId(null); }}
          className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTab === 'created' 
              ? 'bg-white text-blue-600 shadow-sm border border-gray-200/50' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          <FiBriefcase className="w-4 h-4" />
          Created by Me ({createdTeams.length})
        </button>
        <button
          onClick={() => { setActiveTab('joined'); setExpandedTeamId(null); }}
          className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTab === 'joined' 
              ? 'bg-white text-blue-600 shadow-sm border border-gray-200/50' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          <FiUsers className="w-4 h-4" />
          Joined Teams ({joinedTeams.length})
        </button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-100 h-48 rounded-[2rem]"></div>
          ))}
        </div>
      ) : activeTab === 'created' ? (
        <div className="space-y-6">
          {createdTeams.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[2rem] border border-gray-100">
              <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FiBriefcase className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Teams Created</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">You haven't created any teams yet. Create a team to start building your project!</p>
              <Link 
                to="/teams/create"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-50 text-blue-600 font-bold rounded-xl transition-colors hover:bg-blue-100"
              >
                Create Team
              </Link>
            </div>
          ) : (
            createdTeams.map(team => (
              <div key={team.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden group">
                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleExpand(team.id)}>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">{team.name}</h3>
                      <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg border ${
                        team.status === 'RECRUITING' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                        team.status === 'FULL' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                        'bg-gray-50 text-gray-600 border-gray-200'
                      }`}>
                        {team.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-500 mt-3">
                      <span className="flex items-center gap-1.5"><FiUsers className="w-4 h-4 text-gray-400" /> Members: {team.currentMemberCount} / {team.maxMembers}</span>
                      <span className="flex items-center gap-1.5"><FiCheckCircle className="w-4 h-4 text-emerald-400" /> Completion: {team.teamCompletionPercentage || 0}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 mt-4 md:mt-0">
                    <Link to={`/teams/${team.id}`} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:text-blue-600 hover:border-blue-200 font-bold rounded-xl transition-all text-sm" onClick={e => e.stopPropagation()}>
                      View Team
                    </Link>
                    <button className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors">
                      <FiChevronRight className={`w-5 h-5 transition-transform duration-300 ${expandedTeamId === team.id ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                </div>
                
                {/* Expanded Applications Section */}
                <div className={`transition-all duration-300 overflow-hidden ${expandedTeamId === team.id ? 'max-h-[2000px] border-t border-gray-100 bg-gray-50/50 p-6 md:p-8' : 'max-h-0'}`}>
                  {expandedTeamId === team.id && (
                    <TeamApplicationsCard team={team} />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {joinedTeams.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-white rounded-[2rem] border border-gray-100">
              <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FiUsers className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Teams Joined</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">You haven't joined any teams yet. Explore hackathons and apply to join a team!</p>
              <Link 
                to="/teams"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-50 text-blue-600 font-bold rounded-xl transition-colors hover:bg-blue-100"
              >
                Find Teams
              </Link>
            </div>
          ) : (
            joinedTeams.map(team => (
              <Link key={team.id} to={`/teams/${team.id}`} className="block">
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow group flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                       <FiUsers className="w-6 h-6 text-blue-500" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg">
                      Member
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">{team.name}</h3>
                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-sm">
                    <span className="text-gray-500 font-medium flex items-center gap-1.5"><FiUsers className="w-4 h-4"/> {team.currentMemberCount}/{team.maxMembers}</span>
                    <span className="text-blue-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View <FiChevronRight />
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
