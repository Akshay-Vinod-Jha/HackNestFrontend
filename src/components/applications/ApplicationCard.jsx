import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    <motion.div
      className="clay-card clay-card-hover flex flex-col h-full"
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-extrabold mb-1" style={{ color: 'var(--clay-text-primary)' }}>
            {application.teamName || 'Unknown Team'}
          </h3>
          <p className="text-sm font-medium flex items-center gap-1.5" style={{ color: 'var(--clay-text-muted)' }}>
            <FiCalendar className="w-3.5 h-3.5" />
            Applied: {new Date(application.appliedAt || Date.now()).toLocaleDateString()}
          </p>
        </div>
        <ApplicationStatusBadge status={application.status} />
      </div>

      {/* Message */}
      <div className="flex-1">
        {application.message && (
          <div className="clay-card-inset mb-4">
            <div className="flex items-center gap-2 font-bold text-xs mb-1.5" style={{ color: 'var(--clay-text-secondary)' }}>
              <FiMessageSquare className="w-3 h-3" style={{ color: 'var(--clay-primary)' }} />
              Your Message
            </div>
            <p className="text-sm italic" style={{ color: 'var(--clay-text-secondary)' }}>
              "{application.message}"
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div 
        className="mt-4 pt-4 flex gap-2.5"
        style={{ borderTop: '1px solid var(--clay-border-light)' }}
      >
        <Link 
          to={`/teams/${application.teamId}`}
          className="flex-1 clay-button clay-button-secondary text-center text-sm justify-center"
        >
          <FiUsers className="w-3.5 h-3.5" /> View Team
        </Link>
        {application.status === 'PENDING' && (
          <motion.button
            onClick={handleWithdraw}
            className="flex-1 clay-button text-sm"
            style={{ 
              background: 'var(--clay-danger-light)', 
              color: 'var(--clay-danger)',
              border: '1px solid var(--clay-danger-light)',
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <FiTrash2 className="w-3.5 h-3.5" /> Withdraw
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
