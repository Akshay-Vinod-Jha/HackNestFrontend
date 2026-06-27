import useTeamStore from '../store/teamStore';

export default function useTeams() {
  const teams = useTeamStore(state => state.teams);
  const selectedTeam = useTeamStore(state => state.selectedTeam);
  const applications = useTeamStore(state => state.applications);
  const myTeams = useTeamStore(state => state.myTeams);
  const analysis = useTeamStore(state => state.analysis);
  const pagination = useTeamStore(state => state.pagination);
  const filters = useTeamStore(state => state.filters);
  const isLoading = useTeamStore(state => state.isLoading);
  const error = useTeamStore(state => state.error);

  const createTeam = useTeamStore(state => state.createTeam);
  const fetchTeamById = useTeamStore(state => state.fetchTeamById);
  const searchTeams = useTeamStore(state => state.searchTeams);
  const fetchUserTeams = useTeamStore(state => state.fetchUserTeams);
  const applyToTeam = useTeamStore(state => state.applyToTeam);
  const fetchTeamApplications = useTeamStore(state => state.fetchTeamApplications);
  const updateApplicationStatus = useTeamStore(state => state.updateApplicationStatus);
  const inviteToTeam = useTeamStore(state => state.inviteToTeam);
  const fetchTeamAnalysis = useTeamStore(state => state.fetchTeamAnalysis);
  const setFilters = useTeamStore(state => state.setFilters);
  const clearFilters = useTeamStore(state => state.clearFilters);
  const clearError = useTeamStore(state => state.clearError);

  return {
    // State
    teams,
    selectedTeam,
    applications,
    myTeams,
    analysis,
    pagination,
    filters,
    isLoading,
    error,
    
    // Actions
    createTeam,
    fetchTeamById,
    searchTeams,
    fetchUserTeams,
    applyToTeam,
    fetchTeamApplications,
    updateApplicationStatus,
    inviteToTeam,
    fetchTeamAnalysis,
    setFilters,
    clearFilters,
    clearError
  };
}
