import { FiShield } from 'react-icons/fi';
import TrustScoreCircle from '../trust/TrustScoreCircle';

export default function TrustSummaryCard({ analytics }) {
  const score = analytics?.trustScore || 0;
  
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
    <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl border border-indigo-800 p-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8 h-full">
      <div className="flex-1 text-center md:text-left">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-white/10 rounded-full border border-white/20">
          <FiShield className="w-4 h-4 text-indigo-300" />
          <span className="text-xs font-bold text-indigo-100 uppercase tracking-wider">Platform Trust</span>
        </div>
        <h2 className="text-3xl font-black text-white mb-2">Trust & Reliability</h2>
        <p className="text-indigo-200 font-medium mb-6 max-w-md">
          Your trust score is calculated based on peer reviews, successful project completions, and overall engagement across the platform.
        </p>
        <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${badgeColor}`}>
          {badge}
        </span>
      </div>
      
      <div className="shrink-0 bg-white/5 p-6 rounded-[2rem] border border-white/10 backdrop-blur-sm">
        <TrustScoreCircle score={score} size={140} strokeWidth={12} />
      </div>
    </div>
  );
}
