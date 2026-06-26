import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiInbox } from 'react-icons/fi';
import useApplications from '../../hooks/useApplications';
import ApplicationTable from '../../components/applications/team/ApplicationTable';
import ApplicantCard from '../../components/applications/team/ApplicantCard';
import ApplicationSkeleton from '../../components/applications/ApplicationSkeleton';

export default function TeamApplicationsPage() {
  const { id } = useParams();
  const { applications, isLoading, error, getTeamApplications, clearError } = useApplications();
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (id && !hasFetched) {
      setHasFetched(true);
      getTeamApplications(id).catch(() => {});
    }
  }, [id, getTeamApplications, hasFetched]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6 md:space-y-8">
      <Link 
        to={`/teams/${id}`}
        className="inline-flex items-center gap-2 text-gray-500 font-bold hover:text-blue-600 transition-colors mb-2"
      >
        <FiArrowLeft className="w-5 h-5" />
        Back to Team
      </Link>

      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Manage Applications</h1>
        <p className="text-gray-500 font-medium text-lg">Review and manage incoming candidate applications for your team.</p>
      </div>

      {error && !applications?.length && (
        <div className="bg-white rounded-3xl shadow-sm border border-red-100 p-10 text-center max-w-lg mx-auto mt-12">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Unable to Load Applications</h2>
          <p className="text-gray-500 mb-8">{typeof error === 'string' ? error : 'Failed to fetch team applications.'}</p>
          <button 
            onClick={() => { clearError(); setHasFetched(false); }}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-sm active:scale-95"
          >
            Try Again
          </button>
        </div>
      )}

      {isLoading && !applications?.length && !error ? (
        <div className="space-y-4">
          <ApplicationSkeleton />
          <ApplicationSkeleton />
          <ApplicationSkeleton />
        </div>
      ) : !error ? (
        <>
          {applications && applications.length > 0 ? (
            <>
              {/* Desktop Table View */}
              <ApplicationTable applications={applications} />

              {/* Mobile Card View */}
              <div className="grid grid-cols-1 gap-6 md:hidden">
                {applications.map((app) => (
                  <ApplicantCard key={app.id} application={app} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-24 px-6 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm max-w-3xl mx-auto mt-8">
              <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <FiInbox className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-3">No Applications Yet</h2>
              <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                Your team hasn't received any applications yet. Make sure your team is visible to attract candidates!
              </p>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}
