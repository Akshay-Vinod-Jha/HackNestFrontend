/**
 * Premium animation primitives — inspired by Linear, Vercel, Stripe.
 * Animations should be felt, not noticed.
 */

/** Page-level fade-in. Opacity + 4px shift, 200ms easeOut. */
export const pageVariants = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0 },
  transition: { duration: 0.2, ease: 'easeOut' },
};

/** Container that staggers children with a minimal 20ms delay. */
export const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.02 },
  },
};

/** Individual stagger child — 6px shift, 180ms easeOut. */
export const staggerItem = {
  initial: { opacity: 0, y: 6 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.18, ease: 'easeOut' },
  },
};

/** Progress bar fill animation. Animate once, no bounce. */
export const progressVariants = {
  initial: { width: '0%' },
  animate: (score) => ({
    width: `${score}%`,
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.1 },
  }),
};

/** Modal entrance — opacity + 6px, 180ms. No scale, no bounce. */
export const modalVariants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.18, ease: 'easeOut' } },
  exit:    { opacity: 0, transition: { duration: 0.12, ease: 'easeIn' } },
};

/** Backdrop fade only. */
export const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15 } },
  exit:    { opacity: 0, transition: { duration: 0.12 } },
};

/** Compatibility for missing fadeUp */
export const fadeUp = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.18, ease: 'easeOut' } }
};

/** Compatibility for missing buttonHover */
export const buttonHover = {
  whileHover: { backgroundColor: 'rgba(0,0,0,0.02)', transition: { duration: 0.12 } },
  whileTap: { scale: 0.98, transition: { duration: 0.1 } }
};

/** Compatibility for missing bounceIn (mapped to premium scale-in instead of bouncing) */
export const bounceIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } }
};

/** Compatibility for missing viewportFadeUp */
export const viewportFadeUp = {
  initial: { opacity: 0, y: 6 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  viewport: { once: true, margin: "-40px" }
};
