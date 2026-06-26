import axiosInstance from './axiosInstance';

export const createTeam = async (teamData) => {
  const response = await axiosInstance.post('/api/teams', teamData);
  return response.data;
};

export const getTeamById = async (id) => {
  const response = await axiosInstance.get(`/api/teams/${id}`);
  return response.data;
};

export const searchTeams = async (params) => {
  const response = await axiosInstance.get('/api/teams/search', { params });
  return response.data;
};

export const applyToTeam = async (teamId, applicationData) => {
  const response = await axiosInstance.post(`/api/teams/${teamId}/apply`, applicationData);
  return response.data;
};

export const getTeamApplications = async (teamId) => {
  const response = await axiosInstance.get(`/api/teams/${teamId}/applications`);
  return response.data;
};

export const inviteToTeam = async (teamId, inviteData) => {
  const response = await axiosInstance.post(`/api/teams/${teamId}/invite`, inviteData);
  return response.data;
};

export const getTeamAnalysis = async (id) => {
  const response = await axiosInstance.get(`/api/teams/${id}/analysis`);
  return response.data;
};
