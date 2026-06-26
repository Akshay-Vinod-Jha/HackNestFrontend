import { FiMessageSquare } from 'react-icons/fi';

export default function FeedbackCard({ rating }) {
  if (!rating || !rating.comment) return null;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
          <FiMessageSquare className="w-5 h-5 text-indigo-500" />
        </div>
        <div className="flex-1">
          <p className="text-gray-700 font-medium italic leading-relaxed">"{rating.comment}"</p>
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-gray-400">
            <span>From Team Project</span>
            {rating.createdAt && (
              <>
                <span>•</span>
                <span>{new Date(rating.createdAt).toLocaleDateString()}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
