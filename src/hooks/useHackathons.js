import useHackathonStore from '../store/hackathonStore';

export default function useHackathons() {
  const hackathons = useHackathonStore(state => state.hackathons);
  const upcomingHackathons = useHackathonStore(state => state.upcomingHackathons);
  const recentHackathons = useHackathonStore(state => state.recentHackathons);
  const selectedHackathon = useHackathonStore(state => state.selectedHackathon);
  const hackathonTeams = useHackathonStore(state => state.hackathonTeams);
  const searchResults = useHackathonStore(state => state.searchResults);
  const pagination = useHackathonStore(state => state.pagination);
  const filters = useHackathonStore(state => state.filters);
  const isLoading = useHackathonStore(state => state.isLoading);
  const error = useHackathonStore(state => state.error);

  const fetchHackathons = useHackathonStore(state => state.fetchHackathons);
  const fetchDashboardHackathons = useHackathonStore(state => state.fetchDashboardHackathons);
  const fetchHackathonById = useHackathonStore(state => state.fetchHackathonById);
  const searchHackathons = useHackathonStore(state => state.searchHackathons);
  const fetchHackathonTeams = useHackathonStore(state => state.fetchHackathonTeams);
  const createHackathon = useHackathonStore(state => state.createHackathon);
  const setFilters = useHackathonStore(state => state.setFilters);
  const clearFilters = useHackathonStore(state => state.clearFilters);
  const clearError = useHackathonStore(state => state.clearError);

  return {
    hackathons,
    upcomingHackathons,
    recentHackathons,
    selectedHackathon,
    hackathonTeams,
    searchResults,
    pagination,
    filters,
    isLoading,
    error,
    
    fetchHackathons,
    fetchDashboardHackathons,
    fetchHackathonById,
    searchHackathons,
    fetchHackathonTeams,
    createHackathon,
    setFilters,
    clearFilters,
    clearError
  };
}
