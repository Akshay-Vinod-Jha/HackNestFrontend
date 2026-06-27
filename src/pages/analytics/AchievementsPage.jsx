import { useEffect } from 'react';
import useAchievements from '../../hooks/useAchievements';
import AchievementGrid from '../../components/analytics/AchievementGrid';
import BadgeCard from '../../components/analytics/BadgeCard';
import CertificateCard from '../../components/analytics/CertificateCard';
import { FiAlertCircle, FiAward, FiStar, FiShield } from 'react-icons/fi';

export default function AchievementsPage() {
  const { trophyRoom, isLoading, error, fetchTrophyRoom } = useAchievements();

  useEffect(() => {
    fetchTrophyRoom().catch(() => {});
  }, [fetchTrophyRoom]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-screen animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-64 mb-10"></div>
        <div className="h-12 bg-gray-200 rounded-xl w-48 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-40 bg-gray-100 rounded-3xl"></div>)}
        </div>
      </div>
    );
  }

  if (error && !trophyRoom) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 min-h-screen">
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm max-w-lg">
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
      
      <div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Trophy Room</h1>
        <p className="text-lg text-gray-500 font-medium max-w-2xl">
          A gamified showcase of all your milestone achievements, badges, and verified certificates.
        </p>
      </div>

      {!hasData ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50 rounded-3xl border border-gray-100 border-dashed">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-sm">
            <FiAward className="w-8 h-8 text-amber-400" />
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900 mb-2">No Achievements Yet</h3>
          <p className="text-gray-500 font-medium max-w-md">
            Start competing in hackathons to unlock trophies, badges, and certificates!
          </p>
        </div>
      ) : (
        <>
          {/* Milestone Counters */}
          <section>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
               <FiAward className="text-amber-500" /> Milestones
            </h2>
            <AchievementGrid analytics={milestones} />
          </section>

          {/* Gamified Badges */}
          <section>
             <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
               <FiShield className="text-indigo-500" /> Skill Badges
            </h2>
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <div className="flex flex-wrap gap-8 justify-center md:justify-start">
                {badges.length > 0 ? (
                  badges.map((badge, idx) => (
                    <BadgeCard 
                      key={idx}
                      title={badge.title} 
                      icon={<FiStar className="w-10 h-10" />} 
                      isEarned={badge.isEarned} 
                      level={badge.level}
                      colorClass={badge.colorClass} 
                    />
                  ))
                ) : (
                  <p className="text-gray-500 italic">No badges earned yet.</p>
                )}
              </div>
            </div>
          </section>

          {/* Certificates */}
          <section>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
               <FiAward className="text-emerald-500" /> Verified Certificates
            </h2>
            {certificates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert, idx) => (
                  <CertificateCard 
                    key={idx}
                    title={cert.title}
                    issuer={cert.issuer}
                    date={cert.date}
                    verifyUrl={cert.verifyUrl || '#'}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm text-gray-500 italic">
                No verified certificates yet.
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
