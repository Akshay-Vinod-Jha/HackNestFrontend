import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUsers, FiCalendar, FiMessageSquare, FiCheck, FiX, FiBriefcase, FiLoader } from 'react-icons/fi';
import InvitationStatusBadge from './InvitationStatusBadge';
import useInvitations from '../../hooks/useInvitations';
import useTeams from '../../hooks/useTeams';
import useDashboard from '../../hooks/useDashboard';
import NotificationService from '../../services/NotificationService';

export default function InvitationCard({ invitation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { acceptInvitation, rejectInvitation, getMyInvitations } = useInvitations();
  const { fetchTeamById } = useTeams();
  const { fetchDashboard } = useDashboard();

  const handleAccept = async () => {
    setIsSubmitting(true);
    try {
      await acceptInvitation(invitation.id);
      NotificationService.notifyInvitationAccepted(invitation.teamName);
      getMyInvitations().catch(() => {});
      if (invitation.teamId) fetchTeamById(invitation.teamId).catch(() => {});
      fetchDashboard().catch(() => {});
    } catch (error) {
      NotificationService.notifyError('Failed to accept invitation');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!window.confirm('Are you sure you want to decline this invitation?')) return;
    setIsSubmitting(true);
    try {
      await rejectInvitation(invitation.id);
      NotificationService.notifyInvitationRejected();
      getMyInvitations().catch(() => {});
    } catch (error) {
      NotificationService.notifyError('Failed to decline invitation');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="clay-card clay-card-hover flex flex-col h-full"
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-extrabold mb-1" style={{ color: 'var(--clay-text-primary)' }}>
            {invitation.teamName || 'Unknown Team'}
          </h3>
          <p className="text-sm font-medium flex items-center gap-1.5" style={{ color: 'var(--clay-text-secondary)' }}>
            <FiUsers className="w-3.5 h-3.5" />
            Leader: <span className="font-bold" style={{ color: 'var(--clay-text-primary)' }}>{invitation.senderName || invitation.leaderName || 'Unknown'}</span>
          </p>
        </div>
        <InvitationStatusBadge status={invitation.status} />
      </div>

      {/* Details */}
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--clay-text-secondary)' }}>
          <FiBriefcase className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--clay-primary)' }} />
          <span>Role Offered:</span>
          <span className="font-bold" style={{ color: 'var(--clay-text-primary)' }}>
            {invitation.roleOffered || 'General Member'}
          </span>
        </div>

        {invitation.message && (
          <div className="clay-card-inset">
            <div className="flex items-center gap-2 font-bold text-xs mb-1.5" style={{ color: 'var(--clay-text-secondary)' }}>
              <FiMessageSquare className="w-3 h-3" style={{ color: 'var(--clay-primary)' }} />
              Message
            </div>
            <p className="text-sm italic" style={{ color: 'var(--clay-text-secondary)' }}>
              "{invitation.message}"
            </p>
          </div>
        )}

        <p className="text-xs font-semibold flex items-center gap-1.5" style={{ color: 'var(--clay-text-muted)' }}>
          <FiCalendar className="w-3 h-3" />
          {new Date(invitation.createdAt || Date.now()).toLocaleDateString()}
        </p>
      </div>

      {/* Actions */}
      <div 
        className="mt-4 pt-4 flex gap-2.5"
        style={{ borderTop: '1px solid var(--clay-border-light)' }}
      >
        <Link 
          to={`/teams/${invitation.teamId}`}
          className="flex-1 clay-button clay-button-secondary text-center text-sm justify-center"
        >
          View Team
        </Link>

        {invitation.status === 'PENDING' && (
          <>
            <motion.button
              onClick={handleAccept}
              disabled={isSubmitting}
              className="flex-1 clay-button clay-button-success text-sm"
              whileHover={!isSubmitting ? { scale: 1.03 } : {}}
              whileTap={!isSubmitting ? { scale: 0.97 } : {}}
            >
              {isSubmitting ? <FiLoader className="w-3.5 h-3.5 animate-spin" /> : <FiCheck className="w-3.5 h-3.5" />}
              Accept
            </motion.button>
            <motion.button
              onClick={handleReject}
              disabled={isSubmitting}
              className="clay-icon-button"
              style={{ 
                color: 'var(--clay-danger)', 
                background: 'var(--clay-danger-light)',
                border: '1px solid var(--clay-danger-light)',
                borderRadius: 'var(--clay-radius-sm)',
                width: '2.5rem',
                height: '2.5rem',
              }}
              whileHover={!isSubmitting ? { scale: 1.08 } : {}}
              whileTap={!isSubmitting ? { scale: 0.88 } : {}}
              title="Decline"
            >
              {isSubmitting ? <FiLoader className="w-3.5 h-3.5 animate-spin" /> : <FiX className="w-4 h-4" />}
            </motion.button>
          </>
        )}
      </div>
    </motion.div>
  );
}
