import api from './axios';

export const getProfileHistory = async () => {
  const response = await api.get('/profile/history');
  return response.data;
};

export const getProfileTimeline = async () => {
  const response = await api.get('/profile/timeline');
  return response.data;
};

export const getProfileAnalytics = async () => {
  const response = await api.get('/profile/analytics');
  return response.data;
};

export const getDashboard = async () => {
  const response = await api.get('/dashboard');
  return response.data;
};
