import { motion } from 'framer-motion';

export default function ProfileCompletionCard({ dashboard }) {
  const percentage = dashboard?.profileCompletion || 0;
  
  return (
    <div className="clay-card p-6 md:p-8 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-xl font-extrabold mb-2 flex items-center gap-2" style={{ color: 'var(--clay-text-primary)' }}>
          <svg className="w-6 h-6" style={{ color: 'var(--clay-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          Profile Status
        </h2>
        <p className="text-sm font-medium mb-6" style={{ color: 'var(--clay-text-muted)' }}>Complete your profile to increase your visibility to top-tier teams.</p>
      </div>
      
      <div className="flex flex-col items-center flex-1 justify-center">
        <div className="relative w-36 h-36 flex items-center justify-center">
           <svg className="w-full h-full transform -rotate-90 drop-shadow-sm" viewBox="0 0 36 36">
             <path
               strokeWidth="3.5"
               stroke="var(--clay-border)"
               fill="none"
               d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
             />
             <motion.path
               strokeWidth="3.5"
               strokeDasharray={`${percentage}, 100`}
               strokeLinecap="round"
               stroke="var(--clay-primary)"
               fill="none"
               d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
               initial={{ strokeDasharray: '0, 100' }}
               animate={{ strokeDasharray: `${percentage}, 100` }}
               transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
             />
           </svg>
           <div className="absolute inset-0 flex flex-col items-center justify-center">
             <span className="text-4xl font-black tracking-tighter" style={{ color: 'var(--clay-text-primary)' }}>{percentage}%</span>
           </div>
        </div>
      </div>
    </div>
  );
}
