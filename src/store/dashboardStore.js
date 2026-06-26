import { create } from 'zustand';
import {
  getDashboard,
  getRecommendedTeams,
  getRecommendedHackathons,
  getRecommendedTeammates,
  getMyInvitations,
  getProfileAnalytics,
} from '../api/dashboardApi';

const useDashboardStore = create((set) => ({
  // State
  dashboard: null,
  analytics: null,
  recommendedTeams: null,
  recommendedHackathons: null,
  recommendedTeammates: null,
  pendingInvitations: null,
  
  isLoading: false,
  error: null,

  // Actions
  fetchDashboard: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getDashboard();
      set({ dashboard: data, isLoading: false });
      return data;
    } catch (error) {
      set({ isLoading: false, error: error?.message || error });
      throw error;
    }
  },

  fetchAnalytics: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getProfileAnalytics();
      set({ analytics: data, isLoading: false });
      return data;
    } catch (error) {
      set({ isLoading: false, error: error?.message || error });
      throw error;
    }
  },

  fetchRecommendedTeams: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getRecommendedTeams();
      set({ recommendedTeams: data, isLoading: false });
      return data;
    } catch (error) {
      set({ isLoading: false, error: error?.message || error });
      throw error;
    }
  },

  fetchRecommendedHackathons: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getRecommendedHackathons();
      set({ recommendedHackathons: data, isLoading: false });
      return data;
    } catch (error) {
      set({ isLoading: false, error: error?.message || error });
      throw error;
    }
  },

  fetchRecommendedTeammates: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getRecommendedTeammates();
      set({ recommendedTeammates: data, isLoading: false });
      return data;
    } catch (error) {
      set({ isLoading: false, error: error?.message || error });
      throw error;
    }
  },

  fetchInvitations: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getMyInvitations();
      set({ pendingInvitations: data, isLoading: false });
      return data;
    } catch (error) {
      set({ isLoading: false, error: error?.message || error });
      throw error;
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));

export default useDashboardStore;
