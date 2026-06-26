import { create } from 'zustand';
import { 
  getRecommendedTeammates, 
  getRecommendedTeams, 
  getRecommendedHackathons 
} from '../api/recommendationApi';

const useRecommendationStore = create((set, get) => ({
  // State
  recommendedTeammates: [],
  recommendedTeams: [],
  recommendedHackathons: [],
  
  filters: {},
  
  isLoading: false,
  error: null,

  // Actions
  getRecommendedTeammates: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getRecommendedTeammates();
      set({ recommendedTeammates: data, isLoading: false });
      return data;
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },

  getRecommendedTeams: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getRecommendedTeams();
      set({ recommendedTeams: data, isLoading: false });
      return data;
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },

  getRecommendedHackathons: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getRecommendedHackathons();
      set({ recommendedHackathons: data, isLoading: false });
      return data;
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters }
    }));
  },

  clearFilters: () => {
    set({ filters: {} });
  },

  clearError: () => {
    set({ error: null });
  }
}));

export default useRecommendationStore;
