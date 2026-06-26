import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useTeams from '../../hooks/useTeams';
import useAuthStore from '../../store/authStore';
import { FiArrowLeft } from 'react-icons/fi';

import TeamHeaderCard from '../../components/teams/TeamHeaderCard';
import TeamInfoCard from '../../components/teams/TeamInfoCard';
import MembersCard from '../../components/teams/MembersCard';
import RolesCard from '../../components/teams/RolesCard';
import SkillsCard from '../../components/teams/SkillsCard';
import TeamApplicationsCard from '../../components/teams/TeamApplicationsCard';

export default function TeamDetailsPage() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { selectedTeam, isLoading, error, fetchTeamById, clearError } = useTeams();
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (id && !hasFetched) {
      setHasFetched(true);
      fetchTeamById(id).catch(() => {});
    }
  }, [id, fetchTeamById, hasFetched]);

  if (isLoading && !selectedTeam) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
        <div className="h-64 bg-gray-200 rounded-[2rem]"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="h-40 bg-gray-100 rounded-[2rem]"></div>
            <div className="h-64 bg-gray-100 rounded-[2rem]"></div>
          </div>
          <div className="space-y-8">
            <div className="h-48 bg-gray-100 rounded-[2rem]"></div>
            <div className="h-48 bg-gray-100 rounded-[2rem]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !selectedTeam) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4 text-center">
        <div className="bg-white rounded-3xl shadow-sm border border-red-100 p-10 inline-flex flex-col items-center max-w-lg">
          <svg className="w-12 h-12 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Failed to load team</h2>
          <p className="text-gray-500 mb-8">{typeof error === 'string' ? error : 'Something went wrong.'}</p>
          <button 
            onClick={() => { clearError(); setHasFetched(false); }}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-sm active:scale-95"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  if (!selectedTeam) return null;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6 md:space-y-8">
      <Link 
        to="/teams" 
        className="inline-flex items-center gap-2 text-gray-500 font-bold hover:text-blue-600 transition-colors mb-2"
      >
        <FiArrowLeft className="w-5 h-5" />
        Back to Teams
      </Link>

      <TeamHeaderCard team={selectedTeam} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          <TeamInfoCard team={selectedTeam} />
          
          {(selectedTeam.requiredRoles?.length > 0 || selectedTeam.requiredSkills?.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RolesCard roles={selectedTeam.requiredRoles} />
              <SkillsCard skills={selectedTeam.requiredSkills} />
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6 md:space-y-8">
          <MembersCard members={selectedTeam.members} leaderId={selectedTeam.leaderId} />
        </div>
      </div>
      
      {user?.id === selectedTeam.leaderId && (
        <div className="mt-8">
          <TeamApplicationsCard team={selectedTeam} />
        </div>
      )}
    </div>
  );
}
