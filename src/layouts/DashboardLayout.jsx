import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import Logo from '../components/ui/Logo';

export default function DashboardLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50 overflow-hidden font-sans">
      {/* Top Navigation */}
      <Navbar toggleMobileSidebar={toggleMobileSidebar} />
      
      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar 
          isMobileOpen={isMobileSidebarOpen} 
          closeMobileSidebar={closeMobileSidebar} 
        />
        
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
