import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useHackathons from '../../hooks/useHackathons';
import { FiSave, FiAlertCircle, FiLoader, FiCheckCircle, FiArrowRight } from 'react-icons/fi';

export default function CreateHackathonForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      mode: 'ONLINE',
      status: 'UPCOMING',
      minTeamSize: 1,
      maxTeamSize: 4
    }
  });
  
  const navigate = useNavigate();
  const { createHackathon } = useHackathons();

  const onSubmit = async (data) => {
    try {
      const payload = {
        title: data.title,
        description: data.description,
        organizer: data.organizer,
        mode: data.mode,
        prizePool: data.prizePool,
        country: data.country,
        city: data.city,
        teamSizeMin: parseInt(data.minTeamSize, 10),
        teamSizeMax: parseInt(data.maxTeamSize, 10),
        registrationDeadline: data.registrationDeadline ? `${data.registrationDeadline}T23:59:59` : null,
        hackathonStartDate: data.startDate ? `${data.startDate}T00:00:00` : null,
        hackathonEndDate: data.endDate ? `${data.endDate}T23:59:59` : null,
        domains: data.domains ? data.domains.split(',').map(s => s.trim()).filter(Boolean) : [],
        techStacks: data.techStacks ? data.techStacks.split(',').map(s => s.trim()).filter(Boolean) : [],
        tags: data.tags ? data.tags.split(',').map(s => s.trim()).filter(Boolean) : []
      };

      await createHackathon(payload);
      toast.success('Hackathon created successfully!');
      reset(); // Clear the form
      setIsSuccess(true);
    } catch (error) {
      toast.error(typeof error === 'string' ? error : error.message || 'Failed to create hackathon');
    }
  };

  const InputError = ({ message }) => {
    if (!message) return null;
    return (
      <span className="text-red-500 text-xs font-bold mt-1 flex items-center gap-1">
        <FiAlertCircle className="w-3 h-3" /> {message}
      </span>
    );
  };

  if (isSuccess) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm text-center max-w-2xl mx-auto mt-8">
        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiCheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Created Successfully!</h2>
        <p className="text-gray-500 text-lg mb-8">
          Your hackathon has been published to the platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/hackathons" 
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-sm hover:bg-blue-700 transition-all active:scale-95"
          >
            View Hackathons List <FiArrowRight className="w-5 h-5" />
          </Link>
          <button 
            onClick={() => setIsSuccess(false)}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-gray-700 border border-gray-200 font-bold rounded-xl hover:bg-gray-50 transition-all active:scale-95"
          >
            Create Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      
      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-extrabold text-gray-900 mb-6 border-b border-gray-100 pb-2">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Title *</label>
            <input 
              type="text" 
              {...register('title', { required: 'Title is required' })}
              className={`w-full px-4 py-3 bg-gray-50 border ${errors.title ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'} rounded-xl focus:ring-2 focus:ring-opacity-20 focus:ring-blue-500 transition-all outline-none font-medium text-gray-900`}
              placeholder="e.g. Global AI Hackathon 2026"
            />
            <InputError message={errors.title?.message} />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Organizer *</label>
            <input 
              type="text" 
              {...register('organizer', { required: 'Organizer is required' })}
              className={`w-full px-4 py-3 bg-gray-50 border ${errors.organizer ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900`}
              placeholder="e.g. HackNest Inc."
            />
            <InputError message={errors.organizer?.message} />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Prize Pool</label>
            <input 
              type="text" 
              {...register('prizePool')}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900"
              placeholder="e.g. $50,000 + SWAG"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
            <textarea 
              {...register('description', { required: 'Description is required' })}
              rows={4}
              className={`w-full px-4 py-3 bg-gray-50 border ${errors.description ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900`}
              placeholder="Provide details about the hackathon..."
            />
            <InputError message={errors.description?.message} />
          </div>
        </div>
      </div>

      {/* Logistics */}
      <div>
        <h3 className="text-lg font-extrabold text-gray-900 mb-6 border-b border-gray-100 pb-2">Logistics & Location</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Mode</label>
            <select 
              {...register('mode')}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900"
            >
              <option value="ONLINE">Online</option>
              <option value="OFFLINE">Offline</option>
              <option value="HYBRID">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
            <select 
              {...register('status')}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900"
            >
              <option value="UPCOMING">Upcoming</option>
              <option value="ONGOING">Ongoing</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Country</label>
            <input 
              type="text" 
              {...register('country')}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900"
              placeholder="e.g. United States"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
            <input 
              type="text" 
              {...register('city')}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900"
              placeholder="e.g. San Francisco"
            />
          </div>
        </div>
      </div>

      {/* Dates & Team Size */}
      <div>
        <h3 className="text-lg font-extrabold text-gray-900 mb-6 border-b border-gray-100 pb-2">Dates & Team Limits</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Registration Deadline *</label>
            <input 
              type="date" 
              {...register('registrationDeadline', { required: 'Required' })}
              className={`w-full px-4 py-3 bg-gray-50 border ${errors.registrationDeadline ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900`}
            />
            <InputError message={errors.registrationDeadline?.message} />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Start Date *</label>
            <input 
              type="date" 
              {...register('startDate', { required: 'Required' })}
              className={`w-full px-4 py-3 bg-gray-50 border ${errors.startDate ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900`}
            />
            <InputError message={errors.startDate?.message} />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">End Date *</label>
            <input 
              type="date" 
              {...register('endDate', { required: 'Required' })}
              className={`w-full px-4 py-3 bg-gray-50 border ${errors.endDate ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900`}
            />
            <InputError message={errors.endDate?.message} />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-bold text-gray-700 mb-2">Min Team Size *</label>
            <input 
              type="number" 
              min="1"
              {...register('minTeamSize', { required: 'Required', min: 1 })}
              className={`w-full px-4 py-3 bg-gray-50 border ${errors.minTeamSize ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900`}
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-bold text-gray-700 mb-2">Max Team Size *</label>
            <input 
              type="number" 
              min="1"
              {...register('maxTeamSize', { required: 'Required', min: 1 })}
              className={`w-full px-4 py-3 bg-gray-50 border ${errors.maxTeamSize ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900`}
            />
          </div>
        </div>
      </div>

      {/* Meta */}
      <div>
        <h3 className="text-lg font-extrabold text-gray-900 mb-6 border-b border-gray-100 pb-2">Meta Tags</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Domains (comma separated)</label>
            <input 
              type="text" 
              {...register('domains')}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900"
              placeholder="Web3, AI, FinTech"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Tech Stacks (comma separated)</label>
            <input 
              type="text" 
              {...register('techStacks')}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900"
              placeholder="React, Java, Python"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Tags (comma separated)</label>
            <input 
              type="text" 
              {...register('tags')}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-blue-500 transition-all outline-none font-medium text-gray-900"
              placeholder="beginner-friendly, open-source"
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="pt-6 border-t border-gray-100 flex justify-end">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-sm hover:bg-blue-700 hover:shadow transition-all active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
        >
          {isSubmitting ? <FiLoader className="w-5 h-5 animate-spin" /> : <FiSave className="w-5 h-5" />}
          {isSubmitting ? 'Creating Hackathon...' : 'Create Hackathon'}
        </button>
      </div>

    </form>
  );
}
