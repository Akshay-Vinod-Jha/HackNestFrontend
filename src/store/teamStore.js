import { create } from 'zustand';
import {
  createTeam,
  getTeamById,
  searchTeams,
  applyToTeam,
  getTeamApplications,
  updateApplicationStatus,
  inviteToTeam,
  getTeamAnalysis
} from '../api/teamApi';

const useTeamStore = create((set, get) => ({
  // State
  teams: [],
  selectedTeam: null,
  applications: [],
  analysis: null,
  pagination: null,
  filters: {},
  isLoading: false,
  error: null,

  // Actions
  createTeam: async (teamData) => {
    set({ isLoading: true, error: null });
    try {
      const data = await createTeam(teamData);
      set({ isLoading: false });
      return data;
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },

  fetchTeamById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const data = await getTeamById(id);
      set({ selectedTeam: data, isLoading: false });
      return data;
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },

  searchTeams: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const currentFilters = get().filters;
      const combinedParams = { ...currentFilters, ...params };
      const data = await searchTeams(combinedParams);
      
      if (data && data.items) {
        set({ 
          teams: data.items,
          pagination: { 
            page: data.currentPage, 
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            size: data.size || 10
          },
          isLoading: false 
        });
      } else {
        set({ teams: Array.isArray(data) ? data : [], pagination: null, isLoading: false });
      }
      return data;
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },

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

  fetchTeamApplications: async (teamId) => {
    set({ isLoading: true, error: null });
    try {
      const data = await getTeamApplications(teamId);
      set({ applications: data.items || (Array.isArray(data) ? data : []), isLoading: false });
      return data;
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },

  updateApplicationStatus: async (teamId, applicationId, status) => {
    set({ isLoading: true, error: null });
    try {
      const data = await updateApplicationStatus(teamId, applicationId, status);
      // Optimistically update the applications list if it exists
      set((state) => ({
        applications: state.applications.map(app => 
          app.id === applicationId ? { ...app, status } : app
        ),
        isLoading: false
      }));
      return data;
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },

  inviteToTeam: async (teamId, inviteData) => {
    set({ isLoading: true, error: null });
    try {
      const data = await inviteToTeam(teamId, inviteData);
      set({ isLoading: false });
      return data;
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },

  fetchTeamAnalysis: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const data = await getTeamAnalysis(id);
      set({ analysis: data, isLoading: false });
      return data;
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },

  setFilters: (newFilters) => {
    set((state) => ({ filters: { ...state.filters, ...newFilters } }));
  },

  clearFilters: () => {
    set({ filters: {} });
  },

  clearError: () => {
    set({ error: null });
  }
}));

export default useTeamStore;
