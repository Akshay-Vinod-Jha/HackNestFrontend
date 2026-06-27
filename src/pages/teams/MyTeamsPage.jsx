import { useEffect, useState } from 'react';
import { FiBriefcase, FiUsers, FiPlus, FiChevronRight, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../../store/authStore';
import useTeams from '../../hooks/useTeams';
import TeamApplicationsCard from '../../components/teams/TeamApplicationsCard';
import { fadeUp, staggerContainer, staggerItem, buttonHover } from '../../utils/animations';

export default function MyTeamsPage() {
  const user = useAuthStore(state => state.user);
  const { myTeams, fetchUserTeams, isLoading } = useTeams();
  const [activeTab, setActiveTab] = useState('created'); // 'created' or 'joined'
  const [expandedTeamId, setExpandedTeamId] = useState(null);

  useEffect(() => {
    if (user?.id) {
      fetchUserTeams(user.id);
    }
  }, [user?.id, fetchUserTeams]);

  const createdTeams = myTeams?.filter(t => t.leaderId === user?.id) || [];
  const joinedTeams = myTeams?.filter(t => t.leaderId !== user?.id) || [];

  const handleExpand = (teamId) => {
    setExpandedTeamId(expandedTeamId === teamId ? null : teamId);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="clay-page-title mb-3">
            My Teams
          </h1>
          <p className="clay-page-subtitle max-w-2xl">
            Manage your own teams and view teams you are a member of.
          </p>
        </div>
        <motion.div {...buttonHover}>
          <Link 
            to="/teams/create"
            className="clay-button clay-button-primary inline-flex items-center justify-center px-6 py-3.5 gap-2"
          >
            <FiPlus className="w-5 h-5" />
            Create New Team
          </Link>
        </motion.div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        {...fadeUp}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex gap-2 p-1.5 rounded-2xl w-full md:w-auto"
        style={{ background: 'var(--clay-surface-2)', border: '1px solid var(--clay-border-light)' }}
      >
        <button
          onClick={() => { setActiveTab('created'); setExpandedTeamId(null); }}
          className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2`}
          style={activeTab === 'created' ? {
            background: 'var(--clay-surface)',
            color: 'var(--clay-primary)',
            boxShadow: 'var(--clay-shadow-sm)',
            border: '1px solid var(--clay-border-light)',
          } : {
            color: 'var(--clay-text-muted)',
          }}
        >
          <FiBriefcase className="w-4 h-4" />
          Created by Me ({createdTeams.length})
        </button>
        <button
          onClick={() => { setActiveTab('joined'); setExpandedTeamId(null); }}
          className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2`}
          style={activeTab === 'joined' ? {
            background: 'var(--clay-surface)',
            color: 'var(--clay-primary)',
            boxShadow: 'var(--clay-shadow-sm)',
            border: '1px solid var(--clay-border-light)',
          } : {
            color: 'var(--clay-text-muted)',
          }}
        >
          <FiUsers className="w-4 h-4" />
          Joined Teams ({joinedTeams.length})
        </button>
      </motion.div>

      {/* Content */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="clay-skeleton h-48 rounded-[2rem]" style={{ background: 'var(--clay-surface-2)' }}></div>
          ))}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {activeTab === 'created' ? (
            <motion.div
              key="created"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {createdTeams.length === 0 ? (
                <div className="clay-card text-center py-20">
                  <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{ background: 'var(--clay-primary-light)' }}>
                    <FiBriefcase className="w-10 h-10" style={{ color: 'var(--clay-primary)' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--clay-text-primary)' }}>No Teams Created</h3>
                  <p className="max-w-md mx-auto mb-6" style={{ color: 'var(--clay-text-muted)' }}>You haven't created any teams yet. Create a team to start building your project!</p>
                  <Link 
                    to="/teams/create"
                    className="clay-button clay-button-secondary inline-flex items-center justify-center px-6 py-3"
                  >
                    Create Team
                  </Link>
                </div>
              ) : (
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  className="space-y-6"
                >
                  {createdTeams.map(team => (
                    <motion.div key={team.id} variants={staggerItem} className="clay-card overflow-hidden group">
                      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center justify-between cursor-pointer hover:opacity-90 transition-opacity" onClick={() => handleExpand(team.id)}>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-extrabold transition-colors" style={{ color: 'var(--clay-text-primary)' }}>{team.name}</h3>
                            <span
                              className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg border"
                              style={
                                team.status === 'RECRUITING'
                                  ? { background: 'color-mix(in srgb, var(--clay-success) 10%, transparent)', color: 'var(--clay-success)', borderColor: 'color-mix(in srgb, var(--clay-success) 25%, transparent)' }
                                  : team.status === 'FULL'
                                  ? { background: 'color-mix(in srgb, var(--clay-warning) 10%, transparent)', color: 'var(--clay-warning)', borderColor: 'color-mix(in srgb, var(--clay-warning) 25%, transparent)' }
                                  : { background: 'var(--clay-surface-2)', color: 'var(--clay-text-muted)', borderColor: 'var(--clay-border)' }
                              }
                            >
                              {team.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm font-medium mt-3" style={{ color: 'var(--clay-text-muted)' }}>
                            <span className="flex items-center gap-1.5"><FiUsers className="w-4 h-4" style={{ color: 'var(--clay-text-muted)' }} /> Members: {team.currentMemberCount} / {team.maxMembers}</span>
                            <span className="flex items-center gap-1.5"><FiCheckCircle className="w-4 h-4" style={{ color: 'var(--clay-success)' }} /> Completion: {team.teamCompletionPercentage || 0}%</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 shrink-0 mt-4 md:mt-0">
                          <Link
                            to={`/teams/${team.id}`}
                            className="clay-button clay-button-secondary px-4 py-2 text-sm"
                            onClick={e => e.stopPropagation()}
                          >
                            View Team
                          </Link>
                          <button className="clay-icon-button">
                            <FiChevronRight className={`w-5 h-5 transition-transform duration-300 ${expandedTeamId === team.id ? 'rotate-90' : ''}`} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Expanded Applications Section */}
                      <div
                        className={`transition-all duration-300 overflow-hidden ${expandedTeamId === team.id ? 'max-h-[2000px] p-6 md:p-8' : 'max-h-0'}`}
                        style={{ borderTop: expandedTeamId === team.id ? `1px solid var(--clay-border-light)` : 'none', background: 'var(--clay-surface-2)' }}
                      >
                        {expandedTeamId === team.id && (
                          <TeamApplicationsCard team={team} />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="joined"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {joinedTeams.length === 0 ? (
                <div className="col-span-full clay-card text-center py-20">
                  <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{ background: 'var(--clay-primary-light)' }}>
                    <FiUsers className="w-10 h-10" style={{ color: 'var(--clay-primary)' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--clay-text-primary)' }}>No Teams Joined</h3>
                  <p className="max-w-md mx-auto mb-6" style={{ color: 'var(--clay-text-muted)' }}>You haven't joined any teams yet. Explore hackathons and apply to join a team!</p>
                  <Link 
                    to="/teams"
                    className="clay-button clay-button-secondary inline-flex items-center justify-center px-6 py-3"
                  >
                    Find Teams
                  </Link>
                </div>
              ) : (
                joinedTeams.map((team, idx) => (
                  <motion.div
                    key={team.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.07 }}
                  >
                    <Link to={`/teams/${team.id}`} className="block h-full">
                      <div className="clay-card p-6 hover:shadow-md transition-shadow group flex flex-col h-full">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--clay-primary-light)' }}>
                             <FiUsers className="w-6 h-6" style={{ color: 'var(--clay-primary)' }} />
                          </div>
                          <span className="clay-badge">Member</span>
                        </div>
                        <h3 className="text-xl font-extrabold mb-2 line-clamp-1" style={{ color: 'var(--clay-text-primary)' }}>{team.name}</h3>
                        <div className="mt-auto pt-4 flex items-center justify-between text-sm" style={{ borderTop: '1px solid var(--clay-border-light)' }}>
                          <span className="font-medium flex items-center gap-1.5" style={{ color: 'var(--clay-text-muted)' }}><FiUsers className="w-4 h-4"/> {team.currentMemberCount}/{team.maxMembers}</span>
                          <span className="font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform" style={{ color: 'var(--clay-primary)' }}>
                            View <FiChevronRight />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
