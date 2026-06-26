import { FiSearch, FiX } from 'react-icons/fi';

export default function GlobalSearchBar({ value, onChange }) {
  return (
    <div className="relative max-w-2xl w-full mx-auto mb-10">
      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
        <FiSearch className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all shadow-sm font-medium text-lg"
        placeholder="Search for skills, locations, names, or tech stacks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button 
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FiX className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
