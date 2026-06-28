import { Link } from 'react-router-dom';
import { FiUser, FiCheck, FiX, FiAward, FiMessageSquare } from 'react-icons/fi';
import ApplicationStatusBadge from '../ApplicationStatusBadge';
import useApplications from '../../../hooks/useApplications';
import { toast } from 'react-hot-toast';

export default function ApplicantCard({ application }) {
  const { acceptApplication, rejectApplication } = useApplications();

  const handleAccept = async () => {
    try {
      await acceptApplication(application.id);
      toast.success('Application accepted!');
    } catch (error) {
      toast.error('Failed to accept application');
    }
  };

  const handleReject = async () => {
    try {
      await rejectApplication(application.id);
      toast.success('Application rejected');
    } catch (error) {
      toast.error('Failed to reject application');
    }
  };

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col h-full md:hidden">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-extrabold text-gray-900 mb-1">{application.applicantName || 'Unknown Applicant'}</h3>
          <p className="text-gray-500 font-medium text-sm">{application.college || 'No college provided'}</p>
        </div>
        <ApplicationStatusBadge status={application.status} />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {application.skills?.map((skill, i) => (
          <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100">
            {typeof skill === 'string' ? skill : skill.name}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 mb-4 text-sm font-bold text-gray-600">
        <span className="flex items-center gap-1.5"><FiAward className="w-4 h-4 text-amber-500" /> {application.experience || 'Beginner'}</span>
        <span className="flex items-center gap-1.5"><span className="text-emerald-500">★</span> {application.trustScore || 'N/A'}</span>
      </div>

      <div className="flex-1">
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-4">
          <div className="flex items-center gap-2 text-gray-700 font-bold mb-2">
            <FiMessageSquare className="w-4 h-4 text-blue-500" /> Message
          </div>
          <p className="text-sm text-gray-600 italic">
            "{application.message || 'No message provided.'}"
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-50 space-y-3">
        <Link 
          to={`/profile/${application.applicantId}`}
          className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl transition-colors active:scale-[0.98] gap-2 text-sm"
        >
          <FiUser className="w-4 h-4" /> View Profile
        </Link>
        
        {application.status === 'PENDING' && (
          <div className="flex gap-3">
            <button 
              onClick={handleAccept}
              className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors active:scale-[0.98] gap-2 text-sm"
            >
              <FiCheck className="w-4 h-4" /> Accept
            </button>
            <button 
              onClick={handleReject}
              className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold rounded-xl transition-colors active:scale-[0.98] gap-2 text-sm"
            >
              <FiX className="w-4 h-4" /> Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
