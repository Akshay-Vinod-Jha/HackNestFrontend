import useAchievementStore from '../store/achievementStore';

export default function useAchievements() {
  const trophyRoom = useAchievementStore(state => state.trophyRoom);
  const isLoading = useAchievementStore(state => state.isLoading);
  const error = useAchievementStore(state => state.error);
  const fetchTrophyRoom = useAchievementStore(state => state.fetchTrophyRoom);
  const clearError = useAchievementStore(state => state.clearError);

  return {
    trophyRoom,
    isLoading,
    error,
    fetchTrophyRoom,
    clearError
  };
}
