import { useEffect } from 'react';
import toast from 'react-hot-toast';
import AppRoutes from './routes/AppRoutes';
import useAuthStore from './store/authStore';
import FullScreenLoader from './components/ui/FullScreenLoader';

function App() {
  const fetchCurrentUser = useAuthStore((state) => state.fetchCurrentUser);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);

  useEffect(() => {
    const token = localStorage.getItem('hacknest_token');
    if (token) {
      fetchCurrentUser().catch(() => {});
    }
  }, [fetchCurrentUser]);

  // Centralized authentication error handling
  useEffect(() => {
    if (error) {
      let errorMessage = 'An unexpected authentication error occurred.';
      
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (typeof error === 'object') {
        // Handle Spring Boot style validation errors map
        if (error.errors && typeof error.errors === 'object' && Object.keys(error.errors).length > 0) {
          const firstKey = Object.keys(error.errors)[0];
          errorMessage = error.errors[firstKey];
        } 
        // Handle specific HTTP statuses
        else if (error.status === 401 || error.status === 403) {
          errorMessage = 'Session expired or unauthorized. Please log in again.';
        } 
        // Fallback to error message or error type provided by backend
        else if (error.message) {
          errorMessage = error.message;
        } else if (error.error) {
          errorMessage = error.error;
        }
      }

      toast.error(errorMessage);
      clearError();
    }
  }, [error, clearError]);

  return (
    <>
      {isLoading && <FullScreenLoader />}
      <AppRoutes />
    </>
  );
}

export default App;
