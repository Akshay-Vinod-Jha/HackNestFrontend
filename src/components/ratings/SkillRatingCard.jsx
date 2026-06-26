export default function SkillRatingCard({ skillName, averageScore, totalRatings }) {
  const percentage = (averageScore / 5) * 100;
  
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-extrabold text-gray-900 truncate pr-4">{skillName}</h3>
        <span className="text-lg font-black text-amber-500 bg-amber-50 px-3 py-1 rounded-xl shrink-0">
          {averageScore.toFixed(1)}
        </span>
      </div>
      
      <div className="w-full bg-gray-100 rounded-full h-2 mb-2 overflow-hidden">
        <div 
          className="bg-amber-400 h-2 rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      <p className="text-xs font-bold text-gray-400 text-right">
        Based on {totalRatings} ratings
      </p>
    </div>
  );
}
