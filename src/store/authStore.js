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
      const responseData = await registerApi(userData);
      
      const token = responseData.data?.token || responseData.token || responseData.accessToken;
      const user = responseData.data?.user || responseData.user;
      
      if (token) {
        localStorage.setItem('hacknest_token', token);
      }
      
      set({ 
        user: user || null, 
        token: token || null, 
        isAuthenticated: !!token, 
        isLoading: false 
      });
      
      return responseData;
    } catch (error) {
      set({ isLoading: false, error: error?.message || error });
      throw error;
    }
  },

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const responseData = await loginApi(credentials);
      
      // Extract token and user from the ApiResponse data wrapper
      // The backend returns: { success, message, data: { token, user } }
      const token = responseData.data?.token || responseData.token || responseData.accessToken;
      const user = responseData.data?.user || responseData.user;
      
      if (token) {
        localStorage.setItem('hacknest_token', token);
      }

      set({ 
        user: user || null, 
        token: token || null, 
        isAuthenticated: true, 
        isLoading: false 
      });
      
      return responseData;
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
    // Redirect to login to force UI reset and clear session completely
    window.location.href = '/login';
  },

  clearError: () => {
    set({ error: null });
  }
}));

export default useAuthStore;
