import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiArrowRight, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import useAuthStore from '../../store/authStore';
import Logo from '../../components/ui/Logo';
import { staggerContainer, staggerItem } from '../../utils/animations';

export default function ForgotPasswordPage() {
  const { forgotPassword, isLoading } = useAuthStore();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mockToken, setMockToken] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await forgotPassword(data.email);
      setMockToken(response.data);
      setIsSubmitted(true);
      toast.success('Reset link generated successfully!');
    } catch (error) {
      // Error handled globally
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        className="w-full text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
          className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
          style={{ background: 'var(--clay-success-light)', color: 'var(--clay-success)' }}
        >
          <FiCheckCircle className="w-8 h-8" />
        </motion.div>
        <h2 className="text-2xl font-extrabold mb-2" style={{ color: 'var(--clay-text-primary)' }}>
          Check your email
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--clay-text-secondary)' }}>
          We've sent a reset link to your email address.
        </p>

        {/* Dev Demo Token */}
        <div className="clay-card-inset text-left mb-6">
          <p className="clay-label mb-2">Development Demo Only</p>
          <p className="text-sm mb-3" style={{ color: 'var(--clay-text-secondary)' }}>
            No email server configured — click the link below:
          </p>
          <Link
            to={`/reset-password?token=${mockToken}`}
            className="text-sm font-bold break-all transition-opacity hover:opacity-70"
            style={{ color: 'var(--clay-primary)' }}
          >
            http://localhost:5173/reset-password?token={mockToken}
          </Link>
        </div>

        <Link
          to="/login"
          className="clay-button clay-button-ghost inline-flex items-center gap-2 text-sm font-semibold mx-auto"
          style={{ color: 'var(--clay-text-secondary)' }}
        >
          <FiArrowLeft className="w-4 h-4" /> Back to log in
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div className="w-full" variants={staggerContainer} initial="initial" animate="animate">
      <motion.div variants={staggerItem} className="text-center mb-8 flex flex-col items-center">
        <motion.div
          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-6"
          style={{ background: 'linear-gradient(135deg, var(--clay-primary), var(--clay-secondary))' }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
        >
          <Logo className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--clay-text-primary)' }}>
          Forgot password?
        </h1>
        <p className="text-sm mt-2" style={{ color: 'var(--clay-text-secondary)' }}>
          No worries, we'll send you reset instructions.
        </p>
      </motion.div>

      <motion.form onSubmit={handleSubmit(onSubmit)} className="space-y-5" variants={staggerContainer} initial="initial" animate="animate">
        <motion.div variants={staggerItem}>
          <label className="clay-label" htmlFor="email">Email address</label>
          <div className="relative">
            <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--clay-text-muted)' }} />
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
              })}
              type="email"
              id="email"
              className={`clay-input pl-10 ${errors.email ? 'clay-input-error' : ''}`}
              placeholder="you@example.com"
            />
          </div>
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -4, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-1.5 text-xs font-semibold"
                style={{ color: 'var(--clay-danger)' }}
              >
                {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={staggerItem}>
          <motion.button
            type="submit"
            disabled={isLoading}
            className="clay-button clay-button-primary w-full py-3 text-base"
            whileHover={!isLoading ? { scale: 1.02, y: -1 } : {}}
            whileTap={!isLoading ? { scale: 0.97 } : {}}
          >
            {isLoading ? (
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <>Reset password <FiArrowRight className="w-4 h-4" /></>
            )}
          </motion.button>
        </motion.div>
      </motion.form>

      <motion.div variants={staggerItem} className="mt-7 text-center">
        <Link
          to="/login"
          className="text-sm font-semibold inline-flex items-center gap-2 transition-opacity hover:opacity-70"
          style={{ color: 'var(--clay-text-secondary)' }}
        >
          <FiArrowLeft className="w-4 h-4" /> Back to log in
        </Link>
      </motion.div>
    </motion.div>
  );
}
