import { useEffect } from 'react';
import useTeams from '../../hooks/useTeams';
import { FiCheck, FiX, FiClock } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

export default function TeamApplicationsCard({ team }) {
  const { applications, fetchTeamApplications, updateApplicationStatus, isLoading } = useTeams();

  useEffect(() => {
    if (team?.id) {
      fetchTeamApplications(team.id).catch(() => {});
    }
  }, [team?.id, fetchTeamApplications]);

  const handleStatusUpdate = async (applicationId, status) => {
    try {
      await updateApplicationStatus(team.id, applicationId, status);
      toast.success(`Application ${status.toLowerCase()} successfully`);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  if (isLoading && !applications?.length) {
    return (
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="h-32 bg-gray-50 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!applications || applications.length === 0) {
    return (
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
        <h2 className="text-xl font-extrabold text-gray-900 mb-6">Applications</h2>
        <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">No pending applications at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
      <h2 className="text-xl font-extrabold text-gray-900 mb-6">Applications ({applications.length})</h2>
      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{app.applicantName || 'Unknown Applicant'}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {app.skills?.map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs font-bold">
                        {typeof skill === 'string' ? skill : skill.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="shrink-0">
                  {app.status === 'PENDING' && (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs font-black uppercase tracking-wider">
                      <FiClock className="w-3.5 h-3.5" /> Pending
                    </span>
                  )}
                  {app.status === 'ACCEPTED' && (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-black uppercase tracking-wider">
                      <FiCheck className="w-3.5 h-3.5" /> Accepted
                    </span>
                  )}
                  {app.status === 'REJECTED' && (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-700 rounded-lg text-xs font-black uppercase tracking-wider">
                      <FiX className="w-3.5 h-3.5" /> Rejected
                    </span>
                  )}
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-xl border border-gray-100 text-sm text-gray-600 font-medium">
                "{app.message || 'No message provided.'}"
              </div>
            </div>

            {app.status === 'PENDING' && (
              <div className="flex md:flex-col gap-3 shrink-0 pt-2 md:pt-0">
                <button 
                  onClick={() => handleStatusUpdate(app.id, 'ACCEPTED')}
                  className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors active:scale-95 text-sm"
                >
                  Accept
                </button>
                <button 
                  onClick={() => handleStatusUpdate(app.id, 'REJECTED')}
                  className="flex-1 px-4 py-2 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold rounded-xl transition-colors active:scale-95 text-sm"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
