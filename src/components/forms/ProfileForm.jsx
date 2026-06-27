import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useProfile from '../../hooks/useProfile';
import toast from 'react-hot-toast';

export default function ProfileForm({ onCancel }) {
  const { profile, updateProfile } = useProfile();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      fullName: profile?.fullName || '',
      title: profile?.title || '',
      location: profile?.location || '',
      bio: profile?.bio || '',
      skills: Array.isArray(profile?.skills) 
        ? profile.skills.map(s => typeof s === 'string' ? s : s.name).join(', ') 
        : '',
    }
  });

  // Hydrate form if profile changes from outside
  useEffect(() => {
    if (profile) {
      reset({
        fullName: profile.fullName || '',
        title: profile.title || '',
        location: profile.location || '',
        bio: profile.bio || '',
        skills: Array.isArray(profile.skills) 
          ? profile.skills.map(s => typeof s === 'string' ? s : s.name).join(', ') 
          : '',
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        headline: data.title,
        college: data.location,
        bio: data.bio,
        skills: data.skills 
          ? data.skills.split(',').map(s => ({ name: s.trim(), level: "INTERMEDIATE" })).filter(s => s.name) 
          : []
      };
      
      await updateProfile(formattedData);
      toast.success('Profile updated successfully!');
      if (onCancel) onCancel(); // Return to view mode
    } catch (error) {
      // Global error handler in App.jsx catches store errors automatically,
      // however we'll toast here explicitly to satisfy requirements if it bypassed App.jsx
      toast.error(error?.message || error?.error || 'Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 w-full max-w-4xl mx-auto transition-all">
      <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Edit Profile</h2>
        {onCancel && (
          <button 
            onClick={onCancel} 
            className="p-2 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'} focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white`}
              {...register('fullName', { required: 'Full name is required' })}
            />
            {errors.fullName && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.fullName.message}</p>}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Title</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-blue-500 focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white"
              {...register('title')}
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-blue-500 focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white"
            {...register('location')}
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
          <textarea
            rows="4"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-blue-500 focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white resize-y"
            {...register('bio')}
          ></textarea>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Skills <span className="text-gray-400 font-normal">(comma separated)</span></label>
          <input
            type="text"
            placeholder="React, Java, Spring Boot"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-blue-500 focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white"
            {...register('skills')}
          />
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm active:scale-95 flex items-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
          >
            {isSubmitting && (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {isSubmitting ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}
