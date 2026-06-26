export default function RecommendedTeammateCard({ data }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start mb-4 gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 font-black shrink-0">
               {data?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h3 className="font-extrabold text-gray-900 text-base leading-tight">{data?.name || 'Unknown User'}</h3>
              <p className="text-xs font-bold text-gray-500 mt-0.5">{data?.role || 'Developer'}</p>
            </div>
          </div>
          <span className="bg-purple-50 text-purple-700 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap border border-purple-100 shrink-0">
            {data?.matchScore ? `${data.matchScore}% Match` : 'New'}
          </span>
        </div>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 font-medium">{data?.description || data?.bio || 'No bio provided.'}</p>
        
        {data?.reasons && data.reasons.length > 0 && (
          <div className="mb-4">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Why we recommend</h4>
            <ul className="space-y-1.5">
              {data.reasons.slice(0, 2).map((reason, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 font-medium">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button className="w-full mt-2 py-2.5 text-sm font-bold text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors active:scale-[0.98]">
        View Profile
      </button>
    </div>
  );
}
