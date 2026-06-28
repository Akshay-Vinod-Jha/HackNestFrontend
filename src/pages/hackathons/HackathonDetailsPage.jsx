import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useHackathons from '../../hooks/useHackathons';
import HackathonHeaderCard from '../../components/hackathons/HackathonHeaderCard';
import HackathonInfoCard from '../../components/hackathons/HackathonInfoCard';
import HackathonTeamsCard from '../../components/hackathons/HackathonTeamsCard';
import { FiArrowLeft } from 'react-icons/fi';

export default function HackathonDetailsPage() {
  const { id } = useParams();
  const { 
    selectedHackathon, 
    hackathonTeams, 
    isLoading, 
    error, 
    fetchHackathonById, 
    fetchHackathonTeams,
    clearError
  } = useHackathons();

  useEffect(() => {
    if (id) {
      fetchHackathonById(id).catch(() => {});
      fetchHackathonTeams(id).catch(() => {});
    }
  }, [id, fetchHackathonById, fetchHackathonTeams]);

  if (isLoading && !selectedHackathon) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6 animate-pulse">
        <div className="h-6 w-32 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-64 bg-white rounded-3xl border border-gray-100"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-white rounded-3xl border border-gray-100"></div>
          <div className="lg:col-span-1 h-96 bg-white rounded-3xl border border-gray-100"></div>
        </div>
      </div>
    );
  }

  if (error && !selectedHackathon) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 text-center">
        <div className="bg-white rounded-3xl border border-red-100 shadow-sm p-12 max-w-2xl mx-auto mt-12">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Failed to load details</h2>
          <p className="text-gray-500 font-medium mb-8 max-w-md mx-auto">{typeof error === 'string' ? error : 'Could not fetch hackathon data.'}</p>
          <button 
            onClick={() => { clearError(); fetchHackathonById(id); fetchHackathonTeams(id); }}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold transition-all shadow-sm hover:bg-blue-700 active:scale-[0.98]"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  if (!selectedHackathon) return null;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <Link 
        to="/hackathons" 
        className="inline-flex items-center gap-2 text-gray-500 font-bold hover:text-blue-600 transition-colors mb-2"
      >
        <FiArrowLeft className="w-5 h-5" />
        Back to Catalog
      </Link>
      
      <HackathonHeaderCard hackathon={selectedHackathon} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2">
          <HackathonInfoCard hackathon={selectedHackathon} />
        </div>
        <div className="lg:col-span-1">
          <HackathonTeamsCard teams={hackathonTeams} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
