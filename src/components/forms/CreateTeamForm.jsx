import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useTeams from '../../hooks/useTeams';
import useHackathons from '../../hooks/useHackathons';
import { FiSave, FiAlertCircle, FiLoader, FiPlus, FiTrash2 } from 'react-icons/fi';
import RequiredRolesBuilder from './RequiredRolesBuilder';
import RequiredSkillsBuilder from './RequiredSkillsBuilder';

export default function CreateTeamForm() {
  const [hackathonList, setHackathonList] = useState([]);
  const [isFetchingHackathons, setIsFetchingHackathons] = useState(true);

  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      visibility: 'PUBLIC',
      openForApplications: true,
      maxMembers: 4,
      requiredRoles: [{ name: '', slots: 1, description: '' }],
      requiredSkills: [{ name: '', level: 'BEGINNER' }]
    }
  });

  const { fields: roleFields, append: appendRole, remove: removeRole } = useFieldArray({
    control,
    name: 'requiredRoles'
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: 'requiredSkills'
  });
  
  const navigate = useNavigate();
  const { createTeam } = useTeams();
  const { fetchHackathons, hackathons } = useHackathons();

  useEffect(() => {
    const loadHackathons = async () => {
      try {
        setIsFetchingHackathons(true);
        await fetchHackathons({ size: 100 }); // fetch up to 100 recent/upcoming hackathons
        setIsFetchingHackathons(false);
      } catch (error) {
        setIsFetchingHackathons(false);
        console.error("Failed to load hackathons", error);
      }
    };
    loadHackathons();
  }, [fetchHackathons]);

  useEffect(() => {
    if (hackathons && hackathons.length > 0) {
      setHackathonList(hackathons);
    }
  }, [hackathons]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        maxMembers: parseInt(data.maxMembers, 10),
        hackathonId: data.hackathonId ? String(data.hackathonId) : null,
        requiredRoles: data.requiredRoles.map(r => ({
          roleName: r.name,
          slots: parseInt(r.slots, 10),
          requiredSkills: []
        })),
        requiredSkills: data.requiredSkills.map(s => s.name).filter(Boolean)
      };

      await createTeam(payload);
      toast.success('Team created successfully!');
      navigate('/teams');
    } catch (error) {
      toast.error(typeof error === 'string' ? error : error.message || 'Failed to create team');
    }
  };

  const InputError = ({ message }) => {
    if (!message) return null;
    return (
      <span className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1">
        <FiAlertCircle className="w-3 h-3" /> {message}
      </span>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      
      {/* 1. Basic Information */}
      <div>
        <h3 className="text-lg font-extrabold text-gray-900 mb-6 border-b border-gray-100 pb-2">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Team Name *</label>
            <input 
              type="text" 
              {...register('name', { required: 'Team Name is required' })}
              className={`w-full px-4 py-3 bg-gray-50 border ${errors.name ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900`}
              placeholder="e.g. Quantum Coders"
            />
            <InputError message={errors.name?.message} />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
            <textarea 
              {...register('description', { required: 'Description is required' })}
              rows={4}
              className={`w-full px-4 py-3 bg-gray-50 border ${errors.description ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900`}
              placeholder="What is your team building? Who are you looking for?"
            />
            <InputError message={errors.description?.message} />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Associated Hackathon *</label>
            <select 
              {...register('hackathonId', { required: 'You must select a hackathon' })}
              className={`w-full px-4 py-3 bg-gray-50 border ${errors.hackathonId ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900 appearance-none`}
            >
              <option value="">-- Select a Hackathon --</option>
              {hackathonList.map(h => (
                <option key={h.id} value={h.id}>{h.title}</option>
              ))}
            </select>
            <InputError message={errors.hackathonId?.message} />
            <p className="text-xs text-gray-500 font-medium mt-1">Teams must be associated with a specific hackathon.</p>
          </div>
        </div>
      </div>

      {/* 2. Required Roles */}
      <RequiredRolesBuilder 
        register={register}
        fields={roleFields}
        append={appendRole}
        remove={removeRole}
      />

      {/* 3. Required Skills */}
      <RequiredSkillsBuilder 
        register={register}
        fields={skillFields}
        append={appendSkill}
        remove={removeSkill}
      />

      {/* 4. Team Configuration */}
      <div>
        <h3 className="text-lg font-extrabold text-gray-900 mb-6 border-b border-gray-100 pb-2">Team Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Maximum Members *</label>
            <input 
              type="number" 
              min="2"
              max="10"
              {...register('maxMembers', { required: 'Required', min: 2, max: 10 })}
              className={`w-full px-4 py-3 bg-gray-50 border ${errors.maxMembers ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900`}
            />
            <InputError message={errors.maxMembers?.message} />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Visibility</label>
            <select 
              {...register('visibility')}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900"
            >
              <option value="PUBLIC">Public</option>
              <option value="PRIVATE">Private</option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-3 cursor-pointer mt-6">
              <div className="relative">
                <input type="checkbox" {...register('openForApplications')} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </div>
              <span className="text-sm font-bold text-gray-700">Open for Applications</span>
            </label>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="pt-6 border-t border-gray-100 flex justify-end">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-sm hover:bg-blue-700 hover:shadow transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
        >
          {isSubmitting ? <FiLoader className="w-5 h-5 animate-spin" /> : <FiSave className="w-5 h-5" />}
          {isSubmitting ? 'Creating Team...' : 'Create Team'}
        </button>
      </div>

    </form>
  );
}
