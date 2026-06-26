import { useEffect } from 'react';
import useRatings from '../../hooks/useRatings';
import useAuthStore from '../../store/authStore';

import RatingsOverviewCard from '../../components/ratings/RatingsOverviewCard';
import SkillRatingCard from '../../components/ratings/SkillRatingCard';
import FeedbackCard from '../../components/ratings/FeedbackCard';
import TrustScoreCard from '../../components/trust/TrustScoreCard';
import ReliabilityCard from '../../components/trust/ReliabilityCard';
import ContributionCard from '../../components/trust/ContributionCard';
import SkillRadarCard from '../../components/trust/SkillRadarCard';
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

  const skillAverages = {};
  let totalSkillRatingsCount = {};
  let overallAvg = 0;
  let reliabilityAvg = 0;
  let contributionAvg = 0;
  let trustScore = 0;
  
  if (selectedUserRatings && selectedUserRatings.length > 0) {
    let sumOverall = 0;
    
    selectedUserRatings.forEach(rating => {
      const skills = rating.skillRatings || {};
      let skillSum = 0;
      let skillCount = 0;
      
      Object.entries(skills).forEach(([skill, score]) => {
        if (!skillAverages[skill]) {
          skillAverages[skill] = 0;
          totalSkillRatingsCount[skill] = 0;
        }
        skillAverages[skill] += score;
        totalSkillRatingsCount[skill] += 1;
        skillSum += score;
        skillCount += 1;
      });
      
      sumOverall += skillCount > 0 ? (skillSum / skillCount) : 0;
    });

    Object.keys(skillAverages).forEach(skill => {
      skillAverages[skill] = skillAverages[skill] / totalSkillRatingsCount[skill];
    });
    
    const total = selectedUserRatings.length;
    overallAvg = sumOverall / total;
    reliabilityAvg = selectedUserRatings.reduce((acc, r) => acc + (r.reliability || 0), 0) / total;
    contributionAvg = selectedUserRatings.reduce((acc, r) => acc + (r.contribution || 0), 0) / total;
    
    // Simulate a complex trust score out of 100 based on the 1-5 scale variables
    trustScore = Math.min(100, Math.round(((overallAvg + reliabilityAvg + contributionAvg) / 15) * 100));
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
          {/* Trust Analytics Level */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-extrabold text-gray-900">Trust Analytics</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4 lg:col-span-3">
                <TrustScoreCard score={trustScore} />
              </div>
              <div className="md:col-span-4 lg:col-span-5 grid grid-rows-2 gap-6">
                <ReliabilityCard score={reliabilityAvg} />
                <ContributionCard score={contributionAvg} />
              </div>
              <div className="md:col-span-4 lg:col-span-4">
                <SkillRadarCard skills={skillAverages} />
              </div>
            </div>
          </section>

          {/* Standard Overview */}
          <section>
            <h2 className="text-xl font-extrabold text-gray-900 mb-6">Summary Metrics</h2>
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
