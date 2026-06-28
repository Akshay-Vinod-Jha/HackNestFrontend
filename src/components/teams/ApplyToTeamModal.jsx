import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FiX, FiSend, FiLoader } from 'react-icons/fi';
import useApplications from '../../hooks/useApplications';
import useTeams from '../../hooks/useTeams';

export default function ApplyToTeamModal({ isOpen, onClose, team }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const { applyToTeam } = useApplications();
  const { fetchTeamById } = useTeams();

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      await applyToTeam(team.id, data);
      toast.success('Application sent successfully!');
      reset();
      onClose();
      if (team?.id) {
        fetchTeamById(team.id).catch(() => {});
      }
    } catch (error) {
      toast.error(typeof error === 'string' ? error : error.message || 'Failed to apply');
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-extrabold text-gray-900">Apply to {team.name}</h2>
            <button 
              onClick={onClose}
              className="p-2 -mr-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors active:scale-[0.98]"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Role Applying For *</label>
              <select 
                {...register('roleApplied', { required: 'Please select a role' })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900 appearance-none"
              >
                <option value="">-- Select a Role --</option>
                {team?.requiredRoles?.map((role, i) => {
                  const roleName = role.roleName || role.name;
                  return <option key={i} value={roleName}>{roleName}</option>;
                })}
              </select>
              {errors.roleApplied && <p className="text-red-500 text-xs font-bold mt-1">{errors.roleApplied.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Message to Team Leader *</label>
              <textarea 
                {...register('message', { required: 'Please provide a message' })}
                rows={5}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900"
                placeholder="Hi, I'm a React developer with 3 years of experience. I'd love to join because..."
              />
              {errors.message && <p className="text-red-500 text-xs font-bold mt-1">{errors.message.message}</p>}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium p-4 bg-blue-50/50 rounded-xl border border-blue-100">
              Your HackNest profile, including your skills and experience, will be automatically attached to this application.
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button 
                type="button" 
                onClick={onClose}
                className="px-6 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <FiLoader className="w-4 h-4 animate-spin" /> : <FiSend className="w-4 h-4" />}
                Send Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
