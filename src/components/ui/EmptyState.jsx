import { motion } from 'framer-motion';
import { FiInbox } from 'react-icons/fi';

export default function EmptyState({ 
  icon: Icon = FiInbox, 
  title = 'No Data Found', 
  message = "There's nothing here yet.", 
  action 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-2xl border border-dashed"
      style={{ 
        background: 'var(--clay-surface-2)',
        borderColor: 'var(--clay-border)',
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 280, damping: 18 }}
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
        style={{ 
          background: 'var(--clay-surface)',
          boxShadow: 'var(--clay-shadow-sm)',
          color: 'var(--clay-text-muted)',
        }}
      >
        <Icon className="w-8 h-8" />
      </motion.div>
      <h3 className="text-xl font-extrabold mb-2" style={{ color: 'var(--clay-text-primary)' }}>
        {title}
      </h3>
      <p className="font-medium max-w-md mb-6" style={{ color: 'var(--clay-text-secondary)' }}>
        {message}
      </p>
      {action && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  );
}
