import { Link } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiUsers, FiMonitor } from 'react-icons/fi';

export default function HackathonCard({ hackathon }) {
  const isOnline = hackathon?.mode === 'ONLINE';
  
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden hover:-translate-y-[1px]">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-5 gap-3">
          <div>
            <h3 className="text-xl font-extrabold text-gray-900 leading-tight mb-1.5 line-clamp-2">{hackathon?.title || 'Unnamed Hackathon'}</h3>
            <p className="text-sm font-bold text-gray-500">{hackathon?.organizer || 'Unknown Organizer'}</p>
          </div>
          <span className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg shrink-0 ${
            hackathon?.status === 'UPCOMING' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
            hackathon?.status === 'ONGOING' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
            'bg-gray-100 text-gray-600 border border-gray-200'
          }`}>
            {hackathon?.status || 'UNKNOWN'}
          </span>
        </div>
        
        <div className="space-y-3 mt-auto pt-2">
          <div className="flex items-center text-sm text-gray-600 font-medium">
            <FiMonitor className="w-4 h-4 mr-2.5 text-blue-500 shrink-0" />
            <span>{hackathon?.mode || 'TBD'}</span>
            {!isOnline && hackathon?.country && (
              <>
                <span className="mx-2 text-gray-300">•</span>
                <FiMapPin className="w-4 h-4 mr-2 text-rose-500 shrink-0" />
                <span className="truncate">{hackathon?.country}</span>
              </>
            )}
          </div>
          
          <div className="flex items-center text-sm text-gray-600 font-medium">
            <FiCalendar className="w-4 h-4 mr-2.5 text-indigo-500 shrink-0" />
            <span>Reg. Deadline: {hackathon?.registrationDeadline ? new Date(hackathon.registrationDeadline).toLocaleDateString() : 'N/A'}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 font-medium">
            <FiUsers className="w-4 h-4 mr-2.5 text-emerald-500 shrink-0" />
            <span>Team Size: {hackathon?.minTeamSize || 1} - {hackathon?.maxTeamSize || 4} members</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-50 bg-gray-50/50">
        <Link 
          to={`/hackathons/${hackathon?.id}`}
          className="flex items-center justify-center w-full py-2.5 px-4 text-sm font-bold text-blue-600 bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all active:scale-[0.98]"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
