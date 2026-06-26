import { Outlet } from 'react-router-dom';

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout min-h-screen flex bg-gray-100">
      {/* Sidebar Placeholder */}
      <aside className="w-64 bg-gray-900 text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-6 text-blue-400">Sidebar Area</h2>
        <p className="text-sm text-gray-400">Navigation placeholders...</p>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Navbar Placeholder */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Navbar Area</h1>
          <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">User Profile</div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-auto">
          {/* Renders children passed directly or nested routes via Outlet */}
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
