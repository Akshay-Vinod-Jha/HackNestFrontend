import { FiCpu } from 'react-icons/fi';

export default function SkillsCard({ skills }) {
  if (!skills || skills.length === 0) return null;

  const getLevelColor = (level) => {
    switch(level?.toUpperCase()) {
      case 'BEGINNER': return 'bg-green-100 text-green-700';
      case 'INTERMEDIATE': return 'bg-blue-100 text-blue-700';
      case 'ADVANCED': return 'bg-purple-100 text-purple-700';
      case 'EXPERT': return 'bg-rose-100 text-rose-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 h-full">
      <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
        <FiCpu className="text-indigo-500" /> Required Skills
      </h2>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, i) => {
          const skillObj = typeof skill === 'string' ? { name: skill } : skill;
          return (
            <div key={i} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl bg-gray-50">
              <span className="font-bold text-gray-800">{skillObj.name}</span>
              {skillObj.level && (
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${getLevelColor(skillObj.level)}`}>
                  {skillObj.level}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
