export default function RecommendedHackathonCard({ data }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start mb-3 gap-2">
          <h3 className="font-extrabold text-gray-900 text-lg leading-tight">{data?.title || 'Unknown Hackathon'}</h3>
          <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap border border-emerald-100 shrink-0">
            {data?.matchScore ? `${data.matchScore}% Match` : 'Recommended'}
          </span>
        </div>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 font-medium">{data?.description || 'No description provided.'}</p>
        
        {data?.reasons && data.reasons.length > 0 && (
          <div className="mb-4">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Why we recommend</h4>
            <ul className="space-y-1.5">
              {data.reasons.slice(0, 2).map((reason, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 font-medium">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <span>{typeof reason === 'string' ? reason : reason?.reason || 'Recommended'}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button className="w-full mt-2 py-2.5 text-sm font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors active:scale-[0.98]">
        View Hackathon
      </button>
    </div>
  );
}
