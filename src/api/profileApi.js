import api from './axios';

export const getMyProfile = async () => {
  try {
    const response = await api.get('/profile/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to fetch profile';
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await api.put('/profile/me', profileData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to update profile';
  }
};

export const getProfileHistory = async () => {
  try {
    const response = await api.get('/profile/history');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to fetch profile history';
  }
};

export const getProfileTimeline = async () => {
  try {
    const response = await api.get('/profile/timeline');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to fetch profile timeline';
  }
};

export const getProfileAnalytics = async () => {
  try {
    const response = await api.get('/profile/analytics');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to fetch profile analytics';
  }
};
