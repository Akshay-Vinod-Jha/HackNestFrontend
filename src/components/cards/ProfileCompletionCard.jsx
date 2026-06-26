export default function ProfileCompletionCard({ dashboard }) {
  const percentage = dashboard?.profileCompletion || 0;
  
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-xl font-extrabold text-gray-900 mb-2 flex items-center gap-2">
          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          Profile Status
        </h2>
        <p className="text-sm text-gray-500 font-medium mb-6">Complete your profile to increase your visibility to top-tier teams.</p>
      </div>
      
      <div className="flex flex-col items-center flex-1 justify-center">
        <div className="relative w-36 h-36 flex items-center justify-center">
           <svg className="w-full h-full transform -rotate-90 drop-shadow-sm" viewBox="0 0 36 36">
             <path
               className="text-gray-100"
               strokeWidth="3.5"
               stroke="currentColor"
               fill="none"
               d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
             />
             <path
               className="text-indigo-600 transition-all duration-1000 ease-out"
               strokeWidth="3.5"
               strokeDasharray={`${percentage}, 100`}
               strokeLinecap="round"
               stroke="currentColor"
               fill="none"
               d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
             />
           </svg>
           <div className="absolute inset-0 flex flex-col items-center justify-center">
             <span className="text-4xl font-black text-gray-900 tracking-tighter">{percentage}%</span>
           </div>
        </div>
      </div>
    </div>
  );
}
