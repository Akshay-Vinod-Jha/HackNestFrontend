import { FiShield } from 'react-icons/fi';

export default function TrustScoreBadge({ score }) {
  if (score === undefined || score === null) return null;

  let colorClass = 'bg-gray-100 text-gray-700 border-gray-200';
  let iconClass = 'text-gray-500';
  
  if (score >= 90) {
    colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    iconClass = 'text-emerald-500';
  } else if (score >= 70) {
    colorClass = 'bg-blue-50 text-blue-700 border-blue-200';
    iconClass = 'text-blue-500';
  } else if (score >= 50) {
    colorClass = 'bg-amber-50 text-amber-700 border-amber-200';
    iconClass = 'text-amber-500';
  } else {
    colorClass = 'bg-rose-50 text-rose-700 border-rose-200';
    iconClass = 'text-rose-500';
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border shadow-sm ${colorClass}`} title="Platform Trust Score">
      <FiShield className={`w-3.5 h-3.5 ${iconClass}`} />
      <span className="text-xs font-black tracking-wide">TS {score}</span>
    </div>
  );
}
