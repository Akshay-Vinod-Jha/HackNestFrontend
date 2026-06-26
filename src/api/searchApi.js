import api from './axios';

// GET /api/users/search
export const searchUsers = async (params) => {
  try {
    const response = await api.get('/users/search', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to search users';
  }
};

// GET /api/teams/search
export const searchTeams = async (params) => {
  try {
    const response = await api.get('/teams/search', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to search teams';
  }
};

// GET /api/hackathons/search
export const searchHackathons = async (params) => {
  try {
    const response = await api.get('/hackathons/search', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to search hackathons';
  }
};
