import api from './axios';

// GET /api/invitations/me
export const getMyInvitations = async () => {
  try {
    const response = await api.get('/invitations/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to fetch invitations';
  }
};

// POST /api/teams/{teamId}/invite
export const sendInvitation = async (teamId, inviteData) => {
  try {
    const response = await api.post(`/teams/${teamId}/invite`, inviteData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to send invitation';
  }
};

// PATCH /api/invitations/{id}/accept
export const acceptInvitation = async (id) => {
  try {
    const response = await api.patch(`/invitations/${id}/accept`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to accept invitation';
  }
};

// PATCH /api/invitations/{id}/reject
export const rejectInvitation = async (id) => {
  try {
    const response = await api.patch(`/invitations/${id}/reject`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to reject invitation';
  }
};

// DELETE /api/invitations/{id}
export const cancelInvitation = async (id) => {
  try {
    const response = await api.delete(`/invitations/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to cancel invitation';
  }
};
