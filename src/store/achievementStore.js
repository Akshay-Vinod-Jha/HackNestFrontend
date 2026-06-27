import { create } from 'zustand';
import { getTrophyRoom } from '../api/achievementApi';

const useAchievementStore = create((set) => ({
  trophyRoom: null,
  isLoading: false,
  error: null,

  fetchTrophyRoom: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getTrophyRoom();
      set({ trophyRoom: data, isLoading: false });
      return data;
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null })
}));

export default useAchievementStore;
