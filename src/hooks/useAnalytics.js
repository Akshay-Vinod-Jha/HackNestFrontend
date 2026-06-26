import useAnalyticsStore from '../store/analyticsStore';

export default function useAnalytics() {
  const {
    history,
    timeline,
    analytics,
    dashboard,
    isLoading,
    error,
    fetchProfileHistory,
    fetchProfileTimeline,
    fetchProfileAnalytics,
    fetchDashboard,
    clearError
  } = useAnalyticsStore();

  return {
    history,
    timeline,
    analytics,
    dashboard,
    isLoading,
    error,
    fetchProfileHistory,
    fetchProfileTimeline,
    fetchProfileAnalytics,
    fetchDashboard,
    clearError
  };
}
