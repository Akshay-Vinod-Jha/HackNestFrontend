import useLeaderboardStore from '../store/leaderboardStore';

export default function useLeaderboard() {
  const {
    globalLeaderboard,
    collegeLeaderboard,
    isLoading,
    error,
    fetchGlobalLeaderboard,
    fetchCollegeLeaderboard,
    clearError
  } = useLeaderboardStore();

  return {
    globalLeaderboard,
    collegeLeaderboard,
    isLoading,
    error,
    fetchGlobalLeaderboard,
    fetchCollegeLeaderboard,
    clearError
  };
}
