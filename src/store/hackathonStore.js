import { create } from 'zustand';
import { 
  getHackathons, 
  getHackathonById, 
  searchHackathons, 
  getHackathonTeams, 
  createHackathon 
} from '../api/hackathonApi';

const useHackathonStore = create((set, get) => ({
  // State
  hackathons: [],
  selectedHackathon: null,
  hackathonTeams: [],
  searchResults: [],
  pagination: null,
  filters: {},
  isLoading: false,
  error: null,

  // Actions
  fetchHackathons: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      // Merge current filters with any incoming params
      const currentFilters = get().filters;
      const combinedParams = { ...currentFilters, ...params };
      
      const data = await getHackathons(combinedParams);
      // Assuming backend returns paginated structure: { content: [], totalPages, etc. }
      if (data && data.content) {
        set({ 
          hackathons: data.content, 
          pagination: { 
            page: data.number, 
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            size: data.size
          },
          isLoading: false 
        });
      } else {
        set({ hackathons: data, isLoading: false });
      }
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },

  fetchHackathonById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const data = await getHackathonById(id);
      set({ selectedHackathon: data, isLoading: false });
      return data;
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },

  searchHackathons: async (query) => {
    set({ isLoading: true, error: null });
    try {
      const data = await searchHackathons(query);
      if (data && data.content) {
        set({ searchResults: data.content, isLoading: false });
      } else {
        set({ searchResults: data, isLoading: false });
      }
      return data;
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },

  fetchHackathonTeams: async (hackathonId) => {
    set({ isLoading: true, error: null });
    try {
      const data = await getHackathonTeams(hackathonId);
      set({ hackathonTeams: data, isLoading: false });
      return data;
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },

  createHackathon: async (hackathonData) => {
    set({ isLoading: true, error: null });
    try {
      const data = await createHackathon(hackathonData);
      set({ isLoading: false });
      // Optionally re-fetch list here
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

export default useHackathonStore;
