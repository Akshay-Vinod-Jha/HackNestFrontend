import { Link } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-lg w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 text-center"
      >
        <div className="w-24 h-24 bg-amber-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
          <FiLock className="w-12 h-12 text-amber-500" />
        </div>
        <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">403</h1>
        <h2 className="text-2xl font-extrabold text-gray-800 mb-4">Access Denied</h2>
        <p className="text-gray-500 font-medium mb-10 text-lg leading-relaxed">
          You don't have permission to access this page. Please log in with an authorized account or return to the dashboard.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/dashboard" 
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-sm active:scale-95 text-lg"
          >
            Go to Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
