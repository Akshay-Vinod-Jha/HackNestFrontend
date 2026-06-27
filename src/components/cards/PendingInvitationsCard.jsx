import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useInvitations from '../../hooks/useInvitations';
import useDashboard from '../../hooks/useDashboard';
import { toast } from 'react-hot-toast';
import { FiLoader } from 'react-icons/fi';
import { staggerContainer, staggerItem } from '../../utils/animations';

export default function PendingInvitationsCard({ invitations, isLoading }) {
  const { acceptInvitation, rejectInvitation } = useInvitations();
  const { fetchInvitations, fetchDashboard } = useDashboard();
  const [loadingId, setLoadingId] = useState(null);

  if (isLoading && !invitations) {
    return (
      <div className="clay-card p-6 md:p-8 h-full flex flex-col animate-pulse">
        <div className="clay-skeleton h-6 rounded w-1/3 mb-6" style={{ background: 'var(--clay-surface-2)' }}></div>
        <div className="space-y-4 flex-1">
          <div className="clay-skeleton h-16 rounded-2xl w-full" style={{ background: 'var(--clay-surface-2)' }}></div>
          <div className="clay-skeleton h-16 rounded-2xl w-full" style={{ background: 'var(--clay-surface-2)' }}></div>
        </div>
      </div>
    );
  }

  const items = Array.isArray(invitations) ? invitations : [];
  const count = items.length;

  const handleAccept = async (id) => {
    setLoadingId(id);
    try {
      await acceptInvitation(id);
      toast.success('Invitation accepted!');
      fetchInvitations().catch(() => {});
      fetchDashboard().catch(() => {});
    } catch (error) {
      toast.error('Failed to accept invitation');
    } finally {
      setLoadingId(null);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Decline this invitation?')) return;
    setLoadingId(id);
    try {
      await rejectInvitation(id);
      toast.success('Invitation declined');
      fetchInvitations().catch(() => {});
    } catch (error) {
      toast.error('Failed to decline invitation');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="clay-card p-6 md:p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-extrabold flex items-center gap-2" style={{ color: 'var(--clay-text-primary)' }}>
          <svg className="w-5 h-5" style={{ color: 'var(--clay-warning)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          Pending Invitations
        </h2>
        {count > 0 && (
          <span className="clay-badge clay-badge-warning">
            {count} New
          </span>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        {count > 0 ? (
          <motion.div
            className="space-y-3 flex-1"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {items.slice(0, 3).map((invite) => {
               // Normalizing because mock data might use invite.teamName while backend might use invite.team.name depending on payload structure
               const teamName = invite.teamName || invite.team?.name || 'Unknown Team';
               const role = invite.roleOffered || invite.role || 'Member';
               const id = invite.id;
               const isItemLoading = loadingId === id;

               return (
                <motion.div
                  key={id}
                  variants={staggerItem}
                  className="flex flex-col xl:flex-row xl:justify-between xl:items-center p-4 rounded-2xl transition-all gap-3"
                  style={{
                    background: 'var(--clay-surface-2)',
                    border: '1px solid var(--clay-border-light)',
                  }}
                >
                  <div>
                    <h3 className="font-bold text-sm" style={{ color: 'var(--clay-text-primary)' }}>{teamName}</h3>
                    <p className="text-xs font-semibold mt-1" style={{ color: 'var(--clay-text-muted)' }}>Role: <span style={{ color: 'var(--clay-text-secondary)' }}>{role}</span></p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleAccept(id)}
                      disabled={isItemLoading}
                      className="clay-button clay-button-primary flex-1 xl:flex-none flex justify-center items-center px-4 py-1.5 text-xs disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isItemLoading ? <FiLoader className="w-3.5 h-3.5 animate-spin" /> : 'Accept'}
                    </button>
                    <button 
                      onClick={() => handleReject(id)}
                      disabled={isItemLoading}
                      className="clay-button clay-button-secondary flex-1 xl:flex-none flex justify-center items-center px-4 py-1.5 text-xs disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isItemLoading ? <FiLoader className="w-3.5 h-3.5 animate-spin" /> : 'Decline'}
                    </button>
                  </div>
                </motion.div>
               );
            })}
          </motion.div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-8 rounded-2xl border border-dashed" style={{ background: 'var(--clay-surface-2)', borderColor: 'var(--clay-border)' }}>
             <p className="font-bold text-sm" style={{ color: 'var(--clay-text-muted)' }}>No pending invitations.</p>
          </div>
        )}
      </div>
      
      {count > 0 && (
        <Link to="/invitations" className="mt-6 text-center text-sm font-bold transition-colors py-2 rounded-xl" style={{ color: 'var(--clay-warning)', background: 'color-mix(in srgb, var(--clay-warning) 10%, transparent)' }}>
          View all {count} invitations
        </Link>
      )}
    </div>
  );
}
