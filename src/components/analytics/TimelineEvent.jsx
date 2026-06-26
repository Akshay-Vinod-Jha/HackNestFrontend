import { 
  FiUserPlus as FiUserPlusFi, 
  FiEdit3 as FiEdit3Fi, 
  FiUsers as FiUsersFi, 
  FiAward as FiAwardFi, 
  FiStar as FiStarFi, 
  FiUserCheck as FiUserCheckFi, 
  FiActivity 
} from 'react-icons/fi';

export default function TimelineEvent({ event }) {
  const type = (event.type || '').toUpperCase();
  const date = event.createdAt || event.timestamp;
  const description = event.description || 'Performed an action.';

  let Icon = FiActivity;
  let iconColor = 'text-gray-500';
  let iconBg = 'bg-gray-100 border-gray-200';
  let title = 'Activity';

  if (type.includes('JOINED_PLATFORM')) {
    Icon = FiUserPlusFi;
    iconColor = 'text-blue-500';
    iconBg = 'bg-blue-50 border-blue-100';
    title = 'Joined HackNest';
  } else if (type.includes('CREATED_PROFILE')) {
    Icon = FiEdit3Fi;
    iconColor = 'text-purple-500';
    iconBg = 'bg-purple-50 border-purple-100';
    title = 'Completed Profile';
  } else if (type.includes('JOINED_TEAM')) {
    Icon = FiUsersFi;
    iconColor = 'text-indigo-500';
    iconBg = 'bg-indigo-50 border-indigo-100';
    title = 'Joined a Team';
  } else if (type.includes('PARTICIPATED')) {
    Icon = FiAwardFi;
    iconColor = 'text-emerald-500';
    iconBg = 'bg-emerald-50 border-emerald-100';
    title = 'Participated in Hackathon';
  } else if (type.includes('ACHIEVEMENT')) {
    Icon = FiStarFi;
    iconColor = 'text-amber-500';
    iconBg = 'bg-amber-50 border-amber-100';
    title = 'Won Achievement';
  } else if (type.includes('LEADER')) {
    Icon = FiUserCheckFi;
    iconColor = 'text-rose-500';
    iconBg = 'bg-rose-50 border-rose-100';
    title = 'Became Team Leader';
  }

  const formattedDate = date 
    ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Recently';

  return (
    <div className="relative flex gap-4 md:gap-6 group">
      {/* Timeline Line Generator (Hidden on Mobile) */}
      <div className="absolute left-6 top-14 bottom-[-24px] w-0.5 bg-gray-100 group-last:hidden hidden md:block"></div>
      
      {/* Icon Node */}
      <div className={`relative z-10 w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center border-2 ${iconBg} shadow-sm hidden md:flex transition-transform group-hover:scale-110`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>

      {/* Content Card */}
      <div className="flex-1 bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
        {/* Mobile Header */}
        <div className="flex md:hidden items-center gap-3 mb-4">
           <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center border ${iconBg}`}>
             <Icon className={`w-4 h-4 ${iconColor}`} />
           </div>
           <div>
             <h3 className="font-extrabold text-gray-900 text-sm">{title}</h3>
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{formattedDate}</span>
           </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex justify-between items-start mb-2">
           <h3 className="text-lg font-extrabold text-gray-900">{title}</h3>
           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50 px-2 py-1 rounded-md">{formattedDate}</span>
        </div>

        <p className="text-sm font-medium text-gray-600 leading-relaxed">
          {description}
        </p>

        {/* Optional Context Tags */}
        {event.metadata && (
          <div className="mt-4 pt-4 border-t border-gray-50 flex flex-wrap gap-2">
            {Object.entries(event.metadata).slice(0,3).map(([key, value], i) => (
              <span key={i} className="inline-flex items-center px-2 py-1 bg-gray-50 text-gray-500 rounded-md text-[10px] font-bold border border-gray-100">
                <span className="uppercase text-gray-400 mr-1">{key}:</span> {value}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
