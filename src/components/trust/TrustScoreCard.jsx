import { FiShield } from 'react-icons/fi';
import TrustScoreCircle from './TrustScoreCircle';

export default function TrustScoreCard({ score = 0 }) {
  let badge = 'Beginner';
  let badgeColor = 'bg-gray-100 text-gray-600 border-gray-200';

  if (score >= 90) {
    badge = 'Elite Contributor';
    badgeColor = 'bg-purple-100 text-purple-700 border-purple-200';
  } else if (score >= 75) {
    badge = 'Highly Trusted';
    badgeColor = 'bg-emerald-100 text-emerald-700 border-emerald-200';
  } else if (score >= 50) {
    badge = 'Trusted';
    badgeColor = 'bg-blue-100 text-blue-700 border-blue-200';
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm flex flex-col items-center justify-center h-full hover:shadow-md transition-all">
      <div className="flex items-center gap-2 mb-6 w-full justify-center">
        <FiShield className="w-5 h-5 text-gray-400" />
        <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider">Trust Score</h2>
      </div>
      
      <TrustScoreCircle score={score} size={140} strokeWidth={12} />
      
      <div className="mt-8 text-center">
        <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${badgeColor}`}>
          {badge}
        </span>
        <p className="text-gray-500 font-medium text-sm mt-4">
          Calculated based on peer reviews, project completions, and platform engagement.
        </p>
      </div>
    </div>
  );
}
