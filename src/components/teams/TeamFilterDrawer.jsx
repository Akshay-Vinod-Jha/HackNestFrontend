import { FiX } from 'react-icons/fi';
import TeamFilters from './TeamFilters';

export default function TeamFilterDrawer({ isOpen, onClose }) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer */}
      <div className={`
        fixed inset-y-0 right-0 z-50 w-[300px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-extrabold text-gray-900">Team Filters</h2>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors active:scale-[0.98]"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto h-[calc(100vh-85px)]">
          <TeamFilters />
        </div>
      </div>
    </>
  );
}
