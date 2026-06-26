import { FiTarget } from 'react-icons/fi';

export default function ProfileCompletionBadge({ completionPercentage }) {
  if (completionPercentage === undefined || completionPercentage === null) return null;

  let colorClass = 'bg-gray-100 text-gray-700';
  let barColor = 'bg-gray-300';
  
  if (completionPercentage >= 90) {
    colorClass = 'bg-emerald-50 text-emerald-700';
    barColor = 'bg-emerald-500';
  } else if (completionPercentage >= 70) {
    colorClass = 'bg-blue-50 text-blue-700';
    barColor = 'bg-blue-500';
  } else if (completionPercentage >= 40) {
    colorClass = 'bg-amber-50 text-amber-700';
    barColor = 'bg-amber-500';
  } else {
    colorClass = 'bg-rose-50 text-rose-700';
    barColor = 'bg-rose-500';
  }

  return (
    <div className={`flex flex-col gap-1.5 p-2 rounded-xl border border-gray-100 shadow-sm ${colorClass}`}>
      <div className="flex items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-1.5">
          <FiTarget className="w-3.5 h-3.5" />
          <span className="text-[10px] font-black uppercase tracking-wider">Profile</span>
        </div>
        <span className="text-xs font-bold">{completionPercentage}%</span>
      </div>
      <div className="w-full bg-white/50 rounded-full h-1.5 overflow-hidden border border-black/5">
        <div 
          className={`h-full rounded-full ${barColor} transition-all duration-1000 ease-out`}
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}
