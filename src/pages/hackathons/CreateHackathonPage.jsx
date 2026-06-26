import { Link } from 'react-router-dom';
import CreateHackathonForm from '../../components/forms/CreateHackathonForm';
import { FiArrowLeft } from 'react-icons/fi';

export default function CreateHackathonPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <Link 
        to="/hackathons" 
        className="inline-flex items-center gap-2 text-gray-500 font-bold hover:text-blue-600 transition-colors mb-2"
      >
        <FiArrowLeft className="w-5 h-5" />
        Back to Catalog
      </Link>
      
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Create Hackathon</h1>
        <p className="text-gray-500 font-medium text-lg mb-8">Publish a new event to the platform and start recruiting teams.</p>
      </div>

      <CreateHackathonForm />
    </div>
  );
}
