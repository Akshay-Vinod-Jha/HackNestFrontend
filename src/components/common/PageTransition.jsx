import { motion } from 'framer-motion';

/**
 * Wraps page content with a subtle fade-in + 4px lift.
 * Duration: 200ms, easeOut — invisible but polished.
 */
export default function PageTransition({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
