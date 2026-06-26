import { create } from 'zustand';
import { register as registerApi, login as loginApi, getCurrentUser } from '../api/authApi';

const useAuthStore = create((set) => ({
  // --- State ---
  user: null,
  token: localStorage.getItem('hacknest_token') || null,
  isAuthenticated: !!localStorage.getItem('hacknest_token'),
  isLoading: false,
  error: null,

  // --- Actions ---
  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const data = await registerApi(userData);
      set({ isLoading: false });
      return data;
    } catch (error) {
      set({ isLoading: false, error: error?.message || error });
      throw error;
    }
  },

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const data = await loginApi(credentials);
      
      // Assuming API returns an object with a token (e.g. { token: 'jwt...' })
      // Adjust according to exact Spring Boot backend payload if needed.
      const token = data.token || data.accessToken;
      
      if (token) {
        localStorage.setItem('hacknest_token', token);
      }

      set({ 
        user: data.user || null, 
        token: token || null, 
        isAuthenticated: true, 
        isLoading: false 
      });
      
      return data;
    } catch (error) {
      set({ isLoading: false, error: error?.message || error });
      throw error;
    }
  },

  fetchCurrentUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const user = await getCurrentUser();
      set({ user, isAuthenticated: true, isLoading: false });
      return user;
    } catch (error) {
      // If fetching the user fails, the token might be invalid or expired.
      localStorage.removeItem('hacknest_token');
      set({ 
        user: null, 
        token: null, 
        isAuthenticated: false, 
        isLoading: false, 
        error: error?.message || error 
      });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('hacknest_token');
    set({ 
      user: null, 
      token: null, 
      isAuthenticated: false, 
      error: null 
    });
  },

  clearError: () => {
    set({ error: null });
  }
}));

export default useAuthStore;
