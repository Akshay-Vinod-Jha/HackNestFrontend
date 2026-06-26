import { useEffect } from 'react';
import useAnalytics from '../../hooks/useAnalytics';
import AchievementGrid from '../../components/analytics/AchievementGrid';
import BadgeCard from '../../components/analytics/BadgeCard';
import CertificateCard from '../../components/analytics/CertificateCard';
import { FiAlertCircle, FiAward, FiStar, FiShield } from 'react-icons/fi';

export default function AchievementsPage() {
  const { analytics, isLoading, error, fetchProfileAnalytics } = useAnalytics();

  useEffect(() => {
    fetchProfileAnalytics().catch(() => {});
  }, [fetchProfileAnalytics]);

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

  if (error && !analytics) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 min-h-screen">
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm max-w-lg">
           <FiAlertCircle className="w-5 h-5 shrink-0" />
           <span className="font-bold">{typeof error === 'string' ? error : 'Failed to load achievements.'}</span>
        </div>
      </div>
    );
  }

  // Gracefully fallback empty state
  const hasData = analytics && Object.keys(analytics).length > 0;
  const certificates = analytics?.certificates || [
    { title: 'Global Hackathon 2025 Finalist', issuer: 'HackNest Official', date: 'DEC 2025' },
    { title: 'Best AI Integration Award', issuer: 'TechCorp Hackathon', date: 'OCT 2025' }
  ]; // Example fallback if backend doesn't supply array yet to demonstrate component

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
            <AchievementGrid analytics={analytics} />
          </section>

          {/* Gamified Badges */}
          <section>
             <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
               <FiShield className="text-indigo-500" /> Skill Badges
            </h2>
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <div className="flex flex-wrap gap-8 justify-center md:justify-start">
                <BadgeCard 
                  title="Frontend Master" 
                  icon={<FiStar className="w-10 h-10" />} 
                  isEarned={true} 
                  level={3}
                  colorClass="from-blue-500 to-indigo-600" 
                />
                <BadgeCard 
                  title="Backend Guru" 
                  icon={<FiStar className="w-10 h-10" />} 
                  isEarned={true} 
                  level={2}
                  colorClass="from-emerald-500 to-teal-600" 
                />
                <BadgeCard 
                  title="Design Wizard" 
                  icon={<FiStar className="w-10 h-10" />} 
                  isEarned={false} 
                  colorClass="from-purple-500 to-pink-600" 
                />
                <BadgeCard 
                  title="Top Presenter" 
                  icon={<FiStar className="w-10 h-10" />} 
                  isEarned={false} 
                  colorClass="from-amber-500 to-orange-600" 
                />
              </div>
            </div>
          </section>

          {/* Certificates */}
          <section>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
               <FiAward className="text-emerald-500" /> Verified Certificates
            </h2>
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
          </section>
        </>
      )}
    </div>
  );
}
