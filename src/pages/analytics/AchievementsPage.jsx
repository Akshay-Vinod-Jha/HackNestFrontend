import { useEffect } from 'react';
import { motion } from 'framer-motion';
import useAchievements from '../../hooks/useAchievements';
import AchievementGrid from '../../components/analytics/AchievementGrid';
import BadgeCard from '../../components/analytics/BadgeCard';
import CertificateCard from '../../components/analytics/CertificateCard';
import { FiAlertCircle, FiAward, FiStar, FiShield } from 'react-icons/fi';
import { fadeUp, staggerContainer, staggerItem, bounceIn } from '../../utils/animations';

export default function AchievementsPage() {
  const { trophyRoom, isLoading, error, fetchTrophyRoom } = useAchievements();

  useEffect(() => {
    fetchTrophyRoom().catch(() => {});
  }, [fetchTrophyRoom]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-screen animate-pulse">
        <div className="bg-gray-200 h-10 rounded-xl w-64 mb-10"></div>
        <div className="bg-gray-200 h-12 rounded-xl w-48 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="bg-white border border-gray-100 shadow-sm h-40 rounded-3xl"></div>)}
        </div>
      </div>
    );
  }

  if (error && !trophyRoom) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 min-h-screen">
        <div className="px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm max-w-lg" style={{ background: 'color-mix(in srgb, var(--clay-danger) 8%, transparent)', border: '1px solid color-mix(in srgb, var(--clay-danger) 20%, transparent)', color: 'var(--clay-danger)' }}>
           <FiAlertCircle className="w-5 h-5 shrink-0" />
           <span className="font-bold">{typeof error === 'string' ? error : 'Failed to load achievements.'}</span>
        </div>
      </div>
    );
  }

  const hasData = trophyRoom !== null;
  const milestones = trophyRoom?.milestones || {};
  const badges = trophyRoom?.badges || [];
  const certificates = trophyRoom?.certificates || [];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-screen space-y-16">
      
      <motion.div {...fadeUp}>
        <h1 className="clay-page-title mb-2">Trophy Room</h1>
        <p className="clay-page-subtitle max-w-2xl">
          A gamified showcase of all your milestone achievements, badges, and verified certificates.
        </p>
      </motion.div>

      {!hasData ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-3xl border border-dashed" style={{ background: 'var(--clay-surface-2)', borderColor: 'var(--clay-border)' }}>
          <div className="w-20 h-20 clay-card flex items-center justify-center mb-6">
            <FiAward className="w-8 h-8" style={{ color: '#f59e0b' }} />
          </div>
          <h3 className="text-2xl font-extrabold mb-2" style={{ color: 'var(--clay-text-primary)' }}>No Achievements Yet</h3>
          <p className="font-medium max-w-md" style={{ color: 'var(--clay-text-muted)' }}>
            Start competing in hackathons to unlock trophies, badges, and certificates!
          </p>
        </div>
      ) : (
        <>
          {/* Milestone Counters */}
          <section>
            <h2 className="clay-section-title mb-6 flex items-center gap-2">
               <FiAward style={{ color: '#f59e0b' }} /> Milestones
            </h2>
            <AchievementGrid analytics={milestones} />
          </section>

          {/* Gamified Badges */}
          <section>
             <h2 className="clay-section-title mb-6 flex items-center gap-2">
               <FiShield style={{ color: 'var(--clay-primary)' }} /> Skill Badges
            </h2>
            <div className="clay-card p-8">
              <motion.div
                className="flex flex-wrap gap-8 justify-center md:justify-start"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {badges.length > 0 ? (
                  badges.map((badge, idx) => (
                    <motion.div
                      key={idx}
                      variants={bounceIn}
                    >
                      <BadgeCard 
                        title={badge.title} 
                        icon={<FiStar className="w-10 h-10" />} 
                        isEarned={badge.isEarned} 
                        level={badge.level}
                        colorClass={badge.colorClass} 
                      />
                    </motion.div>
                  ))
                ) : (
                  <p className="italic" style={{ color: 'var(--clay-text-muted)' }}>No badges earned yet.</p>
                )}
              </motion.div>
            </div>
          </section>

          {/* Certificates */}
          <section>
            <h2 className="clay-section-title mb-6 flex items-center gap-2">
               <FiAward style={{ color: 'var(--clay-success)' }} /> Verified Certificates
            </h2>
            {certificates.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {certificates.map((cert, idx) => (
                  <motion.div key={idx} variants={staggerItem}>
                    <CertificateCard 
                      title={cert.title}
                      issuer={cert.issuer}
                      date={cert.date}
                      verifyUrl={cert.verifyUrl || '#'}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="clay-card p-8 italic" style={{ color: 'var(--clay-text-muted)' }}>
                No verified certificates yet.
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
