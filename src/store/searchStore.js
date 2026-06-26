import { create } from 'zustand';
import { searchUsers, searchTeams, searchHackathons } from '../api/searchApi';

const useSearchStore = create((set, get) => ({
  // State
  users: [],
  teams: [],
  hackathons: [],
  
  filters: {},
  pagination: {
    page: 0,
    size: 20,
    totalPages: 0,
    totalElements: 0
  },
  
  isLoading: false,
  error: null,

  // Actions
  searchUsers: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const currentFilters = get().filters;
      const data = await searchUsers({ ...currentFilters, ...params });
      set({ 
        users: data.content || data, 
        pagination: data.pageable ? {
          page: data.number,
          size: data.size,
          totalPages: data.totalPages,
          totalElements: data.totalElements
        } : get().pagination,
        isLoading: false 
      });
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
      const data = await searchTeams({ ...currentFilters, ...params });
      set({ 
        teams: data.content || data, 
        pagination: data.pageable ? {
          page: data.number,
          size: data.size,
          totalPages: data.totalPages,
          totalElements: data.totalElements
        } : get().pagination,
        isLoading: false 
      });
      return data;
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },

  searchHackathons: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const currentFilters = get().filters;
      const data = await searchHackathons({ ...currentFilters, ...params });
      set({ 
        hackathons: data.content || data, 
        pagination: data.pageable ? {
          page: data.number,
          size: data.size,
          totalPages: data.totalPages,
          totalElements: data.totalElements
        } : get().pagination,
        isLoading: false 
      });
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

export default useSearchStore;
