import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../utils/animations';

function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!target) { setCount(0); return; }
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

function MetricItem({ label, value, colorVar, bgVar }) {
  const count = useCountUp(value);
  return (
    <motion.div
      variants={staggerItem}
      className="p-4 rounded-2xl border flex flex-col items-center justify-center text-center transition-transform hover:scale-105"
      style={{
        background: bgVar,
        borderColor: 'var(--clay-border-light)',
      }}
    >
      <span className="text-2xl font-black mb-1.5" style={{ color: colorVar }}>{count}</span>
      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--clay-text-secondary)' }}>{label}</span>
    </motion.div>
  );
}

export default function AnalyticsCard({ analytics }) {
  const metrics = [
    { label: 'Total Hackathons', value: analytics?.totalHackathons || 0, colorVar: 'var(--clay-primary)', bgVar: 'var(--clay-primary-light)' },
    { label: 'Teams Joined', value: analytics?.teamsJoined || 0, colorVar: 'var(--clay-secondary, #6366f1)', bgVar: 'color-mix(in srgb, var(--clay-secondary, #6366f1) 10%, transparent)' },
    { label: 'Teams Led', value: analytics?.teamsLed || 0, colorVar: '#a855f7', bgVar: 'color-mix(in srgb, #a855f7 10%, transparent)' },
    { label: 'Applications', value: analytics?.applications || 0, colorVar: '#ec4899', bgVar: 'color-mix(in srgb, #ec4899 10%, transparent)' },
    { label: 'Invitations', value: analytics?.invitations || 0, colorVar: 'var(--clay-warning)', bgVar: 'color-mix(in srgb, var(--clay-warning) 10%, transparent)' },
    { label: 'Achievements', value: analytics?.achievements || 0, colorVar: '#eab308', bgVar: 'color-mix(in srgb, #eab308 10%, transparent)' },
  ];

  return (
    <div className="clay-card p-6 md:p-8 h-full">
      <h2 className="text-xl font-extrabold mb-6 flex items-center gap-2" style={{ color: 'var(--clay-text-primary)' }}>
        <svg className="w-6 h-6" style={{ color: 'var(--clay-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
        Overview Analytics
      </h2>
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-3 gap-4"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {metrics.map((metric, index) => (
          <MetricItem
            key={index}
            label={metric.label}
            value={metric.value}
            colorVar={metric.colorVar}
            bgVar={metric.bgVar}
          />
        ))}
      </motion.div>
    </div>
  );
}
