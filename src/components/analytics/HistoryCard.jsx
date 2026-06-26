import { FiAward, FiCalendar, FiUser, FiUsers, FiBriefcase } from 'react-icons/fi';

export default function HistoryCard({ historyItem }) {
  // Graceful fallbacks for potentially missing fields
  const hackathonName = historyItem.hackathonName || 'Unknown Hackathon';
  const teamName = historyItem.teamName || 'Independent';
  const role = historyItem.role || 'Participant';
  const result = historyItem.result || 'Participated';
  const date = historyItem.participationDate || historyItem.createdAt;

  let resultColor = 'bg-gray-100 text-gray-700 border-gray-200';
  let ResultIcon = FiAward;

  if (result.toLowerCase().includes('winner') || result.toLowerCase().includes('1st')) {
    resultColor = 'bg-amber-100 text-amber-700 border-amber-200';
  } else if (result.toLowerCase().includes('finalist') || result.toLowerCase().includes('2nd') || result.toLowerCase().includes('3rd')) {
    resultColor = 'bg-blue-100 text-blue-700 border-blue-200';
  } else if (result.toLowerCase().includes('completed')) {
    resultColor = 'bg-emerald-100 text-emerald-700 border-emerald-200';
  }

  const formattedDate = date 
    ? new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) 
    : 'Unknown Date';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${resultColor}`}>
              <ResultIcon className="w-3 h-3" />
              {result}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
              <FiCalendar className="w-3.5 h-3.5" />
              {formattedDate}
            </span>
          </div>
          
          <h3 className="text-xl font-extrabold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
            {hackathonName}
          </h3>
          
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-600">
            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
              <FiUsers className="w-4 h-4 text-gray-400" />
              {teamName}
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
              <FiBriefcase className="w-4 h-4 text-gray-400" />
              {role}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
