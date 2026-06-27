import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiUsers, FiMonitor, FiArrowRight } from 'react-icons/fi';

const statusConfig = {
  UPCOMING: { label: 'Upcoming', bg: 'var(--clay-success-light)', color: 'var(--clay-success)' },
  ONGOING:  { label: 'Live Now', bg: 'var(--clay-primary-light)', color: 'var(--clay-primary)' },
  ENDED:    { label: 'Ended', bg: 'var(--clay-surface-3)', color: 'var(--clay-text-muted)' },
};

export default function HackathonCard({ hackathon }) {
  const isOnline = hackathon?.mode === 'ONLINE';
  const status = statusConfig[hackathon?.status] || statusConfig.ENDED;

  return (
    <motion.div
      className="clay-card clay-card-hover flex flex-col h-full overflow-hidden"
      style={{ padding: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {/* Top accent */}
      <div 
        className="h-1 rounded-t-[20px] flex-shrink-0"
        style={{ background: `linear-gradient(90deg, var(--clay-primary), var(--clay-secondary))` }}
      />

      <div className="p-6 flex-1 flex flex-col">
        {/* Title + Status */}
        <div className="flex justify-between items-start gap-3 mb-5">
          <div className="min-w-0">
            <h3 
              className="text-lg font-extrabold leading-tight mb-1 line-clamp-2"
              style={{ color: 'var(--clay-text-primary)' }}
            >
              {hackathon?.title || 'Unnamed Hackathon'}
            </h3>
            <p className="text-xs font-semibold" style={{ color: 'var(--clay-text-muted)' }}>
              {hackathon?.organizer || 'Unknown Organizer'}
            </p>
          </div>
          <span 
            className="clay-badge shrink-0"
            style={{ background: status.bg, color: status.color }}
          >
            {hackathon?.status || 'UNKNOWN'}
          </span>
        </div>
        
        {/* Meta info */}
        <div className="space-y-2.5 mt-auto pt-2">
          <div className="flex items-center text-sm font-medium gap-2" style={{ color: 'var(--clay-text-secondary)' }}>
            <FiMonitor className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--clay-primary)' }} />
            <span>{hackathon?.mode || 'TBD'}</span>
            {!isOnline && hackathon?.country && (
              <>
                <span style={{ color: 'var(--clay-border)' }}>•</span>
                <FiMapPin className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--clay-danger)' }} />
                <span className="truncate">{hackathon.country}</span>
              </>
            )}
          </div>
          
          <div className="flex items-center text-sm font-medium gap-2" style={{ color: 'var(--clay-text-secondary)' }}>
            <FiCalendar className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--clay-warning)' }} />
            <span>
              Deadline: {hackathon?.registrationDeadline 
                ? new Date(hackathon.registrationDeadline).toLocaleDateString() 
                : 'N/A'}
            </span>
          </div>
          
          <div className="flex items-center text-sm font-medium gap-2" style={{ color: 'var(--clay-text-secondary)' }}>
            <FiUsers className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--clay-success)' }} />
            <span>Team: {hackathon?.minTeamSize || 1}–{hackathon?.maxTeamSize || 4} members</span>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="p-4 pt-0">
        <Link to={`/hackathons/${hackathon?.id}`}>
          <motion.div
            className="clay-button clay-button-primary w-full justify-center text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            View Details <FiArrowRight className="w-3.5 h-3.5" />
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}
