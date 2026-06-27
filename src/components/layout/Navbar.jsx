import React, { useState, useRef, useEffect } from 'react';
import { FiMenu, FiBell, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../ui/Logo';
import useAuthStore from '../../store/authStore';

export default function Navbar({ toggleMobileSidebar }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Default to a placeholder if user data is not fully loaded yet
  const displayName = user?.fullName || user?.username || 'HackNest User';
  const displayEmail = user?.email || '';
  const avatarLetter = displayName.charAt(0).toUpperCase();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
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
        <button className="relative p-2 text-gray-400 hover:text-blue-600 transition-colors hover:bg-gray-50 rounded-full">
          <FiBell className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
        <div className="h-8 w-px bg-gray-200"></div>
        
        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 sm:p-1.5 sm:pr-4 rounded-full border border-transparent hover:border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-inner">
              {avatarLetter}
            </div>
            <span className="text-sm font-bold text-gray-700 hidden md:block">{displayName}</span>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 transform opacity-100 scale-100 transition-all origin-top-right">
              <div className="px-4 py-3 border-b border-gray-100 mb-1">
                <p className="text-sm font-bold text-gray-900 truncate">{displayName}</p>
                {displayEmail && <p className="text-xs font-medium text-gray-500 truncate">{displayEmail}</p>}
              </div>
              
              <Link 
                to="/profile" 
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
              >
                <FiUser className="w-4 h-4" />
                View Profile
              </Link>
              
              <Link 
                to="/profile" 
                onClick={() => setIsDropdownOpen(false)}
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
