import { FiUser, FiMapPin, FiBook, FiAward, FiCpu } from 'react-icons/fi';

export default function UserCard({ user }) {
  if (!user) return null;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center flex-shrink-0 border-2 border-white shadow-sm overflow-hidden">
          {user.profilePicture ? (
            <img src={user.profilePicture} alt={user.fullName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-black text-indigo-500">
              {user.fullName?.charAt(0)?.toUpperCase() || 'S'}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-extrabold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
            {user.fullName || 'Unknown Student'}
          </h3>
          <p className="text-sm font-medium text-gray-500 truncate">{user.headline || 'Student'}</p>
          {user.trustScore && (
             <div className="mt-1 flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg w-fit">
               <FiAward className="w-3 h-3" /> Score: {user.trustScore}
             </div>
          )}
        </div>
      </div>

      <div className="space-y-3 flex-1">
        {user.college && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiBook className="w-4 h-4 text-gray-400" />
            <span className="truncate">{user.college}</span>
          </div>
        )}
        {user.location && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiMapPin className="w-4 h-4 text-gray-400" />
            <span className="truncate">{user.location}</span>
          </div>
        )}
      </div>

      {(user.skills && user.skills.length > 0) && (
        <div className="mt-4 pt-4 border-t border-gray-50">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
             <FiCpu className="w-3 h-3" /> Top Skills
          </p>
          <div className="flex flex-wrap gap-1.5">
            {user.skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-gray-50 border border-gray-100 text-gray-600 rounded-md text-xs font-bold">
                {typeof skill === 'string' ? skill : skill.name}
              </span>
            ))}
            {user.skills.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 border border-gray-100 text-gray-400 rounded-md text-xs font-bold">
                +{user.skills.length - 3}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
