import React, { useState, useRef, useEffect } from 'react';
import { FiMenu, FiBell, FiUser, FiSettings, FiLogOut, FiCheck, FiX } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../ui/Logo';
import useAuthStore from '../../store/authStore';
import useNotificationStore from '../../store/notificationStore';

export default function Navbar({ toggleMobileSidebar }) {
  const { user, logout } = useAuthStore();
  const { notifications, unreadCount, fetchNotifications, markAsRead, markAllAsRead } = useNotificationStore();
  const navigate = useNavigate();
  
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  
  const userDropdownRef = useRef(null);
  const notifDropdownRef = useRef(null);

  const displayName = user?.fullName || user?.username || 'HackNest User';
  const displayEmail = user?.email || '';
  const avatarLetter = displayName.charAt(0).toUpperCase();

  // Fetch notifications on mount
  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user, fetchNotifications]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target)) {
        setIsNotifDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsUserDropdownOpen(false);
    logout();
  };

  const handleNotifClick = (notif) => {
    if (!notif.read) {
      markAsRead(notif.id);
    }
    setIsNotifDropdownOpen(false);
    // In a real app, this might navigate to a specific page based on notif.type
    // navigate(notif.relatedEntityId ? `/entity/${notif.relatedEntityId}` : '/notifications');
  };

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
        
        {/* Notifications Dropdown */}
        <div className="relative" ref={notifDropdownRef}>
          <button 
            onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
            className="relative p-2 text-gray-400 hover:text-blue-600 transition-colors hover:bg-gray-50 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <FiBell className="w-5 h-5 sm:w-6 sm:h-6" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[8px] font-bold text-white shadow-sm">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {isNotifDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 transform origin-top-right transition-all">
              <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-xl">
                <h3 className="font-bold text-gray-900">Notifications</h3>
                {unreadCount > 0 && (
                  <button 
                    onClick={() => markAllAsRead()}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1"
                  >
                    <FiCheck /> Mark all as read
                  </button>
                )}
              </div>
              
              <div className="max-h-[60vh] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <FiBell className="w-8 h-8 mx-auto mb-3 opacity-20" />
                    <p className="text-sm font-medium">You're all caught up!</p>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {notifications.slice(0, 10).map((notif) => (
                      <button
                        key={notif.id}
                        onClick={() => handleNotifClick(notif)}
                        className={`w-full text-left p-4 hover:bg-gray-50 border-b border-gray-50 transition-colors flex gap-3 ${!notif.read ? 'bg-blue-50/30' : ''}`}
                      >
                        {!notif.read && <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>}
                        <div className={!notif.read ? '' : 'pl-5'}>
                          <p className={`text-sm ${!notif.read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                            {notif.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                            {notif.message}
                          </p>
                          <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-wide">
                            {new Date(notif.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {notifications.length > 0 && (
                <Link 
                  to="/notifications"
                  onClick={() => setIsNotifDropdownOpen(false)}
                  className="block w-full text-center p-3 text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:bg-gray-50 transition-colors border-t border-gray-100 rounded-b-xl"
                >
                  View all notifications
                </Link>
              )}
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-gray-200"></div>
        
        {/* User Profile Dropdown */}
        <div className="relative" ref={userDropdownRef}>
          <button 
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 sm:p-1.5 sm:pr-4 rounded-full border border-transparent hover:border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-inner">
              {avatarLetter}
            </div>
            <span className="text-sm font-bold text-gray-700 hidden md:block">{displayName}</span>
          </button>

          {isUserDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 transform origin-top-right transition-all">
              <div className="px-4 py-3 border-b border-gray-100 mb-1 bg-gray-50/50 rounded-t-xl">
                <p className="text-sm font-bold text-gray-900 truncate">{displayName}</p>
                {displayEmail && <p className="text-xs font-medium text-gray-500 truncate">{displayEmail}</p>}
              </div>
              
              <Link 
                to="/profile" 
                onClick={() => setIsUserDropdownOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
              >
                <FiUser className="w-4 h-4" />
                View Profile
              </Link>
              
              <Link 
                to="/profile" 
                onClick={() => setIsUserDropdownOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
              >
                <FiSettings className="w-4 h-4" />
                Settings
              </Link>
              
              <div className="h-px bg-gray-100 my-1 mx-2"></div>
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
              >
                <FiLogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
