import { create } from 'zustand';
import {
  applyToTeam,
  getTeamApplications,
  getMyApplications,
  acceptApplication,
  rejectApplication,
  withdrawApplication
} from '../api/applicationApi';

const useApplicationStore = create((set) => ({
  // State
  applications: [],
  selectedApplication: null,
  isLoading: false,
  error: null,

  // Actions
  applyToTeam: async (teamId, applicationData) => {
    set({ isLoading: true, error: null });
    try {
      const data = await applyToTeam(teamId, applicationData);
      set({ isLoading: false });
      return data;
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },

  getMyApplications: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getMyApplications();
      set({ applications: data, isLoading: false });
      return data;
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },

  getTeamApplications: async (teamId) => {
    set({ isLoading: true, error: null });
    try {
      const data = await getTeamApplications(teamId);
      set({ applications: data, isLoading: false });
      return data;
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },

  acceptApplication: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const data = await acceptApplication(id);
      set(state => ({
        applications: state.applications.map(app => 
          app.id === id ? { ...app, status: 'ACCEPTED' } : app
        ),
        isLoading: false
      }));
      return data;
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },

  rejectApplication: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const data = await rejectApplication(id);
      set(state => ({
        applications: state.applications.map(app => 
          app.id === id ? { ...app, status: 'REJECTED' } : app
        ),
        isLoading: false
      }));
      return data;
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },

  withdrawApplication: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const data = await withdrawApplication(id);
      set(state => ({
        applications: state.applications.filter(app => app.id !== id),
        isLoading: false
      }));
      return data;
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null })
}));

export default useApplicationStore;
