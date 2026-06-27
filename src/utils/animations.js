/**
 * HackNest Animation System
 * Reusable Framer Motion variants for consistent animations across the app
 */

/* ─── Page Transitions ─── */
export const pageVariants = {
  initial: { opacity: 0, y: 12, scale: 0.99 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.99 },
};

export const pageTransition = {
  duration: 0.28,
  ease: [0.4, 0, 0.2, 1],
};

/* ─── Cards / Sections ─── */
export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.35 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
};

/* ─── Stagger containers ─── */
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerFast = {
  animate: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.02,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
};

export const staggerItemLeft = {
  initial: { opacity: 0, x: -16 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
};

/* ─── Modals ─── */
export const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

export const modalVariants = {
  initial: { opacity: 0, scale: 0.94, y: 16 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }, // spring-like
  },
  exit: { 
    opacity: 0, 
    scale: 0.94, 
    y: 8,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
  },
};

/* ─── Sidebar ─── */
export const sidebarVariants = {
  open: { 
    x: 0,
    transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
  },
  closed: { 
    x: '-100%',
    transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
  },
};

/* ─── Dropdown menus ─── */
export const dropdownVariants = {
  initial: { opacity: 0, scale: 0.95, y: -8 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] },
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: -8,
    transition: { duration: 0.14 },
  },
};

/* ─── Leaderboard / special ─── */
export const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
};

export const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
};

export const bounceIn = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: 'spring', 
      stiffness: 300, 
      damping: 20,
    },
  },
};

/* ─── Timeline / scroll-triggered ─── */
export const viewportFadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
};

/* ─── Number counters ─── */
/**
 * Returns transition settings for count-up effect.
 * Use with a useEffect that increments a displayed value.
 */
export const counterTransition = { duration: 1.2, ease: 'easeOut' };

/* ─── Progress bar ─── */
export const progressVariants = {
  initial: { width: 0 },
  animate: (pct) => ({
    width: `${pct}%`,
    transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: 0.2 },
  }),
};

/* ─── Badge / chip entrance ─── */
export const badgeEntrance = {
  initial: { opacity: 0, scale: 0.7 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 18 },
  },
};

/* ─── Hover helpers (use directly on motion elements) ─── */
export const cardHover = {
  whileHover: { y: -4, scale: 1.01, transition: { duration: 0.2 } },
  whileTap: { scale: 0.98, transition: { duration: 0.1 } },
};

export const buttonHover = {
  whileHover: { scale: 1.03, transition: { duration: 0.15 } },
  whileTap: { scale: 0.96, transition: { duration: 0.08 } },
};

export const iconHover = {
  whileHover: { scale: 1.12, rotate: 5, transition: { duration: 0.15 } },
  whileTap: { scale: 0.9 },
};
