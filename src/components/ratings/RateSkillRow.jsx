import { FiStar } from 'react-icons/fi';

export default function RateSkillRow({ label, fieldName, register, watch, setValue }) {
  const currentValue = watch(fieldName) || 0;

  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
      <span className="text-sm font-bold text-gray-700">{label}</span>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setValue(fieldName, star, { shouldValidate: true })}
            className={`p-1 focus:outline-none transition-transform hover:scale-110 ${
              star <= currentValue ? 'text-amber-400' : 'text-gray-200 hover:text-amber-200'
            }`}
          >
            <FiStar className="w-5 h-5 fill-current" />
          </button>
        ))}
      </div>
      {/* Hidden input to register with react-hook-form */}
      <input type="hidden" {...register(fieldName, { required: 'Rating is required' })} />
    </div>
  );
}
