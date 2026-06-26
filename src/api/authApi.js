import api from './axios';

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    // Gracefully format error so callers don't have to parse Axios errors
    throw error.response?.data || error.message || 'An error occurred during registration';
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'An error occurred during login';
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'An error occurred while fetching the user';
  }
};
