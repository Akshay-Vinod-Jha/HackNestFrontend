import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';

export default function DashboardLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden font-sans" style={{ background: 'var(--clay-bg)' }}>
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
        <main 
          className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scrollbar-hide"
          style={{ background: 'var(--clay-bg)' }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
