import useSearchStore from '../store/searchStore';

export default function useSearch() {
  const users = useSearchStore(state => state.users);
  const teams = useSearchStore(state => state.teams);
  const hackathons = useSearchStore(state => state.hackathons);
  
  const filters = useSearchStore(state => state.filters);
  const pagination = useSearchStore(state => state.pagination);
  
  const isLoading = useSearchStore(state => state.isLoading);
  const error = useSearchStore(state => state.error);

  const searchUsers = useSearchStore(state => state.searchUsers);
  const searchTeams = useSearchStore(state => state.searchTeams);
  const searchHackathons = useSearchStore(state => state.searchHackathons);
  
  const setFilters = useSearchStore(state => state.setFilters);
  const clearFilters = useSearchStore(state => state.clearFilters);
  const clearError = useSearchStore(state => state.clearError);

  return {
    users,
    teams,
    hackathons,
    filters,
    pagination,
    isLoading,
    error,
    
    searchUsers,
    searchTeams,
    searchHackathons,
    setFilters,
    clearFilters,
    clearError
  };
}
