import { FiMenu, FiBell } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';

export default function Navbar({ toggleMobileSidebar }) {
  // Using placeholder user since backend integration is skipped for this task
  const user = { fullName: 'Alex Developer', avatar: 'A' };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-30 relative shadow-sm transition-all">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleMobileSidebar}
          className="p-2 -ml-2 text-gray-500 hover:text-indigo-600 bg-gray-50 hover:bg-indigo-50 rounded-lg md:hidden transition-all active:scale-95"
        >
          <FiMenu className="w-6 h-6" />
        </button>
        <Link to="/dashboard" className="flex items-center gap-2.5 group hover:opacity-80 transition-opacity">
           <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-inner group-hover:bg-indigo-700 transition-colors">
             <Logo className="w-6 h-6 text-white" />
           </div>
           <span className="text-xl font-extrabold text-gray-900 hidden sm:block tracking-tight">HackNest</span>
        </Link>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <button className="relative p-2 text-gray-400 hover:text-blue-600 transition-colors hover:bg-gray-50 rounded-full">
          <FiBell className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
        <div className="h-8 w-px bg-gray-200"></div>
        <Link to="/profile" className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 sm:p-1.5 sm:pr-4 rounded-full border border-transparent hover:border-gray-200 transition-all">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-inner">
            {user.avatar}
          </div>
          <span className="text-sm font-bold text-gray-700 hidden md:block">{user.fullName}</span>
        </Link>
      </div>
    </header>
  );
}
