import { Link } from 'react-router-dom';
import { FiCheck, FiX, FiExternalLink, FiMessageSquare } from 'react-icons/fi';
import ApplicationStatusBadge from '../ApplicationStatusBadge';
import useApplications from '../../../hooks/useApplications';
import { toast } from 'react-hot-toast';

export default function ApplicationTable({ applications }) {
  const { acceptApplication, rejectApplication } = useApplications();

  const handleAccept = async (id) => {
    try {
      await acceptApplication(id);
      toast.success('Application accepted!');
    } catch (error) {
      toast.error('Failed to accept application');
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectApplication(id);
      toast.success('Application rejected');
    } catch (error) {
      toast.error('Failed to reject application');
    }
  };

  return (
    <div className="hidden md:block bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Applicant</th>
              <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Details</th>
              <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Message</th>
              <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-5 align-top">
                  <div className="font-extrabold text-gray-900 mb-1">{app.applicantName || 'Unknown Applicant'}</div>
                  <div className="text-sm font-medium text-gray-500">{app.college || 'No college'}</div>
                  <Link 
                    to={`/profile/${app.applicantId}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 mt-2 transition-colors"
                  >
                    View Profile <FiExternalLink />
                  </Link>
                </td>
                <td className="px-6 py-5 align-top">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {app.skills?.slice(0, 3).map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-bold border border-blue-100">
                        {typeof skill === 'string' ? skill : skill.name}
                      </span>
                    ))}
                    {app.skills?.length > 3 && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-bold border border-gray-200">
                        +{app.skills.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-bold text-gray-500 flex items-center gap-3">
                    <span>Exp: <span className="text-gray-900">{app.experience || 'N/A'}</span></span>
                    <span>Trust: <span className="text-emerald-600 font-black">{app.trustScore || 'N/A'}</span></span>
                  </div>
                </td>
                <td className="px-6 py-5 align-top max-w-xs">
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <FiMessageSquare className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <p className="line-clamp-3 italic">"{app.message || 'No message provided.'}"</p>
                  </div>
                </td>
                <td className="px-6 py-5 align-top">
                  <ApplicationStatusBadge status={app.status} />
                </td>
                <td className="px-6 py-5 align-top text-right">
                  {app.status === 'PENDING' ? (
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleAccept(app.id)}
                        className="p-2 bg-emerald-100 hover:bg-emerald-500 text-emerald-600 hover:text-white rounded-lg transition-colors"
                        title="Accept"
                      >
                        <FiCheck className="w-4 h-4 font-bold" />
                      </button>
                      <button 
                        onClick={() => handleReject(app.id)}
                        className="p-2 bg-rose-100 hover:bg-rose-500 text-rose-600 hover:text-white rounded-lg transition-colors"
                        title="Reject"
                      >
                        <FiX className="w-4 h-4 font-bold" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-gray-400 uppercase">Processed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
