import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggle } = useTheme();

  return (
    <motion.button
      onClick={toggle}
      className={`clay-icon-button relative overflow-hidden ${className}`}
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.1 }}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="text-yellow-400"
          >
            <FiSun className="w-[18px] h-[18px]" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ color: 'var(--clay-text-secondary)' }}
          >
            <FiMoon className="w-[18px] h-[18px]" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
