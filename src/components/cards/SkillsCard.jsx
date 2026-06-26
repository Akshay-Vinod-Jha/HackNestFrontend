export default function SkillsCard({ skills }) {
  const displaySkills = Array.isArray(skills) && skills.length > 0 ? skills : [];
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full transition-all hover:shadow-md">
      <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2 border-b border-gray-100 pb-3">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
        </svg>
        Skills & Technologies
      </h2>
      {displaySkills.length > 0 ? (
        <div className="flex flex-wrap gap-2.5">
          {displaySkills.map((skill, index) => {
            const skillName = typeof skill === 'string' ? skill : (skill.name || skill);
            return (
              <span 
                key={index} 
                className="px-3.5 py-1.5 bg-blue-50/50 hover:bg-blue-100 text-blue-700 text-sm font-semibold rounded-lg border border-blue-100/80 transition-colors cursor-default shadow-sm"
              >
                {skillName}
              </span>
            );
          })}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-4 text-center border border-dashed border-gray-200">
          <p className="text-gray-500 text-sm">No skills added yet.</p>
        </div>
      )}
    </div>
  );
}
