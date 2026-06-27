import { NavLink, useLocation } from 'react-router-dom';
import { 
  FiHome, FiUser, FiCode, FiUsers, FiFileText, 
  FiMail, FiStar, FiAward, FiLogOut, FiX, FiBriefcase,
  FiBell, FiCompass, FiTrendingUp, FiClock
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../../store/authStore';
import { sidebarVariants } from '../../utils/animations';

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
    { name: 'Trophy Room', path: '/achievements', icon: FiTrendingUp },
    { name: 'Notifications', path: '/notifications', icon: FiBell },
  ];

  const SidebarContent = () => (
    <>
      {/* Mobile Header */}
      <div className="h-16 flex items-center justify-between px-5 border-b md:hidden" style={{ borderColor: 'var(--clay-border-light)' }}>
        <span className="text-lg font-extrabold clay-gradient-text">HackNest</span>
        <motion.button 
          onClick={closeMobileSidebar}
          className="clay-icon-button"
          whileTap={{ scale: 0.88 }}
        >
          <FiX className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5 scrollbar-hide">
        {navItems.map((item, i) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03, duration: 0.25 }}
            >
              <NavLink
                to={item.path}
                onClick={() => { if (window.innerWidth < 768) closeMobileSidebar(); }}
                className={`clay-sidebar-item ${isActive ? 'clay-sidebar-item-active' : ''}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full"
                    style={{ background: 'var(--clay-primary)' }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  />
                )}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.15 }}
                >
                  <item.icon className="w-[18px] h-[18px] shrink-0" />
                </motion.div>
                <span className="md:hidden lg:block truncate">{item.name}</span>
              </NavLink>
            </motion.div>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t" style={{ borderColor: 'var(--clay-border-light)' }}>
        <motion.button 
          onClick={logout}
          className="clay-sidebar-item w-full"
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.96 }}
          style={{ color: 'var(--clay-danger)' }}
        >
          <FiLogOut className="w-[18px] h-[18px] shrink-0" />
          <span className="md:hidden lg:block">Logout</span>
        </motion.button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
            onClick={closeMobileSidebar}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar — animated */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            key="mobile-sidebar"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="clay-sidebar fixed inset-y-0 left-0 z-50 w-64 flex flex-col md:hidden shadow-2xl"
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar — always visible */}
      <aside className="clay-sidebar hidden md:flex w-20 lg:w-64 flex-col flex-shrink-0">
        <SidebarContent />
      </aside>
    </>
  );
}
