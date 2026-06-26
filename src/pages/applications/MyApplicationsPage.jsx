import { useEffect, useState } from 'react';
import useApplications from '../../hooks/useApplications';
import ApplicationGrid from '../../components/applications/ApplicationGrid';
import ApplicationSkeleton from '../../components/applications/ApplicationSkeleton';
import EmptyApplicationsState from '../../components/applications/EmptyApplicationsState';

export default function MyApplicationsPage() {
  const { applications, isLoading, error, getMyApplications, clearError } = useApplications();
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!hasFetched) {
      setHasFetched(true);
      getMyApplications().catch(() => {});
    }
  }, [getMyApplications, hasFetched]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">My Applications</h1>
        <p className="text-gray-500 font-medium text-lg">Track and manage your outgoing hackathon team applications.</p>
      </div>

      {error && !applications?.length && (
        <div className="bg-white rounded-3xl shadow-sm border border-red-100 p-10 text-center max-w-lg mx-auto mt-12">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Unable to Load Applications</h2>
          <p className="text-gray-500 mb-8">{typeof error === 'string' ? error : 'Failed to fetch your applications.'}</p>
          <button 
            onClick={() => { clearError(); setHasFetched(false); }}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-sm active:scale-95"
          >
            Try Again
          </button>
        </div>
      )}

      {isLoading && !applications?.length && !error ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <ApplicationSkeleton key={i} />
          ))}
        </div>
      ) : !error ? (
        <>
          {applications && applications.length > 0 ? (
            <ApplicationGrid applications={applications} />
          ) : (
            <div className="pt-12">
              <EmptyApplicationsState />
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}
