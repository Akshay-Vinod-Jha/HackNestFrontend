import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function WelcomeCard({ userName = 'Developer' }) {
  return (
    <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-[2rem] p-8 sm:p-10 lg:p-12 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden">
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
          Welcome back, {userName}!
        </h1>
        <p className="text-blue-100 text-lg sm:text-xl mb-8 leading-relaxed font-medium">
          Your dashboard is ready. Find your next hackathon, connect with top-tier teams, and track your applications all in one unified workspace.
        </p>
        <Link 
          to="/hackathons"
          className="inline-flex bg-white text-blue-700 px-8 py-4 rounded-2xl font-black hover:bg-blue-50 transition-all shadow-sm items-center gap-3 group active:scale-95"
        >
          Explore Hackathons
          <FiArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </Link>
      </div>
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl mix-blend-overlay"></div>
      <div className="absolute bottom-0 right-32 -mb-16 w-56 h-56 bg-indigo-400 opacity-20 rounded-full blur-3xl"></div>
      
      {/* Geometric accent */}
      <div className="absolute top-1/4 right-16 w-32 h-32 border-[20px] border-white/5 rounded-full blur-[2px] hidden lg:block"></div>
    </div>
  );
}
