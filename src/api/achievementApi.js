import api from './axios';

export const getTrophyRoom = async () => {
  try {
    const response = await api.get('/achievements/trophy-room');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || 'Failed to fetch trophy room data';
  }
};
