import api from './axios';

// GET /api/recommendations/teammates
export const getRecommendedTeammates = async () => {
  try {
    const response = await api.get('/recommendations/teammates');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to fetch teammate recommendations';
  }
};

// GET /api/recommendations/teams
export const getRecommendedTeams = async () => {
  try {
    const response = await api.get('/recommendations/teams');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to fetch team recommendations';
  }
};

// GET /api/recommendations/hackathons
export const getRecommendedHackathons = async () => {
  try {
    const response = await api.get('/recommendations/hackathons');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to fetch hackathon recommendations';
  }
};
