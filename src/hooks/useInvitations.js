import useInvitationStore from '../store/invitationStore';

export default function useInvitations() {
  const invitations = useInvitationStore(state => state.invitations);
  const selectedInvitation = useInvitationStore(state => state.selectedInvitation);
  const isLoading = useInvitationStore(state => state.isLoading);
  const error = useInvitationStore(state => state.error);

  const getMyInvitations = useInvitationStore(state => state.getMyInvitations);
  const sendInvitation = useInvitationStore(state => state.sendInvitation);
  const acceptInvitation = useInvitationStore(state => state.acceptInvitation);
  const rejectInvitation = useInvitationStore(state => state.rejectInvitation);
  const cancelInvitation = useInvitationStore(state => state.cancelInvitation);
  const clearError = useInvitationStore(state => state.clearError);

  return {
    invitations,
    selectedInvitation,
    isLoading,
    error,
    
    getMyInvitations,
    sendInvitation,
    acceptInvitation,
    rejectInvitation,
    cancelInvitation,
    clearError
  };
}
