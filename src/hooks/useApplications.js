import useApplicationStore from '../store/applicationStore';

export default function useApplications() {
  const applications = useApplicationStore(state => state.applications);
  const selectedApplication = useApplicationStore(state => state.selectedApplication);
  const isLoading = useApplicationStore(state => state.isLoading);
  const error = useApplicationStore(state => state.error);

  const applyToTeam = useApplicationStore(state => state.applyToTeam);
  const getTeamApplications = useApplicationStore(state => state.getTeamApplications);
  const acceptApplication = useApplicationStore(state => state.acceptApplication);
  const rejectApplication = useApplicationStore(state => state.rejectApplication);
  const withdrawApplication = useApplicationStore(state => state.withdrawApplication);
  const clearError = useApplicationStore(state => state.clearError);

  return {
    applications,
    selectedApplication,
    isLoading,
    error,
    
    applyToTeam,
    getTeamApplications,
    acceptApplication,
    rejectApplication,
    withdrawApplication,
    clearError
  };
}
