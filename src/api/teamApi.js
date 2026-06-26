import api from './axios';

export const createTeam = async (teamData) => {
  try {
    const response = await api.post('/teams', teamData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to create team';
  }
};

export const getTeamById = async (id) => {
  try {
    const response = await api.get(`/teams/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to fetch team';
  }
};

export const searchTeams = async (params) => {
  try {
    const response = await api.get('/teams/search', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to search teams';
  }
};

export const applyToTeam = async (teamId, applicationData) => {
  try {
    const response = await api.post(`/teams/${teamId}/apply`, applicationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to apply to team';
  }
};

export const getTeamApplications = async (teamId) => {
  try {
    const response = await api.get(`/teams/${teamId}/applications`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to fetch team applications';
  }
};

export const inviteToTeam = async (teamId, inviteData) => {
  try {
    const response = await api.post(`/teams/${teamId}/invite`, inviteData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to send invite';
  }
};

export const getTeamAnalysis = async (id) => {
  try {
    const response = await api.get(`/teams/${id}/analysis`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to fetch team analysis';
  }
};
