import { FiStar, FiActivity, FiUserCheck } from 'react-icons/fi';

export default function RatingsOverviewCard({ ratingsData }) {
  if (!ratingsData) return null;

  // Derive average from all ratings if backend didn't provide a flat overview
  const totalRatings = ratingsData.length || 0;
  
  let overallAvg = 0;
  let reliabilityAvg = 0;
  let contributionAvg = 0;

  if (totalRatings > 0) {
    const sumOverall = ratingsData.reduce((acc, r) => {
      // average of skill ratings per rating payload
      const skills = Object.values(r.skillRatings || {});
      const skillAvg = skills.length ? skills.reduce((a, b) => a + b, 0) / skills.length : 0;
      return acc + skillAvg;
    }, 0);
    
    overallAvg = sumOverall / totalRatings;
    reliabilityAvg = ratingsData.reduce((acc, r) => acc + (r.reliability || 0), 0) / totalRatings;
    contributionAvg = ratingsData.reduce((acc, r) => acc + (r.contribution || 0), 0) / totalRatings;
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col md:flex-row gap-6 items-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
      <div className="flex-1 text-center w-full py-4 md:py-0">
        <div className="w-16 h-16 mx-auto bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mb-4">
          <FiStar className="w-8 h-8 fill-current" />
        </div>
        <p className="text-3xl font-black text-gray-900 mb-1">{overallAvg.toFixed(1)}</p>
        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Overall Rating</p>
      </div>
      
      <div className="flex-1 text-center w-full py-4 md:py-0">
        <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-4">
          <FiActivity className="w-8 h-8" />
        </div>
        <p className="text-3xl font-black text-gray-900 mb-1">{reliabilityAvg.toFixed(1)}</p>
        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Reliability</p>
      </div>

      <div className="flex-1 text-center w-full py-4 md:py-0">
        <div className="w-16 h-16 mx-auto bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mb-4">
          <FiUserCheck className="w-8 h-8" />
        </div>
        <p className="text-3xl font-black text-gray-900 mb-1">{contributionAvg.toFixed(1)}</p>
        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Contribution</p>
      </div>
      
      <div className="flex-1 text-center w-full py-4 md:py-0">
        <div className="w-16 h-16 mx-auto bg-gray-50 text-gray-500 rounded-2xl flex items-center justify-center mb-4">
           <span className="text-2xl font-black">{totalRatings}</span>
        </div>
        <p className="text-3xl font-black text-gray-900 mb-1">{totalRatings}</p>
        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Ratings</p>
      </div>
    </div>
  );
}
