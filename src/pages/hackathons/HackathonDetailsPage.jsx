import { useParams, Link } from 'react-router-dom';

export default function HackathonDetailsPage() {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <Link to="/hackathons" className="text-blue-600 font-bold mb-4 inline-flex items-center gap-2 hover:text-blue-800">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back to Hackathons
      </Link>
      
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center mt-6">
        <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
        <p className="text-gray-500 font-bold text-lg mb-2">Hackathon Details Placeholder</p>
        <p className="text-gray-400">Viewing details for ID: {id}</p>
      </div>
    </div>
  );
}
