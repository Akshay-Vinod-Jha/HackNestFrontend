import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../utils/animations';

export default function PendingApplicationsCard({ dashboard, isLoading }) {
  // If the component is still waiting for dashboard data to load
  if (isLoading && !dashboard) {
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

  const items = Array.isArray(dashboard?.pendingApplications) ? dashboard.pendingApplications : [];
  const count = items.length;

  return (
    <div className="clay-card p-6 md:p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-extrabold flex items-center gap-2" style={{ color: 'var(--clay-text-primary)' }}>
          <svg className="w-5 h-5" style={{ color: '#ec4899' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          Pending Applications
        </h2>
        {count > 0 && (
          <span className="clay-badge" style={{ color: '#be185d', background: 'color-mix(in srgb, #ec4899 12%, transparent)', border: '1px solid color-mix(in srgb, #ec4899 25%, transparent)' }}>
            {count} Sent
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
            {items.slice(0, 3).map((app, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="flex justify-between items-center p-4 rounded-2xl transition-all gap-3"
                style={{
                  background: 'var(--clay-surface-2)',
                  border: '1px solid var(--clay-border-light)',
                }}
              >
                <div>
                  <h3 className="font-bold text-sm" style={{ color: 'var(--clay-text-primary)' }}>{app?.targetName || 'Unknown Team'}</h3>
                  <p className="text-xs font-semibold mt-1" style={{ color: 'var(--clay-text-muted)' }}>
                    Applied: <span style={{ color: 'var(--clay-text-secondary)' }}>{app?.date ? new Date(app.date).toLocaleDateString() : 'Recently'}</span>
                  </p>
                </div>
                <span className="clay-badge clay-badge-warning whitespace-nowrap shrink-0">Under Review</span>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-8 rounded-2xl border border-dashed" style={{ background: 'var(--clay-surface-2)', borderColor: 'var(--clay-border)' }}>
             <p className="font-bold text-sm" style={{ color: 'var(--clay-text-muted)' }}>No pending applications.</p>
          </div>
        )}
      </div>
      
      {count > 3 && (
        <Link to="/applications" className="mt-6 text-center text-sm font-bold transition-colors py-2 rounded-xl" style={{ color: '#ec4899', background: 'color-mix(in srgb, #ec4899 10%, transparent)' }}>
          View all {count} applications
        </Link>
      )}
    </div>
  );
}
