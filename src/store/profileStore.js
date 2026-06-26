import { create } from 'zustand';
import {
  getMyProfile,
  updateProfile as updateProfileApi,
  getProfileHistory,
  getProfileTimeline,
  getProfileAnalytics,
} from '../api/profileApi';

const useProfileStore = create((set) => ({
  // State
  profile: null,
  history: null,
  timeline: null,
  analytics: null,
  isLoading: false,
  error: null,

  // Actions
  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getMyProfile();
      set({ profile: data, isLoading: false });
      return data;
    } catch (error) {
      set({ isLoading: false, error: error?.message || error });
      throw error;
    }
  },

  updateProfile: async (profileData) => {
    set({ isLoading: true, error: null });
    try {
      const data = await updateProfileApi(profileData);
      set({ profile: data, isLoading: false });
      return data;
    } catch (error) {
      set({ isLoading: false, error: error?.message || error });
      throw error;
    }
  },

  fetchHistory: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getProfileHistory();
      set({ history: data, isLoading: false });
      return data;
    } catch (error) {
      set({ isLoading: false, error: error?.message || error });
      throw error;
    }
  },

  fetchTimeline: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getProfileTimeline();
      set({ timeline: data, isLoading: false });
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

  clearError: () => {
    set({ error: null });
  },
}));

export default useProfileStore;
