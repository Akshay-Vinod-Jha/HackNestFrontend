import { FiAward } from 'react-icons/fi';

export default function AchievementCard({ title, count, icon, colorClass, borderClass }) {
  const isLocked = count === 0;

  return (
    <div className={`relative rounded-3xl border-2 p-6 transition-all ${isLocked ? 'bg-gray-50 border-gray-100 opacity-70' : `bg-white ${borderClass} hover:shadow-lg hover:-translate-y-[1px]`}`}>
      {/* Decorative count badge */}
      {!isLocked && (
        <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white shadow-sm z-10 ${colorClass}`}>
          {count}
        </div>
      )}

      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${isLocked ? 'bg-gray-100 text-gray-400' : colorClass + ' text-white shadow-inner'}`}>
        {icon}
      </div>
      
      <h3 className={`text-lg font-extrabold mb-1 ${isLocked ? 'text-gray-400' : 'text-gray-900'}`}>
        {title}
      </h3>
      
      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
        {isLocked ? 'Locked' : `${count} Earned`}
      </p>
    </div>
  );
}
