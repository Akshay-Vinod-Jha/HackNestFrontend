import { FiShield } from 'react-icons/fi';

export default function BadgeCard({ title, icon, isEarned, level, colorClass }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 group">
      <div className={`relative w-24 h-24 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${isEarned ? 'bg-gradient-to-br shadow-xl group-hover:scale-110 ' + colorClass : 'bg-gray-100 grayscale opacity-50'}`}>
        {/* Hexagon shape overlay simulation or ring */}
        <div className={`absolute inset-2 rounded-full border-4 ${isEarned ? 'border-white/30' : 'border-gray-200'} border-dashed`}></div>
        <div className="relative z-10 text-white w-10 h-10">
          {icon}
        </div>
        {isEarned && level && (
          <div className="absolute -bottom-2 w-full text-center flex justify-center">
             <span className="bg-gray-900 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border-2 border-white shadow-sm">
               Level {level}
             </span>
          </div>
        )}
      </div>
      <h3 className={`font-extrabold text-sm text-center ${isEarned ? 'text-gray-900' : 'text-gray-400'}`}>
        {title}
      </h3>
    </div>
  );
}
