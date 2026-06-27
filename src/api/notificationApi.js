import axiosInstance from './axios';

export const getUserNotifications = async () => {
    const response = await axiosInstance.get('/notifications');
    return response.data;
};

export const getUnreadCount = async () => {
    const response = await axiosInstance.get('/notifications/unread-count');
    return response.data;
};

export const markAsRead = async (id) => {
    const response = await axiosInstance.put(`/notifications/${id}/read`);
    return response.data;
};

export const markAllAsRead = async () => {
    const response = await axiosInstance.put('/notifications/read-all');
    return response.data;
};
