import { Outlet } from 'react-router-dom';

export default function PublicLayout({ children }) {
  return (
    <div className="public-layout min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md border border-gray-200">
        {/* Renders children passed directly or nested routes via Outlet */}
        {children || <Outlet />}
      </div>
    </div>
  );
}
