import api from './axios';

export const getGlobalLeaderboard = async (params = {}) => {
  const response = await api.get('/leaderboard/global', { params });
  return response.data;
};

export const getCollegeLeaderboard = async (params = {}) => {
  const response = await api.get('/leaderboard/college', { params });
  return response.data;
};
