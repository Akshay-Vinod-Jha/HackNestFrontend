import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FiX, FiCheck, FiLoader } from 'react-icons/fi';
import useRatings from '../../hooks/useRatings';
import RateSkillRow from './RateSkillRow';

export default function RateTeammateModal({ isOpen, onClose, targetUser, teamId }) {
  const { register, handleSubmit, watch, setValue, reset, formState: { errors, isSubmitting } } = useForm();
  const { createRating } = useRatings();

  if (!isOpen || !targetUser) return null;

  const onSubmit = async (data) => {
    // Reformat simple flat form into backend payload if necessary
    const ratingPayload = {
      targetUserId: targetUser.id,
      teamId: teamId,
      skillRatings: {
        springBoot: data.springBoot,
        react: data.react,
        mongoDB: data.mongoDB,
        git: data.git,
        communication: data.communication,
      },
      reliability: data.reliability,
      contribution: data.contribution,
      comment: data.comment
    };

    try {
      await createRating(ratingPayload);
      toast.success(`Successfully rated ${targetUser.fullName}`);
      reset();
      onClose();
    } catch (error) {
      toast.error(typeof error === 'string' ? error : error.message || 'Failed to submit rating');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        
        <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900">Rate Teammate</h2>
            <p className="text-sm font-medium text-gray-500">Provide feedback for {targetUser.fullName}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors active:scale-[0.98]"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 overflow-y-auto flex-1 space-y-6 hide-scrollbar">
          
          <div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-3">Skill Ratings</h3>
            <div className="space-y-1 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <RateSkillRow label="Spring Boot" fieldName="springBoot" register={register} watch={watch} setValue={setValue} />
              <RateSkillRow label="React" fieldName="react" register={register} watch={watch} setValue={setValue} />
              <RateSkillRow label="MongoDB" fieldName="mongoDB" register={register} watch={watch} setValue={setValue} />
              <RateSkillRow label="Git" fieldName="git" register={register} watch={watch} setValue={setValue} />
              <RateSkillRow label="Communication" fieldName="communication" register={register} watch={watch} setValue={setValue} />
            </div>
            {Object.keys(errors).some(k => ['springBoot','react','mongoDB','git','communication'].includes(k)) && (
              <p className="text-red-500 text-xs font-bold mt-2">Please rate all skills.</p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-3">Additional Ratings</h3>
            <div className="space-y-1 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <RateSkillRow label="Reliability" fieldName="reliability" register={register} watch={watch} setValue={setValue} />
              <RateSkillRow label="Overall Contribution" fieldName="contribution" register={register} watch={watch} setValue={setValue} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Detailed Feedback</label>
            <textarea 
              {...register('comment', { required: 'Please provide a comment' })}
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-amber-500 transition-all outline-none font-medium text-gray-900"
              placeholder="Great team player, always delivered code on time..."
            />
            {errors.comment && <p className="text-red-500 text-xs font-bold mt-1">{errors.comment.message}</p>}
          </div>

        </form>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-100 shrink-0">
          <button 
            type="button" 
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-gray-900 text-white font-bold rounded-xl shadow-sm hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <FiLoader className="w-4 h-4 animate-spin" /> : <FiCheck className="w-4 h-4" />}
            Submit Rating
          </button>
        </div>
      </div>
    </div>
  );
}
