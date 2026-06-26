import { useEffect } from 'react';
import useProfile from '../../hooks/useProfile';

import ProfileHeaderCard from '../../components/cards/ProfileHeaderCard';
import ProfileInfoCard from '../../components/cards/ProfileInfoCard';
import SkillsCard from '../../components/cards/SkillsCard';
import ExperienceCard from '../../components/cards/ExperienceCard';
import PortfolioCard from '../../components/cards/PortfolioCard';

export default function ProfilePage() {
  const { profile, isLoading, error, fetchProfile, clearError } = useProfile();

  useEffect(() => {
    if (!profile) {
      fetchProfile().catch(() => {
        // Global error handler in App.jsx captures and toasts the error
      });
    }
  }, [fetchProfile, profile]);

  if (isLoading && !profile) {
    return <ProfileSkeleton />;
  }

  if (error && !profile) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-3xl shadow-sm border border-red-100 p-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Failed to load profile</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            {typeof error === 'string' ? error : 'An unexpected error occurred while fetching your data.'}
          </p>
          <button 
            onClick={() => {
              clearError();
              fetchProfile();
            }}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            Retry Fetching Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* 1. Profile Header */}
      <ProfileHeaderCard profile={profile} />

      {/* Grid Layout for Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Info & Portfolio */}
        <div className="lg:col-span-1 flex flex-col gap-6">
           {/* 2. Basic Information */}
           <ProfileInfoCard profile={profile} />
           
           {/* 5. Portfolio Links */}
           <PortfolioCard portfolio={profile?.portfolio} />
        </div>
        
        {/* Right Column: Skills & Experience */}
        <div className="lg:col-span-2 flex flex-col gap-6">
           {/* 3. Skills */}
           <SkillsCard skills={profile?.skills} />
           
           {/* 4. Experience */}
           <ExperienceCard experience={profile?.experience} />
        </div>
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="h-24 w-24 rounded-full bg-gray-200 shrink-0"></div>
        <div className="space-y-4 text-center md:text-left w-full max-w-md">
          <div className="h-8 bg-gray-200 rounded-lg w-3/4 mx-auto md:mx-0"></div>
          <div className="h-5 bg-gray-200 rounded-md w-1/2 mx-auto md:mx-0"></div>
          <div className="h-4 bg-gray-200 rounded-md w-1/3 mx-auto md:mx-0"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-64"></div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-48"></div>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-36"></div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-96"></div>
        </div>
      </div>
    </div>
  );
}
