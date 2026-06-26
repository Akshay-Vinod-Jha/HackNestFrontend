import useRecommendationStore from '../store/recommendationStore';

export default function useRecommendations() {
  const recommendedTeammates = useRecommendationStore(state => state.recommendedTeammates);
  const recommendedTeams = useRecommendationStore(state => state.recommendedTeams);
  const recommendedHackathons = useRecommendationStore(state => state.recommendedHackathons);
  
  const filters = useRecommendationStore(state => state.filters);
  
  const isLoading = useRecommendationStore(state => state.isLoading);
  const error = useRecommendationStore(state => state.error);

  const getRecommendedTeammates = useRecommendationStore(state => state.getRecommendedTeammates);
  const getRecommendedTeams = useRecommendationStore(state => state.getRecommendedTeams);
  const getRecommendedHackathons = useRecommendationStore(state => state.getRecommendedHackathons);
  
  const setFilters = useRecommendationStore(state => state.setFilters);
  const clearFilters = useRecommendationStore(state => state.clearFilters);
  const clearError = useRecommendationStore(state => state.clearError);

  return {
    recommendedTeammates,
    recommendedTeams,
    recommendedHackathons,
    filters,
    isLoading,
    error,
    
    getRecommendedTeammates,
    getRecommendedTeams,
    getRecommendedHackathons,
    setFilters,
    clearFilters,
    clearError
  };
}
