import React from 'react';

export default function SkillsCard({ skills }) {
  const displaySkills = Array.isArray(skills) && skills.length > 0 ? skills : [];
  
  const getLevelColor = (level) => {
    switch (level) {
      case 'EXPERT': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'ADVANCED': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'INTERMEDIATE': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'BEGINNER': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full transition-all hover:shadow-md">
      <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2 border-b border-gray-100 pb-3">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
        </svg>
        Skills & Technologies
      </h2>
      
      {displaySkills.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {displaySkills.map((skill, index) => {
            const skillName = typeof skill === 'string' ? skill : (skill.name || 'Unknown Skill');
            const level = typeof skill === 'object' ? (skill.level || 'INTERMEDIATE') : 'INTERMEDIATE';
            const years = typeof skill === 'object' ? (skill.yearsOfExperience || 1) : 1;
            
            return (
              <div 
                key={index} 
                className={`flex flex-col gap-1 px-4 py-2.5 rounded-xl border ${getLevelColor(level)} shadow-sm transition-all hover:-translate-y-0.5`}
              >
                <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{skillName}</span>
                    <span className="text-[10px] font-black uppercase tracking-wider opacity-80">{level}</span>
                </div>
                <div className="text-xs font-medium opacity-90">
                    {years} {years === 1 ? 'year' : 'years'} exp.
                </div>
              </div>
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
