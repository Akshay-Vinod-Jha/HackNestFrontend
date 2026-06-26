import { Link } from 'react-router-dom';
import CreateTeamForm from '../../components/forms/CreateTeamForm';
import { FiArrowLeft, FiUsers } from 'react-icons/fi';

export default function CreateTeamPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <Link 
        to="/teams" 
        className="inline-flex items-center gap-2 text-gray-500 font-bold hover:text-blue-600 transition-colors mb-2"
      >
        <FiArrowLeft className="w-5 h-5" />
        Back to Teams
      </Link>
      
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
          <FiUsers className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-1">Create Team</h1>
          <p className="text-gray-500 font-medium">Build your dream team and start recruiting members.</p>
        </div>
      </div>

      <CreateTeamForm />
    </div>
  );
}
