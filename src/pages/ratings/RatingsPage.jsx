import { useEffect } from 'react';
import useRatings from '../../hooks/useRatings';
import useAuthStore from '../../store/authStore';

import RatingsOverviewCard from '../../components/ratings/RatingsOverviewCard';
import SkillRatingCard from '../../components/ratings/SkillRatingCard';
import FeedbackCard from '../../components/ratings/FeedbackCard';
import { FiAlertCircle, FiStar } from 'react-icons/fi';

export default function RatingsPage() {
  const { user } = useAuthStore();
  const { selectedUserRatings, isLoading, error, fetchUserRatings } = useRatings();

  useEffect(() => {
    if (user?.id) {
      fetchUserRatings(user.id).catch(() => {});
    }
  }, [user?.id, fetchUserRatings]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-screen animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-16"></div>
        <div className="h-40 bg-gray-200 rounded-3xl w-full mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-100 rounded-3xl"></div>)}
        </div>
      </div>
    );
  }

  // Calculate skill averages manually if backend returns raw rating arrays
  // For example: skillRatings: { react: 4, java: 5 }
  const skillAverages = {};
  let totalSkillRatingsCount = {};
  
  if (selectedUserRatings && selectedUserRatings.length > 0) {
    selectedUserRatings.forEach(rating => {
      const skills = rating.skillRatings || {};
      Object.entries(skills).forEach(([skill, score]) => {
        if (!skillAverages[skill]) {
          skillAverages[skill] = 0;
          totalSkillRatingsCount[skill] = 0;
        }
        skillAverages[skill] += score;
        totalSkillRatingsCount[skill] += 1;
      });
    });

    Object.keys(skillAverages).forEach(skill => {
      skillAverages[skill] = skillAverages[skill] / totalSkillRatingsCount[skill];
    });
  }

  const hasRatings = selectedUserRatings && selectedUserRatings.length > 0;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Your Ratings Dashboard</h1>
        <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
          See how your teammates evaluate your skills, reliability, and contributions across projects.
        </p>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-6 py-4 rounded-2xl mb-8 flex items-center gap-3 shadow-sm">
           <FiAlertCircle className="w-5 h-5 shrink-0" />
           <span className="font-bold">{typeof error === 'string' ? error : 'Failed to fetch ratings.'}</span>
        </div>
      )}

      {!hasRatings && !isLoading && !error && (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50 rounded-3xl border border-gray-100 border-dashed">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-sm">
            <FiStar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900 mb-2">No Ratings Yet</h3>
          <p className="text-gray-500 font-medium max-w-md">
            You don't have any ratings yet. Join a team and participate in a hackathon to start collecting feedback!
          </p>
        </div>
      )}

      {hasRatings && (
        <div className="space-y-12">
          {/* Overview */}
          <section>
            <h2 className="text-xl font-extrabold text-gray-900 mb-6">Overview</h2>
            <RatingsOverviewCard ratingsData={selectedUserRatings} />
          </section>

          {/* Detailed Skills */}
          {Object.keys(skillAverages).length > 0 && (
            <section>
              <h2 className="text-xl font-extrabold text-gray-900 mb-6">Skill Breakdown</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(skillAverages).map(([skill, avg]) => (
                  <SkillRatingCard 
                    key={skill} 
                    skillName={skill.charAt(0).toUpperCase() + skill.slice(1)} 
                    averageScore={avg} 
                    totalRatings={totalSkillRatingsCount[skill]} 
                  />
                ))}
              </div>
            </section>
          )}

          {/* Recent Feedback Comments */}
          <section>
            <h2 className="text-xl font-extrabold text-gray-900 mb-6">Recent Feedback</h2>
            <div className="space-y-4">
              {selectedUserRatings
                .filter(r => r.comment && r.comment.trim() !== '')
                .slice(0, 10) // Show top 10
                .map((rating, i) => (
                <FeedbackCard key={rating.id || i} rating={rating} />
              ))}
              {selectedUserRatings.filter(r => r.comment).length === 0 && (
                <p className="text-gray-500 font-medium italic">No written feedback provided yet.</p>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
