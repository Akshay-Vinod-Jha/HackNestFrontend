import api from './axios';

export const getHackathons = async (params) => {
  try {
    const response = await api.get('/hackathons', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to fetch hackathons';
  }
};

export const getHackathonById = async (id) => {
  try {
    const response = await api.get(`/hackathons/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to fetch hackathon details';
  }
};

export const searchHackathons = async (query) => {
  try {
    const response = await api.get('/hackathons/search', { params: query });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to search hackathons';
  }
};

export const getHackathonTeams = async (hackathonId) => {
  try {
    const response = await api.get(`/hackathons/${hackathonId}/teams`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to fetch hackathon teams';
  }
};

export const createHackathon = async (data) => {
  try {
    const response = await api.post('/hackathons', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to create hackathon';
  }
};
