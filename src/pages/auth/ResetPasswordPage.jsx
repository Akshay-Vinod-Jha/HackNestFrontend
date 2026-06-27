import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiLock, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import useAuthStore from '../../store/authStore';
import Logo from '../../components/ui/Logo';

export default function ResetPasswordPage() {
  const { resetPassword, isLoading } = useAuthStore();
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const token = searchParams.get('token');

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const newPassword = watch("newPassword");

  useEffect(() => {
    if (!token) {
      toast.error('Invalid or missing reset token.');
      navigate('/login');
    }
  }, [token, navigate]);

  const onSubmit = async (data) => {
    try {
      await resetPassword(token, data.newPassword);
      setIsSuccess(true);
      toast.success('Password reset successfully!');
    } catch (error) {
      // Error handled by App.jsx global handler
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-indigo-100/50 p-8 sm:p-10 border border-indigo-50/50 text-center">
          <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">Password reset!</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Your password has been successfully reset. You can now log in with your new credentials.
          </p>
          <Link 
            to="/login"
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all active:scale-[0.98]"
          >
            Continue to log in <FiArrowRight />
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
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Set new password</h2>
          <p className="text-gray-500 text-sm">Your new password must be different from previously used passwords.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">New password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register("newPassword", { 
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" }
                })}
                type="password"
                className={`block w-full pl-10 pr-3 py-2.5 sm:text-sm border rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none
                  ${errors.newPassword ? 'border-red-300 bg-red-50 text-red-900' : 'border-gray-200 bg-gray-50 text-gray-900'}`}
                placeholder="••••••••"
              />
            </div>
            {errors.newPassword && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.newPassword.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm new password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register("confirmPassword", { 
                  required: "Please confirm your password",
                  validate: value => value === newPassword || "Passwords do not match"
                })}
                type="password"
                className={`block w-full pl-10 pr-3 py-2.5 sm:text-sm border rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none
                  ${errors.confirmPassword ? 'border-red-300 bg-red-50 text-red-900' : 'border-gray-200 bg-gray-50 text-gray-900'}`}
                placeholder="••••••••"
              />
            </div>
            {errors.confirmPassword && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all mt-6 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              "Reset password"
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
