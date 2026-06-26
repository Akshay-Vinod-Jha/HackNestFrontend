import { FiCheckCircle } from 'react-icons/fi';

export default function RecommendationReasonChip({ reason }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-lg shadow-sm">
      <FiCheckCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
      <span className="text-xs font-bold text-indigo-900 whitespace-nowrap">{reason}</span>
    </div>
  );
}
