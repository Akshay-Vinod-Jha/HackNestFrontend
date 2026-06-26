import { Link } from 'react-router-dom';

export default function CreateHackathonPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Link to="/hackathons" className="text-blue-600 font-bold mb-8 inline-flex items-center gap-2 hover:text-blue-800">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back to Hackathons
      </Link>
      
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center">
        <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
        <p className="text-gray-500 font-bold text-lg mb-2">Create Hackathon Placeholder</p>
        <p className="text-gray-400">Form implementation pending next task.</p>
      </div>
    </div>
  );
}
