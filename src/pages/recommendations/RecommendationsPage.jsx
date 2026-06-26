import { useEffect, useState } from 'react';
import useRecommendations from '../../hooks/useRecommendations';

import RecommendationSection from '../../components/recommendations/RecommendationSection';
import RecommendedTeammateCard from '../../components/recommendations/RecommendedTeammateCard';
import RecommendedTeamCard from '../../components/recommendations/RecommendedTeamCard';
import RecommendedHackathonCard from '../../components/recommendations/RecommendedHackathonCard';
import { FiUsers, FiBriefcase, FiAward } from 'react-icons/fi';

export default function RecommendationsPage() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [pageError, setPageError] = useState(null);

  const {
    recommendedTeammates,
    recommendedTeams,
    recommendedHackathons,
    getRecommendedTeammates,
    getRecommendedTeams,
    getRecommendedHackathons
  } = useRecommendations();

  useEffect(() => {
    let mounted = true;

    const fetchAll = async () => {
      setIsPageLoading(true);
      setPageError(null);
      try {
        await Promise.allSettled([
          getRecommendedTeammates(),
          getRecommendedTeams(),
          getRecommendedHackathons()
        ]);
      } catch (error) {
        if (mounted) setPageError('Failed to fetch some recommendations.');
      } finally {
        if (mounted) setIsPageLoading(false);
      }
    };

    fetchAll();

    return () => {
      mounted = false;
    };
  }, [getRecommendedTeammates, getRecommendedTeams, getRecommendedHackathons]);

  if (isPageLoading) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 min-h-screen animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-16"></div>
        {[1, 2, 3].map((section) => (
          <div key={section} className="mb-12">
            <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
            <div className="flex gap-6 overflow-hidden">
               <div className="w-[300px] h-64 bg-gray-100 rounded-3xl shrink-0"></div>
               <div className="w-[300px] h-64 bg-gray-100 rounded-3xl shrink-0 hidden md:block"></div>
               <div className="w-[300px] h-64 bg-gray-100 rounded-3xl shrink-0 hidden lg:block"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Your Recommendations</h1>
        <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
          We've analyzed your profile, skills, and goals to find the perfect matches for you.
        </p>
      </div>

      {pageError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-6 py-4 rounded-2xl mb-12 shadow-sm text-center font-bold">
           {pageError}
        </div>
      )}

      <RecommendationSection 
        title="Top Teammate Matches"
        description="Students who complement your skill set and share your interests."
        icon={FiUsers}
        items={recommendedTeammates}
        renderItem={(item) => <RecommendedTeammateCard recommendation={item} />}
      />

      <RecommendationSection 
        title="Suggested Teams"
        description="Teams looking for members with your exact expertise."
        icon={FiBriefcase}
        items={recommendedTeams}
        renderItem={(item) => <RecommendedTeamCard recommendation={item} />}
      />

      <RecommendationSection 
        title="Upcoming Hackathons"
        description="Events that align perfectly with your technical domain."
        icon={FiAward}
        items={recommendedHackathons}
        renderItem={(item) => <RecommendedHackathonCard recommendation={item} />}
      />
    </div>
  );
}
