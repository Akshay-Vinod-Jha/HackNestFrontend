import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import useAuthStore from './store/authStore';
import FullScreenLoader from './components/ui/FullScreenLoader';

function App() {
  const fetchCurrentUser = useAuthStore((state) => state.fetchCurrentUser);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    const token = localStorage.getItem('hacknest_token');
    if (token) {
      // Auto-login flow: fetch user profile if a token exists on startup
      fetchCurrentUser().catch(() => {
        // Errors (like 401s) are natively caught by fetchCurrentUser to trigger a logout
      });
    }
  }, [fetchCurrentUser]);

  return (
    <>
      {isLoading && <FullScreenLoader />}
      <AppRoutes />
    </>
  );
}

export default App;
