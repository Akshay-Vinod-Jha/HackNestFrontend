import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from '../components/ui/ThemeToggle';

export default function PublicLayout({ children }) {
  return (
    <div 
      className="clay-auth-bg min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Decorative blobs */}
      <div 
        className="clay-blob absolute -top-32 -left-32 w-96 h-96 pointer-events-none"
        style={{ background: 'rgba(108,99,255,0.12)' }}
      />
      <div 
        className="clay-blob absolute -bottom-32 -right-32 w-80 h-80 pointer-events-none"
        style={{ background: 'rgba(139,133,255,0.1)', animationDelay: '3s' }}
      />
      <div 
        className="clay-blob absolute top-1/2 left-1/4 w-64 h-64 pointer-events-none"
        style={{ background: 'rgba(34,197,94,0.06)', animationDelay: '1.5s' }}
      />

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="clay-card" style={{ padding: '2.5rem' }}>
          {children || <Outlet />}
        </div>
      </motion.div>
    </div>
  );
}
