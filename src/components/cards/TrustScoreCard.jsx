export default function TrustScoreCard({ analytics }) {
  const score = analytics?.trustScore || 0;
  
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-xl font-extrabold text-gray-900 mb-2 flex items-center gap-2">
          <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          Trust Score
        </h2>
        <p className="text-sm text-gray-500 font-medium mb-6">Based on team feedback, completed events, and verified skills.</p>
      </div>
      
      <div className="flex flex-col flex-1 justify-end">
        <div className="flex items-end gap-2 mb-3">
           <span className="text-6xl font-black text-emerald-600 tracking-tighter leading-none">{score}</span>
           <span className="text-gray-400 font-bold mb-1 text-lg">/ 100</span>
        </div>
        
        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
          <div 
            className="bg-emerald-500 h-full rounded-full transition-all duration-1000 ease-out relative" 
            style={{ width: `${score}%` }}
          >
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 w-full animate-[pulse_2s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
