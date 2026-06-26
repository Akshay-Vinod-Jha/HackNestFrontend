import { Link } from 'react-router-dom';
import { FiUsers, FiCalendar, FiMessageSquare, FiTrash2 } from 'react-icons/fi';
import ApplicationStatusBadge from './ApplicationStatusBadge';
import useApplications from '../../hooks/useApplications';
import { toast } from 'react-hot-toast';

export default function ApplicationCard({ application }) {
  const { withdrawApplication } = useApplications();

  const handleWithdraw = async () => {
    if (!window.confirm('Are you sure you want to withdraw this application?')) return;
    try {
      await withdrawApplication(application.id);
      toast.success('Application withdrawn successfully');
    } catch (error) {
      toast.error('Failed to withdraw application');
    }
  };

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-6 group flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-extrabold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            {application.teamName || 'Unknown Team'}
          </h3>
          <p className="text-gray-500 font-medium text-sm flex items-center gap-1.5">
            <FiCalendar className="w-4 h-4" /> 
            Applied: {new Date(application.appliedAt || Date.now()).toLocaleDateString()}
          </p>
        </div>
        <ApplicationStatusBadge status={application.status} />
      </div>

      <div className="flex-1 mt-2">
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-4">
          <div className="flex items-center gap-2 text-gray-700 font-bold mb-2">
            <FiMessageSquare className="w-4 h-4 text-blue-500" /> Your Message
          </div>
          <p className="text-sm text-gray-600 italic">
            "{application.message || 'No message provided.'}"
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-50 flex gap-3">
        <Link 
          to={`/teams/${application.teamId}`}
          className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl transition-colors active:scale-95 gap-2 text-sm"
        >
          <FiUsers className="w-4 h-4" /> View Team
        </Link>
        {application.status === 'PENDING' && (
          <button 
            onClick={handleWithdraw}
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold rounded-xl transition-colors active:scale-95 gap-2 text-sm"
          >
            <FiTrash2 className="w-4 h-4" /> Withdraw
          </button>
        )}
      </div>
    </div>
  );
}
