import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import useAuthStore from '../../store/authStore';
import toast from 'react-hot-toast';
import Logo from '../../components/ui/Logo';
import { staggerContainer, staggerItem } from '../../utils/animations';

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onTouched' });

  const [showPassword, setShowPassword] = useState(false);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  const registerAction = useAuthStore((state) => state.register);
  const password = watch('password');

  const onSubmit = async (data) => {
    setHasError(false);
    try {
      await registerAction(data);
      toast.success('Welcome to HackNest! 🎉');
      navigate('/dashboard');
    } catch (error) {
      setHasError(true);
      setTimeout(() => setHasError(false), 500);
    }
  };

  const fields = [
    { 
      id: 'fullName', icon: FiUser, label: 'Full Name', type: 'text',
      placeholder: 'Jane Doe',
      validation: { 
        required: 'Full name is required',
        minLength: { value: 3, message: 'At least 3 characters' }
      }
    },
    { 
      id: 'email', icon: FiMail, label: 'Email Address', type: 'email',
      placeholder: 'you@example.com',
      validation: { 
        required: 'Email is required',
        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' }
      }
    },
    { 
      id: 'password', icon: FiLock, label: 'Password', type: 'password',
      placeholder: '••••••••',
      validation: { 
        required: 'Password is required',
        minLength: { value: 8, message: 'At least 8 characters' }
      },
      hasToggle: true
    },
  ];

  return (
    <motion.div className="w-full" variants={staggerContainer} initial="initial" animate="animate">
      {/* Header */}
      <motion.div variants={staggerItem} className="text-center mb-8 flex flex-col items-center">
        <motion.div
          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-6"
          style={{ background: 'linear-gradient(135deg, var(--clay-primary), var(--clay-secondary))' }}
          whileHover={{ scale: 1.08, rotate: 5 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Logo className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--clay-text-primary)' }}>
          Create Account
        </h1>
        <p className="text-sm mt-2" style={{ color: 'var(--clay-text-secondary)' }}>
          Join HackNest and build your dream team
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className={`space-y-5 ${hasError ? 'clay-shake' : ''}`}
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {fields.map((field) => (
          <motion.div key={field.id} variants={staggerItem}>
            <label className="clay-label" htmlFor={field.id}>{field.label}</label>
            <div className="relative">
              <field.icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--clay-text-muted)' }} />
              <input
                id={field.id}
                type={field.hasToggle ? (showPassword ? 'text' : 'password') : field.type}
                className={`clay-input pl-10 ${field.hasToggle ? 'pr-10' : ''} ${errors[field.id] ? 'clay-input-error' : ''}`}
                placeholder={field.placeholder}
                {...register(field.id, field.validation)}
              />
              {field.hasToggle && (
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--clay-text-muted)' }}
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              )}
            </div>
            <AnimatePresence>
              {errors[field.id] && (
                <motion.p
                  initial={{ opacity: 0, y: -4, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -4, height: 0 }}
                  className="mt-1.5 text-xs font-semibold"
                  style={{ color: 'var(--clay-danger)' }}
                >
                  {errors[field.id].message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        <motion.div variants={staggerItem} className="pt-1">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="clay-button clay-button-primary w-full py-3 text-base"
            whileHover={!isSubmitting ? { scale: 1.02, y: -1 } : {}}
            whileTap={!isSubmitting ? { scale: 0.97 } : {}}
          >
            {isSubmitting ? (
              <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <>Create Account <FiArrowRight className="w-4 h-4" /></>
            )}
          </motion.button>
        </motion.div>
      </motion.form>

      <motion.div variants={staggerItem} className="mt-7 text-center text-sm" style={{ color: 'var(--clay-text-secondary)' }}>
        Already have an account?{' '}
        <Link to="/login" className="font-bold transition-opacity hover:opacity-70" style={{ color: 'var(--clay-primary)' }}>
          Log in here
        </Link>
      </motion.div>
    </motion.div>
  );
}
