import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUsers, FiCpu, FiBriefcase, FiAward, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

export default function TeamCard({ team }) {
  if (!team) return null;

  const isFull = team.currentMemberCount >= team.maxMembers;
  const isOpen = team.isOpen && !isFull;
  const completionPercentage = Math.round((team.currentMemberCount / team.maxMembers) * 100) || 0;

  return (
    <motion.div
      className="clay-card clay-card-hover flex flex-col h-full overflow-hidden group"
      style={{ padding: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {/* Status bar */}
      <div 
        className="h-1.5 rounded-t-[20px] flex-shrink-0"
        style={{ background: isOpen ? 'var(--clay-primary)' : 'var(--clay-border)' }}
      />

      <div className="p-6 flex-1 flex flex-col relative">
        {/* Status badge */}
        <div className="absolute top-5 right-5">
          <span 
            className="clay-badge"
            style={{
              background: isOpen ? 'var(--clay-success-light)' : 'var(--clay-danger-light)',
              color: isOpen ? 'var(--clay-success)' : 'var(--clay-danger)',
            }}
          >
            {isOpen ? 'Recruiting' : 'Closed'}
          </span>
        </div>

        {/* Core Info */}
        <div className="mb-5 pr-24">
          <h2 
            className="text-lg font-extrabold mb-1 truncate transition-colors"
            style={{ color: 'var(--clay-text-primary)' }}
            title={team.name}
          >
            {team.name}
          </h2>
          <div className="flex items-center gap-1.5 text-sm font-medium" style={{ color: 'var(--clay-text-muted)' }}>
            <FiAward className="w-3.5 h-3.5" />
            <span className="truncate">{team.hackathonName || 'Independent Team'}</span>
          </div>
        </div>

        {/* Member Progress */}
        <div className="mb-5 clay-card-inset p-3.5">
          <div className="flex justify-between text-xs font-bold mb-2" style={{ color: 'var(--clay-text-secondary)' }}>
            <span className="flex items-center gap-1.5"><FiUsers className="w-3.5 h-3.5" /> Team Size</span>
            <span>{team.currentMemberCount} / {team.maxMembers}</span>
          </div>
          <div className="clay-progress">
            <motion.div
              className="clay-progress-bar"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
              style={{
                background: completionPercentage === 100
                  ? 'linear-gradient(90deg, var(--clay-success), #16a34a)'
                  : 'linear-gradient(90deg, var(--clay-primary), var(--clay-secondary))',
              }}
            />
          </div>
        </div>

        {/* Roles & Skills */}
        <div className="space-y-3 mb-5 flex-1">
          {team.requiredRoles && team.requiredRoles.length > 0 && (
            <div>
              <p className="clay-label flex items-center gap-1.5 mb-2">
                <FiBriefcase className="w-3 h-3" /> Roles Needed
              </p>
              <div className="flex flex-wrap gap-1.5">
                {team.requiredRoles.slice(0, 4).map((role, i) => (
                  <span key={i} className="clay-chip text-xs">
                    {typeof role === 'string' ? role : role.roleName || role.name}
                  </span>
                ))}
                {team.requiredRoles.length > 4 && (
                  <span className="clay-chip text-xs">+{team.requiredRoles.length - 4}</span>
                )}
              </div>
            </div>
          )}

          {team.requiredSkills && team.requiredSkills.length > 0 && (
            <div>
              <p className="clay-label flex items-center gap-1.5 mb-2">
                <FiCpu className="w-3 h-3" /> Skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {team.requiredSkills.slice(0, 4).map((skill, i) => (
                  <span 
                    key={i} 
                    className="clay-chip text-xs"
                    style={{ color: 'var(--clay-primary)', background: 'var(--clay-primary-light)' }}
                  >
                    {typeof skill === 'string' ? skill : skill.name}
                  </span>
                ))}
                {team.requiredSkills.length > 4 && (
                  <span className="clay-chip text-xs" style={{ color: 'var(--clay-primary)', background: 'var(--clay-primary-light)' }}>
                    +{team.requiredSkills.length - 4}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 mt-auto flex items-center gap-2.5" style={{ borderTop: '1px solid var(--clay-border-light)' }}>
          <Link 
            to={`/teams/${team.id}`}
            className="flex-1 clay-button clay-button-secondary text-center text-sm"
          >
            View Details
          </Link>
          
          {isOpen ? (
            <Link
              to={`/teams/${team.id}`}
              className="flex-1 clay-button clay-button-primary text-sm"
            >
              Apply <FiArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <button 
              disabled 
              className="flex-1 clay-button text-sm cursor-not-allowed opacity-50"
              style={{ background: 'var(--clay-surface-3)', color: 'var(--clay-text-muted)' }}
            >
              <FiCheckCircle className="w-3.5 h-3.5" /> Filled
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
