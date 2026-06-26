import useProfileStore from '../store/profileStore';

export default function useProfile() {
  const store = useProfileStore();

  return {
    // State
    profile: store.profile,
    history: store.history,
    timeline: store.timeline,
    analytics: store.analytics,
    isLoading: store.isLoading,
    error: store.error,

    // Actions
    fetchProfile: store.fetchProfile,
    updateProfile: store.updateProfile,
    fetchHistory: store.fetchHistory,
    fetchTimeline: store.fetchTimeline,
    fetchAnalytics: store.fetchAnalytics,
    clearError: store.clearError,
  };
}
