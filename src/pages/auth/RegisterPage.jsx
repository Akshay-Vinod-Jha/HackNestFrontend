import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
  });

  const navigate = useNavigate();
  const registerAction = useAuthStore((state) => state.register);

  const onSubmit = async (data) => {
    try {
      await registerAction(data);
      toast.success('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      // Error handled globally via App.jsx listener on store error state
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create an Account</h1>
        <p className="text-sm text-gray-500 mt-2">Join HackNest and build the future</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.fullName 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-200 focus:ring-blue-500'
            } focus:outline-none focus:ring-2 transition-all duration-200 bg-gray-50 focus:bg-white`}
            placeholder="Jane Doe"
            {...register('fullName', {
              required: 'Full name is required',
              minLength: {
                value: 3,
                message: 'Full name must be at least 3 characters',
              },
            })}
          />
          {errors.fullName && (
            <p className="mt-1.5 text-sm text-red-500 font-medium animate-pulse">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.email 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-200 focus:ring-blue-500'
            } focus:outline-none focus:ring-2 transition-all duration-200 bg-gray-50 focus:bg-white`}
            placeholder="you@example.com"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address',
              },
            })}
          />
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-500 font-medium animate-pulse">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.password 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-200 focus:ring-blue-500'
            } focus:outline-none focus:ring-2 transition-all duration-200 bg-gray-50 focus:bg-white`}
            placeholder="••••••••"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
          />
          {errors.password && (
            <p className="mt-1.5 text-sm text-red-500 font-medium animate-pulse">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-md transform transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Registering...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-blue-600 hover:text-indigo-600 transition-colors">
          Log in here
        </Link>
      </div>
    </div>
  );
}
