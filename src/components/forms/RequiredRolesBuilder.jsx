import { FiPlus, FiTrash2 } from 'react-icons/fi';

export default function RequiredRolesBuilder({ register, fields, append, remove }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-2">
        <h3 className="text-lg font-extrabold text-gray-900">Required Roles</h3>
        <button 
          type="button"
          onClick={() => append({ name: '', slots: 1, description: '' })}
          className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
        >
          <FiPlus className="w-4 h-4" /> Add Role
        </button>
      </div>
      
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col md:flex-row gap-4 relative">
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Role Name</label>
              <input
                {...register(`requiredRoles.${index}.name`, { required: 'Required' })}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900 text-sm"
                placeholder="e.g. Frontend Developer"
              />
            </div>
            <div className="w-full md:w-32">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Slots</label>
              <input
                type="number"
                min="1"
                {...register(`requiredRoles.${index}.slots`, { required: 'Required', min: 1 })}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900 text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Description</label>
              <input
                {...register(`requiredRoles.${index}.description`)}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900 text-sm"
                placeholder="e.g. React & Tailwind expert"
              />
            </div>
            
            <div className="flex items-end pb-1">
              <button 
                type="button"
                onClick={() => remove(index)}
                className="p-2.5 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                aria-label="Remove Role"
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        {fields.length === 0 && (
           <p className="text-gray-500 text-sm font-medium italic">No specific roles added. Add some to help teammates find you!</p>
        )}
      </div>
    </div>
  );
}
