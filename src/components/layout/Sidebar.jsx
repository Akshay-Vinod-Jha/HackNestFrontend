import { NavLink, useLocation } from 'react-router-dom';
import { 
  FiHome, FiUser, FiCode, FiUsers, FiFileText, 
  FiMail, FiStar, FiAward, FiLogOut, FiX, FiBriefcase
} from 'react-icons/fi';
import useAuthStore from '../../store/authStore';

export default function Sidebar({ isMobileOpen, closeMobileSidebar }) {
  const logout = useAuthStore(state => state.logout);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FiHome },
    { name: 'Profile', path: '/profile', icon: FiUser },
    { name: 'Hackathons', path: '/hackathons', icon: FiCode },
    { name: 'Teams', path: '/teams', icon: FiUsers },
    { name: 'My Teams', path: '/my-teams', icon: FiBriefcase },
    { name: 'Applications', path: '/applications', icon: FiFileText },
    { name: 'Invitations', path: '/invitations', icon: FiMail },
    { name: 'Recommendations', path: '/recommendations', icon: FiStar },
    { name: 'Leaderboard', path: '/leaderboard', icon: FiAward },
    { name: 'Trophy Room', path: '/achievements', icon: FiAward },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={closeMobileSidebar}
        ></div>
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 md:w-20 lg:w-64 bg-white border-r border-gray-100
        flex flex-col transition-all duration-[180ms] ease-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 md:hidden">
          <span className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-sm">H</div>
            Menu
          </span>
          <button 
            onClick={closeMobileSidebar} 
            className="p-2 -mr-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-[150ms]"
          >
             <FiX className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 scrollbar-hide">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => { if(window.innerWidth < 768) closeMobileSidebar(); }}
              className={({ isActive }) => `
                relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-[150ms] group font-medium text-sm
                ${isActive 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" />
                  )}
                  <item.icon className={`w-4 h-4 shrink-0 transition-colors duration-[150ms] ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                  <span className="md:hidden lg:block truncate">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={logout}
            className="flex w-full items-center gap-3.5 px-3 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-700 transition-all font-bold text-sm border border-transparent hover:border-red-100/50 group"
          >
            <FiLogOut className="w-5 h-5 shrink-0 text-gray-400 group-hover:text-red-500 transition-colors" />
            <span className="md:hidden lg:block">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
