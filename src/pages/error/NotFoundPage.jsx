import { Link } from 'react-router-dom';
import { FiAlertOctagon } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 text-center"
      >
        <div className="w-24 h-24 bg-rose-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
          <FiAlertOctagon className="w-12 h-12 text-rose-500" />
        </div>
        <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">404</h1>
        <h2 className="text-2xl font-extrabold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-500 font-medium mb-10 text-lg leading-relaxed">
          We couldn't find the page you were looking for. It might have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-sm active:scale-[0.98] text-lg"
          >
            Go to Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="px-8 py-3.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl font-bold transition-all shadow-sm active:scale-[0.98] text-lg"
          >
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
