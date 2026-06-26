import { FiUsers, FiBriefcase, FiAward } from 'react-icons/fi';

export default function SearchTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'students', label: 'Students', icon: FiUsers },
    { id: 'teams', label: 'Teams', icon: FiBriefcase },
    { id: 'hackathons', label: 'Hackathons', icon: FiAward },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300
              ${isActive 
                ? 'bg-gray-900 text-white shadow-md scale-105' 
                : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-gray-200'}
            `}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
