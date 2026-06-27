import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiMail, FiArrowRight, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import useAuthStore from '../../store/authStore';
import Logo from '../../components/ui/Logo';

export default function ForgotPasswordPage() {
  const { forgotPassword, isLoading } = useAuthStore();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mockToken, setMockToken] = useState(''); // Just for this demo since we don't have email

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await forgotPassword(data.email);
      // Since we don't have a real email server, the backend returns the token in response.data
      setMockToken(response.data);
      setIsSubmitted(true);
      toast.success('Reset link generated successfully!');
    } catch (error) {
      // Error is handled by the global error handler in App.jsx via zustand store, 
      // but we can also just let it fail silently here or log it.
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-indigo-100/50 p-8 sm:p-10 border border-indigo-50/50 text-center">
          <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">Check your email</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            We've sent a password reset link to your email address. Please click the link to choose a new password.
          </p>
          
          {/* MOCK EMAIL CONTENT FOR DEMO PURPOSES */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-left mb-8">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Development Demo Only</p>
            <p className="text-sm text-gray-700 mb-4">Since there is no email server configured, click the link below to continue:</p>
            <Link 
              to={`/reset-password?token=${mockToken}`}
              className="text-indigo-600 font-bold hover:underline break-all text-sm"
            >
              http://localhost:5173/reset-password?token={mockToken}
            </Link>
          </div>

          <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-700 inline-flex items-center gap-2">
            <FiArrowLeft /> Back to log in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-indigo-100/50 p-8 sm:p-10 border border-indigo-50/50">
        
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <Logo className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Forgot password?</h2>
          <p className="text-gray-500 text-sm">No worries, we'll send you reset instructions.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register("email", { 
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                })}
                type="email"
                className={`block w-full pl-10 pr-3 py-2.5 sm:text-sm border rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none
                  ${errors.email ? 'border-red-300 bg-red-50 text-red-900' : 'border-gray-200 bg-gray-50 text-gray-900'}`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>Reset password <FiArrowRight /></>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link to="/login" className="text-sm font-semibold text-gray-500 hover:text-indigo-600 flex items-center justify-center gap-2">
            <FiArrowLeft /> Back to log in
          </Link>
        </div>

      </div>
    </div>
  );
}
