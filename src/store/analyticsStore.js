import { create } from 'zustand';
import { 
  getProfileHistory, 
  getProfileTimeline, 
  getProfileAnalytics, 
  getDashboard 
} from '../api/analyticsApi';

const useAnalyticsStore = create((set) => ({
  // State
  history: null,
  timeline: null,
  analytics: null,
  dashboard: null,
  isLoading: false,
  error: null,

  // Actions
  fetchProfileHistory: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getProfileHistory();
      set({ history: data, isLoading: false });
      return data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch profile history', 
        isLoading: false 
      });
      throw error;
    }
  },

  fetchProfileTimeline: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getProfileTimeline();
      set({ timeline: data, isLoading: false });
      return data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch profile timeline', 
        isLoading: false 
      });
      throw error;
    }
  },

  fetchProfileAnalytics: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getProfileAnalytics();
      set({ analytics: data, isLoading: false });
      return data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch profile analytics', 
        isLoading: false 
      });
      throw error;
    }
  },

  fetchDashboard: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getDashboard();
      set({ dashboard: data, isLoading: false });
      return data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch dashboard data', 
        isLoading: false 
      });
      throw error;
    }
  },

  clearError: () => {
    set({ error: null });
  }
}));

export default useAnalyticsStore;
