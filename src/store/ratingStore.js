import { create } from 'zustand';
import { createRating, getUserRatings } from '../api/ratingApi';

const useRatingStore = create((set) => ({
  // State
  ratings: [],
  selectedUserRatings: null,
  isLoading: false,
  error: null,

  // Actions
  createRating: async (ratingData) => {
    set({ isLoading: true, error: null });
    try {
      const data = await createRating(ratingData);
      set((state) => ({ 
        ratings: [data, ...state.ratings],
        isLoading: false 
      }));
      return data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to create rating', 
        isLoading: false 
      });
      throw error;
    }
  },

  fetchUserRatings: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const data = await getUserRatings(userId);
      set({ selectedUserRatings: data, isLoading: false });
      return data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch user ratings', 
        isLoading: false 
      });
      throw error;
    }
  },

  clearError: () => {
    set({ error: null });
  }
}));

export default useRatingStore;
