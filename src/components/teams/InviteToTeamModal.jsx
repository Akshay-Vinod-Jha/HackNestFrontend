import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FiX, FiSend, FiLoader, FiSearch, FiUser } from 'react-icons/fi';
import useInvitations from '../../hooks/useInvitations';

export default function InviteToTeamModal({ isOpen, onClose, team }) {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm();
  const { sendInvitation } = useInvitations();
  
  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      await sendInvitation(team.id, data);
      toast.success('Invitation sent successfully!');
      reset();
      onClose();
    } catch (error) {
      toast.error(typeof error === 'string' ? error : error.message || 'Failed to send invite');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-extrabold text-gray-900">Invite to {team.name}</h2>
          <button 
            onClick={() => { reset(); onClose(); }}
            className="p-2 -mr-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors active:scale-[0.98]"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          
          {/* Email Search */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Student Email *</label>
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="email"
                {...register('receiverEmail', { 
                  required: 'Please enter a valid email address',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900"
                placeholder="Enter Student's Email address..."
              />
            </div>
            {errors.receiverEmail && <p className="text-red-500 text-xs font-bold mt-1">{errors.receiverEmail.message}</p>}
          </div>

          {/* Role Offered */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Role Offered</label>
            <select
              {...register('roleOffered', { required: 'Please select a role' })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900"
            >
              <option value="">Select a role...</option>
              {team?.requiredRoles?.map((role, idx) => {
                const roleName = role.roleName || role.name;
                return (
                  <option key={idx} value={roleName}>{roleName}</option>
                );
              })}
              <option value="General Member">General Member</option>
            </select>
            {errors.roleOffered && <p className="text-red-500 text-xs font-bold mt-1">{errors.roleOffered.message}</p>}
          </div>

          {/* Invitation Message */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
            <textarea 
              {...register('message')}
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900"
              placeholder="Hey! We saw your profile and think you'd be a great fit for..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button 
              type="button" 
              onClick={() => { reset(); onClose(); }}
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
              Send Invite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
