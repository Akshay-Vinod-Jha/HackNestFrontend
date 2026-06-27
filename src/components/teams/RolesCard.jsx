import { FiBriefcase } from 'react-icons/fi';

export default function RolesCard({ roles }) {
  if (!roles || roles.length === 0) return null;

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 h-full">
      <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
        <FiBriefcase className="text-blue-500" /> Open Roles
      </h2>
      <div className="space-y-4">
        {roles.map((role, i) => {
          const roleObj = typeof role === 'string' ? { roleName: role, slots: 1 } : role;
          const name = roleObj.roleName || roleObj.name || 'Unknown Role';
          return (
            <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-900 text-lg">{name}</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-bold">
                  {roleObj.slots || 1} Slot(s)
                </span>
              </div>
              {roleObj.description && (
                <p className="text-sm font-medium text-gray-600 mt-2">{roleObj.description}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
