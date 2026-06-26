import { useEffect, useState } from 'react';
import useDashboard from '../../hooks/useDashboard';
import { Link } from 'react-router-dom';

import RecommendedTeamCard from '../cards/RecommendedTeamCard';
import RecommendedTeammateCard from '../cards/RecommendedTeammateCard';

function RecommendationSection({ title, data, isLoading, CardComponent, viewMoreLink, emptyMessage }) {
  if (isLoading && !data) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm">
        <h2 className="text-xl font-extrabold text-gray-900 mb-6">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
           {[1,2,3].map(i => <div key={i} className="h-64 bg-gray-100 rounded-2xl w-full"></div>)}
        </div>
      </div>
    );
  }

  const items = Array.isArray(data) ? data : [];
  const displayItems = items.slice(0, 3);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-extrabold text-gray-900">{title}</h2>
        {items.length > 3 && (
          <Link to={viewMoreLink} className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg">
            View All
          </Link>
        )}
      </div>
      
      {displayItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayItems.map((item, index) => (
            <div key={index} className="h-full">
               <CardComponent data={item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-6 bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
           <svg className="w-10 h-10 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
           <p className="text-gray-500 font-bold">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
}

export default function RecommendationsContainer() {
  const { 
    recommendedTeams, recommendedTeammates, isLoading,
    fetchRecommendedTeams, fetchRecommendedTeammates
  } = useDashboard();
  
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!hasFetched) {
      setHasFetched(true);
      fetchRecommendedTeams().catch(() => {});
      fetchRecommendedTeammates().catch(() => {});
    }
  }, [fetchRecommendedTeams, fetchRecommendedTeammates, hasFetched]);

  return (
    <div className="space-y-6 md:space-y-8">
      <RecommendationSection 
        title="Top Team Matches"
        data={recommendedTeams}
        isLoading={isLoading}
        CardComponent={RecommendedTeamCard}
        viewMoreLink="/recommendations"
        emptyMessage="No team recommendations right now. Try updating your profile skills."
      />
      
      <RecommendationSection 
        title="Suggested Teammates"
        data={recommendedTeammates}
        isLoading={isLoading}
        CardComponent={RecommendedTeammateCard}
        viewMoreLink="/recommendations"
        emptyMessage="No teammates found. Join more hackathons to expand your network."
      />
    </div>
  );
}
