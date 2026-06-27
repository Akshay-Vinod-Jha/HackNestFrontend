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

export const getUserTeams = async (userId) => {
  try {
    const response = await api.get(`/teams/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to fetch user teams';
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

export const updateApplicationStatus = async (teamId, applicationId, status) => {
  try {
    let response;
    if (status === 'ACCEPTED') {
      response = await api.patch(`/applications/${applicationId}/accept`);
    } else if (status === 'REJECTED') {
      response = await api.patch(`/applications/${applicationId}/reject`);
    } else {
      throw new Error(`Unsupported status: ${status}`);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to update application status';
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
