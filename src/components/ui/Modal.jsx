import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { modalVariants, backdropVariants } from '../../utils/animations';

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }) {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={onClose}
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)' }}
          />

          {/* Modal Panel */}
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`relative w-full ${maxWidth} flex flex-col max-h-[90vh] overflow-hidden`}
            style={{
              background: 'var(--clay-surface)',
              borderRadius: '24px',
              border: '1px solid var(--clay-border-light)',
              boxShadow: 'var(--clay-shadow-lg)',
            }}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between p-6 border-b flex-shrink-0"
              style={{ borderColor: 'var(--clay-border-light)' }}
            >
              <h2 className="text-lg font-extrabold" style={{ color: 'var(--clay-text-primary)' }}>
                {title}
              </h2>
              <motion.button 
                onClick={onClose}
                className="clay-icon-button"
                aria-label="Close"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.88 }}
                transition={{ duration: 0.18 }}
              >
                <FiX className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1 scrollbar-hide">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return typeof document !== 'undefined' 
    ? createPortal(modalContent, document.body)
    : null;
}
