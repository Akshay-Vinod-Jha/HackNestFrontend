import { FiCpu } from 'react-icons/fi';

export default function SkillBadge({ skill }) {
  const skillName = typeof skill === 'string' ? skill : skill?.name || 'Skill';
  
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-md">
      <FiCpu className="w-3 h-3 text-gray-400 shrink-0" />
      <span className="text-xs font-bold text-gray-700">{skillName}</span>
    </div>
  );
}
