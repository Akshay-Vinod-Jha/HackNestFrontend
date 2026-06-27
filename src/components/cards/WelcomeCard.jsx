import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { fadeUp, buttonHover } from '../../utils/animations';

export default function WelcomeCard({ userName = 'Developer' }) {
  return (
    <motion.div
      {...fadeUp}
      className="rounded-[2rem] p-8 sm:p-10 lg:p-12 text-white shadow-xl relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--clay-primary) 0%, var(--clay-secondary, #6366f1) 100%)',
        boxShadow: '0 20px 60px -10px color-mix(in srgb, var(--clay-primary) 40%, transparent)',
      }}
    >
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
          Welcome back, {userName}!
        </h1>
        <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed font-medium">
          Your dashboard is ready. Find your next hackathon, connect with top-tier teams, and track your applications all in one unified workspace.
        </p>
        <motion.div {...buttonHover}>
          <Link 
            to="/hackathons"
            className="inline-flex bg-white px-8 py-4 rounded-2xl font-black hover:bg-white/90 transition-all shadow-sm items-center gap-3 group active:scale-95"
            style={{ color: 'var(--clay-primary)' }}
          >
            Explore Hackathons
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl mix-blend-overlay"></div>
      <div className="absolute bottom-0 right-32 -mb-16 w-56 h-56 bg-white opacity-10 rounded-full blur-3xl"></div>
      
      {/* Geometric accent */}
      <div className="absolute top-1/4 right-16 w-32 h-32 border-[20px] border-white/5 rounded-full blur-[2px] hidden lg:block"></div>
    </motion.div>
  );
}
