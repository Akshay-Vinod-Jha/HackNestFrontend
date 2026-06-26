import { create } from 'zustand';
import { getGlobalLeaderboard, getCollegeLeaderboard } from '../api/leaderboardApi';

const useLeaderboardStore = create((set) => ({
  // State
  globalLeaderboard: null,
  collegeLeaderboard: null,
  isLoading: false,
  error: null,

  // Actions
  fetchGlobalLeaderboard: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const data = await getGlobalLeaderboard(params);
      set({ globalLeaderboard: data, isLoading: false });
      return data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch global leaderboard', 
        isLoading: false 
      });
      throw error;
    }
  },

  fetchCollegeLeaderboard: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const data = await getCollegeLeaderboard(params);
      set({ collegeLeaderboard: data, isLoading: false });
      return data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch college leaderboard', 
        isLoading: false 
      });
      throw error;
    }
  },

  clearError: () => {
    set({ error: null });
  }
}));

export default useLeaderboardStore;
