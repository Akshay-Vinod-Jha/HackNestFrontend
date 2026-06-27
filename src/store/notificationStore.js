import { create } from 'zustand';
import * as notificationApi from '../api/notificationApi';

const useNotificationStore = create((set, get) => ({
    notifications: [],
    unreadCount: 0,
    isLoading: false,
    error: null,
    
    fetchNotifications: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await notificationApi.getUserNotifications();
            const count = await notificationApi.getUnreadCount();
            set({ 
                notifications: Array.isArray(data) ? data : [], 
                unreadCount: typeof count === 'number' ? count : 0,
                isLoading: false 
            });
        } catch (error) {
            set({ error: error?.message || 'Failed to fetch notifications', isLoading: false });
        }
    },
    
    markAsRead: async (id) => {
        try {
            await notificationApi.markAsRead(id);
            set(state => {
                const updated = state.notifications.map(n => 
                    n.id === id ? { ...n, read: true } : n
                );
                return { 
                    notifications: updated,
                    unreadCount: Math.max(0, state.unreadCount - 1)
                };
            });
        } catch (error) {
            console.error("Failed to mark as read", error);
        }
    },
    
    markAllAsRead: async () => {
        try {
            await notificationApi.markAllAsRead();
            set(state => ({
                notifications: state.notifications.map(n => ({ ...n, read: true })),
                unreadCount: 0
            }));
        } catch (error) {
            console.error("Failed to mark all as read", error);
        }
    }
}));

export default useNotificationStore;
