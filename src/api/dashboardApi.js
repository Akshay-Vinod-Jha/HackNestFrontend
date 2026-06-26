import api from './axios';
import { getProfileAnalytics as getAnalytics } from './profileApi';

export const getDashboard = async () => {
  try {
    const response = await api.get('/dashboard');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to fetch dashboard';
  }
};

export const getRecommendedTeams = async () => {
  try {
    const response = await api.get('/recommendations/teams');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to fetch recommended teams';
  }
};

export const getRecommendedHackathons = async () => {
  try {
    const response = await api.get('/recommendations/hackathons');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to fetch recommended hackathons';
  }
};

export const getRecommendedTeammates = async () => {
  try {
    const response = await api.get('/recommendations/teammates');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to fetch recommended teammates';
  }
};

export const getMyInvitations = async () => {
  try {
    const response = await api.get('/invitations/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to fetch invitations';
  }
};

export const getProfileAnalytics = async () => {
  try {
    const response = await getAnalytics();
    return response;
  } catch (error) {
    throw error;
  }
};
