import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTarget, FiUsers, FiShield, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import useAuthStore from '../store/authStore';

export default function Home() {
  const { isAuthenticated } = useAuthStore();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.2 }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                <FiTarget className="w-6 h-6 text-white" />
              </div>
              <span className="font-black text-2xl tracking-tight text-gray-900">HackNest</span>
            </div>
            <div>
              {isAuthenticated ? (
                <Link to="/dashboard" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-sm active:scale-95">
                  Go to Dashboard
                </Link>
              ) : (
                <div className="flex items-center gap-4">
                  <Link to="/login" className="text-gray-600 font-bold hover:text-gray-900 transition-colors hidden sm:block">
                    Log in
                  </Link>
                  <Link to="/register" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-sm active:scale-95">
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none">
           <div className="absolute top-1/4 left-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob"></div>
           <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob animation-delay-2000"></div>
           <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.1] mb-8">
              Find Your Perfect <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Hackathon Dream Team</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              HackNest analyzes skills, trust scores, and past performance to recommend the perfect teammates. Stop searching, start building.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={isAuthenticated ? "/dashboard" : "/register"} className="w-full sm:w-auto px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2 group">
                Get Started Free 
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/discover" className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-2xl font-bold text-lg transition-all shadow-sm active:scale-95">
                Explore Teams
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Built for Builders</h2>
            <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">Everything you need to compete at the highest level, housed in one unified ecosystem.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FiUsers className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-3">Smart Matchmaking</h3>
              <p className="text-gray-500 font-medium leading-relaxed">Our recommendation engine analyzes complementary skills to suggest the missing puzzle pieces for your team.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FiShield className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-3">Trust System</h3>
              <p className="text-gray-500 font-medium leading-relaxed">No more ghosting. Teammates rate each other after hackathons, building a verified public track record of reliability.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FiTrendingUp className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-3">Global Leaderboards</h3>
              <p className="text-gray-500 font-medium leading-relaxed">Climb the ranks. Complete hackathons, earn achievements, and compete for the top spot globally or within your college.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-[3rem] p-10 sm:p-16 text-center text-white shadow-2xl relative overflow-hidden">
             
             {/* Abstract Shapes */}
             <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
             <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

             <div className="relative z-10">
               <h2 className="text-4xl sm:text-5xl font-black mb-6 tracking-tight">Ready to Win Your Next Hackathon?</h2>
               <p className="text-indigo-200 text-lg sm:text-xl font-medium mb-10 max-w-2xl mx-auto">
                 Join thousands of developers already building amazing projects and forging lifelong connections.
               </p>
               <Link to={isAuthenticated ? "/dashboard" : "/register"} className="inline-block px-10 py-5 bg-white text-indigo-900 hover:bg-gray-50 rounded-2xl font-black text-lg transition-all shadow-xl active:scale-95">
                 {isAuthenticated ? "Enter Dashboard" : "Create Free Account"}
               </Link>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
               <FiTarget className="w-4 h-4 text-white" />
             </div>
             <span className="font-extrabold text-xl text-gray-900 tracking-tight">HackNest</span>
          </div>
          <p className="text-gray-400 font-medium text-sm">
            &copy; {new Date().getFullYear()} HackNest Platform. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-gray-600 font-bold transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-gray-600 font-bold transition-colors">Terms</a>
            <a href="#" className="text-gray-400 hover:text-gray-600 font-bold transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
