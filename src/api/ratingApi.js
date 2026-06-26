import api from './index';

export const createRating = async (ratingData) => {
  const response = await api.post('/ratings', ratingData);
  return response.data;
};

export const getUserRatings = async (userId) => {
  const response = await api.get(`/users/${userId}/ratings`);
  return response.data;
};
