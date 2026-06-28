import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import useProfile from '../../hooks/useProfile';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2, FiX } from 'react-icons/fi';

export default function ProfileForm({ onCancel }) {
  const { profile, updateProfile } = useProfile();
  
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      fullName: profile?.fullName || '',
      title: profile?.title || profile?.headline || '',
      location: profile?.location || profile?.college || '',
      bio: profile?.bio || '',
      skills: Array.isArray(profile?.skills) 
        ? profile.skills.map(s => ({ 
            name: typeof s === 'string' ? s : s.name, 
            level: s.level || 'INTERMEDIATE',
            yearsOfExperience: s.yearsOfExperience || 1
          }))
        : [],
      experience: profile?.experience || [],
      portfolioLinks: profile?.portfolioLinks || [],
    }
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: 'skills'
  });

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({
    control,
    name: 'experience'
  });

  const { fields: portFields, append: appendPort, remove: removePort } = useFieldArray({
    control,
    name: 'portfolioLinks'
  });

  // Hydrate form if profile changes from outside
  useEffect(() => {
    if (profile) {
      reset({
        fullName: profile.fullName || '',
        title: profile.title || profile.headline || '',
        location: profile.location || profile.college || '',
        bio: profile.bio || '',
        skills: Array.isArray(profile.skills) 
          ? profile.skills.map(s => ({ 
              name: typeof s === 'string' ? s : s.name, 
              level: s.level || 'INTERMEDIATE',
              yearsOfExperience: s.yearsOfExperience || 1
            }))
          : [],
        experience: profile.experience || [],
        portfolioLinks: profile.portfolioLinks || [],
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data) => {
    try {
      // Ensure data maps exactly to UpdateProfileRequest
      const formattedData = {
        headline: data.title,
        college: data.location,
        bio: data.bio,
        skills: data.skills.map(s => ({ 
            name: s.name, 
            level: s.level || 'INTERMEDIATE', 
            yearsOfExperience: parseInt(s.yearsOfExperience) || 1 
        })).filter(s => s.name.trim() !== ''),
        experience: data.experience.map(e => ({
            ...e,
            startDate: e.startDate === '' ? null : e.startDate,
            endDate: e.endDate === '' ? null : e.endDate,
            currentlyWorking: e.currentlyWorking || false
        })).filter(e => e.title && e.organization),
        portfolioLinks: data.portfolioLinks.filter(p => p.url)
      };
      
      await updateProfile(formattedData);
      toast.success('Profile updated successfully!');
      if (onCancel) onCancel(); // Return to view mode
    } catch (error) {
      toast.error(error?.message || error?.error || 'Failed to update profile. Please try again.');
    }
  };

  const watchExperiences = watch('experience');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 w-full max-w-4xl mx-auto transition-all">
      <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Edit Profile</h2>
        {onCancel && (
          <button 
            type="button"
            onClick={onCancel} 
            className="p-2 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        
        {/* SECTION: BASIC INFO */}
        <section>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name (via User Settings)</label>
                <input
                type="text"
                disabled
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
                {...register('fullName')}
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Headline</label>
                <input
                type="text"
                placeholder="e.g. Full Stack Developer | Java Enthusiast"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-blue-500 focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white"
                {...register('title')}
                />
            </div>
            </div>

            <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">College / Location</label>
            <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-blue-500 focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white"
                {...register('location')}
            />
            </div>

            <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
            <textarea
                rows="4"
                placeholder="Tell us about your technical journey..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-blue-500 focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white resize-y"
                {...register('bio', { maxLength: { value: 1000, message: "Bio cannot exceed 1000 characters" } })}
            ></textarea>
            {errors.bio && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.bio.message}</p>}
            </div>
        </section>

        {/* SECTION: SKILLS */}
        <section>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Technical Skills</h3>
                <button 
                    type="button" 
                    onClick={() => appendSkill({ name: '', level: 'INTERMEDIATE', yearsOfExperience: 1 })}
                    className="flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                    <FiPlus /> Add Skill
                </button>
            </div>
            
            {skillFields.length === 0 && (
                <div className="text-center p-6 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-500 text-sm">
                    No skills added yet. Showcase your tech stack!
                </div>
            )}

            <div className="space-y-3">
                {skillFields.length > 0 && (
                    <div className="hidden sm:flex gap-3 px-1 mb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <div className="flex-1">Skill Name</div>
                        <div className="w-40">Proficiency</div>
                        <div className="w-28">Years Exp.</div>
                        <div className="w-[42px]"></div> {/* spacer for trash icon */}
                    </div>
                )}
                {skillFields.map((field, index) => (
                    <div key={field.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-white sm:bg-transparent p-4 sm:p-0 rounded-xl sm:rounded-none border sm:border-0 border-gray-100 shadow-sm sm:shadow-none">
                        <div className="w-full sm:flex-1">
                            <label className="block sm:hidden text-xs font-semibold text-gray-500 mb-1">Skill Name</label>
                            <input
                                type="text"
                                placeholder="e.g. React, Spring Boot"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-blue-500 focus:outline-none focus:ring-2 bg-gray-50"
                                {...register(`skills.${index}.name`, { required: true })}
                            />
                        </div>
                        <div className="w-full sm:w-40">
                            <label className="block sm:hidden text-xs font-semibold text-gray-500 mb-1">Proficiency</label>
                            <select
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-blue-500 focus:outline-none focus:ring-2 bg-gray-50"
                                {...register(`skills.${index}.level`)}
                            >
                                <option value="BEGINNER">Beginner</option>
                                <option value="INTERMEDIATE">Intermediate</option>
                                <option value="ADVANCED">Advanced</option>
                                <option value="EXPERT">Expert</option>
                            </select>
                        </div>
                        <div className="w-full sm:w-28">
                            <label className="block sm:hidden text-xs font-semibold text-gray-500 mb-1">Years of Exp.</label>
                            <input
                                type="number"
                                min="0"
                                placeholder="e.g. 2"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-blue-500 focus:outline-none focus:ring-2 bg-gray-50"
                                {...register(`skills.${index}.yearsOfExperience`)}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeSkill(index)}
                            title="Remove Skill"
                            className="w-full sm:w-auto p-2.5 text-red-500 hover:bg-red-50 rounded-xl border border-red-100 sm:border-transparent transition-colors mt-2 sm:mt-0 flex justify-center items-center gap-2"
                        >
                            <FiTrash2 /> <span className="sm:hidden text-sm font-semibold">Remove Skill</span>
                        </button>
                    </div>
                ))}
            </div>
        </section>

        {/* SECTION: EXPERIENCE */}
        <section>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Professional Experience</h3>
                <button 
                    type="button" 
                    onClick={() => appendExp({ title: '', organization: '', description: '', startDate: '', endDate: '', currentlyWorking: false })}
                    className="flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                    <FiPlus /> Add Experience
                </button>
            </div>

            {expFields.length === 0 && (
                <div className="text-center p-6 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-500 text-sm">
                    No experience added yet.
                </div>
            )}

            <div className="space-y-6">
                {expFields.map((field, index) => (
                    <div key={field.id} className="relative p-5 bg-gray-50 border border-gray-100 rounded-2xl">
                        <button
                            type="button"
                            onClick={() => removeExp(index)}
                            className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                        >
                            <FiTrash2 />
                        </button>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">Role Title</label>
                                <input type="text" className="w-full px-3 py-2 rounded-lg border border-gray-200" {...register(`experience.${index}.title`, { required: true })} />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">Organization</label>
                                <input type="text" className="w-full px-3 py-2 rounded-lg border border-gray-200" {...register(`experience.${index}.organization`, { required: true })} />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">Start Date</label>
                                <input type="date" className="w-full px-3 py-2 rounded-lg border border-gray-200" {...register(`experience.${index}.startDate`)} />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">End Date</label>
                                <input 
                                    type="date" 
                                    disabled={watchExperiences?.[index]?.currentlyWorking}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:bg-gray-100" 
                                    {...register(`experience.${index}.endDate`)} 
                                />
                            </div>
                            <div className="md:col-span-2 flex items-center gap-2">
                                <input type="checkbox" id={`current_${index}`} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" {...register(`experience.${index}.currentlyWorking`)} />
                                <label htmlFor={`current_${index}`} className="text-sm font-medium text-gray-700">I currently work here</label>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
                                <textarea rows="2" className="w-full px-3 py-2 rounded-lg border border-gray-200 resize-y" {...register(`experience.${index}.description`)}></textarea>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* SECTION: PORTFOLIO */}
        <section>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Portfolio Links</h3>
                <button 
                    type="button" 
                    onClick={() => appendPort({ type: 'GITHUB', url: '' })}
                    className="flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                    <FiPlus /> Add Link
                </button>
            </div>

            {portFields.length === 0 && (
                <div className="text-center p-6 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-500 text-sm">
                    No links added. Add your GitHub or personal website!
                </div>
            )}

            <div className="space-y-3">
                {portFields.map((field, index) => (
                    <div key={field.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        <select
                            className="w-full sm:w-48 px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-blue-500 focus:outline-none focus:ring-2 bg-gray-50"
                            {...register(`portfolioLinks.${index}.type`)}
                        >
                            <option value="GITHUB">GitHub</option>
                            <option value="LINKEDIN">LinkedIn</option>
                            <option value="PORTFOLIO">Portfolio</option>
                            <option value="RESUME">Resume</option>
                            <option value="PROJECT_DEMO">Project Demo</option>
                            <option value="OTHER">Other</option>
                        </select>
                        <input
                            type="url"
                            placeholder="https://..."
                            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-blue-500 focus:outline-none focus:ring-2 bg-gray-50 w-full"
                            {...register(`portfolioLinks.${index}.url`, { required: true })}
                        />
                        <button
                            type="button"
                            onClick={() => removePort(index)}
                            className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors self-end sm:self-auto"
                        >
                            <FiTrash2 />
                        </button>
                    </div>
                ))}
            </div>
        </section>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm active:scale-[0.98] flex items-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
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
