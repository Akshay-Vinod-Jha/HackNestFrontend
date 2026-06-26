import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FiX, FiSend, FiLoader, FiSearch, FiUser } from 'react-icons/fi';
import useTeams from '../../hooks/useTeams';

export default function InviteToTeamModal({ isOpen, onClose, team }) {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm();
  const { inviteToTeam } = useTeams();
  
  // Basic mock state for student search since we lack a dedicated users API in this context
  const [searchQuery, setSearchQuery] = useState('');
  const selectedStudent = watch('studentId');

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      await inviteToTeam(team.id, data);
      toast.success('Invitation sent successfully!');
      reset();
      setSearchQuery('');
      onClose();
    } catch (error) {
      toast.error(typeof error === 'string' ? error : error.message || 'Failed to send invite');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-extrabold text-gray-900">Invite to {team.name}</h2>
          <button 
            onClick={() => { reset(); setSearchQuery(''); onClose(); }}
            className="p-2 -mr-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors active:scale-95"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          
          {/* Mock Student Search */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Search Student *</label>
            {!selectedStudent ? (
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900"
                  placeholder="Enter Student ID, Email, or Name..."
                />
                
                {/* Mock Dropdown */}
                {searchQuery.length > 2 && (
                  <div className="absolute top-full mt-2 w-full bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden z-10">
                    <button 
                      type="button"
                      onClick={() => {
                        setValue('studentId', searchQuery);
                        setValue('studentDisplay', searchQuery);
                        setSearchQuery('');
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors flex items-center gap-3"
                    >
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                        <FiUser className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{searchQuery}</p>
                        <p className="text-xs text-gray-500">Click to select</p>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    <FiUser className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-blue-900">{watch('studentDisplay')}</p>
                    <p className="text-xs text-blue-600">Selected Candidate</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => setValue('studentId', null)}
                  className="p-2 text-blue-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            )}
            {/* Hidden actual field */}
            <input type="hidden" {...register('studentId', { required: 'Please select a student' })} />
            {errors.studentId && <p className="text-red-500 text-xs font-bold mt-1">{errors.studentId.message}</p>}
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
                const roleName = typeof role === 'string' ? role : role.name;
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
              onClick={() => { reset(); setSearchQuery(''); onClose(); }}
              className="px-6 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting || !selectedStudent}
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
