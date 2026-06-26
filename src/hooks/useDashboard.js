import useDashboardStore from '../store/dashboardStore';

export default function useDashboard() {
  const store = useDashboardStore();

  return {
    // State
    dashboard: store.dashboard,
    analytics: store.analytics,
    recommendedTeams: store.recommendedTeams,
    recommendedHackathons: store.recommendedHackathons,
    recommendedTeammates: store.recommendedTeammates,
    pendingInvitations: store.pendingInvitations,
    isLoading: store.isLoading,
    error: store.error,

    // Actions
    fetchDashboard: store.fetchDashboard,
    fetchAnalytics: store.fetchAnalytics,
    fetchRecommendedTeams: store.fetchRecommendedTeams,
    fetchRecommendedHackathons: store.fetchRecommendedHackathons,
    fetchRecommendedTeammates: store.fetchRecommendedTeammates,
    fetchInvitations: store.fetchInvitations,
    clearError: store.clearError,
  };
}
