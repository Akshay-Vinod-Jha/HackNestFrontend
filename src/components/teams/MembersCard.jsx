import { FiUser, FiStar } from 'react-icons/fi';

export default function MembersCard({ members, leaderId }) {
  if (!members || members.length === 0) return null;

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 h-full">
      <h2 className="text-xl font-extrabold text-gray-900 mb-6">Team Members</h2>
      <div className="space-y-4">
        {members.map((member, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
              {member.id === leaderId ? (
                <FiStar className="w-6 h-6 text-blue-600" />
              ) : (
                <FiUser className="w-6 h-6 text-gray-600" />
              )}
            </div>
            <div>
              <p className="font-bold text-gray-900">{member.fullName || member.name || 'Member'}</p>
              <p className="text-sm font-medium text-gray-500">
                {member.id === leaderId ? 'Team Leader' : (member.role || 'Member')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
