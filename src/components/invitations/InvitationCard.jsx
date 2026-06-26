import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiCalendar, FiMessageSquare, FiCheck, FiX, FiBriefcase, FiLoader } from 'react-icons/fi';
import InvitationStatusBadge from './InvitationStatusBadge';
import useInvitations from '../../hooks/useInvitations';
import useTeams from '../../hooks/useTeams';
import useDashboard from '../../hooks/useDashboard';
import { toast } from 'react-hot-toast';

export default function InvitationCard({ invitation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { acceptInvitation, rejectInvitation, getMyInvitations } = useInvitations();
  const { fetchTeamById } = useTeams();
  const { fetchDashboard } = useDashboard();

  const handleAccept = async () => {
    setIsSubmitting(true);
    try {
      await acceptInvitation(invitation.id);
      toast.success('Invitation accepted successfully!');
      
      // Refresh flows
      getMyInvitations().catch(() => {});
      if (invitation.teamId) {
        fetchTeamById(invitation.teamId).catch(() => {});
      }
      fetchDashboard().catch(() => {});
    } catch (error) {
      toast.error('Failed to accept invitation');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!window.confirm('Are you sure you want to decline this invitation?')) return;
    setIsSubmitting(true);
    try {
      await rejectInvitation(invitation.id);
      toast.success('Invitation declined');
      
      // Refresh flow
      getMyInvitations().catch(() => {});
    } catch (error) {
      toast.error('Failed to decline invitation');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-6 group flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-extrabold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            {invitation.teamName || 'Unknown Team'}
          </h3>
          <p className="text-gray-500 font-medium text-sm flex items-center gap-1.5">
            <FiUsers className="w-4 h-4" /> 
            Leader: <span className="text-gray-700 font-bold">{invitation.leaderName || 'Unknown'}</span>
          </p>
        </div>
        <InvitationStatusBadge status={invitation.status} />
      </div>

      <div className="flex-1 mt-2 space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <FiBriefcase className="w-4 h-4 text-blue-500" />
          <span className="text-gray-600">Role Offered:</span>
          <span className="font-bold text-gray-900">{invitation.roleOffered || 'General Member'}</span>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center gap-2 text-gray-700 font-bold mb-2">
            <FiMessageSquare className="w-4 h-4 text-blue-500" /> Message from Leader
          </div>
          <p className="text-sm text-gray-600 italic">
            "{invitation.message || 'No message provided.'}"
          </p>
        </div>

        <p className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
          <FiCalendar className="w-3.5 h-3.5" /> 
          Invited on: {new Date(invitation.invitedAt || Date.now()).toLocaleDateString()}
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-50 flex gap-3">
        <Link 
          to={`/teams/${invitation.teamId}`}
          className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl transition-colors active:scale-95 gap-2 text-sm"
        >
          View Team
        </Link>
        {invitation.status === 'PENDING' && (
          <>
            <button 
              onClick={handleAccept}
              disabled={isSubmitting}
              className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors active:scale-95 gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <FiLoader className="w-4 h-4 animate-spin" /> : <FiCheck className="w-4 h-4" />} 
              Accept
            </button>
            <button 
              onClick={handleReject}
              disabled={isSubmitting}
              className="flex-none inline-flex items-center justify-center px-4 py-2.5 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold rounded-xl transition-colors active:scale-95 gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
              title="Decline"
            >
              {isSubmitting ? <FiLoader className="w-4 h-4 animate-spin" /> : <FiX className="w-4 h-4" />}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
