import { FiCalendar, FiMapPin, FiAward, FiMonitor, FiBriefcase } from 'react-icons/fi';

export default function HackathonHeaderCard({ hackathon }) {
  if (!hackathon) return null;

  const isOnline = hackathon.mode === 'ONLINE';

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
      <div className="px-6 sm:px-10 pb-10 relative">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8 -mt-12">
          <div className="w-24 h-24 bg-white rounded-2xl shadow-sm border-4 border-white flex items-center justify-center shrink-0">
             <div className="w-full h-full bg-blue-50 rounded-xl flex items-center justify-center">
                <span className="text-3xl font-black text-blue-600">{hackathon.title?.charAt(0) || 'H'}</span>
             </div>
          </div>
          
          <div className="flex gap-3">
             <span className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl ${
                hackathon.status === 'UPCOMING' ? 'bg-emerald-50 text-emerald-700' :
                hackathon.status === 'ONGOING' ? 'bg-blue-50 text-blue-700' :
                'bg-gray-100 text-gray-600'
              }`}>
                {hackathon.status || 'UNKNOWN'}
             </span>
             <span className="px-4 py-2 text-xs font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 rounded-xl">
                {hackathon.mode || 'TBD'}
             </span>
          </div>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">{hackathon.title}</h1>
          <div className="flex items-center gap-2 text-gray-500 font-bold mb-8">
            <FiBriefcase className="w-4 h-4" />
            <p>Organized by <span className="text-gray-900">{hackathon.organizer}</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 text-blue-600">
              <FiCalendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Registration Deadline</p>
              <p className="font-bold text-gray-900">{hackathon.registrationDeadline ? new Date(hackathon.registrationDeadline).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-600">
              <FiAward className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Prize Pool</p>
              <p className="font-bold text-gray-900">{hackathon.prizePool || 'Unspecified'}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0 text-rose-600">
              <FiMapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Location</p>
              <p className="font-bold text-gray-900">
                {isOnline ? 'Online Event' : (
                  [hackathon.city, hackathon.country].filter(Boolean).join(', ') || 'TBD'
                )}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 text-amber-600">
              <FiMonitor className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Team Size</p>
              <p className="font-bold text-gray-900">{hackathon.minTeamSize || 1} - {hackathon.maxTeamSize || 4} Members</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
