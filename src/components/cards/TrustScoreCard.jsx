import { motion } from 'framer-motion';
import { progressVariants } from '../../utils/animations';

export default function TrustScoreCard({ analytics }) {
  const score = analytics?.trustScore || 0;
  
  return (
    <div className="clay-card p-6 md:p-8 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-xl font-extrabold mb-2 flex items-center gap-2" style={{ color: 'var(--clay-text-primary)' }}>
          <svg className="w-6 h-6" style={{ color: 'var(--clay-success)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          Trust Score
        </h2>
        <p className="text-sm font-medium mb-6" style={{ color: 'var(--clay-text-muted)' }}>Based on team feedback, completed events, and verified skills.</p>
      </div>
      
      <div className="flex flex-col flex-1 justify-end">
        <div className="flex items-end gap-2 mb-3">
           <span className="text-6xl font-black tracking-tighter leading-none" style={{ color: 'var(--clay-success)' }}>{score}</span>
           <span className="font-bold mb-1 text-lg" style={{ color: 'var(--clay-text-muted)' }}>/ 100</span>
        </div>
        
        <div className="clay-progress">
          <motion.div
            className="clay-progress-bar"
            variants={progressVariants}
            initial="initial"
            animate="animate"
            custom={score}
            style={{ background: 'var(--clay-success)' }}
          >
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 w-full animate-[pulse_2s_ease-in-out_infinite]"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
