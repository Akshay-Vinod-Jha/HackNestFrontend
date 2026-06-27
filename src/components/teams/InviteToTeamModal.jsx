import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSend, FiLoader, FiMail } from 'react-icons/fi';
import { modalVariants, backdropVariants } from '../../utils/animations';
import useInvitations from '../../hooks/useInvitations';

export default function InviteToTeamModal({ isOpen, onClose, team }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const { sendInvitation } = useInvitations();

  const onSubmit = async (data) => {
    try {
      await sendInvitation(team.id, data);
      toast.success('Invitation sent successfully!');
      reset();
      onClose();
    } catch (error) {
      toast.error(typeof error === 'string' ? error : error.message || 'Failed to send invite');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={() => { reset(); onClose(); }}
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)' }}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="clay-modal relative w-full max-w-lg"
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between p-6 border-b"
              style={{ borderColor: 'var(--clay-border-light)' }}
            >
              <div>
                <h2 className="text-lg font-extrabold" style={{ color: 'var(--clay-text-primary)' }}>
                  Invite to Team
                </h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--clay-text-muted)' }}>
                  {team?.name}
                </p>
              </div>
              <motion.button
                onClick={() => { reset(); onClose(); }}
                className="clay-icon-button"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.88 }}
                transition={{ duration: 0.18 }}
              >
                <FiX className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
              
              {/* Email Field */}
              <div>
                <label className="clay-label" htmlFor="receiverEmail">
                  Student Email Address *
                </label>
                <div className="relative">
                  <FiMail 
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" 
                    style={{ color: 'var(--clay-text-muted)' }} 
                  />
                  <input
                    id="receiverEmail"
                    type="email"
                    className={`clay-input pl-10 ${errors.receiverEmail ? 'clay-input-error' : ''}`}
                    placeholder="student@example.com"
                    {...register('receiverEmail', {
                      required: 'Please enter an email address',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      }
                    })}
                  />
                </div>
                <AnimatePresence>
                  {errors.receiverEmail && (
                    <motion.p
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs font-semibold mt-1.5"
                      style={{ color: 'var(--clay-danger)' }}
                    >
                      {errors.receiverEmail.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Role Offered */}
              <div>
                <label className="clay-label" htmlFor="roleOffered">Role Offered *</label>
                <select
                  id="roleOffered"
                  className={`clay-select ${errors.roleOffered ? 'clay-input-error' : ''}`}
                  {...register('roleOffered', { required: 'Please select a role' })}
                >
                  <option value="">Select a role...</option>
                  {team?.requiredRoles?.map((role, idx) => {
                    const roleName = role.roleName || role.name;
                    return <option key={idx} value={roleName}>{roleName}</option>;
                  })}
                  <option value="General Member">General Member</option>
                </select>
                <AnimatePresence>
                  {errors.roleOffered && (
                    <motion.p
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs font-semibold mt-1.5"
                      style={{ color: 'var(--clay-danger)' }}
                    >
                      {errors.roleOffered.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Message */}
              <div>
                <label className="clay-label" htmlFor="message">Personal Message</label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={3}
                  className="clay-textarea"
                  placeholder="Hey! We saw your profile and think you'd be a great fit..."
                />
              </div>

              {/* Actions */}
              <div 
                className="flex justify-end gap-3 pt-4 border-t"
                style={{ borderColor: 'var(--clay-border-light)' }}
              >
                <motion.button
                  type="button"
                  onClick={() => { reset(); onClose(); }}
                  className="clay-button clay-button-secondary"
                  whileTap={{ scale: 0.96 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="clay-button clay-button-primary"
                  whileHover={!isSubmitting ? { scale: 1.03 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                >
                  {isSubmitting 
                    ? <><FiLoader className="w-4 h-4 animate-spin" /> Sending...</>
                    : <><FiSend className="w-4 h-4" /> Send Invite</>
                  }
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
