import { create } from 'zustand';
import {
  getMyInvitations,
  sendInvitation,
  acceptInvitation,
  rejectInvitation,
  cancelInvitation
} from '../api/invitationApi';

const useInvitationStore = create((set) => ({
  // State
  invitations: [],
  selectedInvitation: null,
  isLoading: false,
  error: null,

  // Actions
  getMyInvitations: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getMyInvitations();
      set({ invitations: data, isLoading: false });
      return data;
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },

  sendInvitation: async (teamId, inviteData) => {
    set({ isLoading: true, error: null });
    try {
      const data = await sendInvitation(teamId, inviteData);
      set({ isLoading: false });
      return data;
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },

  acceptInvitation: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const data = await acceptInvitation(id);
      set(state => ({
        invitations: state.invitations.map(inv => 
          inv.id === id ? { ...inv, status: 'ACCEPTED' } : inv
        ),
        isLoading: false
      }));
      return data;
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },

  rejectInvitation: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const data = await rejectInvitation(id);
      set(state => ({
        invitations: state.invitations.map(inv => 
          inv.id === id ? { ...inv, status: 'REJECTED' } : inv
        ),
        isLoading: false
      }));
      return data;
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },

  cancelInvitation: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const data = await cancelInvitation(id);
      set(state => ({
        invitations: state.invitations.filter(inv => inv.id !== id),
        isLoading: false
      }));
      return data;
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null })
}));

export default useInvitationStore;
