import api from './axios';

// POST /api/teams/{teamId}/apply
export const applyToTeam = async (teamId, applicationData) => {
  try {
    const response = await api.post(`/teams/${teamId}/apply`, applicationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to apply to team';
  }
};

// GET /api/teams/{teamId}/applications
export const getTeamApplications = async (teamId) => {
  try {
    const response = await api.get(`/teams/${teamId}/applications`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to fetch team applications';
  }
};

// PATCH /api/applications/{id}/accept
export const acceptApplication = async (id) => {
  try {
    const response = await api.patch(`/applications/${id}/accept`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to accept application';
  }
};

// PATCH /api/applications/{id}/reject
export const rejectApplication = async (id) => {
  try {
    const response = await api.patch(`/applications/${id}/reject`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to reject application';
  }
};

// DELETE /api/applications/{id}
export const withdrawApplication = async (id) => {
  try {
    const response = await api.delete(`/applications/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to withdraw application';
  }
};
