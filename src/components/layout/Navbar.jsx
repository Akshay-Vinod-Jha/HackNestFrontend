import React, { useState, useRef, useEffect } from 'react';
import { FiMenu, FiBell, FiUser, FiSettings, FiLogOut, FiCheck } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../ui/Logo';
import ThemeToggle from '../ui/ThemeToggle';
import useAuthStore from '../../store/authStore';
import useNotificationStore from '../../store/notificationStore';
import { dropdownVariants } from '../../utils/animations';

export default function Navbar({ toggleMobileSidebar }) {
  const { user, logout } = useAuthStore();
  const { notifications, unreadCount, fetchNotifications, markAsRead, markAllAsRead } = useNotificationStore();
  const navigate = useNavigate();
  
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const userDropdownRef = useRef(null);
  const notifDropdownRef = useRef(null);

  const displayName = user?.fullName || user?.username || 'HackNest User';
  const displayEmail = user?.email || '';
  const avatarLetter = displayName.charAt(0).toUpperCase();

  useEffect(() => {
    if (user) fetchNotifications();
  }, [user, fetchNotifications]);

  useEffect(() => {
    const handleScroll = (e) => {
      const main = e.target;
      setScrolled(main.scrollTop > 8);
    };
    const mainEl = document.querySelector('main');
    mainEl?.addEventListener('scroll', handleScroll);
    return () => mainEl?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target))
        setIsUserDropdownOpen(false);
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target))
        setIsNotifDropdownOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsUserDropdownOpen(false);
    logout();
  };

  const handleNotifClick = (notif) => {
    if (!notif.read) markAsRead(notif.id);
    setIsNotifDropdownOpen(false);
  };

  return (
    <header 
      className={`clay-navbar h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-30 relative transition-all duration-300 ${scrolled ? 'clay-navbar-scrolled' : ''}`}
    >
      <div className="flex items-center gap-4">
        <motion.button 
          onClick={toggleMobileSidebar}
          className="clay-icon-button md:hidden"
          whileTap={{ scale: 0.88 }}
        >
          <FiMenu className="w-5 h-5" />
        </motion.button>

        <Link to="/dashboard" className="flex items-center gap-2.5 group">
          <motion.div 
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg"
            style={{ background: 'linear-gradient(135deg, var(--clay-primary), var(--clay-secondary))' }}
            whileHover={{ scale: 1.08, rotate: -3 }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.18 }}
          >
            <Logo className="w-5 h-5 text-white" />
          </motion.div>
          <span className="text-xl font-extrabold hidden sm:block tracking-tight clay-gradient-text">
            HackNest
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Divider */}
        <div className="h-6 w-px" style={{ background: 'var(--clay-border)' }} />

        {/* Notifications */}
        <div className="relative" ref={notifDropdownRef}>
          <motion.button 
            onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
            className="clay-icon-button relative"
            whileTap={{ scale: 0.88 }}
          >
            <FiBell className="w-[18px] h-[18px]" />
            <AnimatePresence>
              {unreadCount > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                  style={{ background: 'var(--clay-danger)' }}
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <AnimatePresence>
            {isNotifDropdownOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="clay-dropdown absolute right-0 mt-2 w-80 sm:w-96"
                style={{ transformOrigin: 'top right' }}
              >
                <div className="flex items-center justify-between px-3 py-2.5 border-b" style={{ borderColor: 'var(--clay-border-light)' }}>
                  <h3 className="font-bold text-sm" style={{ color: 'var(--clay-text-primary)' }}>Notifications</h3>
                  {unreadCount > 0 && (
                    <button 
                      onClick={() => markAllAsRead()}
                      className="clay-button clay-button-ghost text-xs py-1 px-2"
                      style={{ color: 'var(--clay-primary)' }}
                    >
                      <FiCheck className="w-3 h-3" /> Mark all read
                    </button>
                  )}
                </div>
                
                <div className="max-h-[60vh] overflow-y-auto scrollbar-hide">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center clay-empty-state">
                      <FiBell className="w-8 h-8 mx-auto mb-3 opacity-30" />
                      <p className="text-sm font-semibold">You're all caught up!</p>
                    </div>
                  ) : (
                    <div>
                      {notifications.slice(0, 10).map((notif, i) => (
                        <motion.button
                          key={notif.id}
                          onClick={() => handleNotifClick(notif)}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          className="w-full text-left p-3 hover:opacity-80 transition-all flex gap-3 border-b"
                          style={{
                            background: !notif.read ? 'var(--clay-primary-light)' : 'transparent',
                            borderColor: 'var(--clay-border-light)',
                          }}
                        >
                          {!notif.read && (
                            <div className="w-2 h-2 rounded-full mt-1.5 shrink-0 clay-float" style={{ background: 'var(--clay-primary)' }} />
                          )}
                          <div className={!notif.read ? '' : 'pl-4'}>
                            <p className="text-sm font-semibold" style={{ color: 'var(--clay-text-primary)' }}>
                              {notif.title}
                            </p>
                            <p className="text-xs mt-0.5 line-clamp-2" style={{ color: 'var(--clay-text-secondary)' }}>
                              {notif.message}
                            </p>
                            <p className="text-[10px] font-bold mt-1.5 uppercase tracking-wide" style={{ color: 'var(--clay-text-muted)' }}>
                              {new Date(notif.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
                
                {notifications.length > 0 && (
                  <Link 
                    to="/notifications"
                    onClick={() => setIsNotifDropdownOpen(false)}
                    className="block w-full text-center p-3 text-sm font-bold border-t transition-colors"
                    style={{ 
                      color: 'var(--clay-primary)', 
                      borderColor: 'var(--clay-border-light)',
                    }}
                  >
                    View all notifications →
                  </Link>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Dropdown */}
        <div className="relative" ref={userDropdownRef}>
          <motion.button 
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            className="flex items-center gap-2.5 cursor-pointer p-1 sm:p-1.5 sm:pr-3 rounded-xl border transition-all"
            style={{ 
              borderColor: isUserDropdownOpen ? 'var(--clay-primary)' : 'var(--clay-border-light)',
              background: isUserDropdownOpen ? 'var(--clay-primary-light)' : 'var(--clay-surface-2)',
            }}
            whileTap={{ scale: 0.96 }}
          >
            <div 
              className="clay-avatar w-8 h-8 sm:w-9 sm:h-9 text-sm"
            >
              {avatarLetter}
            </div>
            <span className="text-sm font-bold hidden md:block" style={{ color: 'var(--clay-text-primary)' }}>
              {displayName}
            </span>
          </motion.button>

          <AnimatePresence>
            {isUserDropdownOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="clay-dropdown absolute right-0 mt-2 w-56"
                style={{ transformOrigin: 'top right' }}
              >
                <div className="px-3 py-2.5 border-b" style={{ borderColor: 'var(--clay-border-light)' }}>
                  <p className="text-sm font-bold truncate" style={{ color: 'var(--clay-text-primary)' }}>
                    {displayName}
                  </p>
                  {displayEmail && (
                    <p className="text-xs truncate mt-0.5" style={{ color: 'var(--clay-text-muted)' }}>
                      {displayEmail}
                    </p>
                  )}
                </div>
                
                <div className="py-1">
                  <Link 
                    to="/profile" 
                    onClick={() => setIsUserDropdownOpen(false)}
                    className="clay-dropdown-item"
                  >
                    <FiUser className="w-4 h-4" /> View Profile
                  </Link>
                  <Link 
                    to="/profile" 
                    onClick={() => setIsUserDropdownOpen(false)}
                    className="clay-dropdown-item"
                  >
                    <FiSettings className="w-4 h-4" /> Settings
                  </Link>
                  <div className="clay-divider mx-2" />
                  <button 
                    onClick={handleLogout}
                    className="clay-dropdown-item clay-dropdown-item-danger w-full"
                  >
                    <FiLogOut className="w-4 h-4" /> Sign out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
