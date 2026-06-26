import { FiPlus, FiTrash2 } from 'react-icons/fi';

export default function RequiredSkillsBuilder({ register, fields, append, remove }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-2">
        <h3 className="text-lg font-extrabold text-gray-900">Required Skills</h3>
        <button 
          type="button"
          onClick={() => append({ name: '', level: 'BEGINNER' })}
          className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
        >
          <FiPlus className="w-4 h-4" /> Add Skill
        </button>
      </div>
      
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 bg-indigo-50/30 border border-indigo-100 rounded-2xl flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Skill Name</label>
              <input
                {...register(`requiredSkills.${index}.name`, { required: 'Required' })}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:border-indigo-500 transition-all outline-none font-medium text-gray-900 text-sm"
                placeholder="e.g. Python, Figma"
              />
            </div>
            <div className="w-full sm:w-48">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Minimum Level</label>
              <select
                {...register(`requiredSkills.${index}.level`)}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:border-indigo-500 transition-all outline-none font-medium text-gray-900 text-sm"
              >
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
                <option value="EXPERT">Expert</option>
              </select>
            </div>
            <div className="flex items-end pb-1">
              <button 
                type="button"
                onClick={() => remove(index)}
                className="p-2.5 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                aria-label="Remove Skill"
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        {fields.length === 0 && (
           <p className="text-gray-500 text-sm font-medium italic">No specific skills required.</p>
        )}
      </div>
    </div>
  );
}
